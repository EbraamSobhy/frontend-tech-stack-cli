import { runCommand, copyTemplates, createFolders } from "../utils/common.js";

export async function generate(projectName, targetDir, templateDir, { useTailwind }) {
    const tailwindFlag = useTailwind ? "--tailwind" : "--no-tailwind";
    runCommand(`npx create-next-app@latest ${projectName} --ts ${tailwindFlag} --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git --no-jest`);

    process.chdir(targetDir);

    const folders = ["src/components", "src/lib", "src/types", "src/hooks", "src/services"];
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
