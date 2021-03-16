#!/usr/bin/env node

const shell = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const program = require("commander");
const figlet = require("figlet");
const ip = require("ip");
const ora = require("ora")
const { alias } = require('commander');
const spinner = ora()
if (!shell.which('git')) {
    shell.echo('Sorry, this create-quick-app requires git');
    shell.exit(1);
}

console.log(chalk.blue('Quick CLI 2.6.0'));

figlet('QUICK JS!!', function (err, data) {
    if (err) {
        console.log(chalk.yellowBright('Something went wrong...'));
        console.dir(err);
        return;
    }
    console.log(data)
});



setTimeout(() => {
    program.version("2.6.0");

    program
        .command("start")
        .description("Create a new quickjs project | projectName prompted")
        .action(() => {
            inquirer
                .prompt([{
                    name: "projectName",
                    message: chalk.yellowBright('Project name'),
                },
                {
                    name: "default",
                    message: chalk.yellowBright('(babel, typescript, webpack)'),
                    default: chalk.green("default")
                },
                ])
                .then(answers => {
                    if (answers["default"]) {
                        spinner.start()
                        spinner.text = chalk.blue("Creating a Quickjs App")
                        setTimeout(() => {
                            spinner.text = chalk.blue("Cloning create-quick-app from github")
                        }, 2000)
                        setTimeout(() => {
                            spinner.stop()
                            shell.exec(`git clone https://github.com/Echodesk-Technology/Quick-app.git ${answers.projectName}`)
                        }, 5000);
                        setTimeout(() => {
                            spinner.stop()
                            console.log(chalk.greenBright('😀 Happy Coding'))
                        }, 6000)
                    }
                })
                .catch(error => {
                    if (error.isTtyError) {
                        console.log(error);
                    } else {
                        console.log(error);
                    }
                });
        })

    program
        .command("create <projectName>")
        .alias("c")
        .description("Create a new quickjs project")
        .action((projectName) => {
            spinner.start()
            spinner.text = chalk.blue("Creating a Quickjs App")
            setTimeout(() => {
                spinner.text = chalk.blue("Cloning create-quick-app from github")
            }, 2000)
            setTimeout(() => {
                spinner.stop()
                shell.exec(`git clone https://github.com/Echodesk-Technology/Quick-app.git ${projectName}`)
            }, 5000);
            setTimeout(() => {
                spinner.stop()
                console.log(chalk.greenBright('😀 Happy Coding'))
            }, 6000)
        });
    program
        .command("install")
        .alias("i")
        .description("Install Dependencies | must be in the project folder")
        .action(() => {
            console.log(chalk.blueBright('Installing Dependencies'));
            shell.exec("npm install")
        })
    program
        .command("serve")
        .alias("s")
        .description("Start development server | must be in the project folder")
        .action(() => {
            console.log(chalk.blueBright('Starting development server'));
            shell.exec("npm run serve")
        })
    program
        .command("develop")
        .alias("d")
        .description("Bundle your app with webpack | must be in the project folder")
        .action(() => {
            console.log(chalk.blueBright('Starting development bundle'));
            shell.exec("npm run develop")
        })

    program
        .command("build")
        .alias("b")
        .description("Build project to production | must be in the project folder")
        .action(() => {
            console.log(chalk.blueBright('Building project to production'));
            shell.exec("npm run build")
        })

    program.parse(process.argv)

}, 400)