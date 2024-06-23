import React, { useEffect, useState } from "react";
import { Slider, FormControlLabel, Switch } from "@mui/material";
import { AttributePanel, ProjectNetwork } from "../Components";
import { GraphDataType, GraphNode } from "../Types/GraphTypes";
import { CalloutFunctions } from "../Utils";

function Analysis() {
	const [data, setData] = useState<GraphDataType[]>([]);
	const [selectedNode, setSelectedNode] = useState<GraphNode | undefined>(
		undefined
	);
	const [sliderValue, setSliderValue] = useState<number>(0);
	const [maxTd, setMaxTd] = useState<number | null>(null);
	const [projectTd, setProjectTd] = useState<number | null>(null);
	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setSliderValue(newValue as number);
		setSelectedNode(undefined);
	};
	const handleSwitchChange = ({ target }: any) => {
		if (target.checked) setMaxTd(projectTd);
		else setMaxTd(null);
	};
	useEffect(() => {
		const projectName = document.location.pathname.replace("/analysis/", "");
		CalloutFunctions.GetGroupedCommitsCallout(projectName)
			.then(({ data }: any) => {
				console.log(data);
				setData(data);
			})
			.catch((error: any) => {
				console.log(error);
			});
		CalloutFunctions.GetProjectMaxTdCallout(projectName)
			.then(({ data }: any) => {
				setProjectTd(data);
			})
			.catch((error: any) => {
				console.log(error);
			});
	}, []);
	return (
		<main className="h-5/6 flex flex-col">
			{data.length !== 0 && (
				<>
					<AttributePanel
						className="fixed z-10 top-24 left-4 w-max h-fit p-3 rounded-md shadow-custom bg-gray-300 opacity-85"
						selectedNode={selectedNode}
					/>
					<FormControlLabel
						className="fixed z-10 top-24 right-4"
						value="bottom"
						control={<Switch onChange={handleSwitchChange} />}
						label={
							maxTd !== null ? "Max TD (in Project)" : "Max TD (in Commit)"
						}
						labelPlacement="bottom"
					/>
					<Slider
						marks
						className="z-10 self-center bottom-4 mb-4"
						aria-label="Timeline"
						valueLabelDisplay="auto"
						sx={{ width: "90%", position: "fixed" }}
						min={0}
						max={data.length - 1}
						value={sliderValue}
						valueLabelFormat={(sliderValue) =>
							data[sliderValue].key.split("T")[0]
						}
						onChange={handleSliderChange}
					/>

					<ProjectNetwork
						className="w-full h-full"
						data={data[sliderValue]}
						maxTd={maxTd}
						setSelectedNode={setSelectedNode}
					/>
				</>
			)}
		</main>
	);
}

export default Analysis;
