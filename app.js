
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import {getAllRiddles, createRiddle, updateRiddle, deleteRiddle} from "./api/riddlesApi.js";

import {findPlayerByName, createPlayer, updatePlayer, getAllPlayers} from "./api/playersApi.js";

const rl = readline.createInterface({ input, output });

let running = true;

while (running) {

    console.log(`
=== Riddle Game Menu ===
1. Play the game
2. Create a new riddle
3. Read all riddles
4. Update an existing riddle
5. Delete a riddle
6. View leaderboard
0. Exit
`);

    const choice = (await rl.question("Choose an option: ")).trim();

    try {
        switch (choice) {

            case "1": {
                const name = (await rl.question("Enter your name: ")).trim();

                if (!name) {
                    console.log("Name is required.");
                    break;
                }

                let player = await findPlayerByName(name);

                if (!player) {
                    player = await createPlayer(name);
                }

                if (player.lowestTime !== null) {
                    console.log(`Your previous lowest time: ${player.lowestTime} seconds`);
                }
                const riddles = await getAllRiddles();

                if (!riddles.length) {
                    console.log("No riddles found.");
                    break;
                }
                const start = Date.now();

                for (const riddle of riddles) {
                    console.log(`\n${riddle.name}`);
                    console.log(riddle.taskDescription);

                    let answer = (await rl.question("Answer: ")).trim();

                    while (answer.toLowerCase() !== String(riddle.correctAnswer).trim().toLowerCase()) {
                        console.log("Wrong! Try again.");
                        answer = (await rl.question("Answer: ")).trim();
                    }

                    console.log("Correct!");
                }

                const time = Math.floor((Date.now() - start) / 1000);

                console.log(`\nYour time: ${time} seconds`);

                if (player.lowestTime === null || time < player.lowestTime) {
                    player.lowestTime = time;
                    await updatePlayer(player);
                    console.log("New record!");
                }
                break;
            }

            case "2": {
                const name = (await rl.question("Riddle name: ")).trim();
                const taskDescription = (await rl.question("Description: ")).trim();
                const correctAnswer = (await rl.question("Correct answer: ")).trim();

                if (!name || !taskDescription || !correctAnswer) {
                    console.log("All fields are required.");
                    break;
                }

                await createRiddle({ name, taskDescription, correctAnswer });
                console.log("Riddle created!");
                break;
            }

            case "3": {
                const riddles = await getAllRiddles();

                if (!riddles.length) {
                    console.log("No riddles found.");
                    break;
                }

                riddles.forEach(riddle => {
                    console.log(`ID: ${riddle.id}
                                 Name: ${riddle.name}
                                 Description: ${riddle.taskDescription}
                                 Answer: ${riddle.correctAnswer}`);
                });
                break;
            }

            case "4": {
                const riddles = await getAllRiddles();

                riddles.forEach(r => console.log(`${r.id}. ${r.name}`));

                const id = Number(await rl.question("Enter riddle ID: "));
                const riddle = riddles.find(r => r.id === id);

                if (!riddle) {
                    console.log("Riddle not found.");
                    break;
                }

                const name = (await rl.question("New name: ")).trim();
                const taskDescription = (await rl.question("New description: ")).trim();
                const correctAnswer = (await rl.question("New answer: ")).trim();

                await updateRiddle(id, {
                    name: name || riddle.name,
                    taskDescription: taskDescription || riddle.taskDescription,
                    correctAnswer: correctAnswer || riddle.correctAnswer
                });
                console.log("Riddle updated!");
                break;
            }

            case "5": {
                const riddles = await getAllRiddles();

                riddles.forEach(r => console.log(`${r.id}. ${r.name}`));

                const id = Number(await rl.question("Enter riddle ID: "));

                if (!riddles.some(r => r.id === id)) {
                    console.log("Riddle not found.");
                    break;
                }
                await deleteRiddle(id);
                console.log("Riddle deleted!");
                break;
            }

            case "6": {
                const players = await getAllPlayers();

                const leaderboard = players
                    .filter(p => p.lowestTime !== null)
                    .sort((a, b) => a.lowestTime - b.lowestTime);

                console.log("\n🏆 Leaderboard:");

                if (!leaderboard.length) {
                    console.log("No players yet.");
                    break;
                }

                leaderboard.forEach((p, i) =>
                    console.log(`${i + 1}. ${p.name} - ${p.lowestTime} seconds`)
                );
                break;
            }

            case "0":
                running = false;
                console.log("Goodbye!");
                break;

            default:
                console.log("Invalid choice.");
        }

    } catch (error) {
        console.log("Error:", error.message);
        console.log("Make sure the server is running.");
    }
}

rl.close();
