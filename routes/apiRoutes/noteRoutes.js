const router = require('express').Router();
const { findById, newNote, eraseNote, validateNote } = require('../../lib/notes');
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    }
    res.send(404);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.send(400).send('Invalid note');
    } else {
        const note = newNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const result = eraseNote(req.params.id, notes);
    if (!result) {
        res.send(404).send('Note not found');
    }
    res.sendStatus(204);
});

module.exports = router;