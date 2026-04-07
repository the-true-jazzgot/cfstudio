'use client';

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface SubmenuProps {
    name: string;
    isOpen: boolean;
    children: {
        name: string;
        link: string;
    }[];
}

export function Submenu({isOpen, children, name}: SubmenuProps) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(isOpen);

    return <>
        <motion.button 
            className="relative p-2 border-white border-3 bg-black/50 rounded-xl cursor-pointer" 
            onMouseEnter={() => setIsSubmenuOpen(true)} 
            onMouseLeave={() => setIsSubmenuOpen(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <span>{name}</span>
            <AnimatePresence>
                {isSubmenuOpen && <motion.ul 
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/50 gradient-a border-3 rounded-xl w-[400px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}>
                    {children.map((child, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-200/30 cursor-pointer">
                            <a href={child.link}>{child.name}</a>
                        </li>
                    ))}
                </motion.ul>}  
            </AnimatePresence>
        </motion.button>
    </>;
}