/** @format */

import React, { useState, useEffect } from "react";
import {
	IconCopy,
	IconCheck,
	IconArrowUp,
	IconArrowDown,
	IconArrowsDownUp,
	IconEye,
	IconEyeCancel,
} from "@tabler/icons-react";
import Image from "next/image";

// Components
import ModalComp from "../Modal";
import Header from "../Header";
import QRCode from "./QRCode";
import useWalletStore from "@/store/walletStore";

export default function WalletDetails() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [showSolPvtKey, setshowSolPvtKey] = useState(false);
	const [isSolPubKeyCopied, setIsSolPubKeyCopied] = useState(false);
	const [showETHPvtKey, setshowETHPvtKey] = useState(false);
	const [isETHPubKeyCopied, setIsETHPubKeyCopied] = useState(false);
	const [walletDetails, setSalletDetails] = useState({});
	const [isCopied, setIsCopied] = useState(false);

	const { wallets, walletIndex, addWallet, selectedWallet }: any =
		useWalletStore();

	useEffect(() => {
		setSalletDetails(wallets[0]);
	}, []);

	useEffect(() => {
		setSalletDetails(wallets[selectedWallet]);
	}, [selectedWallet]);

	const handleCopy = async (text, type) => {
		try {
			await navigator.clipboard.writeText(text);
			if (type == "sol") {
				setIsSolPubKeyCopied(true);
				setTimeout(() => setIsSolPubKeyCopied(false), 2000);
			} else {
				setIsETHPubKeyCopied(true);
				setTimeout(() => setIsETHPubKeyCopied(false), 2000);
			}
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div className="flex flex-1 ">
			<div className="w-full">
				<div className=" border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col  w-full h-full min-h-screen overflow-auto">
					<Header />
					<div className="h-full mx-auto w-[70%] p-4 md:p-10">
						{/* Balance */}
						<div className="flex flex-row items-end justify-between">
							<div>
								<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
									{walletDetails.name} Assets
								</p>
								<p className="text-neutral-900 dark:text-neutral-100 text-bold lg:text-[4.5rem] md:text-[3rem] text-[2rem]">
									$0.00{" "}
									<span className="text-neutral-800 dark:text-neutral-300 lg:text-3xl md:text-xl text-lg">
										USD
									</span>
								</p>
								{/* Buttons */}
								<div className="flex flex-row items-center gap-6">
									<div className="text-center cursor-pointer">
										<button className="border-2 border-neutral-400 p-3 rounded-full hover:bg-neutral-400 group transition-colors duration-200 ease-in-out ">
											<IconArrowUp className="text-neutral-700 dark:text-neutral-400 h-6 w-6 flex-shrink-0 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-200 ease-in-out" />
										</button>
										<p className="text-neutral-800 dark:text-neutral-400 md:text-md text-sm">
											Send
										</p>
									</div>
									<div className="text-center cursor-pointer">
										<button className="border-2 border-neutral-400 p-3 rounded-full hover:bg-neutral-400 group transition-colors duration-200 ease-in-out ">
											<IconArrowDown className="text-neutral-700 dark:text-neutral-400 h-6 w-6 flex-shrink-0 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-200 ease-in-out" />
										</button>
										<p className="text-neutral-800 dark:text-neutral-400 md:text-md text-sm">
											Receive
										</p>
									</div>
									<div className="text-center cursor-pointer">
										<button className="border-2 border-neutral-400 p-3 rounded-full hover:bg-neutral-400 group transition-colors duration-200 ease-in-out ">
											<IconArrowsDownUp className="text-neutral-700 dark:text-neutral-400 h-6 w-6 flex-shrink-0 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-200 ease-in-out" />
										</button>
										<p className="text-neutral-800 dark:text-neutral-400 md:text-md text-sm">
											Swap
										</p>
									</div>
								</div>
							</div>
							{/* QR and address */}
							<ModalComp
								trigghrButton={() => (
									<button className="flex flex-row items-center hover:dark:bg-neutral-300  dark:bg-neutral-500 mt-[1rem] py-2 px-4 rounded-full group transition-colors duration-200 ease-in-out ">
										<Image
											alt="wallet"
											src={require("@/assets/icons8-cryptocurrency-wallet-48.png")}
											className="w-[2rem]"
										/>
										<p className="ml-[5px] text-neutral-800 dark:text-neutral-300 dark:group-hover:text-neutral-700 capitalize md:text-md text-sm transition-colors duration-200 ease-in-out">
											Get your address
										</p>
									</button>
								)}
							>
								<div>
									{/* Solana */}
									<div className="flex items-center">
										<Image
											alt="solana"
											src={require("@/assets/solana.png")}
											className="w-[2.5rem]"
										/>
										<h4 className="ml-[1rem] text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
											Solana Address{" "}
										</h4>
									</div>
									<div className="flex flex-row justify-between items-end">
										<div className="flex flex-col mr-[1rem]">
											{/* SOL Public Key */}
											<div className="relative dark:bg-neutral-600 mt-[1rem] p-2 rounded-full flex flex-row items-center w-[20rem]">
												<input
													disabled
													className="text-neutral-800 dark:text-neutral-300 md:text-md text-sm bg-transparent w-[90%]"
													type="text"
													value={walletDetails?.publicKey}
												/>
												<button
													className="outline-none border-none border border-neutral-300 absolute right-2"
													onClick={() =>
														handleCopy(walletDetails?.publicKey, "sol")
													}
												>
													{isSolPubKeyCopied ? (
														<IconCheck className="text-neutra l-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													) : (
														<IconCopy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													)}
												</button>
											</div>
											{/* SOL Private Key */}
											<div className="relative dark:bg-neutral-600 mt-[1rem] p-2 rounded-full flex flex-row items-center w-[20rem]">
												<input
													disabled
													className="text-neutral-800 dark:text-neutral-300 md:text-md text-sm bg-transparent w-[90%]"
													type={showSolPvtKey ? "text" : "password"}
													value={walletDetails?.secret}
												/>
												<button
													className="outline-none border-none border border-neutral-300 absolute right-2"
													onClick={() => setshowSolPvtKey(!showSolPvtKey)}
												>
													{showSolPvtKey ? (
														<IconEye className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													) : (
														<IconEyeCancel className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													)}
												</button>
											</div>
										</div>
										<QRCode data={walletDetails?.publicKey} />
									</div>
									{/* ETH */}
									<div className="flex items-center mt-[2rem]">
										<Image
											alt="solana"
											src={require("@/assets/eth.png")}
											className="w-[2.5rem]"
										/>
										<h4 className="ml-[1rem] text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
											ETH Address{" "}
										</h4>
									</div>
									<div className="flex flex-row justify-between items-end">
										<div className="flex flex-col mr-[1rem]">
											{/* ETH Public key */}
											<div className="relative dark:bg-neutral-600 mt-[1rem] p-2 rounded-full flex flex-row items-center w-[20rem]">
												<input
													disabled
													className="text-neutral-800 dark:text-neutral-300 md:text-md text-sm bg-transparent w-[90%]"
													type="text"
													value={walletDetails?.ETH?.publicKey}
												/>
												<button
													className="outline-none border-none border border-neutral-300 absolute right-2"
													onClick={() =>
														handleCopy(walletDetails?.ETH?.publicKey, "eth")
													}
												>
													{isETHPubKeyCopied ? (
														<IconCheck className="text-neutra l-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													) : (
														<IconCopy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													)}
												</button>
											</div>
											{/* ETH Private Key */}
											<div className="relative dark:bg-neutral-600 mt-[1rem] p-2 rounded-full flex flex-row items-center w-[20rem]">
												<input
													disabled
													className="text-neutral-800 dark:text-neutral-300 md:text-md text-sm bg-transparent w-[90%]"
													type={showETHPvtKey ? "text" : "password"}
													value={walletDetails?.ETH?.secret}
												/>
												<button
													className="outline-none border-none border border-neutral-300 absolute right-2"
													onClick={() => setshowETHPvtKey(!showETHPvtKey)}
												>
													{showETHPvtKey ? (
														<IconEye className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													) : (
														<IconEyeCancel className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
													)}
												</button>
											</div>
										</div>
										<QRCode data={walletDetails?.ETH?.publicKey} />
									</div>
								</div>
							</ModalComp>
						</div>
						{/* Holdings */}
						<div className="mt-[4rem] pb-10">
							{/* Solana */}
							<div className="flex flex-row items-center justify-between rounded-[10px] py-4 px-6 border border-neutral-700 bg-gradient-to-r from-neutral-700 to-neutral-800 mb-[1rem]">
								<div className="flex flex-row items-center">
									<Image
										src={require("@/assets/solana.png")}
										alt="solana"
										// width={80}
										className="w-[30px] md:w-[50px] lg:w-[70px]"
									/>
									<div className="ml-[0.5rem]">
										<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
											Solana
										</p>
										<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
											0 SOL
										</p>
									</div>
								</div>
								<div className="">
									<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
										$0.00 USD
									</p>
									<p className="text-neutral-800 dark:text-neutral-300 md:text-md text-sm">
										+0.00%
									</p>
								</div>
							</div>
							{/* Ethereum */}
							<div className="flex flex-row items-center justify-between rounded-[10px] py-4 px-6 border border-neutral-700 bg-gradient-to-r from-neutral-700 to-neutral-800 mb-[1rem]">
								<div className="flex flex-row items-center">
									<Image
										src={require("@/assets/eth.png")}
										alt="solana"
										// width={80}
										className="w-[30px] md:w-[50px] lg:w-[70px]"
									/>
									<div className="ml-[0.5rem]">
										<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
											Ethereum
										</p>
										<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
											0 ETH
										</p>
									</div>
								</div>

								<div className="">
									<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
										$0.00 USD
									</p>
									<p className="text-neutral-800 dark:text-neutral-300 lg:text-lg md:text-md text-sm">
										-0.00%
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
