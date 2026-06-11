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

export const copyTemplates = (templateDir, targetDir, filesToCopy, replacements = {}) => {
    for (const [src, dest] of Object.entries(filesToCopy)) {
        const srcPath = path.join(templateDir, src);
        const destPath = path.join(targetDir, dest);
        if (fs.existsSync(srcPath)) {
            fs.ensureDirSync(path.dirname(destPath));
            
            let content = fs.readFileSync(srcPath, "utf8");
            
            // Apply replacements
            Object.entries(replacements).forEach(([key, value]) => {
                content = content.replace(new RegExp(key, "g"), value);
            });

            fs.writeFileSync(destPath, content);

            // Make .sh files executable
            if (dest.endsWith(".sh")) {
                fs.chmodSync(destPath, "755");
            }
        }
    }
};

export const createFolders = (baseDir, folders) => {
    for (const folder of folders) {
        fs.ensureDirSync(path.join(baseDir, folder));
    }
};
