/** @format */

import React from "react";
import { IconCirclePlus, IconWallet } from "@tabler/icons-react";
// Store
import useWalletStore from "@/store/walletStore";
import { createETHWallet, createSolanaWallet } from "@/helpers/walletHelpers";
import useMenuStore from "@/store/sidebarStore";

export default function Header() {
	const { wallets, mnemonics, walletIndex, addWallet }: any = useWalletStore();
	const { menus, addSubMenu }: any = useMenuStore();

	const handleCreateWallet = async () => {
		const wallet = await createSolanaWallet(mnemonics, walletIndex);
		const ETHWallet = await createETHWallet(mnemonics, walletIndex);
		if (wallet && ETHWallet) {
			await addWallet({
				name: `Wallet ${walletIndex + 1}`,
				ETH: {
					secret: ETHWallet.secret,
					publicKey: ETHWallet.publicKey,
				},
				...wallet,
			});
			// Add wallet menu to sidebar
			const list = menus;
			const menu = {
				id: `Wallet ${walletIndex + 1}`,
				label: `Wallet ${walletIndex + 1}`,
				href: "#",
				icon: (
					<IconWallet className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
				),
				walletIndex,
			};
			list.map((m: any) => {
				if (m.label === "Wallets") {
					m.subItem.push(menu);
				}
			});
			console.log("list", list);

			await addSubMenu(list);
		}
	};

	return (
		<div className="px-6 py-2 flex justify-end bg-white dark:bg-neutral-900 flex">
			<button
				className="flex flex-row items-center"
				onClick={handleCreateWallet}
			>
				<IconCirclePlus className="text-neutra l-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
				<p className="ml-[0.5rem] text-neutral-800 dark:text-neutral-300 md:text-md text-sm">
					Create new wallet
				</p>
			</button>
		</div>
	);
}
