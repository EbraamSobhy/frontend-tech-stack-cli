import { runCommand, copyTemplates, createFolders, replaceInFile } from "../utils/common.js";
import fs from "fs-extra";
import path from "path";

export async function generate(projectName, targetDir, templateDir, { useTailwind }) {
    runCommand(`npm create vue@latest ${projectName} -- --typescript --router --pinia --eslint --prettier --no-vitest --no-cypress`);

    process.chdir(targetDir);

    runCommand("npm install");

    if (useTailwind) {
        runCommand("npm install -D tailwindcss @tailwindcss/vite");

        // Update vite.config.ts
        const viteConfigPath = path.join(targetDir, "vite.config.ts");
        if (fs.existsSync(viteConfigPath)) {
            replaceInFile(viteConfigPath, "import vue from '@vitejs/plugin-vue'", "import vue from '@vitejs/plugin-vue'\nimport tailwindcss from '@tailwindcss/vite'");
            replaceInFile(viteConfigPath, "plugins: [vue(),", "plugins: [tailwindcss(), vue(),");
        }

        // Add tailwind import to main.css
        const cssPath = path.join(targetDir, "src/assets/main.css");
        if (fs.existsSync(cssPath)) {
            const content = fs.readFileSync(cssPath, "utf8");
            fs.writeFileSync(cssPath, '@import "tailwindcss";\n' + content);
        }
    }

    const folders = ["src/components", "src/views", "src/assets", "src/router", "src/store", "src/pages"];
    createFolders(targetDir, folders);

    const filesToCopy = {
        "Dockerfile": "Dockerfile",
        ".dockerignore": ".dockerignore",
        "netlify.toml": "netlify.toml",
        "github-workflow.yml": ".github/workflows/deploy.yml",
        "Makefile": "Makefile",
        "git.sh": "git.sh"
    };
    copyTemplates(templateDir, targetDir, filesToCopy, { "<project-name>": projectName });

    runCommand("git init");
}
