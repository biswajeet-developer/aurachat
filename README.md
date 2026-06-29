# AuraChat Web Sandbox

A high-fidelity frontend sandbox application for collaborative workspaces. Built using clean, modern web technologies: **HTML5**, **Vanilla CSS3**, and **ES6 Javascript**. 

This application operates completely offline with **zero external dependencies** and persists state locally.

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
*   **Emoji Reactions:** Hover over messages to toggle interactive reaction emoji counters.

---

## 🛠️ How to Run

1.  Navigate to the directory `C:\Github projects\discord-clone\`.
2.  Double-click [index.html](file:///C:/Github%20projects/discord-clone/index.html) to open the application in any modern web browser.
3.  Press `F12` to open the developer tools console and view the console banner and initialization logs.

---

## 📈 Ideas for Your Daily Contributions

This project is built to be a canvas you can improve every day. Here are daily micro-features you can commit to keep your streak green:

*   **Day 1 (Rich Media Support):** Modify `ui.js` to parse URL links ending in `.png`, `.jpg`, or `.gif` and render them as inline image attachments in the chat card.
*   **Day 2 (Direct Messages Expansion):** Add an input field to search and open fresh chat sessions with custom usernames under the Direct Messages header.
*   **Day 3 (Delete & Edit Messages):** Add a hover edit and delete button next to your own messages in the chat area.
*   **Day 4 (Typing Indicator):** Add a delayed typing indicator footer (e.g. *"AuroraBot is typing..."*) when waiting for mock bot replies.
*   **Day 5 (Custom Themes Palette):** Add your own custom theme (e.g. *Dracula*, *Nord*, or *Solarized*) to `style.css` and the settings menu.
*   **Day 6 (Markdown Parser):** Add basic Markdown parsing in `ui.js` to support bold (`**text**`), italics (`*text*`), and inline code blocks (`` `code` ``).
*   **Day 7 (Server Deletion):** Right-click or long-press a server icon to trigger a context menu allowing you to leave or delete that server.
