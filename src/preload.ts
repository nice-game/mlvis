import { promisify } from "util";
import * as fs from "fs";

const windowAny = window as any;

// windowAny.readPassivesData = () =>
// 	readFile("data/passives-data.json", "utf8").pipe(
// 		map(x => JSON.parse(x)),
// 		shareReplay()
// 	);
//
// function readFile(
// 	path: string | number | Buffer | URL,
// 	options: string | { encoding: string; flag?: string },
// ): Observable<string> {
// 	return from(promisify(fs.readFile)(path, options));
// }
