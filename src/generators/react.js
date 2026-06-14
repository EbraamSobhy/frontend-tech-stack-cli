import { runCommand, copyTemplates, createFolders, replaceInFile } from "../utils/common.js";
import fs from "fs-extra";
import path from "path";

export async function generate(projectName, targetDir, templateDir, { useTailwind }) {
    runCommand(`npm create vite@latest ${projectName} -- --template react-ts`);

    process.chdir(targetDir);

    runCommand("npm install");

    if (useTailwind) {
        runCommand("npm install -D tailwindcss @tailwindcss/vite");

        // Update vite.config.ts
        const viteConfigPath = path.join(targetDir, "vite.config.ts");
        if (fs.existsSync(viteConfigPath)) {
            replaceInFile(viteConfigPath, "import react from '@vitejs/plugin-react'", "import react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/vite'");
            replaceInFile(viteConfigPath, 'plugins: [react()]', 'plugins: [tailwindcss(), react()]');
        }

        // Add tailwind import to index.css
        const cssPath = path.join(targetDir, "src/index.css");
        if (fs.existsSync(cssPath)) {
            const content = fs.readFileSync(cssPath, "utf8");
            fs.writeFileSync(cssPath, '@import "tailwindcss";\n' + content);
        } else {
            fs.ensureDirSync(path.join(targetDir, "src"));
            fs.writeFileSync(cssPath, '@import "tailwindcss";\n');
        }
    }

    const folders = ["src/components", "src/hooks", "src/services", "src/utils", "src/pages"]
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
