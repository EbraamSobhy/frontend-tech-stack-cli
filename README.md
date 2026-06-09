# Tech Stack CLI 

A professional-grade CLI tool to scaffold React.js projects with a production-ready tech stack. Kickstart your development with Vite, Docker, GitHub Actions, and Netlify configurations pre-configured.

## Features

- ** Vite + React:** Fast and modern development experience.
- ** Structured Architecture:** Pre-defined folder structure (`components`, `pages`, `hooks`, `services`, etc.) for scalable applications.
- ** Docker Ready:** Includes `Dockerfile` and `.dockerignore` for containerized development.
- ** CI/CD Integration:** Automated GitHub Actions workflow for building your application.
- ** Netlify Configuration:** Ready-to-deploy `netlify.toml` for seamless hosting.
- ** Git Initialization:** Automatically initializes a Git repository.

## Prerequisites

Before using this CLI, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerization)

## Getting Started

### Installation

You can install the CLI globally using npm:

```bash
npm install -g .
```
*(Note: Use `sudo` if necessary, or run `npm link` in the project root for local development)*

### Usage

To create a new project, simply run:

```bash
create-project my-awesome-app
```

This will:
1. Initialize a new Vite React project.
2. Install all necessary dependencies.
3. Set up the professional folder structure.
4. Copy production-ready configuration files.
5. Initialize a Git repository.

### Post-Installation

Once the project is created:

```bash
cd my-awesome-app
npm run dev
```

#### Running with Docker

```bash
docker build -t my-awesome-app .
docker run -p 5173:5173 my-awesome-app
```

## Project Structure

The generated project follows this best-practice structure:

```text
my-awesome-app/
├── .github/workflows/
│   └── deploy.yml
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── layouts/
│   └── utils/
├── Dockerfile
├── netlify.toml
└── ...
```

## Development

If you want to contribute or modify the templates:

1. Clone this repository.
2. Modify files in `templates/`.
3. Update `bin/index.js` for new logic.
4. Test locally using `node bin/index.js test-app`.

## License

This project is licensed under the MIT License.
