import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

export function createPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: "#151717",
      paper: "rgba(48, 48, 48, 1)",
      darker: "#252525",
    },
    divider: "rgba(220, 220, 220, 0.5)",
    error,
    info,
    mode: "light",
    neutral,
    primary: indigo,
    success,
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      neutral,
    },
    warning,
  };
}
