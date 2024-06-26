# pass.in

Pass.in is an application for managing participants in in-person events.

The tool allows the organizer to register an event and open a public registration page.

Registered participants can generate a credential for check-in on the day of the event.

The system will scan the participant's credential to allow entry into the event.

## Requirements

### Functional Requirements

- [ ] The organizer must be able to register a new event;
- [ ] The organizer must be able to view event data;
- [ ] The organizer must be able to view the list of participants;
- [ ] Participants must be able to register for an event;
- [ ] Participants must be able to view their registration badge;
- [ ] Participants must be able to check-in at the event;

### Business Rules

- [ ] Participants can only register for an event once;
- [ ] Participants can only register for events with available slots;
- [ ] Participants can only check-in to an event once;

### Non-functional Requirements

- [ ] Event check-in will be performed using a QRCode;

// Anotacoes

    // npx prisma db seed - para enviar dados do seed para db
    // npx prisma generate - muda banco de dados apos alteracoes
    
// Metodo HTTP: 
// GET(retornar dados), 
// POST(criar registro), 
// PUT(atualizacao de recursos), 
// DELETE(deletar informacoes), 
// PATCH(alteracao especifica em um campo do recurso), 
// HEAD e OPTIONS(seguranca)

// Tipos de informacoes
// Corpo da requisicao(post, put - formulario),
// Parametros de busca(get - filtragem de dados),
// Parametros de rota(put, delete, patch, get - identificacao de recursos, operacao em um unico registro),
// Cabecalhos(transicionar informacoes fixas, contextualizar backend)

// 20x - sucesso
// 30x - redirecionamento
// 40x - erro do client
// 50x - erro do servidor

Instalacoes>>

npm install

npm i fastify
npm i fastify-type-provider-zod
npm i zod
npm i dayjs
npm i prisma -D
npm i @types/node -D
npm i @faker-js/faker -D
npm i tsup -D
npm i tsx -D
npm i typescript -D
npm i @prisma/client@latest

.env >> DATABASE_URL="file:./dev.db"