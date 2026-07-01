# AuraChat Web Sandbox

A high-fidelity frontend sandbox application for collaborative workspaces. Built using clean, modern web technologies: **HTML5**, **Vanilla CSS3**, and **ES6 Javascript**. 

This application operates completely offline with **zero external dependencies** and persists state locally.

---

## 📦 Version 1.1 Updates

We have shipped **Version 1.1** featuring major premium interactive additions:

*   **Interactive Poll Creator Modal**: Launch a popup modal via `/poll` or the chat bar action. Input questions, add/remove multiple choices, toggle single vs multiple option settings, and vote with real-time animated percentage progress bars.
*   **Tenor GIF Search & Picker Popover**: Click the new GIF picker to search trending animations via Tenor API loops directly from the chat bar, with built-in curated category fallbacks.
*   **Inline Markdown Compiler**: Parse and render bold (`**`), italic (`*`), underline (`__`), strikethrough (`~~`), inline code (`` ` ``), and multiline code blocks (`` ``` ``) with strict HTML escaping for security.
*   **Discord-Replica Floating Profile Cards**: 
    *   **Dynamic Banners**: Custom gradient banners mapped to roles (e.g. Cyberpunk gradients for Developers, Warm Gold for Admins).
    *   **5 Developer Badges**: Mapped custom badge items with hover name tooltips (Verified Creator, Aura Architect, Active Developer, Bug Hunter, Early Supporter).
    *   **Auto-Saving Notes**: Text area notes that persist per-user and save automatically to LocalStorage on change.
    *   **Quick DM Routing**: Shift channels instantly to direct messages with a single button click.
*   **Context-Sensitive Roles**: Server roles show when viewing profiles in servers but hide automatically in DM chats to match native Discord behavior.
*   **Automatic State Migration**: An active data migrator merges default conversations (featuring Charlie, David, and Eva talking to Biswajeet) and members lists into pre-existing LocalStorage data so users see them immediately on load.

---

## 🚀 Key Features

*   **Three-Column Layout:** Implements a sleek desktop-style spacing and layout (Servers list sidebar, Channels list sidebar, Main Chat, and Member list).
*   **Web Audio API Sound Engine:** Uses browser oscillator nodes to synthesize pleasant audio synth UI sound cues (Channel Join, Leave, Mute, and Unmute chimes) with no external audio file requests.
*   **Interactive State & Persistence:** Uses standard `localStorage` to save and restore servers, channels, user profiles, and chat message history.
*   **Interactive Themes:** Seamlessly swap themes in User Settings -> Appearance. Supported styles:
    *   `Classic Dark` (Deep obsidian grey)
    *   `Classic Light` (Clean slate white)
    *   `AMOLED Black` (High contrast obsidian black)
    *   `Cyberpunk` (Neon cyan and magenta accents, monospace headers)
    *   `Forest Glow` (Dark moss green with emerald accents)
*   **User Settings Panel:** Change username, status indicators (Online, Idle, DND, Invisible), select custom profile avatars, and write a custom status message.
*   **Mock Bot Responses:** Type a message and get interactive, delayed responses from `AuroraBot` depending on keywords (e.g. hello, theme, voice, git).
*   **Message Command Engine:** Type slash commands into the chat bar to execute system scripts:
    *   `/help` - Lists available helper commands
    *   `/ping` - Tests latency response
    *   `/roll` - Rolls a 6-sided die
    *   `/theme [theme-name]` - Swaps styling via script
    *   `/poll` - Opens the Poll Creator modal
*   **Emoji Reactions:** Hover over messages to toggle interactive reaction emoji counters with hover menu triggers.

---

## 🛠️ How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Open the developer tools console (`F12`) to view the application logs and initialization banner.
