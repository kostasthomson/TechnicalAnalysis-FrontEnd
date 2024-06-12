import React, { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { AttributePanel, Network } from "../Components";
import { DataType } from "../App";
import { GraphNode } from "../Components/Network/Network";
import { GroupedCommitsCallout } from "../Utils/Callouts";

function Analysis() {
	const [data, setData] = useState<DataType[]>([]);
	const [selectedNode, setSelectedNode] = useState<GraphNode | undefined>(
		undefined
	);
	const [sliderValue, setSliderValue] = useState<number>(0);
	const handleChange = (event: Event, newValue: number | number[]) => {
		setSliderValue(newValue as number);
		setSelectedNode(undefined);
	};
	useEffect(() => {
		GroupedCommitsCallout()
			.then((result: any) => {
				setData(
					(result.data as DataType[]).sort(
						(group1: DataType, group2: DataType) =>
							new Date(group1.key).getTime() - new Date(group2.key).getTime()
					)
				);
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
						className="fixed z-10 top-24 left-4 w-fit h-fit p-3 rounded-md shadow-custom bg-gray-300 opacity-85"
						selectedNode={selectedNode}
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
						onChange={handleChange}
					/>

					<Network
						className="w-full h-full"
						data={data}
						index={sliderValue}
						setSelectedNode={setSelectedNode}
					/>
				</>
			)}
		</main>
	);
}

export default Analysis;
