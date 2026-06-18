import {
    runCommand,
    copyTemplates,
    createFolders,
} from "../utils/common.js";

import fs from "fs-extra";
import path from "path";

function addTailwindToViteConfig(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    // 1. Add import if missing
    if (!content.includes("@tailwindcss/vite")) {
        content = content.replace(
            "import vue from '@vitejs/plugin-vue'",
            "import vue from '@vitejs/plugin-vue'\nimport tailwindcss from '@tailwindcss/vite'"
        );
    }

    // 2. Add plugin if missing
    if (!content.includes("tailwindcss()")) {
        content = content.replace(
            /plugins:\s*\[/,
            (match) => `${match}\n    tailwindcss(),`
        );
    }

    fs.writeFileSync(filePath, content);
}

function addTailwindToCSS(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    if (!content.includes('@import "tailwindcss"')) {
        content = `@import "tailwindcss";\n${content}`;
    }

    fs.writeFileSync(filePath, content);
}

export async function generate(
    projectName,
    targetDir,
    templateDir,
    { useTailwind }
) {
    // Create Vue project
    runCommand(
        `npm create vue@latest ${projectName} -- --typescript --router --eslint`
    );

    process.chdir(targetDir);

    // Install dependencies
    runCommand("npm install");

    // Tailwind setup
    if (useTailwind) {
        runCommand("npm install -D tailwindcss @tailwindcss/vite");

        const viteConfigPath = path.join(targetDir, "vite.config.ts");
        const cssPath = path.join(targetDir, "src/assets/main.css");

        if (fs.existsSync(viteConfigPath)) {
            addTailwindToViteConfig(viteConfigPath);
        }

        if (fs.existsSync(cssPath)) {
            addTailwindToCSS(cssPath);
        }
    }

    // Create project structure
    const folders = [
        "src/components",
        "src/views",
        "src/assets",
        "src/router",
        "src/store",
        "src/pages",
    ];

    createFolders(targetDir, folders);

    // Copy template files
    const filesToCopy = {
        Dockerfile: "Dockerfile",
        ".dockerignore": ".dockerignore",
        "netlify.toml": "netlify.toml",
        "github-workflow.yml": ".github/workflows/deploy.yml",
        Makefile: "Makefile",
        "git.sh": "git.sh",
    };

    copyTemplates(templateDir, targetDir, filesToCopy, {
        "<project-name>": projectName,
    });

    // Init git
    runCommand("git init");
}
