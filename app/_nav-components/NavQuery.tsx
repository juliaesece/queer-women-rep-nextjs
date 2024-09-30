"use client"

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useMediaQuery } from "react-responsive";

export default function NavQuery({ links }) {
    let isMobile = useMediaQuery({ maxWidth: 620 });

    return (
        <>
            {isMobile ? <MobileNav links={links} /> : <DesktopNav links={links} />}
        </>
    );
}
