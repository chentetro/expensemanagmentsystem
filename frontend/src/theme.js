/**
 * Config: MUI theme (palette, typography).
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1e73be' },
    secondary: { main: '#9c27b0' },
    background: {
      default: '#f3f4f6',
      paper: '#f3f4f6',
    },
    text: {
      primary: '#222222',
      secondary: '#666666',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
});

export default theme;
