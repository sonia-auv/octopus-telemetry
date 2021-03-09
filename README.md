# octopus-telemetry

This is the future web telemetry for SONIA

## Installation

Install the required dependencies:

```bash
cd src
npm install
```

⚠️ If it does not work, it is possible that you don't have the latest CRA version...it's normal. There is a [known bug](https://github.com/npm/cli/issues/2128). To [resolve this](https://github.com/facebook/create-react-app/pull/9964) for now:

```bash
npm install --legacy-peer-deps
```

## Starting the UI

```bash
cd src
npm run start
```

## Building and running the UI with Docker

```bash
cd src
docker build . -t octopus-ui:latest

# Run from docker
# -it : interactive mode
# -p HOST:CONTAINER : exposes the port of the container to the host's port
docker run -it -p 3001:3000 octopus-ui:latest
```

You should see the app at [http://localhost:3001](http://localhost:3001)
