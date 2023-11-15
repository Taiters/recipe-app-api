# Recipe ~~API~~ App Project

## First time setup

To install node dependencies run

```
docker-compose run --rm client sh -c "npm install"
```

## Running the project

Start the project by running

```
docker-compose up
```

Navigate to http://127.0.0.1:8000/api/docs to play with the API. You'll need to do this to at least create a user, which you can then log in with on the client.

Navigate to http://127.0.0.1:3000/ to access the client.

## Working with the project

### Client

Edit the client locally on your machine.

### Server

You can use the devcontainer config to work on the server. This will take care of python environment and dependencies for you.
