"use client"

import { FC } from "react";
import Image from "next/image";
import styles from "./desktop.module.css"
import Link from "next/link";
import logo from "@/public/queer-women-rep.png"

type link = {
    to: string;
    label: string;
}

interface Props {
    links: link[]
}

const DesktopNav: FC<Props> = ({ links }) => {

    const desktopLinks = [
        ...links,
        {to: "/add",
        label: "Add"}
    ]

    return (
        <>
            <header className={styles.header}>
                <Link href="/">
                    <Image className={styles.header__logo} src={logo} alt="Queer women rep logo" />
                </Link>
            </header>
            <nav className={styles.nav}>
                <ul>
                    {desktopLinks.map((link: link) => (
                        <Link key={link.label} href={link.to}> <span className="link--underlined"> {link.label} </span> </Link>))
                    }
                </ul>
            </nav>
        </>
    );
}

export default DesktopNav;