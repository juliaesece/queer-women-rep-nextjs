"use client"

import { useState, useLayoutEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function navConductor() {
    const [isMobile, setIsMobile] = useState(true)
    const breakpoint = 620;
  
    // mobile responsiveness
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }
  
    useLayoutEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

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
