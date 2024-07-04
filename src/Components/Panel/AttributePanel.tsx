import React from "react";
import { AuthorEntity, FileEntity } from "../../Types/Entities";
import { PanelType } from "../../Types/FunctionType";

function AttributePanel({ className, selectedNode }: PanelType) {
	return (
		<div className={className}>
			<h4 className="font-bold uppercase text-l">Attribute Panel</h4>
			{selectedNode && (
				<>
					<p>Name: {selectedNode.entity.name}</p>
					{selectedNode.group === "authors" ? (
						<p>Email: {(selectedNode.entity as AuthorEntity).email}</p>
					) : (
						<>
							<p>Path: {(selectedNode.entity as FileEntity).path}</p>
							<p>
								TD (in minutes):
								<span
									className={
										(selectedNode.entity as FileEntity).td ? "" : "italic"
									}
								>
									{(selectedNode.entity as FileEntity).td
										? " " + (selectedNode.entity as FileEntity).td
										: " <No value>"}
								</span>
							</p>
							<p>
								Complexity:
								<span
									className={
										(selectedNode.entity as FileEntity).complexity
											? ""
											: "italic"
									}
								>
									{(selectedNode.entity as FileEntity).complexity
										? " " + (selectedNode.entity as FileEntity).complexity
										: " <No value>"}
								</span>
							</p>
							<p>
								Code smells:
								<span
									className={
										(selectedNode.entity as FileEntity).codeSmells
											? ""
											: "italic"
									}
								>
									{(selectedNode.entity as FileEntity).codeSmells
										? " " + (selectedNode.entity as FileEntity).codeSmells
										: " <No value>"}
								</span>
							</p>
							<p>
								Functions:
								<span
									className={
										(selectedNode.entity as FileEntity).functions
											? ""
											: "italic"
									}
								>
									{(selectedNode.entity as FileEntity).functions
										? " " + (selectedNode.entity as FileEntity).functions
										: " <No value>"}
								</span>
							</p>
							<p>
								LOC:
								<span
									className={
										(selectedNode.entity as FileEntity).loc ? "" : "italic"
									}
								>
									{(selectedNode.entity as FileEntity).loc
										? " " + (selectedNode.entity as FileEntity).loc
										: " <No value>"}
								</span>
							</p>
							<p>
								Commented lines:
								<span
									className={
										(selectedNode.entity as FileEntity).commentLines
											? ""
											: "italic"
									}
								>
									{(selectedNode.entity as FileEntity).commentLines
										? " " + (selectedNode.entity as FileEntity).commentLines
										: " <No value>"}
								</span>
							</p>
							<p>
								Number of files:
								<span
									className={
										(selectedNode.entity as FileEntity).numFiles ? "" : "italic"
									}
								>
									{(selectedNode.entity as FileEntity).numFiles
										? " " + (selectedNode.entity as FileEntity).numFiles
										: " <No value>"}
								</span>
							</p>
							<p>
								Tags:
								<span
									className={
										(selectedNode.entity as FileEntity).tags ? "" : "italic"
									}
								>
									{(selectedNode.entity as FileEntity).tags
										? " " + (selectedNode.entity as FileEntity).tags.join(", ")
										: " <No tags>"}
								</span>
							</p>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default AttributePanel;
