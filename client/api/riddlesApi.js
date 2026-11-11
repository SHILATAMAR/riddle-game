const BASE_URL = "http://localhost:3000/api/riddles";

export async function getAllRiddles() {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error(`Could not get riddles (${res.status})`);
        return await res.json();
    } catch (error) {
        console.error("Get all riddles error:", error.message);
        throw error;
    }
}

export async function createRiddle(riddle) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(riddle)
        });
        if (!res.ok) throw new Error(`Could not create riddle (${res.status})`);
        return await res.json();
    } catch (error) {
        console.error("Create riddle error:", error.message);
        throw error;
    }
}

export async function updateRiddle(id, riddle) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...riddle, id: Number(id) })
        });
        if (!res.ok) throw new Error(`Could not update riddle (${res.status})`);
        return await res.json();
    } catch (error) {
        console.error("Update riddle error:", error.message);
        throw error;
    }
}

export async function deleteRiddle(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error(`Could not delete riddle (${res.status})`);

        return true;
    } catch (error) {
        console.error("Delete riddle error:", error.message);
        throw error;
    }
}