#!/usr/bin/env node

import * as ncp from "ncp";
import * as program from "commander";
import {existsSync, mkdirSync} from "fs";

program
	.arguments('<type>')
	.arguments('<serverName>')
	.action(function(type,serverName) {
		startProcess(type,serverName)
	})
	.parse(process.argv);

function startProcess(type: string ,serverName: string)
{
	let dir: string = "./" + serverName;

	if (!existsSync(dir)){
		mkdirSync(dir);
	}

	copyFiles("",dir,type);
}

function copyFiles(from: string, to: string, type: string)
{
	console.log("jsgram will be created into the folder: " + to);

	let tplDir: string;

	if(type === 'ts') {
		tplDir = "typescript";
	} else {
		tplDir = "javascript";
	}

	console.log("in "+tplDir);

	from += "./node_modules/create-jsgram/src/tpl/" + tplDir + "/";

	//from += "../src/tpl/" + tplDir + "/";

	ncp(from,to,(err) => {
		if(err) {

		}

		console.log('');
		console.log('jsgram is ready');
		console.log('');
		console.log('Have fun');
	})
}