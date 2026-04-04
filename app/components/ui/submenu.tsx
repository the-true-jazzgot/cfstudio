'use client';

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
        <li 
            className="relative p-2 border-white border-3 bg-black/50 rounded-xl" 
            onMouseEnter={() => setIsSubmenuOpen(true)} 
            onMouseLeave={() => setIsSubmenuOpen(false)}>
            {name}
        </li>
        {isSubmenuOpen && <ul className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg">
            {children.map((child, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <a href={child.link}>{child.name}</a>
                </li>
            ))}
        </ul>}  
    </>;
}