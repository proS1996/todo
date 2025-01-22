import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Notes from "./Notes";

import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from "../services/rtk-query/todoApi";

const Dashboard = () => {
  const { data: notes = [], refetch } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [viewAll, setViewAll] = useState(true);

  const handleAddNote = () => {
    setIsAdding(true);
    setActiveNoteIndex(null);
    setViewAll(false);
    setCurrentNote({ title: "", content: "" });
  };

  const handleSaveNote = async () => {
    if (currentNote.title.trim() || currentNote.content.trim()) {
      try {
        if (activeNoteIndex !== null) {
          const noteToUpdate = notes[activeNoteIndex];
          await updateTodo({
            id: noteToUpdate._id,
            title: currentNote.title,
            content: currentNote.content
          }).unwrap();
        } else {
          await createTodo({
            title: currentNote.title,
            content: currentNote.content
          }).unwrap();
        }
        refetch();
      } catch (error) {
        console.error("Error saving note:", error);
      }
    }
    setIsAdding(false);
  };

  const handleDeleteNote = async (id) => {
    let noteToDelete = id;
    if (activeNoteIndex !== null) {
      noteToDelete = notes[activeNoteIndex]._id;
    }
    try {
      await deleteTodo(noteToDelete).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    handleViewAll();
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
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: 3
        }}
      >
        <Notes
          viewAll={viewAll}
          notes={notes}
          isAdding={isAdding}
          currentNote={currentNote}
          onTitleChange={(title) =>
            setCurrentNote((prev) => ({ ...prev, title }))
          }
          onContentChange={(content) =>
            setCurrentNote((prev) => ({ ...prev, content }))
          }
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
