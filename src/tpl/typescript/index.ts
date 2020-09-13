import {Routes} from "./routes/index";
import {dispatcher, router} from "gram-route";
import {config} from "dotenv";

//init the collector
let r = router();

//define all routes here
let routes: Routes = new Routes();

routes.init();

//get the dispatcher

let d = dispatcher();

//load env
config();

//start the server

var http = require('http');

const server = http.createServer(function (req, res) {
	//result contains the status (e.g. 200 or 404), the route id and the parameters
	// [status,route id,parameter]
	const result = d.dispatch(req.method,req.url);

	if(result[0] === 200) {
		//found
		let route = r.getRoute(result[1]);

		let callback = route.handler;	//handler is in the case a callback

		let middleware = route.getMiddleware();	//retuns all middleware to this route (group and route middleware) as an array

		callback(req,res, ... Array.from(result[2].values()));
	} else {
		//not found, 404
	}

	res.end();
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});