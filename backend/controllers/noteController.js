export async function getAllNotes(req, res) {
    res.send("Homepage")
}

export async function createNote(req, res) {
    res.status(201).json({message: "Note created successfully"})
}

export async function updateNote(req, res) {
    res.json({message: "Note updated successfully"})
}

export async function deleteNote(req, res) {
    res.json({message: "Note deleted successfully"})
}

