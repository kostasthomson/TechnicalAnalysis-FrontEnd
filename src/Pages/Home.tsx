import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { Dashboard, AddNewProjectModal } from "../Components";
import { CalloutFunctions, UtilFunctions, theme } from "../Utils";
import TableRecordType from "../Types/TableRecordType";

function Home() {
	const [rows, setRows] = useState<TableRecordType[] | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [, setIsLoading] = useState<boolean>(false);
	const handleAddNewClick = () => {
		setOpenModal(true);
	};

	useEffect(() => {
		CalloutFunctions.GetProjectsCallout()
			.then((result) => {
				let data: TableRecordType[] = result.data.map((project: any) => {
					return UtilFunctions.createRow(project.name, false);
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
			<AddNewProjectModal
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
