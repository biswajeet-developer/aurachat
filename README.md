# AuraChat Web Sandbox

A high-fidelity frontend sandbox application for collaborative workspaces. Built using clean, modern web technologies: **HTML5**, **Vanilla CSS3**, and **ES6 Javascript**. 

This application operates completely offline with **zero external dependencies** and persists state locally.

---

## 📦 Version 1.6 Updates

We have shipped **Version 1.6** introducing collaborative social systems and popover container fixes:

*   **Discord-Style Friends List Tabs**: Added a dedicated Friends view to the Home Dashboard, featuring sub-tabs for: **Online**, **All**, **Pending**, and **Add Friend**. Supports dynamic search filtering, direct DM launching, and friend removal.
*   **Friend Requests System**: Sends requests to tag strings (e.g. `Charlie#4321`, `David#9999`) with simulated outgoing success sounds. Incoming requests show a pending badge count, support Accept/Decline actions, and auto-accept simulated responses.
*   **Group DM Channels**: Click the "Create Group DM" modal button to select multiple friends, name the group, and chat. Includes mock bot replies where group participants automatically text back inside the channel.
*   **Restricted DM Mentions**: Autocomplete suggestions and compiled mention pills inside Direct Messages are now strictly constrained to participants of that active conversation.
*   **Interactive Mention Click Profiles**: Click on any `@name` mention pill in chat history to instantly resolve their card and toggle their User Profile Card open.
*   **Non-Clipping Badge Tooltips**: Shifted the user profile popover container to `overflow: visible;` and moved scrolling constraints to the inner content panel, preventing badge tooltips from being clipped at the card boundaries. Badge tooltips now align their right edges with their icons, extending leftward to avoid viewport edge overlaps.

---

## 📦 Version 1.5 Updates

We have shipped **Version 1.5** introducing premium interactive additions, sound engines, and status presence:

*   **Slash Autocomplete & Parameter Options**: Added a premium contextual autocomplete popover. When typing `/` in the chat input, a popup lists available commands. Adding a space after commands (like `/theme`) dynamically displays parameter sub-options (like `dark`, `light`, `amoled`, `cyberpunk`, `forest`).
*   **Instant Execution Flow**: Selecting a command or option immediately submits and executes it, closing the popover and clearing the input in a single, unified action.
*   **Synthesized Voice Soundboard**: Connected a Soundboard popover to the voice channel panel. Synthesizes 6 distinct, high-quality audio clips in real-time using Web Audio API oscillator and gain nodes: Airhorn (oscillating sawtooth blasts), Cricket (swept sines), Quack (filtered sweeps), Laser (pitch drop), Success (arpeggio), and Sad Trombone (descending vibrato).
*   **Member Sidebar Rich Presence**: Mapped real-time custom activities (e.g., *Playing Minecraft*, *Listening to Spotify*) directly under users' names in the server member list.

---

## 📦 Version 1.4 Updates

We have shipped **Version 1.4** introducing hardware-accelerated transitions and organic micro-animations:

*   **Springy Server Icons**: Enhanced server icons in the left sidebar with bouncy transitions and scale scaling (scaling to `1.08` on hover) using custom cubic-beziers.
*   **Dynamic Message Slide-In**: Newly added chat messages (created within the last 3 seconds) slide-fade dynamically into the scroll area, while historical records load instantly to prevent page load jitter.
*   **Tactile Reaction Chip Pop**: Reaction count buttons pop up to `1.22` scale on click to offer satisfying, bouncy tactile feedback.
*   **Zoom-Spring Popovers**: Animated entry zoom transitions automatically apply when opening the Emoji Picker, Pinned Messages list, GIF panel, and User Profile cards.
*   **Voice Channel Glow Pulse**: Speaking users inside voice hangs flash an organic, expanding green glow ring wave.
*   **Mute & Deafen Button Shake**: Controls in the bottom panel scale and rotate slightly when hovered.
*   **Reduced Motion Guard**: Configured media queries to automatically suppress all animations when standard OS-level accessibility motion configurations are enabled.

---

## 📦 Version 1.3 Updates

We have shipped **Version 1.3** featuring the Premium Chat Overhaul and action bar refinement updates:

*   **Unified Emoji Picker**: Click the smiley button on the chat input area to open a searchable, categorized popover (Smileys, Gestures, Objects) with mouse hover name/shortcode detail previews, supporting caret-position emoji insertion.
*   **Message Actions & Inline Editing**: Adds a floating actions bar to message cards on hover, featuring Add Reaction, Pin, Edit, and Delete controls. Modify your own messages in-place with instant keyboard listeners and an `(edited)` indicator tag.
*   **Interactive Pinned Messages**: Pin any message to view it inside a dedicated popover list accessed from the chat header. Click pinned items to smoothly scroll directly to the message with a glowing focal pulse.
*   **Media Attachments Drawer**: Click the `+` attachment button or drag-and-drop files anywhere on the workspace to stage file queues with thumbnail/file-icon preview cards. Uploaded files render directly inline as images or download links.
*   **Rich Link Previews**: Auto-detects URLs to compile OpenGraph-style embed cards for images, YouTube video links (rendering playable inline `iframe` video players), and GitHub repositories (displaying star/fork counts and language badges).
*   **Centered Action Tooltips**: Repositioned action bar tooltips to be centered directly above the buttons and resolved tooltip clipping bugs by removing `overflow: hidden` constraints from the action bar.

