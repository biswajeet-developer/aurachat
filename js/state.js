// state.js - Data structures and persistence for Discord Clone

const DEFAULT_AVATARS = [
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=60", // Developer Man
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60", // Professional Woman
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60", // Happy Guy
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"  // Casual Girl
];

const BOT_AVATAR = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60"; // Abstract art for Bot

const INITIAL_SERVERS = [
    {
        id: "server-1",
        name: "Aura Lounge",
        icon: "AL",
        banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
        channels: [
            { id: "c-1-1", name: "general", type: "text", topic: "General chat for the Aura community" },
            { id: "c-1-2", name: "lounge", type: "text", topic: "Kick back, relax, and talk about anything" },
            { id: "c-1-3", name: "announcements", type: "text", topic: "Official updates and project news" },
            { id: "c-1-4", name: "Lounge Voice", type: "voice" },
            { id: "c-1-5", name: "Gaming Room", type: "voice" }
        ],
        messages: {
            "c-1-1": [
                {
                    id: "m-1",
                    userId: "bot-aurora",
                    username: "AuroraBot",
                    avatar: BOT_AVATAR,
                    content: "Welcome to AuraChat! 🚀 This project is designed to be improved daily. Feel free to chat, join voice channels, and explore settings!",
                    timestamp: "2026-06-29T12:00:00Z",
                    reactions: [{ emoji: "👋", count: 3, users: ["user-1", "user-2", "user-3"] }]
                },
                {
                    id: "m-2",
                    userId: "user-alice",
                    username: "Alice",
                    avatar: DEFAULT_AVATARS[1],
                    content: "Wow, this looks exactly like the desktop app. Love the custom animations!",
                    timestamp: "2026-06-29T12:05:00Z",
                    reactions: [{ emoji: "❤️", count: 1, users: ["user-1"] }]
                }
            ],
            "c-1-2": [
                {
                    id: "m-3",
                    userId: "user-bob",
                    username: "Bob",
                    avatar: DEFAULT_AVATARS[2],
                    content: "Anyone up for coding a new feature today? We could add some custom themes!",
                    timestamp: "2026-06-29T12:10:00Z",
                    reactions: []
                }
            ],
            "c-1-3": [
                {
                    id: "m-4",
                    userId: "bot-aurora",
                    username: "AuroraBot",
                    avatar: BOT_AVATAR,
                    content: "📢 Day 1 Announcement: AuraChat is now online. Persistent state with LocalStorage and Voice Channel Audio synthesis are fully functional!",
                    timestamp: "2026-06-29T11:30:00Z",
                    reactions: [{ emoji: "🔥", count: 4, users: ["user-1", "user-2", "user-alice", "user-bob"] }]
                }
            ]
        },
        members: [
            { id: "user-alice", username: "Alice", status: "online", role: "Admin", avatar: DEFAULT_AVATARS[1] },
            { id: "user-bob", username: "Bob", status: "idle", role: "Moderator", avatar: DEFAULT_AVATARS[2] },
            { id: "bot-aurora", username: "AuroraBot", status: "online", role: "Bot", avatar: BOT_AVATAR }
        ]
    },
    {
        id: "server-2",
        name: "JavaScript Wizards",
        icon: "JS",
        banner: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&auto=format&fit=crop&q=80",
        channels: [
            { id: "c-2-1", name: "general-js", type: "text", topic: "Talk about vanilla JS, engines, and runtimes" },
            { id: "c-2-2", name: "showcase", type: "text", topic: "Show off your JS creations!" },
            { id: "c-2-3", name: "Web Hacking", type: "voice" }
        ],
        messages: {
            "c-2-1": [
                {
                    id: "m-5",
                    userId: "bot-aurora",
                    username: "AuroraBot",
                    avatar: BOT_AVATAR,
                    content: "Welcome to JavaScript Wizards! 🧙‍♂️ Let's build some interactive components.",
                    timestamp: "2026-06-29T12:00:00Z",
                    reactions: []
                }
            ]
        },
        members: [
            { id: "user-alice", username: "Alice", status: "online", role: "Wizard", avatar: DEFAULT_AVATARS[1] },
            { id: "bot-aurora", username: "AuroraBot", status: "online", role: "Bot", avatar: BOT_AVATAR }
        ]
    }
];

