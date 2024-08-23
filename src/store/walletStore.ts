/** @format */

"use client";

import { create } from "zustand";
const useWalletStore = create((set) => ({
	mnemonics: "",
	wallets: [],
	walletIndex: 0,
	selectedWallet: 0,

	addMnemonics: (mnemonic: string) =>
		set((state: any) => ({
			mnemonics: mnemonic,
		})),
	addSelectedWallet: (x: number) =>
		set((state: any) => ({
			selectedWallet: x,
		})),
	addWallet: (wallet: any) =>
		set((state: any) => ({
			wallets: [...state.wallets, wallet],
			walletIndex: state.walletIndex + 1,
		})),
	removeWallet: (walletId: number) =>
		set((state: any) => ({
			wallets: state.wallets.filter((wallet: any) => wallet.id !== walletId),
			walletIndex: state.walletIndex - 1,
		})),
}));

export default useWalletStore;
