import { getServerSession } from "next-auth/next"
import { authOptions } from "../utils/authOptions";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default async function NavConductor() {
    const session = await getServerSession(authOptions)

    const links: { to: string, label: string }[] = [
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
        },
        {
            to: "/books",
            label: "Books"
        },
        {
            to: "/add",
            label: "Add a couple"
        },
        {
            to: session ? "/my-account" : "/signin",
            label: session ? "My account" : "Sign in"
        }
    ]

    return (
        <>
            <MobileNav links={links} />
            <DesktopNav links={links} />
        </>
    );
}
