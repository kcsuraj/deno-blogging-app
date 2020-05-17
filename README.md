# Deno Blog App

Blogging app api implementation using [deno](https://deno.land)

Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

## Installation

Please follow [official guide](https://deno.land/#installation) for installing deno.

## Usage

Create a `.env` file from the `.env.sample`. The content should look like below:

```
DB_NAME=deno_demo
DB_HOST_URL=mongodb://localhost:27017
```

From the root directory of the project, run the following command:

```
deno run --allow-write --allow-read --allow-plugin --allow-net --allow-env --unstable app.ts
```

The above permissions are required by mongo client in the app.
