import { runCommand, copyTemplates, createFolders } from "../utils/common.js";

export async function generate(projectName, targetDir, templateDir) {
    runCommand(`npx create-next-app@latest ${projectName} --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git`);

    process.chdir(targetDir);

    const folders = ["src/components", "src/lib", "src/types", "src/hooks", "src/services"];
    createFolders(targetDir, folders);

    const filesToCopy = {
        "Dockerfile": "Dockerfile",
        ".dockerignore": ".dockerignore",
        "netlify.toml": "netlify.toml",
        "github-workflow.yml": ".github/workflows/deploy.yml"
    };
    copyTemplates(templateDir, targetDir, filesToCopy);

    runCommand("git init");
}
