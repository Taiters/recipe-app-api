# Recipe ~~API~~ App Project

## Setup

To install node dependencies run

```
docker-compose run --rm client sh -c "npm install"
```

To recompile python's `requirements(.dev).txt` files

```
./compile_requirements.sh
```

## Running the project

Start the project by running

```
docker-compose up
```

Navigate to http://localhost:8000/api/docs to play with the API. You'll need to do this to at least create a user, which you can then log in with on the client.

Navigate to http://localhost:3000/ to access the client.

## Working with the project

### Client

Edit the client locally on your machine.

### Server

You can use the devcontainer config to work on the server. This will take care of python environment and dependencies for you.
