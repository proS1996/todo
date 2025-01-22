import { TextField, IconButton, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const Notes = ({
  viewAll,
  notes,
  isAdding,
  currentNote,
  onTitleChange,
  onContentChange,
  onSave,
  onDelete,
}) => {
  return (
    <Box sx={{ padding: 2, flexGrow: 1 }}>
      {isAdding ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <TextField
              label="Title"
              variant="outlined"
              value={currentNote.title}
              onChange={(e) => onTitleChange(e.target.value)}
              fullWidth
              sx={{
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <IconButton onClick={onDelete} color="error">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={onSave} color="primary">
                <SaveIcon />
              </IconButton>
            </Box>
          </Box>
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={6}
            value={currentNote.content}
            onChange={(e) => onContentChange(e.target.value)}
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
          />
        </Box>
      ) : (
        <Box>
          {viewAll ? (
            <ul>
              {notes.map((note, index) => (
                <li key={index}>
                  <span>{note.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <h3>{currentNote.title}</h3>
              <p>{currentNote.content}</p>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Notes;
