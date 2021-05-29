# Ticketing Microservices

This project demonstrates how to setup microservices using ExpressJS and how to manage theme using Docker and Kubernetes

## About the App

This a ticketing system where people can see a list of shows and book tickets for the show.
Very similar to [StubHub](stubhub.com)
### Features
1. Users can list a ticket for an event (concert,sports) for sale
2. Other users can purchase this ticket
3. ANy user can list tickets for sale and purchase tickets
4. When a user attempts to purchase a ticket, the ticket is 'locked' fir 15 minutes. The user has 15 minutes to enter their payment info.
5. While locked, no other user can purchase the ticket. After 15 minutes, the ticket should 'unlock'
6. Ticket prices can be if they are not locked