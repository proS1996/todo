import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Notes from "./Notes";

const Dashboard = () => {
  const [notes, setNotes] = useState([]); // Store notes
  const [isAdding, setIsAdding] = useState(false); // Toggle note input
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" }); // Current note object
  const [activeNoteIndex, setActiveNoteIndex] = useState(null); // Index of the selected note
  const [viewAll, setViewAll] = useState(false); // Toggle to view all notes

  const handleAddNote = () => {
    setIsAdding(true);
    setActiveNoteIndex(null);
    setViewAll(false);
    setCurrentNote({ title: "", content: "" });
  };

  const handleSaveNote = () => {
    if (currentNote.title.trim() || currentNote.content.trim()) {
      if (activeNoteIndex !== null) {
        // Update existing note
        const updatedNotes = [...notes];
        updatedNotes[activeNoteIndex] = currentNote;
        setNotes(updatedNotes);
      } else {
        // Add new note
        setNotes([...notes, currentNote]);
      }
      setCurrentNote({ title: "", content: "" });
    }
    setIsAdding(false);
  };

  const handleDeleteNote = () => {
    if (activeNoteIndex !== null) {
      const updatedNotes = notes.filter((_, index) => index !== activeNoteIndex);
      setNotes(updatedNotes);
      setCurrentNote({ title: "", content: "" });
      setActiveNoteIndex(null);
      setIsAdding(false);
    }
  };

  const handleViewAll = () => {
    setViewAll(true);
    setIsAdding(false);
    setActiveNoteIndex(null);
  };

  const handleSelectNote = (index) => {
    setActiveNoteIndex(index);
    setCurrentNote(notes[index]);
    setIsAdding(true);
    setViewAll(false);
  };

  return (
    <Box sx={{ display: "flex", height: `calc(100% - 16px)` }}>
      <Sidebar
        notes={notes}
        onAddNote={handleAddNote}
        onViewAll={handleViewAll}
        onSelectNote={handleSelectNote}
      />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", padding: 3 }}>
        <Notes
          viewAll={viewAll}
          notes={notes}
          isAdding={isAdding}
          currentNote={currentNote}
          onTitleChange={(title) =>
            setCurrentNote((prev) => ({ ...prev, title }))
          }
          onContentChange={(content) =>{
            setCurrentNote((prev) => ({ ...prev, content }))
          }}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
