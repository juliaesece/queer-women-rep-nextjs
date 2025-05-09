import st from "./footer.module.css"
import { getDiscordLink } from "../utils/getDiscordLink";

export default async function Footer() {
  const discordLink = await getDiscordLink()

  return (
    <footer className={st.footer}>
      <div>
        <p>Hi! This is a work in progress, and is currently not production ready, so you might see some bugs, and the site might break down at times.</p>
        <p>If you&apos;d like to help by reporting some bugs or suggesting some features, or just vibe, you can join the discord <a href={discordLink.link}>here</a> (link valid till {discordLink.validUntil}).</p>
      </div>
    </footer>
  );
}
