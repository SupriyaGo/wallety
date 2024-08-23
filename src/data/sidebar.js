/** @format */

import {
	IconArrowLeft,
	IconBrandTabler,
	IconSettings,
	IconUserBolt,
	IconWallet,
} from "@tabler/icons-react";

export const links = [
	{
		id: 0,
		label: "Dashboard",
		href: "#",
		icon: (
			<IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
		subItem: [],
	},
	{
		id: 1,
		label: "Wallets",
		href: "#",
		icon: (
			<IconWallet className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
		subItem: [],
	},
	{
		id: 3,
		label: "Settings",
		href: "#",
		icon: (
			<IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
		subItem: [],
	},
	{
		id: 4,
		label: "Logout",
		href: "#",
		icon: (
			<IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
		subItem: [],
	},
];
