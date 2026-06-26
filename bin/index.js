#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import { FRAMEWORKS } from "../constants/frameworks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name("frontend-app")
    .description("CLI to create a modern frontend project")
    .argument("[project-name]", "Name of the project")
    .action(async (projectName) => {
        console.log("");
        console.log(chalk.cyan("        Welcome to Frontend-Tech-Stack-CLI"));
        console.log(chalk.green(`
                                                        $%%%%                            
                                                       $.....                            
                                                      S:....!                            
                                       S&              .....&    &S                      
                                    # @%              &.....%    S  %@#                  
                                S&$     %            !....:S    S      $&S               
                            S# @%        %           $.....@     S         %@#           
                         S&$         %$&S          S:....!       S @$          $&S       
                      # @%         %@#               .....&           #@%         %@#    
                     @%        %$&S                &.....%               S&$%        %@  
                    %      % !....:S                   # @%      $                       
                    %      %$&S                   @.....$                   S&$%      $  
                    &$%   %   %% @#S             S:....!                S# @%        %$# 
                      S# @%%   %   %$&S          %.....&             #&$%   %    %@#     
           S @#            S&$%  %%%% % @#      #.....            #$%  %%%%  %$&S        
          $:.:%S             S# @$%%%%%% %      !....:#          S%%%%%% % @#           
          $:...:$                S&$%%%%%      @.....$           S%%%%%$&S               
           S%:...: @                  #@$$    S:....!            S%$ @#                  
             #*....!&                   S    %.....&             S                       
               #*....*&                     #.....                                       
                @:....%                     !.....#                                      
              &!....*#                      &&&&&#                                       
            #*....*&                                                                     
          #%....!&      @@@@@@@@@@@@@@@S                                                 
           ...: @      #...............@                                                 
           @!$S       S!!!!!!!!!!!!!!!&                                                  
        `));
        let name = projectName;

        if (!name) {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "projectName",
                    message: "What is your project name?",
                    default: "my-app",
                }
            ]);
            name = answers.projectName;
        }

        const { framework } = await inquirer.prompt([
            {
                type: "select",
                name: "framework",
                message: chalk.green("Select a framework:"),
                choices: Object.keys(FRAMEWORKS),
            }
        ]);

        const { useTailwind } = await inquirer.prompt([
            {
                type: "confirm",
                name: "useTailwind",
                message: "Do you want to use Tailwind CSS?",
                default: true,
            }
        ]);

        const targetDir = path.join(process.cwd(), name);
        const templateDir = path.resolve(__dirname, "../templates");

        const spinner = ora(`Creating ${framework} project: ${name}...`).start();

        try {
            const generatorPath = path.resolve(__dirname, `../src/generators/${framework}.js`);
            const { generate } = await import(`file://${generatorPath}`);

            await generate(name, targetDir, templateDir, { useTailwind });

            spinner.succeed(chalk.green(`Successfully created ${name} with ${framework}!`));
            console.log("\nTo get started:");
            console.log(chalk.cyan(`  cd ${name}`));
            console.log(chalk.cyan("  npm run dev"));
        } catch (error) {
            spinner.fail(chalk.red("Failed to create project"));
            console.error(chalk.red(error.message));
            process.exit(1);
        }
    });

program.parse(process.argv);
