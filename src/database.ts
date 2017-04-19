import Dexie from '../node_modules/dexie/dist/dexie';

export class TransactionAppDB extends Dexie {

	transactions : Dexie.Table<ITransaction,number>;

	constructor(){
		super("MoneyMapAppDB");

		this.version(1).stores({

			transactions: "++id,amount,lat,lng,title,imageUrl"
		});
		this.transactions.mapToClass(Transaction);
		
	}
}

export interface ICategory{

}

export interface ITransaction{
	id?: number;
	amount: number;
	lat: number; //latitude
	lng: number; // longitude
	title: string;
	imageUrl: string;
}

export class Transaction implements ITransaction {

	id?: number;
	amount: number;
	lat: number; //latitude
	lng: number; // longitude
	title: string;
	imageUrl: string;
	
	constructor(amount:number, title:string, lat?:number, lng?:number, id?:number,imageUrl?:string) {

		this.amount = amount;
		this.title = title;

		if(lat) this.lat = lat;
		if(lng) this.lng = lng;
		if(imageUrl) this.imageUrl = imageUrl;
		if(id) this.id = id;
		// code...
	}

	save(){
		return db.transactions.add(this);
	}

	static all(){
		return db.transactions.orderBy("id").reverse().toArray();
	}

}

export let db = new TransactionAppDB();