#!/usr/bin/env node

import * as ncp from "ncp";
import * as program from "commander";
import {existsSync, mkdirSync, readFileSync, renameSync, writeFileSync} from "fs";
import {execSync} from "child_process";
import * as chalk from "chalk";

export type TplObject = {
	dependencies: object;
	devDependencies: object;
	main: string;
	scripts: object
};

program
	.arguments('<serverName> [type] [devInstall]')
	.action(function(serverName,type,devInstall) {
		startProcess(serverName,type,devInstall)
	})
	.parse(process.argv);

function startProcess(serverName: string, type: string = "", devInstall = "false")
{
	let dir: string = "./" + serverName;

	if (!existsSync(dir)){
		mkdirSync(dir);
	}

	copyFiles("",dir,type,devInstall);
}

function copyFiles(from: string, to: string, type: string = "",devInstall = "false")
{
	const typescriptTpls: TplObject = {
		dependencies: {
			"gram-route": "^1.1.0",
			"mysql2": "^2.1.0",
			"dotenv": "^8.2.0"
		},
		devDependencies: {
			"@types/node": "^14.6.0",
			"ts-node": "^8.10.2",
			"typescript": "^4.0.2",
			"nodemon": "^2.0.4",
		},
		main: "dist/index.js",
		scripts: {
			build: "tsc -p .",
			start: "node dist/index.js",
			dev: "nodemon --exec \"npm start\""
		}
	};

	console.log(chalk.yellow("copy files"));
	console.log("");

	let tplDir: string;
	let tpl: TplObject;

	switch (type) {
		case "ts":
		case "":
			tplDir = "typescript";
			tpl = typescriptTpls;
			break;
		case "js":
			tplDir = "javascript";
			break;
		default:
			throw new Error(chalk.red("unknown type"));
	}

	console.log("in "+tplDir);

	//from += "./node_modules/create-jsgram/src/tpl/" + tplDir + "/";

	from += "../src/tpl/" + tplDir + "/";

	ncp(from,to,(err) => {
		if(err) {

		}

		console.log(chalk.green("jsgram is created into the folder: " + to));
		console.log("");

		init(to,tpl,devInstall);
	})
}

function init(dir: string, tpl: TplObject, devInstall = "false")
{
	console.log(chalk.yellow("starting initialisation"));
	console.log("");

	process.chdir(dir);

	//create gitignore
	renameSync("__gitignore",".gitignore");

	//init package and npm project
	execSync("npm init -y");

	//create dependencies
	console.log(chalk.yellow("reading dependencies"));

	let data = readFileSync("package.json");

	let pkg = JSON.parse(data.toString());

	pkg.main = tpl.main;
	pkg.scripts = Object.assign(pkg.scripts || {}, tpl.scripts);
	pkg.dependencies = Object.assign(pkg.dependencies || {}, tpl.dependencies);
	pkg.devDependencies = Object.assign(pkg.devDependencies || {}, tpl.devDependencies);

	console.log(chalk.yellow("saving dependencies"));

	writeFileSync("package.json",JSON.stringify(pkg,null,2));

	if(devInstall !== "false") {
		console.log(chalk.yellow("install dependencies"));

		execSync("npm install");
	}

	console.log("");
	console.log(chalk.green("jsgram is successfully created. Have fun :)"));
}