const fs = require('fs');
const path = require('path');

const findById = (id, notes) => {

    const result = notes.find(note => note.id === id);
    return result;

};

const newNote = (body, notesArray) => {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(_dirname, '../db/db,json'),
        JSON.stringify(notesArray)
    );
    return note;
};

const eraseNote = (id, notesArray) => {
    const note = findById(id, notesArray);
    if (note) {
        const index = notesArray.indexOf(note);
        notesArray.splice(index, 1);
        notesArray.forEach((note, index) => {
            note.id = index.toString();
        });
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(notesArray)
        );
        return true;
    }
    return false;
};

const validateNote = (note) => {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.title || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    findById,
    newNote,
    eraseNote,
    validateNote
}