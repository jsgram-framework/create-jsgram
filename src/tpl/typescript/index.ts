import {Routes} from "./routes";

import jsgram from "jsgram";
//import {config} from "dotenv";

//define options if necessary

/*
const options = {
	x_powered_by_header: false
};
*/

//load env
//config();

//init app
const app = jsgram();

//define all routes here
let routes: Routes = new Routes(app);

routes.init();


//start the server

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port,hostname);