export const NetworkOptions = {
	width: "100%",
	height: "100%",
	autoResize: true,
	groups: {
		authors: { color: { background: "cyan" } },
		commits: { color: { background: "orange" } },
		files: { color: { background: "yellow" } },
	},
	layout: {
		randomSeed: "0.4921169730930408:1718737341350",
		hierarchical: {
			enabled: true,
			levelSeparation: 100,
			treeSpacing: 150,
			nodeSpacing: 150,
			blockShifting: true,
			edgeMinimization: true,
			sortMethod: "directed",
			shakeTowards: "roots",
		},
	},
	physics: {
		enabled: true,
		maxVelocity: 20,
		solver: "hierarchicalRepulsion",
		hierarchicalRepulsion: {
			nodeDistance: 150,
			springLength: 100,
			springConstant: 0.06,
			damping: 0.17,
		},
		stabilization: {
			enabled: true,
			fit: true,
		},
	},
};