const DEFAULT_STATE = {
    servers: INITIAL_SERVERS,
    activeServerId: "server-1",
    activeChannelId: "c-1-1",
    currentUser: {
        id: "current-user-1",
        username: "CoderPro",
        tag: "1337",
        avatar: DEFAULT_AVATARS[0],
        status: "online",
        customStatus: "Coding my AuraChat Sandbox 💻"
    },
    activeVoiceChannelId: null,
    isMuted: false,
    isDeafened: false,
    directMessages: {
        "dm-alice": [
            { id: "dma-1", userId: "user-alice", username: "Alice", avatar: DEFAULT_AVATARS[1], content: "Hey! Did you finish styling the layout?", timestamp: new Date(Date.now() - 3600000).toISOString(), reactions: [] },
            { id: "dma-2", userId: "current-user-1", username: "CoderPro", avatar: DEFAULT_AVATARS[0], content: "Yes! Added glassmorphic styling and transition parameters.", timestamp: new Date(Date.now() - 3000000).toISOString(), reactions: [{ emoji: "🚀", count: 1, users: ["user-alice"] }] },
            { id: "dma-3", userId: "user-alice", username: "Alice", avatar: DEFAULT_AVATARS[1], content: "It looks awesome. Love the premium cyber themes!", timestamp: new Date(Date.now() - 100000).toISOString(), reactions: [] }
        ],
        "dm-bob": [
            { id: "dmb-1", userId: "user-bob", username: "Bob", avatar: DEFAULT_AVATARS[2], content: "Hi coder, are we adding custom sounds?", timestamp: new Date(Date.now() - 7200000).toISOString(), reactions: [] },
            { id: "dmb-2", userId: "current-user-1", username: "CoderPro", avatar: DEFAULT_AVATARS[0], content: "Definitely. I synthesized pleasant audio chimes inside js/audio.js using built-in OscillatorNodes.", timestamp: new Date(Date.now() - 5000000).toISOString(), reactions: [] }
        ],
        "dm-biswajeet": [
            { id: "dmbis-1", userId: "user-biswajeet", username: "Developer Biswajeet", avatar: DEFAULT_AVATARS[0], content: "Hey there! I'm the developer of AuraChat. Ask me anything, request new features, or try running some slash commands here!", timestamp: new Date(Date.now() - 60000).toISOString(), reactions: [] }
        ]
    }
};

class AuraState {
    constructor() {
        this.state = { ...DEFAULT_STATE };
        this.listeners = [];
        this.load();
    }

    // Save to LocalStorage
    save() {
        try {
            const rawJson = JSON.stringify(this.state);
            // Obfuscate / secure string using Base64 encoding to prevent plain-text reading in LocalStorage
            const secureData = window.btoa(unescape(encodeURIComponent(rawJson)));
            localStorage.setItem("aurachat_sandbox_state", secureData);
            this.triggerListeners();
        } catch (e) {
            console.error("Failed to save state to LocalStorage:", e);
        }
    }

