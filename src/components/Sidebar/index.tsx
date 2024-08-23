/** @format */

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Interface
import { InterfaceProps, Menu, SubMenu } from "./Interface.props";
// Components
import Logo from "../Logo";
// Constants
import { links } from "@/data/sidebar";
import useMenuStore from "@/store/sidebarStore";
import useWalletStore from "@/store/walletStore";

const SidebarComp: React.FC<InterfaceProps> = ({
	onClickMenu,
	onClickSubMenu,
}) => {
	const [open, setOpen] = useState(false);

	const router = useRouter();
	const { menus }: any = useMenuStore();
	const { wallets }: any = useWalletStore();

	useEffect(() => {
		if (wallets.length === 0) {
			router.push("/");
		}
	}, []);

	return (
		<Sidebar open={open} setOpen={setOpen} animate={true}>
			<SidebarBody className="justify-between gap-10">
				<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<>
						<Logo />
					</>
					<div className="mt-8 flex flex-col gap-2">
						{menus.map((link: Menu, idx: number) => (
							<div className="flex flex-col" key={idx}>
								<button onClick={() => onClickMenu(link)}>
									<SidebarLink link={link} />
								</button>
								{open &&
									link.subItem?.length > 0 &&
									link.subItem.map((item: SubMenu, index: string | number) => (
										<button key={index} onClick={() => onClickSubMenu(item)}>
											<SidebarLink link={item} className="ml-[1.5rem]" />
										</button>
									))}
							</div>
						))}
					</div>
				</div>
				<div>
					<SidebarLink
						link={{
							label: "100xdevs",
							href: "#",
							icon: (
								<Image
									src={require("@/assets/wallet2.png")}
									className="h-7 w-7 flex-shrink-0 rounded-full"
									width={50}
									height={50}
									alt="Avatar"
								/>
							),
						}}
					/>
				</div>
			</SidebarBody>
		</Sidebar>
	);
};

export default SidebarComp;
