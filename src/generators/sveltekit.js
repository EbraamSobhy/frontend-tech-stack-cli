import { runCommand, copyTemplates, createFolders, replaceInFile } from "../utils/common.js";
import fs from "fs-extra";
import path from "path";

export async function generate(projectName, targetDir, templateDir, { useTailwind }) {
    runCommand(`npx sv create ${projectName} --no-git --no-install --template skeleton --types ts --no-check`);

    process.chdir(targetDir);

    runCommand("npm install");

    if (useTailwind) {
        runCommand("npm install -D tailwindcss @tailwindcss/vite");

        // Update vite.config.ts
        const viteConfigPath = path.join(targetDir, "vite.config.ts");
        if (fs.existsSync(viteConfigPath)) {
            replaceInFile(viteConfigPath, "import { sveltekit } from '@sveltejs/kit/vite';", "import { sveltekit } from '@sveltejs/kit/vite';\nimport tailwindcss from '@tailwindcss/vite';");
            replaceInFile(viteConfigPath, "plugins: [sveltekit()]", "plugins: [tailwindcss(), sveltekit()]");
        }

        // Add tailwind import to app.css
        const cssPath = path.join(targetDir, "src/app.css");
        fs.writeFileSync(cssPath, '@import "tailwindcss";\n');

        // Ensure app.css is imported in +layout.svelte
        const layoutPath = path.join(targetDir, "src/routes/+layout.svelte");
        if (fs.existsSync(layoutPath)) {
            const content = fs.readFileSync(layoutPath, "utf8");
            if (!content.includes("../app.css")) {
                fs.writeFileSync(layoutPath, `<script>\n  import "../app.css";\n</script>\n\n` + content);
            }
        } else {
            fs.ensureDirSync(path.join(targetDir, "src/routes"));
            fs.writeFileSync(layoutPath, `<script>\n  import "../app.css";\n</script>\n\n<slot />`);
        }
    }

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
