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
