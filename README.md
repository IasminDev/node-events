# Events API  

This repository contains the backend for the **Events** application, designed to manage and handle events. It provides a RESTful API to create, update, delete, and fetch events. The frontend for this project is available in the [events_front](https://github.com/IasminDev/events_front) repository.

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

## Features  

- **Event Management**: Create, update, and delete events.  
- **User Authentication**: Secure user registration and login for event management.  
- **Event Listings**: Fetch and display events with filters for searching.  
- **Data Persistence**: Store event data in a database.  
- **Token-based Authentication**: Protect routes with JWT authentication.  

## Technologies Used  

- **Node.js**: JavaScript runtime for server-side development.  
- **Express.js**: Web framework for building APIs.  
- **MongoDB / PostgreSQL** (Specify if using one): Database for storing event data.  
- **JWT Authentication**: Secure user authentication.  
- **Dotenv**: Manages environment variables.  
- **Mongoose / Sequelize** (Specify if using one): ORM for interacting with the database.  

## How to Run the Project  

1. Clone the repository:  
   ```bash
   git clone https://github.com/IasminDev/events_back.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd events_back
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file (example below):  
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```
5. Start the server:  
   ```bash
   npm run dev
   ```
6. The API will be available at `http://localhost:PORT` (default: 3000).  
