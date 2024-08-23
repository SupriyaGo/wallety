/** @format */

"use client";

import { create } from "zustand";
import { links } from "@/data/sidebar";
// Interface
import { Menu, SubMenu } from "@/components/Sidebar/Interface.props";
const useMenuStore = create((set) => ({
	menus: links,
	addSubMenu: (menus: SubMenu) => set((state: any) => ({ menus })),

	removeSubMenu: (menuId: number) =>
		set((state: any) => ({
			menus: state.menus.filter((menu: Menu) => menu.id !== menuId),
		})),
}));

export default useMenuStore;
