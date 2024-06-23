import { createTheme, alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		blue500: Palette["primary"];
	}

	interface PaletteOptions {
		blue500?: PaletteOptions["primary"];
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		blue500: true;
	}
}

const blue500Base = "#3B82F6";
const blue500Main = alpha(blue500Base, 0.7);

const theme = createTheme({
	palette: {
		blue500: {
			main: "#ffff",
			light: alpha("#ffff", 0.5),
			dark: alpha("#ffff", 0.9),
			contrastText: blue500Main,
		},
	},
	typography: {
		button: {
			fontSize: 15,
			fontWeight: "bold",
		},
	},
});

export default theme;
