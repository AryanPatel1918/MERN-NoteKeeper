import Note from "../models/Note.js"

// Get all notes
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({error: error.message})
    }
}

// Get a note by id
export async function getNoteById(req, res) {
    try {
        const { id } = req.params
        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({message: "Note not found"})
        }
        res.json({note})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({error: error.message})
    }
}

// Create a note
export async function createNote(req, res) {
    try {
        const newNote = await Note.create(req.body)
        res.status(201).json({message: "Note created successfully", newNote})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({ error: error.message })
    }
}

// Update a note
export async function updateNote(req, res) {
    try {
        const { id } = req.params
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        )
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"})
        }
        res.json({message: "Note updated successfully", updatedNote})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({error: error.message})
    }
}

// Delete a note
export async function deleteNote(req, res) {
    try {
        const { id } = req.params
        const deletedNote = await Note.findByIdAndDelete(id)
        if (!deletedNote) {
            return res.status(404).json({message: "Note not found"})
        }
        res.json({message: "Note deleted successfully", deletedNote})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({error: error.message})
    }
}