---

## 📦 Version 1.2 Updates

We have shipped **Version 1.2** with premium visual overhauls and layout stability fixes:

*   **Premium Glassmorphic Profiles**: Upgraded floating user profile cards to use a modern, translucent design utilizing CSS backdrop blur filters, glowing border accents, continuous diagonal header banner shimmers, and subtle 3D hover rotations on avatars.
*   **Member Since (Joined Dates)**: Integrated a dedicated `MEMBER SINCE` date display section on all profiles, rendering account and server join dates with modern outline styling and inline calendar/shield icons.
*   **Dynamic Custom Profile Fields**: Added detailed structural user info blocks on profile cards (e.g. *Active Projects*, *Primary Stack*, *Hobbies*, *Interests*, and *Hosting Context* depending on who you click).
*   **Constrained Badge Wrapping**: Implemented a constrained flex wrapping container for profile badges with a translucent dark grouping background plate. This prevents badge trays from overlapping user avatars when viewing profiles with many badges (such as Biswajeet's 8 badges).
*   **Non-Clipping Hover Tooltips**: Overrode general tooltip offsets for profile badges, centering tooltips directly above the badge card icons and removing `overflow: hidden;` clipping boundaries from the main popover card.
*   **Smart User Scroll Snapping**: Maintained scroll position stability during general state updates (like reactions, bots replying, and clicking bios) but forced a scroll-to-bottom snap when the user submits their own text, GIFs, or poll cards.
*   **Theme Transitions**: Added CSS transitions across body backgrounds, sidebars, headers, and modal cards for a smooth fade transition instead of snapping instantly.
*   **Glassmorphic Modals**: Upgraded standard modals (User Settings, Create Server, Create Channel, and Cropper Viewport) to match the glassmorphic card design.
*   **Auto-Growing Textarea & Shift+Enter support**: Converted the message input field to an auto-growing textarea that expands dynamically as you type (up to 200px height) and supports multi-line typing via Shift+Enter, while Enter submits.
*   **Copy-Button Code Blocks**: Refactored the code block compiler to support language headers and an interactive "Copy" button that copy block contents to the clipboard.
*   **Viewing Older Messages Banner**: Implemented a floating scroll banner that fades in when scrolling up in channels, allowing users to smoothly scroll back to the bottom when clicked.
*   **Dynamic Profile Positioning & Viewport Bounds**: Solved vertical popover clipping by dynamically measuring rendered profile card offset heights and applying safety viewport constraints so cards never go offscreen.
*   **Sleek Custom Scrollbars (Chunky Space Fix)**: Replaced default chunky scrollbar tracks with thin transparent scrollbar thumbs that fade in only on hover, eliminating the horizontal gap between panels.
*   **Locked Horizontal Scrolling**: Completely locked horizontal scrolling on the messages, servers, and channels sidebar views, keeping content centered and stable.

---

## 📦 Version 1.1 Updates

*   **Interactive Poll Creator Modal**: Launch a popup modal via `/poll` or the chat bar action. Input questions, add/remove multiple choices, toggle single vs multiple option settings, and vote with real-time animated percentage progress bars.
*   **Tenor GIF Search & Picker Popover**: Click the new GIF picker to search trending animations via Tenor API loops directly from the chat bar, with built-in curated category fallbacks.
*   **Inline Markdown Compiler**: Parse and render bold (`**`), italic (`*`), underline (`__`), strikethrough (`~~`), inline code (`` ` ``), and multiline code blocks (`` ``` ``) with strict HTML escaping for security.
*   **Rich Floating Profile Cards**: 
    *   **Dynamic Banners**: Custom gradient banners mapped to roles (e.g. Cyberpunk gradients for Developers, Warm Gold for Admins).
    *   **5 Developer Badges**: Mapped custom badge items with hover name tooltips (Verified Creator, Aura Architect, Active Developer, Bug Hunter, Early Supporter).
    *   **Auto-Saving Notes**: Text area notes that persist per-user and save automatically to LocalStorage on change.
    *   **Quick DM Routing**: Shift channels instantly to direct messages with a single button click.
*   **Context-Sensitive Roles**: Server roles show when viewing profiles in servers but hide automatically in DM chats to match native chat client behavior.
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
