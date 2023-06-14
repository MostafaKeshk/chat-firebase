import * as React from "react";
import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../contexts/AuthContext";
import useDarkMode from "../../contexts/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { Button, useTheme } from "@mui/material";
import useLoginContainer from "../../containers/useLoginContainer";

import paths from "../../routes/paths";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

type IProps = {
  drawerWidth: any;
  handleDrawerToggle?: any;
};
const AppBar: React.FC<IProps> = ({ drawerWidth, handleDrawerToggle }) => {
  const { user } = useAuth();
  const { darkMode, handleThemeChange } = useDarkMode();
  const { handleLogout } = useLoginContainer();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MUIAppBar
      position="fixed"
      sx={{
        background: theme.palette.background.paper,
        boxShadow: "none",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!!handleDrawerToggle ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: "primary.main" }} />
            </IconButton>
            <Box sx={{ display: { sm: "block" } }} />
          </>
        ) : (
          <Button color="primary" onClick={() => navigate(paths.home)}>
            Home
          </Button>
        )}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", mr: 1 }} color="primary">
            {user?.displayName}
          </Typography>
          <IconButton onClick={handleThemeChange}>
            {darkMode ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon sx={{ color: "primary.main" }} />
            )}
          </IconButton>

          {/* <img
                src={user?.image}
                alt={user?.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "40px",
                }}
              /> */}

          <IconButton onClick={() => navigate(paths.user)}>
            <SettingsIcon />
          </IconButton>
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </MUIAppBar>
  );
};

export default AppBar;
