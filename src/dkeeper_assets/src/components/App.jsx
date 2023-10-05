// "use client"
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { v4 as uuidv4 } from "uuid";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    const newId = uuidv4();

    setNotes((prev) => {
      dkeeper.createNote(newId, newNote.title, newNote.content);
      return [
        { id: newId, title: newNote.title, content: newNote.content },
        ...prev,
      ];
    });
  }

  useEffect(() => {
    console.log("useEffect triggered")
    fetchData()
  }, [])

  async function fetchData() {
    const notesArray = await dkeeper.readNotes()
    setNotes(notesArray)
  }

  function deleteNote(idForDeletion) {
    dkeeper.removeNote(idForDeletion);
    setNotes((prev) => {
      return prev.filter((note) => note.id !== idForDeletion)
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
