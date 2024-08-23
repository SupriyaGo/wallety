/** @format */

// app/wallet/layout.tsx
import React from "react";

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="wallet-layout">
			<main>{children}</main>
		</div>
	);
};

export default WalletLayout;
