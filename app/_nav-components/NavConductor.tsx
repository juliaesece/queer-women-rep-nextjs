"use client"

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useMediaQuery } from "react-responsive";

export default function NavConductor() {
    let isMobile = useMediaQuery({ maxWidth: 620 });

    const links : {to: string, label: string }[]= [
        {
            to: "/",
            label: "Global"
        },
        {
            to: "/tv-shows",
            label: "TV Shows"
        },
        {
            to: "/movies",
            label: "Movies"
        }
    ]

    return (
        <>
            {isMobile? <MobileNav links={links}/> : <DesktopNav links={links}/>}
        </>
    );
}
