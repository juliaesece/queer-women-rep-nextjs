"use client"

import { FC } from "react";
import styles from "./mobileNav.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import hamburguer from "@/public/hamburger-icon.svg"
import cruz from "@/public/letterboxd-cruz.svg"
import logo from "@/public/logo192.svg"
import login from "@/public/letterboxd-login.svg"

type link = {
    to: string;
    label: string;
}

interface Props {
    links: link[]
}

const MobileNav: FC<Props> = ({ links }) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const mobileLinks = [
        ...links
    ]

    return (
        <nav className={styles.mobileMenu}>
            <span>
                <Link href="/">
                    <Image
                        priority
                        src={logo}
                        className={styles.mobileMenu__logo}
                        alt="Everything saphic logo, a stylised s"
                        height={55}
                        width={55}
                    />
                </Link>
            </span>
            <span className={styles.mobileMenu__auth_icon}>
                {links[links.length - 1].to === "/signin" ?
                    <Link href={links[links.length - 1].to}>
                        <Image
                            priority
                            src={login}
                            alt="login"
                            height={35}
                            width={35}
                            className={styles.mobileMenu__icon_underlined}
                        />
                    </Link> :
                    <span className={styles.mobileList__loggedIn}>Logged in</span>
                }
            </span>
            <span className={styles.mobileMenu__toggle_open}>
                {menuVisible ?
                    <Image
                        priority
                        src={cruz}
                        alt="Cross menu icon"
                        className={`${styles.mobileMenu__icon_underlined} ${styles.mobileMenu__close_icon}`}
                        aria-label="Close menu"
                        height={35}
                        onClick={() => setMenuVisible(false)}
                    /> :
                    <Image
                        priority
                        src={hamburguer}
                        alt="Hamburguer menu icon"
                        className={styles.mobileMenu__icon_underlined}
                        aria-label="Open menu"
                        height={35}
                        onClick={() => setMenuVisible(true)}
                    />}
            </span>

            {menuVisible &&
                <div className={styles.mobileList}>
                    {mobileLinks.map((link: link) => (
                        <Link className={styles.mobileList__links} onClick={() => setMenuVisible(false)} key={link.label} href={link.to}> <span className={styles.mobileList__text}>{link.label}</span> </Link>))
                    }
                </div>
            }

        </nav>
    );
}

export default MobileNav;