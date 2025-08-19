import fastify from "fastify";
import cors from "@fastify/cors";

const PORT = parseInt(process.env.PORT || "3333");

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 2, name: "Ferrari", base: "Maranello, Italy" },
  { id: 3, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 4, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 7, name: "Haas", base: "Kannapolis, United States" },
  { id: 8, name: "Racing Bulls", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Kick Sauber", base: "Hinwil, Switzerland" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Liam Lawson", team: "Red Bull Racing" },
  { id: 3, name: "Charles Leclerc", team: "Ferrari" },
  { id: 4, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 5, name: "Lando Norris", team: "McLaren" },
  { id: 6, name: "Oscar Piastri", team: "McLaren" },
  { id: 7, name: "George Russell", team: "Mercedes" },
  { id: 8, name: "Kimi Antonelli", team: "Mercedes" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Pierre Gasly", team: "Alpine" },
  { id: 12, name: "Jack Doohan", team: "Alpine" },
  { id: 13, name: "Esteban Ocon", team: "Haas" },
  { id: 14, name: "Oliver Bearman", team: "Haas" },
  { id: 15, name: "Yuki Tsunoda", team: "Racing Bulls" },
  { id: 16, name: "Isack Hadjar", team: "Racing Bulls" },
  { id: 17, name: "Alexander Albon", team: "Williams" },
  { id: 18, name: "Carlos Sainz", team: "Williams" },
  { id: 19, name: "Nico Hülkenberg", team: "Kick Sauber" },
  { id: 20, name: "Gabriel Bortoleto", team: "Kick Sauber" },
];

server.get("/teams/", async (request, response) => {
  response.type("application/json").code(200);
  return teams;
});

server.get("/drivers/", async (request, response) => {
  response.type("application/json").code(200);
  return drivers;
});

interface Params {
  id: string;
}

server.get<{ Params: Params}>(
  "/team/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const team = teams.find((t) => t.id === id);

    if(!team) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    } else {
      response.type("application/json").code(200);
      return team;
    }
  }
);

server.get<{ Params: Params }>(
  "/driver/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return driver;
    }
  }
);

interface Team {
  name: string;
  base: string;
}

interface Driver {
  name: string;
  team: string;
}

server.post<{ Body: Team }>(
  "/teams/",
  async (request, response) => {
    const body = request.body;
    
    if(!body.name || !body.base) {
      response.type("application/json").code(400);
      return { message: "Missing parameters" };
    } else {
      teams.push({
        id: teams.length + 1,
        ...body,
      });

      response.type("application/json").code(201);
      return { message: "Created" };
    }
  }
);

server.post<{ Body: Driver }>(
  "/drivers/",
  async (request, response) => {
    const body = request.body;

    if(!body.name || !body.team) {
      response.type("application/json").code(400);
      return { message: "Missing parameters" };
    } else {
      drivers.push({
        id: drivers.length + 1,
        ...body,
      });

      response.type("application/json").code(201);
      return { message: "Created" };
    }
  }
);

server.put<{Params: Params, Body: Team}>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body;

    const teamIndex = teams.findIndex(team => team.id === id);

    if(teamIndex === -1) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    } else {
      const newBody = { id: id, ...body };      
      teams[teamIndex] = newBody;

      response.type("application/json").code(200);
      return { message: "OK"};
    }
  }
);

server.put<{Params: Params, Body: Driver}>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body;

    const driverIndex = drivers.findIndex(driver => driver.id === id);

    if(driverIndex === -1) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      const newBody = { id: id, ...body};
      drivers[driverIndex] = newBody;

      response.type("application/json").code(200);
      return { message: "OK" };
    }
  }
);

server.delete<{Params: Params}>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);

    const teamIndex = teams.findIndex(team => team.id === id);

    if(teamIndex === -1) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    } else {
      teams.splice(teamIndex, 1);

      response.type("application/json").code(200);
      return { message: "OK" };
    }
  }
);

server.delete<{Params: Params}>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);

    const driverIndex = drivers.findIndex(driver => driver.id === id);

    if(driverIndex === -1) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    } else {
      drivers.splice(driverIndex, 1);

      response.type("application/json").code(200);
      return { message: "OK" };
    }
  }
);

server.listen({ port: PORT }, () => {
  console.log(`Server is running on port ${PORT}`);
});