    // Load from LocalStorage
    load() {
        try {
            const data = localStorage.getItem("aurachat_sandbox_state");
            if (data) {
                let parsed = null;
                // Attempt to decode Base64 first
                try {
                    const decoded = decodeURIComponent(escape(window.atob(data)));
                    parsed = JSON.parse(decoded);
                } catch (b64Error) {
                    // Fallback: Parse as raw JSON if it's legacy plain text
                    try {
                        parsed = JSON.parse(data);
                    } catch (jsonError) {
                        console.error("Failed to parse legacy JSON state:", jsonError);
                    }
                }

                if (parsed) {
                    // Safe directMessages merge: only retain saved DMs if they have messages, otherwise load default greetings
                    const mergedDMs = { ...DEFAULT_STATE.directMessages };
                    if (parsed.directMessages) {
                        for (const key in parsed.directMessages) {
                            if (Array.isArray(parsed.directMessages[key]) && parsed.directMessages[key].length > 0) {
                                mergedDMs[key] = parsed.directMessages[key];
                            }
                        }
                    }

                    // Deep merge/fallback logic to handle code updates
                    this.state = {
                        ...DEFAULT_STATE,
                        ...parsed,
                        servers: parsed.servers || DEFAULT_STATE.servers,
                        currentUser: { ...DEFAULT_STATE.currentUser, ...parsed.currentUser },
                        directMessages: mergedDMs
                    };
                } else {
                    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
                }
            } else {
                this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
            }
        } catch (e) {
            console.error("Failed to load state, initializing default:", e);
            this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    }

    // Reset State to Default
    reset() {
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        this.save();
    }

    // Listeners for UI state updates
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    triggerListeners() {
        this.listeners.forEach(callback => callback(this.state));
    }

    // State Mutators
    setActiveServer(serverId) {
        this.state.activeServerId = serverId;
        const server = this.state.servers.find(s => s.id === serverId);
        if (server && server.channels.length > 0) {
            // Find first text channel to focus
            const textChan = server.channels.find(c => c.type === "text");
            this.state.activeChannelId = textChan ? textChan.id : server.channels[0].id;
        } else {
            this.state.activeChannelId = null;
        }
        this.save();
    }

    setActiveChannel(channelId) {
        this.state.activeChannelId = channelId;
        this.save();
    }

    addMessage(serverId, channelId, content, senderOverride = null) {
        const server = this.state.servers.find(s => s.id === serverId);
        if (!server) return null;

        if (!server.messages) server.messages = {};
        if (!server.messages[channelId]) server.messages[channelId] = [];

        const sender = senderOverride || {
            userId: this.state.currentUser.id,
            username: this.state.currentUser.username,
            avatar: this.state.currentUser.avatar
        };

        const newMessage = {
            id: "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
            userId: sender.userId,
            username: sender.username,
            avatar: sender.avatar,
            content: content,
            timestamp: new Date().toISOString(),
            reactions: []
        };

        server.messages[channelId].push(newMessage);
        this.save();
        return newMessage;
    }

    addDirectMessage(dmChannelId, content, senderOverride = null) {
        if (!this.state.directMessages) this.state.directMessages = {};
        if (!this.state.directMessages[dmChannelId]) this.state.directMessages[dmChannelId] = [];

        const sender = senderOverride || {
            userId: this.state.currentUser.id,
            username: this.state.currentUser.username,
            avatar: this.state.currentUser.avatar
        };

        const newMsg = {
            id: "dm-msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
            userId: sender.userId,
            username: sender.username,
            avatar: sender.avatar,
            content: content,
            timestamp: new Date().toISOString(),
            reactions: []
        };

        this.state.directMessages[dmChannelId].push(newMsg);
        this.save();
        return newMsg;
    }

    addServer(name, iconText) {
        const newId = "server-" + Date.now();
        const newServer = {
            id: newId,
            name: name,
            icon: iconText || name.split(" ").map(w => w[0]).join("").toUpperCase().substr(0, 3),
            banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
            channels: [
                { id: `c-${newId}-1`, name: "general", type: "text", topic: "Welcome to your new server!" },
                { id: `c-${newId}-2`, name: "Lounge Voice", type: "voice" }
            ],
            messages: {
                [`c-${newId}-1`]: [
                    {
                        id: "m-init-" + newId,
                        userId: "bot-aurora",
                        username: "AuroraBot",
                        avatar: BOT_AVATAR,
                        content: `Welcome to the brand new server: **${name}**! 🎉 Edit channels or invite your friends.`,
                        timestamp: new Date().toISOString(),
                        reactions: []
                    }
                ]
            },
            members: [
                { id: this.state.currentUser.id, username: this.state.currentUser.username, status: "online", role: "Owner", avatar: this.state.currentUser.avatar },
                { id: "bot-aurora", username: "AuroraBot", status: "online", role: "Bot", avatar: BOT_AVATAR }
            ]
        };

        this.state.servers.push(newServer);
        this.state.activeServerId = newId;
        this.state.activeChannelId = `c-${newId}-1`;
        this.save();
        return newServer;
    }

    addChannel(serverId, name, type) {
        const server = this.state.servers.find(s => s.id === serverId);
        if (!server) return null;

        const newId = "chan-" + Date.now();
        const cleanName = name.toLowerCase().replace(/\s+/g, "-");
        const newChannel = {
            id: newId,
            name: type === "text" ? cleanName : name,
            type: type,
            topic: type === "text" ? `Welcome to #${cleanName}!` : ""
        };

        server.channels.push(newChannel);
        
        if (type === "text") {
            if (!server.messages) server.messages = {};
            server.messages[newId] = [
                {
                    id: "m-init-" + newId,
                    userId: "bot-aurora",
                    username: "AuroraBot",
                    avatar: BOT_AVATAR,
                    content: `Welcome to the start of the **#${cleanName}** channel!`,
                    timestamp: new Date().toISOString(),
                    reactions: []
                }
            ];
            this.state.activeChannelId = newId;
        }
        
        this.save();
        return newChannel;
    }

    toggleVoiceChannel(channelId) {
        if (this.state.activeVoiceChannelId === channelId) {
            this.state.activeVoiceChannelId = null;
        } else {
            this.state.activeVoiceChannelId = channelId;
        }
        this.save();
    }

    setMute(val) {
        this.state.isMuted = val;
        this.save();
    }

    setDeafen(val) {
        this.state.isDeafened = val;
        if (val) {
            // Deafening automatically mutes too, standard voice hub behavior
            this.state.isMuted = true;
        }
        this.save();
    }

    updateUserProfile(username, status, customStatus, avatarIndexOrUrl = 0) {
        this.state.currentUser.username = username || this.state.currentUser.username;
        this.state.currentUser.status = status || this.state.currentUser.status;
        this.state.currentUser.customStatus = customStatus !== undefined ? customStatus : this.state.currentUser.customStatus;
        if (typeof avatarIndexOrUrl === 'string') {
            this.state.currentUser.avatar = avatarIndexOrUrl;
        } else if (avatarIndexOrUrl >= 0 && avatarIndexOrUrl < DEFAULT_AVATARS.length) {
            this.state.currentUser.avatar = DEFAULT_AVATARS[avatarIndexOrUrl];
        }
        
        // Update user in all servers' member lists
        this.state.servers.forEach(server => {
            const self = server.members.find(m => m.id === this.state.currentUser.id);
            if (self) {
                self.username = this.state.currentUser.username;
                self.status = this.state.currentUser.status;
                self.avatar = this.state.currentUser.avatar;
            }
        });
        
        this.save();
    }

    addReaction(serverId, channelId, messageId, emoji) {
        const server = this.state.servers.find(s => s.id === serverId);
        if (!server || !server.messages || !server.messages[channelId]) return;

        const message = server.messages[channelId].find(m => m.id === messageId);
        if (!message) return;

        if (!message.reactions) message.reactions = [];
        
        const existingReaction = message.reactions.find(r => r.emoji === emoji);
        const userId = this.state.currentUser.id;

        if (existingReaction) {
            if (existingReaction.users.includes(userId)) {
                // Remove reaction if already reacted (toggle behavior)
                existingReaction.users = existingReaction.users.filter(u => u !== userId);
                existingReaction.count--;
                if (existingReaction.count <= 0) {
                    message.reactions = message.reactions.filter(r => r.emoji !== emoji);
                }
            } else {
                existingReaction.users.push(userId);
                existingReaction.count++;
            }
        } else {
            message.reactions.push({
                emoji: emoji,
                count: 1,
                users: [userId]
            });
        }

        this.save();
    }
}

// Export for usage in window context since we are doing pure ES6/Script inclusion
window.AuraState = AuraState;
window.DEFAULT_AVATARS = DEFAULT_AVATARS;
window.BOT_AVATAR = BOT_AVATAR;
