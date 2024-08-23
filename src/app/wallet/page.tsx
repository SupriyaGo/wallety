/** @format */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
// Components
import Dashboard from "@/components/Dashboard";
import SidebarComp from "@/components/Sidebar";
import WalletDetails from "@/components/Wallet";
// Store
import useWalletStore from "@/store/walletStore";

function Wallet() {
	const [activeMenu, setActiveMenu] = useState(0);

	const { addSelectedWallet } = useWalletStore();

	const handleMenu = (menu: any) => {
		setActiveMenu(menu.id);
	};
	const handleSubMenu = (menu: any) => {
		addSelectedWallet(menu.walletIndex);
	};

	return (
		<div
			className={cn(
				"flex flex-col md:flex-row dark:bg-neutral-800 w-full flex-1 border border-neutral-00 dark:border-neutral-700 overflow-hidden",
				"h-screen"
			)}
		>
			<SidebarComp onClickMenu={handleMenu} onClickSubMenu={handleSubMenu} />
			{activeMenu === 0 && <Dashboard />}
			{activeMenu === 1 && <WalletDetails />}
		</div>
	);
}

export default Wallet;
