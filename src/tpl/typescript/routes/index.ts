import {GreetingsController} from "../app/Http/Controller/GreetingsController";
import {SampleMiddleware} from "../app/Http/Middleware/SampleMiddleware";
import {SampleModel} from "../app/Model/SampleModel";
import RouteCollectorInterface from "gram-route/dist/src/Interfaces/RouteCollectorInterface";
import {router} from "gram-route";

export class Routes
{
	private router: RouteCollectorInterface;

	constructor()
	{
		this.router = router();
	}

	public init()
	{
		this.initGreetingsRoutes();
	}

	protected initGreetingsRoutes()
	{
		const greetingsC: GreetingsController = new GreetingsController(new SampleModel());
		const greetingsMw: SampleMiddleware = new SampleMiddleware();

		this.router.get("/",greetingsC.index.bind(greetingsC)); //bind the object so you can use this inside the controller functions

		//adding middleware
		this.router.get("/middleware",greetingsC.controllerWithMiddleware.bind(greetingsC))
			.add(greetingsMw.process.bind(greetingsMw));

		//group
		//call /group/controller1 or group/controller2
		this.router.group("/group",() => {
			this.router.get("/controller1",greetingsC.controllerWithGroup1.bind(greetingsC));

			this.router.get("/controller2",greetingsC.controllerWithGroup2.bind(greetingsC));
		})
			.add(greetingsMw.process.bind(greetingsMw));

		//dynamic route
		this.router.get("/item/:id",greetingsC.modelWithDi.bind(greetingsC));
	}
}