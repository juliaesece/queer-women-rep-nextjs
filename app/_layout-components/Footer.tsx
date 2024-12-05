import st from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={st.footer}>
      <p>Hi! This is a work in progress, and is currently not production ready, so you might see some bugs, and the site might break down at times.</p>
      <p>If you&apos;d like to help by reporting some bugs or suggesting some features, or just vibe, you can join the discord <a href="https://discord.gg/5Wq98Bga">here</a> (link valid till Thu 12 Dec 24).</p>
    </footer>
  );
}
