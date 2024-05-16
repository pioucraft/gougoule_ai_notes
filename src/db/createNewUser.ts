import { drizzle } from "drizzle-orm/postgres-js";
import { user } from "./schema"
import postgres from "postgres";

const sql = postgres(
	`postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
	{ max: 1 }
);
const db = drizzle(sql);

let email = prompt("Enter email : ")
let username = prompt("Enter username : ")
let password = prompt("Enter password : ")

var rand = function() {
    return Math.random().toString(36); // remove `0.`
};

var token = function() {
    return rand() + rand() + rand() + rand(); // to make it longer
};

await db.insert(user).values({
    "email": email ?? "email",
    "name": (username ?? "username"),
    "password": await Bun.password.hash(password ?? "password"),
    "token": token()
})

process.exit(0)

