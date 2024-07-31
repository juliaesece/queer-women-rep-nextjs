"use client"

import { FC } from "react";
import styles from "./mobileNav.module.css";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";
import hamburguer from "@/public/hamburger-icon.svg"
import cruz from "@/public/letterboxd-cruz.svg"
import logo from "@/public/logo192.png"
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
    const user = null;
    const mobileLinks = [
        ...links,
        {to: "/add",
        label: "Add to the database"}
    ]
        

    return (
        <nav className={styles.mobileMenu}>
            <span>
                <Image
                    priority
                    src={logo}
                    className={styles.mobileMenu__logo}
                    alt="Queer women rep logo, a stylised q"
                    placeholder="blur"
                    height={50}
                    width={50}
                />
            </span>
            <span>
                {user === null ?
                    <Image
                        priority
                        src={login}
                        alt="login"
                        height={35}
                        width={35}
                        className={styles.mobileMenu__icon_underlined}
                    /> :
                    <p>Logged in</p>
                }
            </span>
            <span className={styles.mobileMenu__close}>
                {menuVisible ?
                    <Image
                        priority
                        src={cruz}
                        alt="Cross menu icon"
                        className={styles.mobileMenu__icon_underlined}
                        height={35}
                        onClick={() => setMenuVisible(false)}
                    /> :
                    <Image
                        priority
                        src={hamburguer}
                        alt="Hamburguer menu icon"
                        className={styles.mobileMenu__icon_underlined}
                        height={35}
                        onClick={() => setMenuVisible(true)}
                    />}
            </span>

            {menuVisible &&
                <div className={styles.mobileList}>
                    {mobileLinks.map((link: link) => (
                        <Link className={styles.mobileList__links} key={link.label} href={link.to}> <span className={styles.mobileList__text}>{link.label}</span> </Link>))
                    }
                </div>
            }

        </nav>
    );
}

export default MobileNav;