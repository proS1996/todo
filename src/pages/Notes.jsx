import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../services/rtk-query/authApi";
import { useNavigate } from "react-router-dom";

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
  const navigate=useNavigate()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
     const response= await logout().unwrap();
      if(response){
        navigate("/login")
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout");
    }
  };

  return (
    <Box sx={{ padding: 2, flexGrow: 1 }}>
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <Tooltip title="Logout">
          <IconButton
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{color:"primary.main"}}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>

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
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {notes.map((note, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    position: "relative",
                    padding: 2,
                    width: "300px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
                >
                  {/* Delete Icon */}
                  <IconButton
                    color="error"
                    onClick={() => onDelete(note._id)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  {/* Note Title and Content */}
                  <Typography variant="h6" gutterBottom>
                    {note.title || `Note ${index + 1}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {note.content || "No content available"}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" gutterBottom>
                {currentNote.title}
              </Typography>
              <Typography variant="body1">{currentNote.content}</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Notes;
