# Tech Stack CLI 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)

A professional-grade CLI tool to scaffold modern frontend projects with a production-ready tech stack. Stop wasting time on boilerplate and start building with Vite, Next.js, Nuxt, and more—pre-configured with Docker, CI/CD, and a scalable architecture.

## Features

- **Multiple Frameworks:** Support for React, Vue, SvelteKit, Next.js, and Nuxt.js.
- **Framework-Optimized Architecture:** Automatically creates a scalable folder structure tailored to each framework (components, hooks, services, etc.).
- **Docker Integration:** Pre-configured `Dockerfile` and `.dockerignore` for containerized development.
- **CI/CD Built-in:** Automated GitHub Actions workflows for building and testing.
- **Automation with Makefile:** Streamline development with pre-defined commands for installation, building, testing, and more.
- **Cloud Ready:** Ready-to-deploy `netlify.toml` configuration for hosting.
- **Git Ready:** Automatically initializes a Git repository and includes a helper script for common Git tasks.

## Supported Frameworks

| Framework | Scaffolding Tool | Features Included |
| :--- | :--- | :--- |
| **React** | Vite | Folder structure, Docker, CI/CD, Netlify, Makefile |
| **Next.js** | create-next-app | App Router, TS, Tailwind, Docker, CI/CD, Makefile |
| **Vue** | Vue CLI | Folder structure, Docker, CI/CD, Netlify, Makefile |
| **Nuxt.js** | Nuxt CLI | Folder structure, Docker, CI/CD, Netlify, Makefile |
| **SvelteKit** | Svelte CLI | Folder structure, Docker, CI/CD, Netlify, Makefile |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js)

### Installation

You can install the CLI globally using npm:

```bash
git clone https://github.com/EbraamSobhy/frontend-tech-stack-cli.git

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

The CLI enforces a professional architecture while respecting framework conventions:

```text
my-app/
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions for CI/CD
├── src/                  # Application source (folder names vary by framework)
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom hooks / composables
│   ├── services/        # API calls and data fetching
│   └── ...              # Framework-specific directories (e.g., pages, lib, views)
├── Dockerfile           # Docker configuration
├── netlify.toml         # Netlify deployment configuration
├── .dockerignore        # Docker ignore rules
├── Makefile             # Development automation commands
└── git.sh               # Git helper script
```

## Makefile Commands

The generated project includes a `Makefile` to simplify common development tasks:

| Command | Description |
| :--- | :--- |
| `make install` | Install project dependencies |
| `make dev` | Start the development server |
| `make build` | Build the application for production |
| `make preview` | Preview the production build locally |
| `make lint` | Run the linter |
| `make test` | Run tests (if configured) |
| `make clean` | Remove `node_modules` and build artifacts |
| `make reinstall` | Clean and reinstall all dependencies |
| `make start` | Build and preview the application |

## Docker Support

To build and run your application using Docker:

```bash
# Build the image
docker build -t my-app .

# Run the container (default port 5173 for Vite-based projects)
docker run -p 5173:5173 my-app
```

*Note: Port may vary depending on the selected framework (e.g., 3000 for Next.js/Nuxt).*

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
