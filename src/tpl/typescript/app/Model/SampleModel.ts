export type SampleModelItem = [string,number,string];
export type SampleModelItems = Map<number,SampleModelItem>;

export class SampleModel
{
	private items: SampleModelItems;

	constructor()
	{
		this.items = new Map();

		this.items.set(1,["John Doe",24,"USA"]);
		this.items.set(2,["Jane Doe",20,"USA"]);
		this.items.set(3,["Max Mustermann",32,"Germany"]);
	}

	public getItem(id:number)
	{
		return this.items.get(id);
	}
}