import st from "./footer.module.css"
import { getDiscordLink } from "../utils/getDiscordLink";
import Link from "next/link";

export default async function Footer() {
  const discordLink = await getDiscordLink()

  return (
    <footer className={st.footer}>
      <div>
        <p>Hi! This is a work in progress. Something broken? Please just fill <Link href="https://tally.so/r/wMpeB0">this short anonymous form</Link> and I'll fix it.</p>
        <p>If you&apos;d like to vibe and help build this site, please join the discord <a href={discordLink.link}>here</a>!</p>
      </div>
    </footer>
  );
}
