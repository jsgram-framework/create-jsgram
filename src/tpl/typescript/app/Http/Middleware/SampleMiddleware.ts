export class SampleMiddleware
{
	public process(req, res, next)
	{
		res.write("Before middleware");

		next();

		res.end("After middleware");
	}
}