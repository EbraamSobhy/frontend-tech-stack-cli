import { runCommand, copyTemplates, createFolders } from "../utils/common.js";

export async function generate(projectName, targetDir, templateDir) {
    runCommand(`npm create vite@latest ${projectName} -- --template react`);

    process.chdir(targetDir);

    runCommand("npm install");

    const folders = ["src/components", "src/pages", "src/hooks", "src/services", "src/layouts", "src/utils"];
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
