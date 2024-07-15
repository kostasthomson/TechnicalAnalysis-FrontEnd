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
								<span>{" " + (selectedNode.entity as FileEntity).td}</span>
							</p>
							<p>
								Complexity:
								<span>
									{" " + (selectedNode.entity as FileEntity).complexity}
								</span>
							</p>
							<p>
								Code smells:
								<span>
									{" " + (selectedNode.entity as FileEntity).codeSmells}
								</span>
							</p>
							<p>
								Functions:
								<span>
									{" " + (selectedNode.entity as FileEntity).functions}
								</span>
							</p>
							<p>
								LOC:
								<span>{" " + (selectedNode.entity as FileEntity).loc}</span>
							</p>
							<p>
								Commented lines:
								<span>
									{" " + (selectedNode.entity as FileEntity).commentLines}
								</span>
							</p>
							<p>
								Number of files:
								<span>
									{" " + (selectedNode.entity as FileEntity).numFiles}
								</span>
							</p>
							<p>
								Tags:
								<span
									className={
										(selectedNode.entity as FileEntity).tags ? "" : "italic"
									}
								>
									{(selectedNode.entity as FileEntity).tags.length !== 0
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
