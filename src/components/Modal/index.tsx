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
}

const ModalComp: React.FC<InterfaceProps> = ({ trigghrButton, children }) => {
	return (
		<Modal>
			<ModalTrigger className="">{trigghrButton()}</ModalTrigger>
			<ModalBody>
				<ModalContent>{children}</ModalContent>
			</ModalBody>
		</Modal>
	);
};

export default ModalComp;
