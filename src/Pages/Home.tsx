import { useEffect, useState } from "react";
import { Dashboard, NewAnalysisModal } from "../Components";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { RecordType } from "../Types/RecordType";
import { createTheme, alpha, ThemeProvider } from "@mui/material/styles";
import { GetProjectsCallout } from "../Utils/Callouts";
import { createRow } from "../Utils/Utils";

// Augment the palette to include a violet color
declare module "@mui/material/styles" {
	interface Palette {
		blue500: Palette["primary"];
	}

	interface PaletteOptions {
		blue500?: PaletteOptions["primary"];
	}
}

// Update the Button's color options to include a violet option
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

function Home() {
	const [rows, setRows] = useState<RecordType[] | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [, setIsLoading] = useState<boolean>(false);
	const handleAddNewClick = () => {
		setOpenModal(true);
	};

	useEffect(() => {
		GetProjectsCallout()
			.then((result) => {
				let data = result.data.map((project: any) => {
					return createRow(project.name, false);
				});
				setRows(data);
			})
			.catch((error) => {
				console.log(error);
				setRows([]);
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Button
				className="w-40 h-12"
				sx={{ marginTop: "1rem", marginBottom: "1rem" }}
				variant="contained"
				color="blue500"
				startIcon={<AddOutlinedIcon />}
				onClick={handleAddNewClick}
			>
				Add New
			</Button>
			<NewAnalysisModal
				open={openModal}
				rows={rows}
				setOpen={setOpenModal}
				setRows={setRows}
				setIsLoading={setIsLoading}
			/>
			<Dashboard
				className="w-5/6 h-1/2 flex flex-col items-center overflow-auto"
				rows={rows}
				setRows={setRows}
				setIsLoading={setIsLoading}
			/>
			<footer className="fixed bottom-4 w-full h-20 flex flex-col items-center">
				<hr className="w-[90%]" />
				<br />
				<p className="ps-4 pe-4 font-normal opacity-60 text-sm italic">
					This is a thesis project. TDTM is a Technical Debt Traceability Map
					tool that helps developers optimize and enchance technical debt
					management by using traceability maps.
				</p>
			</footer>
		</ThemeProvider>
	);
}

export default Home;
