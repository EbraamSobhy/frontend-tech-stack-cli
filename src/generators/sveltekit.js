import { runCommand, copyTemplates, createFolders } from "../utils/common.js";

export async function generate(projectName, targetDir, templateDir) {
    runCommand(`npx sv create myapp ${projectName}`);

    process.chdir(targetDir);


    const folders = ["src/lib", "src/routes", "src/assets", "src/components"];
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
