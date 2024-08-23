/** @format */
"use client";
import React, { useState } from "react";
import { Spotlight } from "../ui/spotlight";
import { useRouter } from "next/navigation";
import { IconWallet } from "@tabler/icons-react";
// Components
import ModalComp from "../Modal";
// Helpers
import {
	createMnemonic,
	createSolanaWallet,
	createETHWallet,
} from "@/helpers/walletHelpers";
// Store
import useWalletStore from "@/store/walletStore";
import useMenuStore from "@/store/sidebarStore";

export default function Hero() {
	const router = useRouter();
	const [mnemonicString, setMnemonicString] = useState("");
	const [mnemonics, setMnemonics] = useState([]);
	const [isMnemonicsSaved, setIsMnemonicsSaved] = useState(false);

	const { wallets, walletIndex, addWallet, addMnemonics }: any =
		useWalletStore();
	const { menus, addSubMenu }: any = useMenuStore();

	const handleWalletCreation = async () => {
		const mns = await createMnemonic();

		if (mns) {
			setMnemonicString(mns);
			addMnemonics(mns);
			setMnemonics(mns.split(" "));
		}
	};
	const handleCreateWallet = async () => {
		const wallet = await createSolanaWallet(mnemonicString, walletIndex);
		const ETHWallet = await createETHWallet(mnemonicString, walletIndex);
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
			list.map((m) => {
				if (m.label === "Wallets") {
					m.subItem.push(menu);
				}
			});
			await addSubMenu(list);

			router.push("/wallet");
		}
	};

	return (
		<div className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
			<Spotlight
				className="-top-40 left-0 md:left-60 md:-top-20"
				fill="white"
			/>
			<div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 flex flex-col">
				<h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
					Welcome to{" "}
					<span className="uppercase bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
						Wallety
					</span>{" "}
					<br /> Your Secure Crypto Wallet.
				</h1>
				<p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
					Experience the future of digital finance with WallT, your trusted
					cryptocurrency wallet. Designed for both beginners and seasoned
					traders, WallT offers a seamless interface to store, send, and receive
					cryptocurrencies securely.
				</p>

				<ModalComp
					trigghrButton={() => (
						<button
							onClick={() => handleWalletCreation()}
							className="px-4 md:w-[20rem] lg:w-[30rem] w-[15rem]  mt-[2rem] py-2 rounded-md border border-neutral-300 bg-neutral-200 text-neutral-800 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md self-center capitalize"
						>
							Create new wallet
						</button>
					)}
				>
					<div className="flex flex-col items-center">
						{mnemonics?.length > 0 && (
							<div className="flex flex-row gap-4 items-center flex-wrap justify-center">
								{" "}
								{/* Added gap for spacing between inputs */}
								{mnemonics.map((e, idx) => (
									<div
										key={idx}
										className="flex flex-row flex-wrap items-center justify-center"
									>
										{" "}
										{/* Added key prop for unique identification */}
										<input
											disabled
											type="text"
											value={e}
											className="w-[80px] dark:bg-neutral-700 rounded-[10px] border border-neutral-800 text-center dark:text-neutral-300 text-sm"
										/>
									</div>
								))}
							</div>
						)}
						<div className="flex flex-row items-center ">
							<input
								type="checkbox"
								checked={isMnemonicsSaved}
								onChange={() => setIsMnemonicsSaved(!isMnemonicsSaved)}
								className="form-checkbox h-3 w-3 text-neutral-700"
							/>
							<span className="dark:text-neutral-300 text-sm ml-[0.5rem] py-[1rem]">
								I saved my secret mnemonic phrase
							</span>
						</div>
						<button
							disabled={!isMnemonicsSaved}
							onClick={handleCreateWallet}
							className="px-4 py-2 rounded-md border border-neutral-300 bg-dark-100 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md self-center capitalize"
						>
							Next
						</button>
					</div>
				</ModalComp>

				<button
					onClick={() => alert("Coming Soon")}
					className="px-4 md:w-[20rem] lg:w-[30rem] w-[15rem] mt-[1rem] py-2 rounded-md border border-neutral-300 bg-dark-100 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md self-center capitalize"
				>
					Manage existing wallet
				</button>
			</div>
		</div>
	);
}
