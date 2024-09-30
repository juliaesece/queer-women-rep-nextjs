"use client"

import { FC } from "react";
import Image from "next/image";
import styles from "./desktop.module.css"
import Link from "next/link";
import logo from "@/public/queer-women-rep.png"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

type link = {
    to: string;
    label: string;
}

interface Props {
    links: link[],
}

const DesktopNav: FC<Props> = ({ links }) => {

    const desktopLinks = [
        ...links
    ]

    return (
        <>
            <header className={styles.header}>
                <Link href="/">
                    <Image className={styles.header__logo} src={logo} alt="Queer women rep logo" />
                </Link>
            </header>
            <nav className={styles.nav}>
                    {desktopLinks.map((link: link) => (
                        <Link key={link.label} href={link.to}> <span className="link--underlined"> {link.label} </span> </Link>))
                    }
            </nav>
        </>
    );
}

export default DesktopNav;