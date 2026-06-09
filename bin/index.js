#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name("create-project")
    .description("CLI to create a React.js Vite project with Docker, GitHub Actions, and Netlify")
    .argument("<project-name>", "Name of the project")
    .parse(process.argv);

const projectName = program.args[0];

if (!projectName) {
    console.log(chalk.green("Project name required"));
    process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);
const templateDir = path.resolve(__dirname, "../templates");

const runCommand = (command, options = {}) => {
    try {
        execSync(command, { stdio: "inherit", ...options });
    } catch (e) {
        throw new Error(`Failed to execute: ${command}`);
    }
};

async function createProject() {
    const spinner = ora("Creating app...").start();

    try {
        // 1. Create Vite app
        spinner.text = "Initializing Vite with React...";
        runCommand(`npm create vite@latest ${projectName} -- --template react`);

        process.chdir(targetDir);

        // 2. Install dependencies
        spinner.text = "Installing dependencies...";
        runCommand("npm install");

        // 3. Create folder structure
        spinner.text = "Setting up folder structure...";
        const folders = ["components", "pages", "hooks", "services", "layouts", "utils"];
        for (const folder of folders) {
            fs.ensureDirSync(path.join("src", folder));
        }

        // 4. Copy templates
        spinner.text = "Copying configuration templates...";

        const filesToCopy = {
            "Dockerfile": "Dockerfile",
            ".dockerignore": ".dockerignore",
            "netlify.toml": "netlify.toml",
            "github-workflow.yml": ".github/workflows/deploy.yml"
        };

        for (const [src, dest] of Object.entries(filesToCopy)) {
            const srcPath = path.join(templateDir, src);
            const destPath = path.join(targetDir, dest);
            if (fs.existsSync(srcPath)) {
                fs.ensureDirSync(path.dirname(destPath));
                fs.copySync(srcPath, destPath);
            }
        }

        // 5. Initialize git
        spinner.text = "Initializing Git...";
        runCommand("git init");

        spinner.succeed(chalk.green(`Successfully created ${projectName}!`));
        console.log("\nTo get started:");
        console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan("  npm run dev"));
        console.log("\nDocker:");
        console.log(chalk.cyan(`  docker build -t ${projectName} .`));

    } catch (error) {
        spinner.fail(chalk.red("Failed to create project"));
        console.error(chalk.red(error.message));
        process.exit(1);
    }
}

createProject();
