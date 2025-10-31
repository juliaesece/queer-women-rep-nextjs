"use client"

import { FC } from "react";
import Image from "next/image";
import styles from "./desktop.module.css"
import Link from "next/link";
import logo from "@/public/es-logo.png"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { usePathname } from 'next/navigation'

type link = {
    to: string;
    label: string;
}

interface Props {
    links: link[],
}

const DesktopNav: FC<Props> = ({ links }) => {
    const pathname = usePathname()

    const desktopLinks = [
        ...links
    ]

    return (
        <>
            <header className={styles.header}>
                <Link href="/">
                    <Image className={styles.header__logo} src={logo} alt="Everything Sapphic logo"
                        width={250} height={50} />
                </Link>
            </header>
            <nav className={styles.nav}>
                {desktopLinks.map((link: link) => (
                    <Link key={link.label} href={link.to}> <span className={`${pathname == link.to ? styles.active : ""}  link--underlined`}> {link.label} </span> </Link>))
                }
            </nav>
        </>
    );
}

export default DesktopNav;