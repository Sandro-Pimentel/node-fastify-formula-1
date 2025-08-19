# Complementando uma api rest seguindo o conceito de api mínima

> _Status do projeto: Finalizado._

## Descrição do Projeto

Foi criada uma api rest com fastify com o objetivo de introduzir o conceito de minimal api, tema envolvendo Fórmula 1. Foram criadas as rotas de get para corredores e equipes, o objetivo é implementar as rotas post, put e delete, mantendo o conceito de minimal api.

### O que é Minimal Api?

Minimal Api é o conceito de desenvolver uma api com pouco foco na estrutura do projeto para promover produtividade, esse conceito é valido em casos onde a aplicação inicialmente não tem como objetivo ser complexa ao nível de necessitar de uma arquitetura robusta. Vale ressaltar que não significa que uma aplicação não possa iniciar como uma minimal api e posteriormente se tornar uma aplicação mais robusta.

## Endpoints

### ```POST - /teams/```

**Descrição:** Insere um time com o seguinte modelo:

```
{
    name: "Kick Sauber", 
    base: "Hinwil, Switzerland"
},
```

### ```POST - /drivers/```

**Descrição:** Insere um corredor com o seguinte modelo:

```
{
    name: "Max Verstappen", 
    team: "Red Bull Racing"
},
```

### ```GET - /teams/```

**Descrição:** Retorna todos os times no seguinte modelo:

```
[
    {
        id: 1, 
        name: "Red Bull Racing", 
        base: "Milton Keynes, United Kingdom"
    },
    {
        id: 2, 
        name: "Ferrari", 
        base: "Maranello, Italy"
    },
]
```

### ```GET - /drivers/```

**Descrição:** Retorna todos os corredores no seguinte modelo:

```
[
    {
        id: 1, 
        name: "Max Verstappen", 
        team: "Red Bull Racing"
    },
    {
        id: 2, 
        name: "Liam Lawson", 
        team: "Red Bull Racing"
    },
]
```

### ```PUT - /teams/:id```

**Descrição:** Altera os dados de um time pelo id. O corpo segue o seguinte modelo:

**/teams/2**

```
{
    name: "McLaren", 
    base: "Woking, United Kingdom"
},
```

### ```PUT - /drivers/:id```

**Descrição:** Altera os dados de um corredor pelo id. O corpo segue o seguinte modelo:

**/drivers/2**

```
{
    name: "Lewis Hamilton", 
    team: "Ferrari"
},
```

### ```DELETE - /teams/:id```

**Descrição:** Apaga os dados de um time pelo id.

**/teams/3**

### ```DELETE - /drivers/:id```

**Descrição:** Apaga os dados de um corredor pelo id.

**/teams/3**

## Como rodar

Ao baixar o projeto instale as dependências com:

```
npm install
```

Para rodar a aplicação use o comando:

```
npm run start
```

