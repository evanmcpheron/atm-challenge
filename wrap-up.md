## Questions

### What issues, if any, did you find with the existing code?

- There wasn't a `.dockerignore` in the UI directory.
- There was an error being created on the front end when that should be happening on the back end and presented to the front end.
- Minor but the `Types` directory in UI should be `types`
- The docker-compose was not compatible with any sort of development environment. (hot-reloading)
- The type `account` should be `Account`. It is best practice to have types and interface PascalCase.

### What issues, if any, did you find with the request to add functionality?

- The request asked about tracking transaction history to not allow a given amount withdrawn over 24 hours. However, there was no current way to track that so I added a table to the DB to track transactions.

### Would you modify the structure of this project if you were to start it over? If so, how?

- I think the overall structure of the project is good. I did add some directories to the api and ui services.
- API
  - I added a service directory for validations. I was going to put it with the handlers but I felt that looked to be more scoped to db calls.
- UI
  - I created a hooks directory because I think it keeps the actual components from being too bloated with business logic.
  - I created the services directory to handle account transaction api call. (However, I changed the name of this multiple times. I'm not sure services is the right name for this directory)

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

- As far as the AC is concerned I completed everything on there. I'm sure there would be a whole list of things if this was supposed to go to production.
- I would probably work on creating a more robust typing system. Since the UI and API share alot of the same types it would be nice to have a central source of truth with the typings.

### If you were to continue building this out, what would you like to add next?

I would want to get rid of the alert bar that pops up and deal with errors from the server more gracefully on the front end. I would also like to work on persisting the user session since every time you refresh the page currently it reroutes you to the login page. Lastly, I would want to spend more time with error messages to make sure they are more cohesive and follow a more distinct pattern with the wording. I also would like to implement some sort of state management system like redux.

### If you have any other comments or info you'd like the reviewers to know, please add them below.

I did very little with the styling on this because I felt the business logic and AC was more important. However, if I were to spend more time on the styling I probably would've added more contrast and dark mode. 😎

PS. Sorry if I went overboard with this. I was having fun.
