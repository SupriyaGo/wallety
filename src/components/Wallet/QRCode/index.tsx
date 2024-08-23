/** @format */
import React from "react";
import { useQRCode } from "next-qrcode";

export default function QRCode({ data }: { data: string }) {
	const { Image } = useQRCode();
	return (
		<div className="rounded-[10px] overflow-hidden flex flex-row gap-1">
			<Image
				text={data}
				options={{
					type: "image/jpeg",
					quality: 1,
					errorCorrectionLevel: "M",
					margin: 3,
					scale: 4,
					width: 120,
					color: {
						dark: "#000",
						light: "#999",
					},
				}}
			/>
		</div>
	);
}
