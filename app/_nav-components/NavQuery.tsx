"use client"

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from 'react'

type link = {
    to: string;
    label: string;
}

/**
 * Modified from link below
 * @see https://observablehq.com/@werehamster/avoiding-hydration-mismatch-when-using-react-hooks
 * @param mediaQueryString
 * @returns {unknown}
 */
export function useBetterMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState<boolean>()

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)
    const listener = () => setMatches(!!mediaQueryList.matches)
    listener()
    mediaQueryList.addEventListener('change', listener) // updated from .addListener
    return () => mediaQueryList.removeEventListener('change', listener) // updated from .removeListener
  }, [mediaQueryString])

  return matches
}

export default function NavQuery({ links }: {links: link[]}) {
    let isMobile = useBetterMediaQuery("(max-width: 620px)");

    return (
        <>
            {isMobile ? <MobileNav links={links} /> : <DesktopNav links={links} />}
        </>
    );
}
