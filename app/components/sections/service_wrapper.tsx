'use client';

import { useState } from "react";
import { ServiceSectionExpanded } from "./service_section_expanded";
import { ServiceSection } from "./service_section";
import { Service } from "../../interfaces";

interface ServiceWrapperProps {
    service: Service;
}

export function ServiceWrapper(props: ServiceWrapperProps) {
    const [isOpen, setIsOpen] = useState(false);

    return <>
        {isOpen && <ServiceSectionExpanded {...props} setIsOpen={setIsOpen} />}
        <ServiceSection {...props} setIsOpen={setIsOpen} />
    </>
}