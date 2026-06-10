# Tech Stack CLI 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

A professional-grade CLI tool to scaffold modern frontend projects with a production-ready tech stack. Stop wasting time on boilerplate and start building with Vite, Next.js, Nuxt, and more—pre-configured with Docker, CI/CD, and a scalable architecture.

## Features

- **Multiple Frameworks:** Support for React, Vue, SvelteKit, Next.js, and Nuxt.js.
- **Standardized Architecture:** Automatically creates a scalable folder structure (`components`, `hooks`, `services`, `utils`, etc.).
- **Docker Integration:** Pre-configured `Dockerfile` and `.dockerignore` for containerized development and production.
- **CI/CD Built-in:** Automated GitHub Actions workflows for seamless deployments.
- **Cloud Ready:** Ready-to-deploy `netlify.toml` configuration for hosting.
- **Git Ready:** Automatically initializes a Git repository.
- **Developer Experience:** Interactive CLI with helpful prompts and feedback.

## Supported Frameworks

| Framework | Build Tool / CLI | Included Configurations |
| :--- | :--- | :--- |
| **React** | Vite | Folder structure, Docker, CI/CD, Netlify |
| **Next.js** | create-next-app | App Router, TS, Tailwind, Docker, CI/CD |
| **Vue** | Vite | Folder structure, Docker, CI/CD, Netlify |
| **Nuxt.js** | Nuxt CLI | Folder structure, Docker, CI/CD, Netlify |
| **SvelteKit** | Svelte CLI | Folder structure, Docker, CI/CD, Netlify |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js)

### Installation

You can install the CLI globally using npm:

```bash
npm install -g .
```

*Note: For local development, you can run `npm link` in the project root.*

### Usage

To start a new project, simply run:

```bash
create-app
```

Or provide a project name as an argument:

```bash
create-app my-awesome-project
```

The interactive wizard will guide you through selecting your preferred framework.

### Post-Installation

Once your project is created:

```bash
cd my-awesome-project
npm install
npm run dev
```

## Generated Project Structure

The CLI enforces a professional architecture to keep your project organized:

```text
my-app/
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions for CI/CD
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application views/routes
│   ├── hooks/           # Custom hooks / composables
│   ├── services/        # API calls and data fetching
│   ├── utils/           # Helper functions
│   └── layouts/         # Page layout components
├── Dockerfile           # Production-ready Docker configuration
├── netlify.toml         # Netlify deployment configuration
└── ...
```

## Docker Support

To build and run your application using Docker:

```bash
# Build the image
docker build -t my-app .

# Run the container
docker run -p 5173:5173 my-app
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
