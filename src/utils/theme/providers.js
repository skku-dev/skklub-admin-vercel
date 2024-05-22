"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@/utils/theme";
import { CssBaseline } from "@mui/material";

const Providers = ({ children }) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
