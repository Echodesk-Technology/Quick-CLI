#!/usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const program = require("commander");
const figlet = require("figlet");
const { alias } = require('commander');
if (!shell.which('git')) {
    shell.echo('Sorry, this create-quick-app requires git');
    shell.exit(1);
}
console.log(chalk.blue('Quick CLI 1.8.0'));


figlet('QUICK JS!!', function (err, data) {
    if (err) {
        console.log(chalk.yellowBright('Something went wrong...'));
        console.dir(err);
        return;
    }
    console.log(data)
});



setTimeout(() => {
    program.version("1.8.0");

    program
    .command("start")
    .description("Create a new quickjs project | projectName prompted")
    .action(() => {
    inquirer
        .prompt([
            {
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
                console.log(chalk.blue("Creating Quick App"))
                setTimeout(() => {
                    console.log(chalk.blue("Initializing Repo"))
                }, 1000)
                setTimeout(() => {
                    shell.exec(`git clone https://github.com/Echodesk-Technology/Quick-app.git ${answers.projectName}`)
                    console.log(chalk.blueBright('New plugins coming soon'));
                    console.log(chalk.blueBright('😀 Happy Coding'));
                }, 1400)
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
            console.log(chalk.blue("Creating a Quickjs App"))
                setTimeout(() => {
                    console.log(chalk.blue("Initializing Repo"))
                }, 1000)
                setTimeout(() => {
                    
                    shell.exec(`git clone https://github.com/Echodesk-Technology/Quick-app.git ${projectName}`)
                    shell.cd(projectName)
                    console.log(chalk.blueBright('New plugins coming soon'));
                    console.log(chalk.blueBright('😀 Happy Coding'));
                }, 1400)
        });
    program
        .command("install")
         .alias("i")
        .description("Install Dependecies | must be in the project folder")
        .action(() => {
            console.log(chalk.blueBright('Installing dependencies'));
            shell.exec("npm run install")
        })
    program
        .command("serve")
        .alias("s")
        .description("Starting development server | must be in the project folder")
        .action(() => {
            shell.exec("npm run serve")
        })
    program
        .command("build")
        .alias("b")
        .description("Building project to production | must be in the project folder")
        .action(() => {
            console.log(chalk.blueBright('Building project to production'));
            shell.exec("npm run build")
        })

     program.parse(process.argv)

}, 400)