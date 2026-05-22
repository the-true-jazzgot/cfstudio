'use client';

import { AnimatePresence, motion } from "motion/react";
import { useState, type MouseEvent } from "react";

interface SubmenuProps {
    name: string;
    isOpen: boolean;
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    menuClassName?: string;
    itemClassName?: string;
}

function handleAnchorScroll(event: MouseEvent<HTMLAnchorElement>, link: string) {
    if (!link.startsWith("#")) {
        return;
    }

    const id = link.slice(1);
    const target = document.getElementById(id);

    if (!target) {
        return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", link);
}

export function Submenu({isOpen, items, name, className, menuClassName, itemClassName}: SubmenuProps) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(isOpen);

    return <>
        <div
            className="relative"
            onMouseEnter={() => setIsSubmenuOpen(true)} 
            onMouseLeave={() => setIsSubmenuOpen(false)}
        >
        <motion.button 
            className={`relative inline-flex items-center gap-1.5 align-middle ${className ?? "p-2 border-white border-3 bg-black/50 rounded-xl cursor-pointer"}`}
            type="button"
            aria-expanded={isSubmenuOpen}
            aria-haspopup="menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <span>{name}</span>
            <svg
                aria-hidden="true"
                className={`mt-px h-2.5 w-4 flex-none transition-transform duration-200 ${isSubmenuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 12"
                fill="none"
            >
                <path d="M2 2L10 10L18 2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </motion.button>
        <AnimatePresence>
            {isSubmenuOpen && <motion.ul 
                role="menu"
                className={menuClassName ?? "absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/50 gradient-a border-3 rounded-xl w-[400px]"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}>
                {items.map((item) => (
                    <li key={item.link} role="none" className={itemClassName ?? "px-4 py-2 hover:bg-gray-200/30 cursor-pointer"}>
                        <a role="menuitem" href={item.link} onClick={(event) => handleAnchorScroll(event, item.link)}>{item.name}</a>
                    </li>
                ))}
            </motion.ul>}  
        </AnimatePresence>
        </div>
    </>;
}
