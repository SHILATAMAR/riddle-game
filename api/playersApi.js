const BASE_URL = "http://localhost:3000/players";

export async function findPlayerByName(name) {
    try {
        const url = `${BASE_URL}?name=${encodeURIComponent(name)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Could not find player (${res.status})`);
        const players = await res.json();
        return players[0];
    } catch (error) {
        console.error("Find player error:", error.message);
        throw error;
    }
}

export async function createPlayer(name) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, lowestTime: null })
        });
        if (!res.ok) throw new Error(`Could not create player (${res.status})`);
        return await res.json();
    } catch (error) {
        console.error("Create player error:", error.message);
        throw error;
    }
}

export async function updatePlayer(player) {
    try {
        const res = await fetch(`${BASE_URL}/${player.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player)
        });
        if (!res.ok) throw new Error(`Could not update player (${res.status})`);
        return await res.json();
    } catch (error) {
        console.error("Update player error:", error.message);
        throw error;
    }
}

export async function getAllPlayers() {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error(`Could not get players (${res.status})`);
        return await res.json();
    } catch (error) {
        console.error("Get all players error:", error.message);
        throw error;
    }
}