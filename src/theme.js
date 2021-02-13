import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "3b8ad9",
      main: "#2196f3",
      dark: "#003366",
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        background: "#fff",
      },
    },
    MuiFormControl: {
      root: { marginTop: "8px", marginBottom: "8px" },
      marginNormal: {
        marginTop: "8px",
        marginBottom: "8px",
      },
    },
    MuiTypography: {
      h1: {
        fontSize: "24px",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "22px",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "20px",
        fontWeight: "bold",
      },
      h4: {
        fontSize: "18px",
        fontWeight: "bold",
      },
      h5: {
        fontSize: "16px",
        fontWeight: "bold",
      },
      h6: {
        fontSize: "14px",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.07)",
      },
    },
  },
});
