import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface TableRecordType {
	name: string;
	actions: {
		label: string;
		visible: boolean;
		icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
			muiName: string;
		};
	}[];
	loading: boolean;
}

export default TableRecordType;
