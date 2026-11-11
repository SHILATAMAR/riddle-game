import { Router } from "express";
import { readDB, writeDB } from "../db/dbHelpers.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const db = await readDB();

        const name = req.query.name;

        if (name) {
            const players = db.players.filter(
                player => player.name.toLowerCase() === name.toLowerCase()
            );

            return res.json(players);
        }

        res.json(db.players);

    } catch (error) {
        res.status(500).json({ error: "Failed to read players" });
    }
});

router.post("/", async (req, res) => {
    try {
        const db = await readDB();

        const { name, lowestTime } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                error: "Player name is required"
            });
        }

        const newId = Math.max(
            0,
            ...db.players.map(player => Number(player.id) || 0)
        ) + 1;

        const newPlayer = {
            name,
            lowestTime: lowestTime ?? null,
            id: newId
        };

        db.players.push(newPlayer);

        await writeDB(db);

        res.status(201).json(newPlayer);

    } catch (error) {
        res.status(500).json({ error: "Failed to create player" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const db = await readDB();

        const index = db.players.findIndex(
            player => String(player.id) === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({
                error: "Player not found"
            });
        }

        const newTime = req.body.lowestTime;

        if (
            typeof newTime !== "number" ||
            !Number.isFinite(newTime) ||
            newTime <= 0
        ) {
            return res.status(400).json({
                error: "Invalid time"
            });
        }

        const player = db.players[index];

        const isNewRecord =
            player.lowestTime === null ||
            newTime < player.lowestTime;

        if (isNewRecord) {
            player.lowestTime = newTime;
            await writeDB(db);
        }

        res.json({
            player,
            isNewRecord
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to update player"
        });
    }
});

export default router;
