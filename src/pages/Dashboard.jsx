import { useState, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Notes from "./Notes";

import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from "../services/rtk-query/todoApi";

const initialNoteState = { title: "", content: "" };

const Dashboard = () => {
  const { data: notes = [], refetch } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [currentNote, setCurrentNote] = useState(initialNoteState);
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [viewAll, setViewAll] = useState(true);

  // Memoized handlers to prevent unnecessary re-renders
  const handleAddNote = useCallback(() => {
    setIsAdding(true);
    setActiveNoteIndex(null);
    setViewAll(false);
    setCurrentNote(initialNoteState);
  }, []);

  const handleSaveNote = useCallback(async () => {
    const { title, content } = currentNote;
    if (!title.trim() && !content.trim()) return;

    try {
      if (activeNoteIndex !== null) {
        const { _id: id } = notes[activeNoteIndex];
        await updateTodo({ id, title, content }).unwrap();
      } else {
        await createTodo({ title, content }).unwrap();
      }
      refetch();
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }, [activeNoteIndex, currentNote, createTodo, updateTodo, notes, refetch]);

  const handleDeleteNote = useCallback(async (id) => {
    try {
      const noteId = id ?? notes[activeNoteIndex]?._id;
      if (!noteId) return;
      
      await deleteTodo(noteId).unwrap();
      refetch();
      handleViewAll();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }, [deleteTodo, notes, activeNoteIndex, refetch]);

  const handleViewAll = useCallback(() => {
    setViewAll(true);
    setIsAdding(false);
    setActiveNoteIndex(null);
  }, []);

  const handleSelectNote = useCallback((index) => {
    setActiveNoteIndex(index);
    setCurrentNote(notes[index]);
    setIsAdding(true);
    setViewAll(false);
  }, [notes]);

  const handleNoteChange = useCallback((field) => (value) => {
    setCurrentNote(prev => ({ ...prev, [field]: value }));
  }, []);

  // Memoize the layout style to prevent unnecessary recalculations
  const layoutStyle = useMemo(() => ({
    display: "flex",
    height: `calc(100% - 16px)`
  }), []);

  const contentStyle = useMemo(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: 3
  }), []);

  return (
    <Box sx={layoutStyle}>
      <Sidebar
        notes={notes}
        onAddNote={handleAddNote}
        onViewAll={handleViewAll}
        onSelectNote={handleSelectNote}
      />
      <Box sx={contentStyle}>
        <Notes
          viewAll={viewAll}
          notes={notes}
          isAdding={isAdding}
          currentNote={currentNote}
          onTitleChange={handleNoteChange('title')}
          onContentChange={handleNoteChange('content')}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
