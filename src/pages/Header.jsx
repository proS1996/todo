import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const Header = ({ isAdding, onSave, onDelete }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        marginLeft: 240,
        width: `calc(100% - 240px)`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TODO
        </Typography>
        {isAdding && (
          <>
            <IconButton color="inherit" onClick={onSave}>
              <SaveIcon />
            </IconButton>
            <IconButton color="inherit" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
