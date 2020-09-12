import {SampleModel} from "../../Model/SampleModel";

export class GreetingsController
{
	constructor(private model: SampleModel)
	{

	}

	public index(req,res)
	{
		res.end("Hello World");
	}

	public controllerWithMiddleware(req,res)
	{
		//don't end the response here when you want to write after the controller into the response!
		res.write("Controller");
	}

	public controllerWithGroup1(req,res)
	{
		res.write("Controller Group 1");
	}

	public controllerWithGroup2(req,res)
	{
		res.write("Controller Group 2");
	}

	public modelWithDi(req,res, id: number)
	{
		let item = this.model.getItem(id);

		if(item === undefined) {
			res.end("No item found with this id: " + id);
		}

		let output: string = "Name: " + item[0] + " Age: " + item[1] + " Country: " + item[2];

		res.end(output);
	}
}