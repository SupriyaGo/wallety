/** @format */
import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";

export const createMnemonic = async () => {
	try {
		const mnemonics = await generateMnemonic();
		return mnemonics;
	} catch (error) {
		console.log("Create Mnemonic Error:", error);
		return false;
	}
};

export const createSolanaWallet = async (
	mnemonic: string,
	walletIndex: number
) => {
	const seed = await mnemonicToSeed(mnemonic);
	const path = `m/44'/501'/${walletIndex}'/0'`;
	const derivedSeed = await derivePath(path, seed.toString("hex")).key;
	const secret = await nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
	const keypair = await Keypair.fromSecretKey(secret);
	const publicKey = keypair.publicKey.toBase58();

	return { seed, secret, publicKey };
};
export const createETHWallet = async (
	mnemonic: string,
	walletIndex: number
) => {
	const seed = await mnemonicToSeed(mnemonic);
	const derivationPath = `m/44'/60'/${walletIndex}'/0'`;
	const hdNode = HDNodeWallet.fromSeed(seed);
	const child = hdNode.derivePath(derivationPath);
	const privateKey = child.privateKey;
	const wallet = new Wallet(privateKey);

	const publicKey = wallet.address;

	return { seed, secret: privateKey, publicKey };
};
