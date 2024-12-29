import React from "react";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movie Finder
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, py: 4 }}>{children}</Container>

      <Box
        component="footer"
        sx={{ py: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Movie Finder. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
