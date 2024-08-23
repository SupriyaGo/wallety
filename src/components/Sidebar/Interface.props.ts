/** @format */
export interface SubMenu {
	id: number;
	label: string;
	href: string;
	icon: any;
}
export interface Menu {
	id: number;
	label: string;
	href: string;
	icon: any;
	subItem: SubMenu[];
}
export interface InterfaceProps {
	onClickMenu: (e: Menu) => void;
	onClickSubMenu: (e: Menu) => void;
}
