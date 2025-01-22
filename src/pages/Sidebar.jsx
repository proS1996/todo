import { Box, Button, Drawer, Divider } from "@mui/material";

const Sidebar = ({ notes, onAddNote, onViewAll, onSelectNote }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#333"
        }
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        {/* View All Notes Button at the top */}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onViewAll}
          sx={{
            mb: 2,
            backgroundColor: "#444", // Lighter grey, similar to sidebar
            color: "white",
            "&:hover": { backgroundColor: "#616161" }
          }}
        >
          View All Notes
        </Button>

        {/* Add Note Button */}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onAddNote}
          sx={{
            mb: 2,
            backgroundColor: "#444", // Lighter grey, similar to sidebar
            color: "white",
            "&:hover": { backgroundColor: "#616161" }
          }}
        >
          Add Note +
        </Button>

        {/* Divider */}
        <Divider sx={{ backgroundColor: "#616161", mb: 2 }} />

        {/* Saved Notes */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {notes?.map((note, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                backgroundColor: "#555", // Darker grey for the chip background
                color: "white",
                "&:hover": {
                  backgroundColor: "#666"
                }
              }}
              onClick={() => onSelectNote(index)}
            >
              {note.title || `Note ${index + 1}`}
            </Button>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
