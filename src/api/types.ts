export interface StreetType {
	id: number;
	prefix: StreetPrefix;
	name: string;
	cityId: number;
	city: string;
	nameWithPrefix: string;
}
export interface StreetPrefix {
	id: number;
	name: string;
	shortName: string;
}
export interface HouseType {
	id: number;
	name: string;
}

export interface FlatType {
	clients: ClientType[];
	accounts: Accounts[];
	addressId: number;
	streetId: number;
	houseId: number;
	streetName: string;
	building: string;
	flat: string;
}
export interface AccountsType {
	id: number;
	name: string;
}
export interface Accounts {
	bindId: number;
	account: string;
	type: AccountsType;
}
export interface ClientType {
	id: number;
	name: string;
	phone: string;
	email: string;
	bindId: number;
}
export interface AddClientRequest {
	name: string;
	phone: string;
	email: string;
}