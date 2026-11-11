import { readFile, writeFile } from "fs/promises";
const dbPath = new URL("./db.json", import.meta.url);

export async function readDB() {
    const data = await readFile(dbPath, "utf-8");
    return JSON.parse(data);
}

export async function writeDB(data) {
    await writeFile(
        dbPath,
        JSON.stringify(data),
        "utf-8"
    );
}