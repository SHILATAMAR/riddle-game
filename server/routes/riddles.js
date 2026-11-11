
import { Router } from "express";
import { readDB, writeDB } from "../db/dbHelpers.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const db = await readDB();
        res.json(db.riddles);
    } catch (error) {
        res.status(500).json({ error: "Failed to read riddles" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const db = await readDB();

        const riddle = db.riddles.find(
            r => String(r.id) === req.params.id
        );

        if (!riddle) {
            return res.status(404).json({ error: "Riddle not found" });
        }

        res.json(riddle);
    } catch (error) {
        res.status(500).json({ error: "Failed to read riddle" });
    }
});

router.post("/", async (req, res) => {
    try {
        const db = await readDB();
        const { name, taskDescription, correctAnswer } = req.body;

        if (
            !name?.trim() ||
            !taskDescription?.trim() ||
            !correctAnswer?.trim()
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        const newId = Math.max(0, ...db.riddles.map(r => Number(r.id) || 0)) + 1;

        const newRiddle = {
            ...req.body,
            id: newId
        };

        db.riddles.push(newRiddle);

        await writeDB(db);

        res.status(201).json(newRiddle);
    } catch (error) {
        res.status(500).json({ error: "Failed to add riddle" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const db = await readDB();

        const index = db.riddles.findIndex(
            r => String(r.id) === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({ error: "Riddle not found" });
        }

        db.riddles[index] = {
            ...db.riddles[index],
            ...req.body,
            id: db.riddles[index].id
        };

        await writeDB(db);

        res.json(db.riddles[index]);
    } catch (error) {
        res.status(500).json({ error: "Failed to update riddle" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const db = await readDB();

        const index = db.riddles.findIndex(
            r => String(r.id) === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({ error: "Riddle not found" });
        }

        const deletedRiddle = db.riddles.splice(index, 1)[0];

        await writeDB(db);

        res.json(deletedRiddle);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete riddle" });
    }
});

export default router;

