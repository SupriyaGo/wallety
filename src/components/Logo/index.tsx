/** @format */

import Link from "next/link";
import { motion } from "framer-motion";

const Logo = () => {
	return (
		<Link
			href="/"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black/[0.5] dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre"
			>
				Wallety
			</motion.span>
		</Link>
	);
};
export default Logo;
