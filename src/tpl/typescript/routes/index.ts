import {GreetingsController} from "../app/Http/Controller/GreetingsController";
import {SampleMiddleware} from "../app/Http/Middleware/SampleMiddleware";
import {SampleModel} from "../app/Model/SampleModel";
import {App} from "jsgram";

export class Routes
{
	constructor(private app: App) {}

	public init()
	{
		this.initGreetingsRoutes();
		//you can create more functions and invoke them here
		//if you don't need some routes anymore you can just delete this line
	}

	protected initGreetingsRoutes()
	{
		const greetingsC: GreetingsController = new GreetingsController(new SampleModel());
		const greetingsMw: SampleMiddleware = new SampleMiddleware();

		this.app.get("/",greetingsC.index.bind(greetingsC)); //bind the object so you can use this inside the controller functions

		//adding middleware
		this.app.get("/middleware",greetingsC.controllerWithMiddleware.bind(greetingsC))
			.add(greetingsMw.process.bind(greetingsMw));

		//group
		//call /group/controller1 or group/controller2
		this.app.group("/group",() => {
			this.app.get("/controller1",greetingsC.controllerWithGroup1.bind(greetingsC));

			this.app.get("/controller2",greetingsC.controllerWithGroup2.bind(greetingsC));
		})
			.add(greetingsMw.process.bind(greetingsMw));

		//dynamic route
		this.app.get("/item/:id",greetingsC.modelWithDi.bind(greetingsC));
	}
}