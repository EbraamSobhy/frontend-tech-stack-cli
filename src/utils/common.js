import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

export const runCommand = (command, options = {}) => {
    try {
        execSync(command, { stdio: "inherit", ...options });
    } catch (e) {
        throw new Error(`Failed to execute: ${command}`);
    }
};

export const copyTemplates = (templateDir, targetDir, filesToCopy) => {
    for (const [src, dest] of Object.entries(filesToCopy)) {
        const srcPath = path.join(templateDir, src);
        const destPath = path.join(targetDir, dest);
        if (fs.existsSync(srcPath)) {
            fs.ensureDirSync(path.dirname(destPath));
            fs.copySync(srcPath, destPath);
        }
    }
};

export const createFolders = (baseDir, folders) => {
    for (const folder of folders) {
        fs.ensureDirSync(path.join(baseDir, folder));
    }
};
