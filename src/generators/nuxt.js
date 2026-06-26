import { runCommand, copyTemplates, createFolders, replaceInFile } from "../utils/common.js";
import fs from "fs-extra";
import path from "path";

export async function generate(projectName, targetDir, templateDir, { useTailwind }) {
    runCommand(`npm create nuxt@latest ${projectName} --packageManager npm --no-gitInit`);

    process.chdir(targetDir);

    runCommand("npm install");

    if (useTailwind) {
        runCommand("npm install -D tailwindcss @tailwindcss/vite");

        // Update nuxt.config.ts
        const nuxtConfigPath = path.join(targetDir, "nuxt.config.ts");
        if (fs.existsSync(nuxtConfigPath)) {
            // Nuxt uses a different way to add vite plugins
            replaceInFile(nuxtConfigPath, "export default defineNuxtConfig({", "import tailwindcss from '@tailwindcss/vite'\n\nexport default defineNuxtConfig({");
            replaceInFile(nuxtConfigPath, "devtools: { enabled: true }", "devtools: { enabled: true },\n  vite: {\n    plugins: [tailwindcss()]\n  }, \n  css: ['~/assets/css/main.css']");
        }

        // Add tailwind import to main.css
        const cssDir = path.join(targetDir, "assets/css");
        fs.ensureDirSync(cssDir);
        const cssPath = path.join(cssDir, "main.css");
        fs.writeFileSync(cssPath, '@import "tailwindcss";\n');
    }

    const folders = ["components", "layouts", "pages", "composables", "server", "assets", "middleware"];
    createFolders(targetDir, folders);

    const filesToCopy = {
        "Dockerfile": "Dockerfile",
        ".dockerignore": ".dockerignore",
        "netlify.toml": "netlify.toml",
        "github-workflow.yml": ".github/workflows/deploy.yml",
        "Makefile": "Makefile",
        "git.sh": "git.sh",
        "vercel.json": "vercel.json",
        "vercel.md": "vercel.md"
    };
    copyTemplates(templateDir, targetDir, filesToCopy, { "<project-name>": projectName });

    runCommand("git init");
}
