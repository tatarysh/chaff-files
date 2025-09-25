# @rysh/chaff-files

## Description

`@rysh/chaff-files` is an npm package designed to generate fake, yet realistic-looking, configuration and sensitive files on-the-fly. It acts as a honeypot, serving pseudo-randomly generated content for commonly targeted files (like `.env`, `wp-config.php`, `.git/config`) when requested via specific URL paths. This can be used to mislead attackers, gather intelligence on scanning attempts, or simply provide a layer of deception in a development or testing environment.

## Features

-   **Dynamic Content Generation**: Generates realistic-looking content for various sensitive files.
-   **Path-Based Determinism**: Content is pseudo-randomly generated but remains consistent for the same request path, ensuring repeatability for analysis.
-   **Modular and Extensible**: Easily add new file generators for different types of sensitive files.
-   **No External Dependencies**: Implemented with zero external npm dependencies for a lightweight footprint.
-   **Case-Insensitive Path Matching**: Handles requests regardless of casing (e.g., `/WP-CONFIG.PHP` will match `wp-config.php`).

## Installation

```bash
npm install @rysh/chaff-files
# or
yarn add @rysh/chaff-files
```

## Usage

### In a Node.js Express Server

This package is primarily designed to be used as middleware in a Node.js server, such as Express. It intercepts requests for sensitive file paths and returns the generated chaff content.

```typescript
import express from 'express';
import { generateChaffResponse } from '@rysh/chaff-files';

const app = express();
const port = 3000;

app.use((req, res) => {
  const chaffResponse = generateChaffResponse(req.path);
  res.status(200).type(chaffResponse.type).send(chaffResponse.content);
});

app.listen(port, () => {
  console.log(`Chaff Files server running at http://localhost:${port}`);
});
```

### Available Generators

The package comes with several built-in generators for common sensitive files:

-   **`.env` files**: Matches paths like `/.env`, `/api/.env.local`, `/config/.env.production`.
    *   Generates fake environment variables, database credentials, API keys, AWS credentials, JWT secrets, and social app credentials.
    *   Sections and values are pseudo-randomly generated but deterministic per path.
-   **`.git/config` files**: Matches paths like `/.git/config`, `/repo/.git/config`.
    *   Generates fake Git repository configuration, including remote URLs, user names, and emails.
    *   Values are pseudo-randomly generated but deterministic per path.
-   **`wp-config.php` files**: Matches paths like `/wp-config.php`, `/blog/wp-config.php`.
    *   Generates fake WordPress configuration, including database credentials, authentication keys, and debugging settings.
    *   Boolean settings like `WP_DEBUG` are pseudo-randomly set but deterministic per path.
-   **`~/.ssh/id_rsa` files**: Matches paths like `/.ssh/id_rsa`, `/home/user/.ssh/id_rsa`.
    *   Generates fake SSH private keys, including dynamic key content, email, and date.
    *   Values are pseudo-randomly generated but deterministic per path.

## Development

To run the development server and test the generators:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:3000` and automatically restart on code changes.

3.  **Test in your browser:**
    *   `http://localhost:3000/.env`
    *   `http://localhost:3000/api/.env.production`
    *   `http://localhost:3000/.git/config`
    *   `http://localhost:3000/my-project/.git/config`
    *   `http://localhost:3000/wp-config.php`
    *   `http://localhost:3000/blog/wp-config.php`

## Extending with New Generators

To add a new generator for a different sensitive file:

1.  Create a new file in `src/generators/` (e.g., `src/generators/my-new-file-generator.ts`).
2.  Implement a `Generator` object with a `pattern` (RegExp) and a `generator` function that returns a `ChaffResponse`.
3.  Import your new generator into `src/generators/index.ts` and add it to the `generators` array.

Example `src/generators/my-new-file-generator.ts`:

```typescript
import { ChaffResponse, Generator } from "../types/index";
import { PRNG, simpleHash } from "../utils/prng-utils";

const myNewFileGenerator: Generator = {
  pattern: /(^|\/)my-new-file\.txt$/,
  generator: (path: string): ChaffResponse => {
    const seed = simpleHash(path);
    const prng = new PRNG(seed);
    const content = `This is a fake file generated for path: ${path} with a random number: ${prng.nextInt(0, 100)}`;
    return { content, type: 'text' };
  },
};

export default myNewFileGenerator;
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
