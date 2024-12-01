export interface RecordDB {
	dateOfBurial: string;
	cemetery: string;
	firstName: string;
	middleName: string;
	lastName: string;
	birthDay: string;
	dateOfDeath: string;
	dateOfInterment: string;
	ORNumber: number;
	registrationNumber: string;
	age: number;
	street: string;
	barangay: string;
	district: string;
	zipCode: number;
	municipality: string;
	funeralService: string;
	causeOfDeath: string;
	placeOfDeath: string;
	cluster: string;
	wing: string;
	level: string;
	caretaker: string;
	sex: string;
	category: string;
	payment: string;
}

export async function readRecord(
	event_fetch: (
		input: RequestInfo | URL,
		init?: RequestInit,
	) => Promise<Response>,
): Promise<Array<RecordDB>> {
	const response = await event_fetch("/records.json", {
		method: "GET",
	});

	let records = await response.json();

	return records;
}

export function retrieveByCemetery(
	database: Array<RecordDB>,
	name: string,
): Array<RecordDB | undefined> {
	const fromCemetery = database
		.map((value) => {
			if (value.cemetery === name) {
				return value;
			}
		})
		.filter((value) => value !== undefined);

	return fromCemetery;
}

export function searchPerson(
	database: Array<RecordDB>,
	name: string,
): Array<RecordDB> {
	const searchTerms = name.toLowerCase().split(/\s+/);

	const filteredRecords = database.filter((record) => {
		const fullName =
			`${record.firstName} ${record.middleName} ${record.lastName}`
				.toLowerCase();
		return searchTerms.every((searchTerm) => fullName.includes(searchTerm));
	});

	return filteredRecords;
}

export function retrieveByAge(
	database: Array<RecordDB>,
	start: number,
	end: number,
): Array<RecordDB | undefined> {
	const fromAge = database
		.map((value) => {
			if (value.age >= start && value.age <= end) {
				return value;
			}
		})
		.filter((value) => value !== undefined);

	return fromAge;
}

export function retrieveByCluster(
	database: Array<RecordDB>,
	cluster: string,
): Array<RecordDB> {
	const formattedCluster = `${cluster[0]}-${
		cluster
			.split("")
			.filter((value) => {
				//@ts-ignore
				return !isNaN(value);
			})
			.join("")
			.trim()
	}`;

	const filteredResult = database.filter((value) => {
		if (value.cluster.toLowerCase() === formattedCluster.toLowerCase()) {
			return true;
		}
	});

	return filteredResult;
}

export function retrieveByAgeRange(
	database: Array<RecordDB>,
	from: number,
	to: number,
): Array<RecordDB | undefined> {
	const fromAgeRange = database
		.map((value) => {
			if (value.age >= to && value.age >= from) {
				return value;
			}
		})
		.filter((value) => value !== undefined);
	return fromAgeRange;
}

export function retrieveByGender(
	database: Array<RecordDB>,
	gender: string,
): Array<RecordDB | undefined> {
	console.log(gender);
	const fromGender = database
		.map((value) => {
			if (value.sex.toLowerCase() === gender.toLowerCase()) {
				return value;
			}
		})
		.filter((value) => value !== undefined);
	return fromGender;
}

export function retrieveByCategory(
	database: Array<RecordDB>,
	category: string,
): Array<RecordDB | undefined> {
	const fromCategory = database
		.map((value) => {
			if (value.category.toLowerCase() === category.toLowerCase()) {
				return value;
			}
		})
		.filter((value) => value !== undefined);
	return fromCategory;
}

export function retrieveByORNumber(
	database: Array<RecordDB>,
	ORNumber: number,
): Array<RecordDB | undefined> {
	const fromORNumber = database
		.map((value) => {
			if (value.ORNumber === ORNumber) {
				return value;
			}
		})
		.filter((value) => value !== undefined);

	return fromORNumber;
}
