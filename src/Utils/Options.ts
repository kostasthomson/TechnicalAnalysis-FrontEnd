export const NetworkOptions = {
	width: "100%",
	height: "100%",
	autoResize: true,
	groups: {
		authors: { color: { background: "cyan" } },
		commits: { color: { background: "orange" } },
		files: { color: { background: "red" } },
	},
	edges: {
		color: "black",
	},
	layout: {
		randomSeed: 1,
		hierarchical: {
			enabled: true,
			levelSeparation: 200,
			treeSpacing: 200,
			nodeSpacing: 110,
			blockShifting: false,
			edgeMinimization: true,
			parentCentralization: true,
			direction: "LR",
			sortMethod: "directed",
			shakeTowards: "roots",
		},
	},
	physics: {
		enabled: false,
	},
};
