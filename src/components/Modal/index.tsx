/** @format */

"use client";
import React from "react";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger,
} from "@/components/ui/animated-modal";

interface InterfaceProps {
	trigghrButton: Function;
	children: any;
	contentStyle?: string;
}

const ModalComp: React.FC<InterfaceProps> = ({
	trigghrButton,
	children,
	contentStyle,
}) => {
	return (
		<Modal>
			<ModalTrigger className="">{trigghrButton()}</ModalTrigger>
			<ModalBody>
				<ModalContent className={contentStyle}>{children}</ModalContent>
			</ModalBody>
		</Modal>
	);
};

export default ModalComp;
