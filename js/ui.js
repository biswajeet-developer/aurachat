// ui.js - Orchestrates DOM manipulation, event binding, and application logic

class AuraUI {
    constructor(stateInstance, audioInstance) {
        this.stateManager = stateInstance;
        this.audio = audioInstance;
        
        // Cache DOM elements
        this.dom = {
            body: document.body,
            serversList: document.getElementById('servers-list'),
            btnHome: document.getElementById('btn-home'),
            btnServerSettings: document.getElementById('btn-server-settings'),
            serverHeaderName: document.getElementById('server-header-name'),
            channelsListContainer: document.getElementById('channels-list-container'),
            
            // User Panel Footer
            userPanelAvatar: document.getElementById('user-panel-avatar'),
            userPanelStatus: document.getElementById('user-panel-status'),
            userPanelUsername: document.getElementById('user-panel-username'),
            userPanelCustomStatus: document.getElementById('user-panel-custom-status'),
            btnMute: document.getElementById('btn-mute'),
            btnDeafen: document.getElementById('btn-deafen'),
            btnUserSettings: document.getElementById('btn-user-settings'),
            
            // Chat area
            chatPaneMain: document.getElementById('chat-pane-main'),
            chatHeaderTitle: document.getElementById('chat-header-title'),
            chatHeaderDescription: document.getElementById('chat-header-description'),
            headerIconType: document.getElementById('header-icon-type'),
            messagesList: document.getElementById('messages-list'),
            messagesContainer: document.getElementById('messages-container'),
            chatForm: document.getElementById('chat-form'),
            messageInput: document.getElementById('message-input'),
            searchMessages: document.getElementById('search-messages'),
            btnToggleMembers: document.getElementById('btn-toggle-members'),
            membersSidebar: document.getElementById('members-sidebar'),
            membersListContainer: document.getElementById('members-list-container'),
            
            // Voice Connected Banner
            voiceBanner: document.getElementById('voice-banner'),
            voiceBannerChannelName: document.getElementById('voice-banner-channel-name'),
            voiceBannerMute: document.getElementById('voice-banner-mute'),
            voiceBannerDisconnect: document.getElementById('voice-banner-disconnect'),
            
            // Modals
            modalAddServer: document.getElementById('modal-add-server'),
            btnAddServer: document.getElementById('btn-add-server'),
            btnCancelServer: document.getElementById('btn-cancel-server'),
            btnCreateServer: document.getElementById('btn-create-server'),
            serverNameInput: document.getElementById('server-name-input'),
            serverIconInput: document.getElementById('server-icon-input'),
            
            modalAddChannel: document.getElementById('modal-add-channel'),
            btnCancelChannel: document.getElementById('btn-cancel-channel'),
            btnCreateChannel: document.getElementById('btn-create-channel'),
            channelNameInput: document.getElementById('channel-name-input'),
            typeCardText: document.getElementById('type-card-text'),
            typeCardVoice: document.getElementById('type-card-voice'),
            modalChannelTypePrefix: document.getElementById('modal-channel-type-prefix'),
            
            modalSettings: document.getElementById('modal-settings'),
            btnCloseSettings: document.getElementById('btn-close-settings'),
            settingsAvatarPreview: document.getElementById('settings-avatar-preview'),
            settingsUsernameDisplay: document.getElementById('settings-username-display'),
            settingsTagDisplay: document.getElementById('settings-tag-display'),
            avatarOptionsList: document.getElementById('avatar-options-list'),
            settingsUsername: document.getElementById('settings-username'),
            settingsCustomStatus: document.getElementById('settings-custom-status'),
            settingsStatusSelect: document.getElementById('settings-status-select'),
            navMyAccount: document.getElementById('nav-my-account'),
            navAppearance: document.getElementById('nav-appearance'),
            navResetData: document.getElementById('nav-reset-data'),
            tabMyAccount: document.getElementById('tab-my-account'),
            tabAppearance: document.getElementById('tab-appearance')
        };

        this.selectedChannelType = "text"; // modal state
        this.selectedAvatarIndex = 0; // modal state
    }

    init() {
        // Subscribe to state updates
        this.stateManager.subscribe((state) => this.render(state));
        
        // Initial setup
        this.bindEvents();
        this.render(this.stateManager.state);
        
        // Load initial theme from localStorage
        const savedTheme = localStorage.getItem("aurachat_sandbox_theme") || "theme-dark";
        this.setTheme(savedTheme);
    }

    setTheme(themeName) {
        this.dom.body.className = themeName;
        localStorage.setItem("aurachat_sandbox_theme", themeName);
        
        // Update active class in appearance options
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.getAttribute('data-theme') === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    bindEvents() {
        // Server Navigation switching
        this.dom.btnHome.addEventListener('click', () => {
            this.stateManager.setActiveServer(null);
            this.dom.btnHome.classList.add('active');
        });

        // Chat Form Submission
        this.dom.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.dom.messageInput.value.trim();
            if (!text) return;

            this.dom.messageInput.value = "";
            const currentServerId = this.stateManager.state.activeServerId;
            const currentChannelId = this.stateManager.state.activeChannelId;

            if (currentServerId && currentChannelId) {
                // Add message
                const msg = this.stateManager.addMessage(currentServerId, currentChannelId, text);
                
                // Parse commands
                if (text.startsWith('/')) {
                    this.handleCommand(text, currentServerId, currentChannelId);
                } else {
                    // Trigger mock replies
                    this.triggerMockReply(text, currentServerId, currentChannelId);
                }
            }
        });

        // Mute / Deafen controls
        this.dom.btnMute.addEventListener('click', () => {
            const isMuted = !this.stateManager.state.isMuted;
            this.stateManager.setMute(isMuted);
            if (isMuted) {
                this.audio.playMute();
            } else {
                this.audio.playUnmute();
            }
        });

        this.dom.btnDeafen.addEventListener('click', () => {
            const isDeafened = !this.stateManager.state.isDeafened;
            this.stateManager.setDeafen(isDeafened);
            if (isDeafened) {
                this.audio.playMute();
            } else {
                this.audio.playUnmute();
            }
        });

        // Voice Banner controls
        this.dom.voiceBannerDisconnect.addEventListener('click', () => {
            const currentVoiceId = this.stateManager.state.activeVoiceChannelId;
            if (currentVoiceId) {
                this.stateManager.toggleVoiceChannel(currentVoiceId);
                this.audio.playLeave();
            }
        });

        this.dom.voiceBannerMute.addEventListener('click', () => {
            const isMuted = !this.stateManager.state.isMuted;
            this.stateManager.setMute(isMuted);
            if (isMuted) {
                this.audio.playMute();
            } else {
                this.audio.playUnmute();
            }
        });

        // Toggle Member list
        this.dom.btnToggleMembers.addEventListener('click', () => {
            this.dom.membersSidebar.classList.toggle('hidden');
        });

        // Modal Open Events
        this.dom.btnAddServer.addEventListener('click', () => {
            this.dom.modalAddServer.classList.remove('hidden');
            this.dom.serverNameInput.focus();
        });

        this.dom.btnUserSettings.addEventListener('click', () => {
            this.openSettingsModal();
        });

        // Modal Close Events
        this.dom.btnCancelServer.addEventListener('click', () => {
            this.dom.modalAddServer.classList.add('hidden');
        });
        
        this.dom.btnCancelChannel.addEventListener('click', () => {
            this.dom.modalAddChannel.classList.add('hidden');
        });

        this.dom.btnCloseSettings.addEventListener('click', () => {
            this.closeSettingsModal();
        });

        // Modal submission - Create Server
        this.dom.btnCreateServer.addEventListener('click', () => {
            const name = this.dom.serverNameInput.value.trim();
            const icon = this.dom.serverIconInput.value.trim().toUpperCase();
            if (name) {
                this.stateManager.addServer(name, icon || null);
                this.dom.serverNameInput.value = "";
                this.dom.serverIconInput.value = "";
                this.dom.modalAddServer.classList.add('hidden');
            }
        });

        // Modal submission - Create Channel
        this.dom.btnCreateChannel.addEventListener('click', () => {
            const name = this.dom.channelNameInput.value.trim();
            const currentServerId = this.stateManager.state.activeServerId;
            if (name && currentServerId) {
                this.stateManager.addChannel(currentServerId, name, this.selectedChannelType);
                this.dom.channelNameInput.value = "";
                this.dom.modalAddChannel.classList.add('hidden');
            }
        });

        // Channel creation type selectors
        this.dom.typeCardText.addEventListener('click', () => {
            this.selectedChannelType = "text";
            this.dom.typeCardText.classList.add('active');
            this.dom.typeCardVoice.classList.remove('active');
            this.dom.modalChannelTypePrefix.setAttribute('data-lucide', 'hash');
            lucide.createIcons();
        });

        this.dom.typeCardVoice.addEventListener('click', () => {
            this.selectedChannelType = "voice";
            this.dom.typeCardVoice.classList.add('active');
            this.dom.typeCardText.classList.remove('active');
            this.dom.modalChannelTypePrefix.setAttribute('data-lucide', 'volume-2');
            lucide.createIcons();
        });

        // Settings Tabs navigation
        this.dom.navMyAccount.addEventListener('click', () => {
            this.dom.navMyAccount.classList.add('active');
            this.dom.navAppearance.classList.remove('active');
            this.dom.tabMyAccount.classList.remove('hidden');
            this.dom.tabAppearance.classList.add('hidden');
        });

        this.dom.navAppearance.addEventListener('click', () => {
            this.dom.navAppearance.classList.add('active');
            this.dom.navMyAccount.classList.remove('active');
            this.dom.tabAppearance.classList.remove('hidden');
            this.dom.tabMyAccount.classList.add('hidden');
        });

        this.dom.navResetData.addEventListener('click', () => {
            if (confirm("Are you sure you want to reset all app data? This will clear custom servers, channels, and logs.")) {
                this.stateManager.reset();
                this.closeSettingsModal();
            }
        });

        // Theme selector buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedTheme = btn.getAttribute('data-theme');
                this.setTheme(selectedTheme);
            });
        });

        // Search Messages
        this.dom.searchMessages.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.renderMessagesList(this.stateManager.state, query);
        });

        // Handle Escape keys to close modals
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.dom.modalAddServer.classList.add('hidden');
                this.dom.modalAddChannel.classList.add('hidden');
                this.closeSettingsModal();
            }
        });
    }

    // Modal helpers
    openSettingsModal() {
        const user = this.stateManager.state.currentUser;
        this.dom.settingsUsername.value = user.username;
        this.dom.settingsCustomStatus.value = user.customStatus || "";
        this.dom.settingsStatusSelect.value = user.status;
        this.dom.settingsUsernameDisplay.innerText = user.username;
        this.dom.settingsTagDisplay.innerText = `#${user.tag}`;
        this.dom.settingsAvatarPreview.src = user.avatar;
        
        // Find avatar index
        this.selectedAvatarIndex = window.DEFAULT_AVATARS.indexOf(user.avatar);
        if (this.selectedAvatarIndex === -1) this.selectedAvatarIndex = 0;

        // Render avatar list
        this.dom.avatarOptionsList.innerHTML = "";
        window.DEFAULT_AVATARS.forEach((avUrl, index) => {
            const img = document.createElement('img');
            img.src = avUrl;
            img.alt = `Avatar option ${index + 1}`;
            img.className = `avatar-opt ${index === this.selectedAvatarIndex ? 'selected' : ''}`;
            img.addEventListener('click', () => {
                this.selectedAvatarIndex = index;
                document.querySelectorAll('.avatar-opt').forEach((o, i) => {
                    o.classList.toggle('selected', i === index);
                });
                this.dom.settingsAvatarPreview.src = avUrl;
            });
            this.dom.avatarOptionsList.appendChild(img);
        });

        this.dom.modalSettings.classList.remove('hidden');
    }

    closeSettingsModal() {
        if (this.dom.modalSettings.classList.contains('hidden')) return;
        
        // Save changes on close
        const username = this.dom.settingsUsername.value.trim();
        const customStatus = this.dom.settingsCustomStatus.value.trim();
        const status = this.dom.settingsStatusSelect.value;
        
        this.stateManager.updateUserProfile(username, status, customStatus, this.selectedAvatarIndex);
        this.dom.modalSettings.classList.add('hidden');
    }

    // Command Parser
    handleCommand(text, serverId, channelId) {
        const tokens = text.split(/\s+/);
        const command = tokens[0].toLowerCase();
        
        const systemSender = {
            userId: 'bot-nova',
            username: 'Nova',
            avatar: window.BOT_AVATAR
        };

        switch (command) {
            case '/help':
                this.stateManager.addMessage(serverId, channelId, 
                    "🤖 **Available commands:**\n" + 
                    "`/help` - Show this guide\n" + 
                    "`/ping` - Test server response\n" + 
                    "`/roll` - Roll a 6-sided die\n" + 
                    "`/theme [name]` - Swap styling (`dark`, `light`, `amoled`, `cyberpunk`, `forest`)\n" +
                    "`/clear` - Log a clear command instruction", 
                    systemSender
                );
                break;
            case '/ping':
                this.stateManager.addMessage(serverId, channelId, "🏓 **Pong!** Response latency: `4ms`", systemSender);
                break;
            case '/roll':
                const roll = Math.floor(Math.random() * 6) + 1;
                this.stateManager.addMessage(serverId, channelId, `🎲 You rolled a **${roll}**!`, systemSender);
                break;
            case '/theme':
                const specifiedTheme = tokens[1] ? tokens[1].toLowerCase() : '';
                const map = {
                    'dark': 'theme-dark', 'light': 'theme-light', 'amoled': 'theme-amoled',
                    'cyberpunk': 'theme-cyberpunk', 'forest': 'theme-forest'
                };
                if (map[specifiedTheme]) {
                    this.setTheme(map[specifiedTheme]);
                    this.stateManager.addMessage(serverId, channelId, `🎨 Shifted UI theme to **${specifiedTheme}**!`, systemSender);
                } else {
                    this.stateManager.addMessage(serverId, channelId, "⚠️ Theme options: `dark`, `light`, `amoled`, `cyberpunk`, `forest`", systemSender);
                }
                break;
            default:
                this.stateManager.addMessage(serverId, channelId, `⚠️ Command \`${command}\` not recognized. Type \`/help\` for assistance.`, systemSender);
                break;
        }
    }

    // Mock bot responses
    triggerMockReply(userInput, serverId, channelId) {
        // Wait 1.5 seconds, then reply as bot
        setTimeout(() => {
            const cleanInput = userInput.toLowerCase();
            let replyText = "";

            if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                replyText = "Hello! 👋 Welcome to my corner of the internet. Hope you are enjoying AuraChat!";
            } else if (cleanInput.includes("voice") || cleanInput.includes("audio")) {
                replyText = "🔊 Try clicking one of the voice channels (like *Lounge Voice*). You'll hear authentic audio synthesis cues built from the browser Web Audio API!";
            } else if (cleanInput.includes("github") || cleanInput.includes("contribution")) {
                replyText = "📈 Keep making progress and pushing commits! Every feature counts towards making your github history look green and shiny.";
            } else if (cleanInput.includes("theme") || cleanInput.includes("color")) {
                replyText = "🎨 Open **User Settings** (gear icon bottom left) and head to **Appearance** to try out the custom themes (Cyberpunk is my personal favorite)!";
            } else {
                // Random default helper reply
                const replies = [
                    "Nice! That sounds interesting.",
                    "Have you tried editing your user profile in settings? You can change your name, avatar, and custom status.",
                    "If you ever want a fresh canvas, click User Settings -> Reset App Data to start clean.",
                    "I am a simulated bot response running completely client-side. Real-time updates are saved to LocalStorage!",
                    "Try using the `/roll` command to test my command processing engine."
                ];
                replyText = replies[Math.floor(Math.random() * replies.length)];
            }

            this.stateManager.addMessage(serverId, channelId, replyText, {
                userId: 'bot-aurora',
                username: 'AuroraBot',
                avatar: window.BOT_AVATAR
            });
        }, 1500);
    }

    // RENDERING LOGIC
    render(state) {
        // Render server icons
        this.renderServersList(state);

        // Render active server channel list
        this.renderChannelsList(state);

        // Render user footer panel
        this.renderUserPanel(state);

        // Render active chat pane content
        this.renderChatPane(state);

        // Render member sidebar
        this.renderMembersSidebar(state);

        // Create lucide icons
        lucide.createIcons();
    }

    renderServersList(state) {
        this.dom.serversList.innerHTML = "";
        
        // Update Home button active state
        if (!state.activeServerId) {
            this.dom.btnHome.classList.add('active');
        } else {
            this.dom.btnHome.classList.remove('active');
        }

        state.servers.forEach(server => {
            const btn = document.createElement('button');
            btn.className = `server-icon ${state.activeServerId === server.id ? 'active' : ''}`;
            btn.setAttribute('data-tooltip', server.name);
            
            // Check if server has icon characters or image
            if (server.icon.startsWith('http') || server.icon.startsWith('data:')) {
                const img = document.createElement('img');
                img.src = server.icon;
                img.alt = server.name;
                btn.appendChild(img);
            } else {
                btn.innerText = server.icon;
            }

            btn.addEventListener('click', () => {
                this.stateManager.setActiveServer(server.id);
            });

            this.dom.serversList.appendChild(btn);
        });
    }

    renderChannelsList(state) {
        this.dom.channelsListContainer.innerHTML = "";
        
        if (!state.activeServerId) {
            // Home / DMs Mode
            this.dom.serverHeaderName.innerText = "Home Dashboard";
            this.dom.btnServerSettings.classList.add('hidden');
            
            const dmHeader = document.createElement('div');
            dmHeader.className = "channel-section-header";
            dmHeader.innerHTML = `<span class="channel-section-title">Direct Messages</span>`;
            this.dom.channelsListContainer.appendChild(dmHeader);

            const dmList = document.createElement('div');
            dmList.className = "channel-list";
            
            // Render virtual direct messaging options (Alice and Bob)
            const dms = [
                { id: "dm-alice", username: "Alice", avatar: window.DEFAULT_AVATARS[1], status: "online" },
                { id: "dm-bob", username: "Bob", avatar: window.DEFAULT_AVATARS[2], status: "idle" }
            ];

            dms.forEach(dm => {
                const item = document.createElement('div');
                item.className = `channel-item ${state.activeChannelId === dm.id ? 'active' : ''}`;
                item.innerHTML = `
                    <div class="channel-item-left">
                        <div class="avatar-container" style="width:20px; height:20px;">
                            <img src="${dm.avatar}" class="user-avatar">
                            <div class="status-dot ${dm.status}" style="width:8px; height:8px; border-width:1px;"></div>
                        </div>
                        <span class="channel-item-name">${dm.username}</span>
                    </div>
                `;
                item.addEventListener('click', () => {
                    this.stateManager.setActiveChannel(dm.id);
                });
                dmList.appendChild(item);
            });
            this.dom.channelsListContainer.appendChild(dmList);
            return;
        }

        // Server Mode
        const activeServer = state.servers.find(s => s.id === state.activeServerId);
        if (!activeServer) return;

        this.dom.serverHeaderName.innerText = activeServer.name;
        this.dom.btnServerSettings.classList.remove('hidden');

        // Text Channels Section
        const textHeader = document.createElement('div');
        textHeader.className = "channel-section-header";
        textHeader.innerHTML = `
            <span class="channel-section-title"><i data-lucide="chevron-down" style="width:12px; height:12px;"></i> Text Channels</span>
            <button class="add-channel-btn" id="btn-add-channel-text" data-tooltip="Create Channel" aria-label="Add Text Channel">
                <i data-lucide="plus" style="width:14px; height:14px;"></i>
            </button>
        `;
        this.dom.channelsListContainer.appendChild(textHeader);

        const textList = document.createElement('div');
        textList.className = "channel-list";

        activeServer.channels.filter(c => c.type === "text").forEach(c => {
            const item = document.createElement('div');
            item.className = `channel-item ${state.activeChannelId === c.id ? 'active' : ''}`;
            item.innerHTML = `
                <div class="channel-item-left">
                    <i data-lucide="hash"></i>
                    <span class="channel-item-name">${c.name}</span>
                </div>
            `;
            item.addEventListener('click', () => {
                this.stateManager.setActiveChannel(c.id);
            });
            textList.appendChild(item);
        });
        this.dom.channelsListContainer.appendChild(textList);

        // Voice Channels Section
        const voiceHeader = document.createElement('div');
        voiceHeader.className = "channel-section-header";
        voiceHeader.style.marginTop = "16px";
        voiceHeader.innerHTML = `
            <span class="channel-section-title"><i data-lucide="chevron-down" style="width:12px; height:12px;"></i> Voice Channels</span>
            <button class="add-channel-btn" id="btn-add-channel-voice" data-tooltip="Create Channel" aria-label="Add Voice Channel">
                <i data-lucide="plus" style="width:14px; height:14px;"></i>
            </button>
        `;
        this.dom.channelsListContainer.appendChild(voiceHeader);

        const voiceList = document.createElement('div');
        voiceList.className = "channel-list";

        activeServer.channels.filter(c => c.type === "voice").forEach(c => {
            const isConnected = state.activeVoiceChannelId === c.id;
            const item = document.createElement('div');
            item.className = `channel-item ${isConnected ? 'active' : ''}`;
            item.innerHTML = `
                <div class="channel-item-left">
                    <i data-lucide="volume-2"></i>
                    <span class="channel-item-name">${c.name}</span>
                </div>
            `;
            
            item.addEventListener('click', () => {
                const wasConnected = state.activeVoiceChannelId === c.id;
                this.stateManager.toggleVoiceChannel(c.id);
                if (wasConnected) {
                    this.audio.playLeave();
                } else {
                    this.audio.playJoin();
                }
            });

            voiceList.appendChild(item);

            // If active voice channel has users (simulate user connecting)
            if (isConnected) {
                const usersList = document.createElement('div');
                usersList.className = "voice-users-list";
                
                // Show current user in active voice channel
                const isSpeaking = !state.isMuted;
                usersList.innerHTML = `
                    <div class="voice-user ${isSpeaking ? 'speaking' : ''}">
                        <img src="${state.currentUser.avatar}">
                        <span>${state.currentUser.username}</span>
                    </div>
                `;
                
                voiceList.appendChild(usersList);
            }
        });
        this.dom.channelsListContainer.appendChild(voiceList);

        // Bind event listeners for channel addition buttons
        document.getElementById('btn-add-channel-text').addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedChannelType = "text";
            this.dom.modalAddChannel.classList.remove('hidden');
            this.dom.typeCardText.click();
            this.dom.channelNameInput.focus();
        });

        document.getElementById('btn-add-channel-voice').addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedChannelType = "voice";
            this.dom.modalAddChannel.classList.remove('hidden');
            this.dom.typeCardVoice.click();
            this.dom.channelNameInput.focus();
        });
    }

    renderUserPanel(state) {
        const user = state.currentUser;
        this.dom.userPanelAvatar.src = user.avatar;
        this.dom.userPanelUsername.innerText = user.username;
        this.dom.userPanelCustomStatus.innerText = user.customStatus || `#${user.tag}`;
        
        // Status class
        this.dom.userPanelStatus.className = `status-dot ${user.status}`;

        // Mute / Deafen button active UI states
        if (state.isMuted) {
            this.dom.btnMute.classList.add('active');
            this.dom.btnMute.innerHTML = `<i data-lucide="mic-off"></i>`;
            this.dom.btnMute.setAttribute('data-tooltip', 'Unmute');
        } else {
            this.dom.btnMute.classList.remove('active');
            this.dom.btnMute.innerHTML = `<i data-lucide="mic"></i>`;
            this.dom.btnMute.setAttribute('data-tooltip', 'Mute');
        }

        if (state.isDeafened) {
            this.dom.btnDeafen.classList.add('active');
            this.dom.btnDeafen.innerHTML = `<i data-lucide="headphones-off"></i>`;
            this.dom.btnDeafen.setAttribute('data-tooltip', 'Undeafen');
        } else {
            this.dom.btnDeafen.classList.remove('active');
            this.dom.btnDeafen.innerHTML = `<i data-lucide="headphones"></i>`;
            this.dom.btnDeafen.setAttribute('data-tooltip', 'Deafen');
        }
    }

    renderChatPane(state) {
        // Toggle Voice Banner
        if (state.activeVoiceChannelId) {
            const currentVoiceChannel = this.findChannelById(state, state.activeVoiceChannelId);
            const currentServer = state.servers.find(s => s.id === state.activeServerId);
            const serverName = currentServer ? currentServer.name : "Home";
            
            this.dom.voiceBannerChannelName.innerText = `${currentVoiceChannel ? currentVoiceChannel.name : 'Voice Channel'} / ${serverName}`;
            this.dom.voiceBanner.classList.remove('hidden');
            
            // Set mic/mute icon in banner
            if (state.isMuted) {
                this.dom.voiceBannerMute.innerHTML = `<i data-lucide="mic-off"></i>`;
                this.dom.voiceBannerMute.classList.add('active');
            } else {
                this.dom.voiceBannerMute.innerHTML = `<i data-lucide="mic"></i>`;
                this.dom.voiceBannerMute.classList.remove('active');
            }
        } else {
            this.dom.voiceBanner.classList.add('hidden');
        }

        // Chat Header Title
        if (!state.activeServerId) {
            // Home Direct Message view
            this.dom.headerIconType.setAttribute('data-lucide', 'at-sign');
            
            if (state.activeChannelId === 'dm-alice') {
                this.dom.chatHeaderTitle.innerText = "Alice";
                this.dom.chatHeaderDescription.innerText = "Product designer & React Developer. Let's make this app shine!";
            } else if (state.activeChannelId === 'dm-bob') {
                this.dom.chatHeaderTitle.innerText = "Bob";
                this.dom.chatHeaderDescription.innerText = "Python automation engineer. Streaks are looking green!";
            } else {
                this.dom.chatHeaderTitle.innerText = "Welcome Home";
                this.dom.chatHeaderDescription.innerText = "Select a channel or friend to get started";
            }
            this.renderMessagesList(state);
            return;
        }

        // Server view
        const activeServer = state.servers.find(s => s.id === state.activeServerId);
        if (!activeServer) return;

        const activeChannel = activeServer.channels.find(c => c.id === state.activeChannelId);
        if (!activeChannel) {
            this.dom.chatHeaderTitle.innerText = "no-channel";
            this.dom.chatHeaderDescription.innerText = "";
            this.dom.messagesList.innerHTML = `<div class="message-card"><div class="message-content">Select a channel to view chats.</div></div>`;
            return;
        }

        this.dom.headerIconType.setAttribute('data-lucide', activeChannel.type === 'text' ? 'hash' : 'volume-2');
        this.dom.chatHeaderTitle.innerText = activeChannel.name;
        this.dom.chatHeaderDescription.innerText = activeChannel.topic || "";
        this.dom.messageInput.placeholder = `Message #${activeChannel.name}`;

        this.renderMessagesList(state);
    }

    renderMessagesList(state, filterQuery = "") {
        this.dom.messagesList.innerHTML = "";
        
        let messages = [];
        const isDM = !state.activeServerId;

        if (isDM) {
            // Mock messages list for Direct Message threads
            const mockDMs = {
                "dm-alice": [
                    { id: "dma-1", username: "Alice", avatar: window.DEFAULT_AVATARS[1], content: "Hey! Did you finish styling the layout?", timestamp: new Date(Date.now() - 3600000).toISOString(), reactions: [] },
                    { id: "dma-2", username: "CoderPro", avatar: state.currentUser.avatar, content: "Yes! Added glassmorphic styling and transition parameters.", timestamp: new Date(Date.now() - 3000000).toISOString(), reactions: [{ emoji: "🚀", count: 1, users: ["user-alice"] }] },
                    { id: "dma-3", username: "Alice", avatar: window.DEFAULT_AVATARS[1], content: "It looks awesome. Love the premium cyber themes!", timestamp: new Date(Date.now() - 100000).toISOString(), reactions: [] }
                ],
                "dm-bob": [
                    { id: "dmb-1", username: "Bob", avatar: window.DEFAULT_AVATARS[2], content: "Hi coder, are we adding custom sounds?", timestamp: new Date(Date.now() - 7200000).toISOString(), reactions: [] },
                    { id: "dmb-2", username: "CoderPro", avatar: state.currentUser.avatar, content: "Definitely. I synthesized Discord-sounding audio files inside js/audio.js using built-in OscillatorNodes.", timestamp: new Date(Date.now() - 5000000).toISOString(), reactions: [] }
                ]
            };
            messages = mockDMs[state.activeChannelId] || [];
        } else {
            const activeServer = state.servers.find(s => s.id === state.activeServerId);
            if (activeServer && activeServer.messages && activeServer.messages[state.activeChannelId]) {
                messages = activeServer.messages[state.activeChannelId];
            }
        }

        if (messages.length === 0) {
            this.dom.messagesList.innerHTML = `
                <div class="message-card" style="justify-content: center; color: var(--text-muted); padding: 40px 0;">
                    <div style="text-align: center;">
                        <i data-lucide="message-square" style="width: 48px; height: 48px; margin-bottom: 8px;"></i>
                        <p>No messages here yet. Type down below to start chatting!</p>
                    </div>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        // Apply search filter if any
        if (filterQuery) {
            messages = messages.filter(m => m.content.toLowerCase().includes(filterQuery));
        }

        messages.forEach(msg => {
            const card = document.createElement('div');
            card.className = "message-card";
            card.setAttribute('data-message-id', msg.id);

            const timestampFormatted = this.formatTimestamp(msg.timestamp);

            card.innerHTML = `
                <img src="${msg.avatar}" class="message-avatar" alt="${msg.username}'s avatar">
                <div class="message-body">
                    <div class="message-header">
                        <span class="message-username">${msg.username}</span>
                        <span class="message-timestamp">${timestampFormatted}</span>
                    </div>
                    <div class="message-content">${this.escapeHTML(msg.content).replace(/\n/g, '<br>')}</div>
                    <div class="reactions-wrapper" id="reactions-container-${msg.id}">
                        <!-- Reactions rendered here -->
                    </div>
                </div>
            `;

            this.dom.messagesList.appendChild(card);

            // Render reactions for this message
            this.renderReactions(state, msg);
        });

        // Scroll to bottom
        this.dom.messagesList.scrollTop = this.dom.messagesList.scrollHeight;
    }

    renderReactions(state, msg) {
        const reactContainer = document.getElementById(`reactions-container-${msg.id}`);
        if (!reactContainer) return;
        reactContainer.innerHTML = "";

        if (!msg.reactions || msg.reactions.length === 0) return;

        const currentUserId = state.currentUser.id;

        msg.reactions.forEach(react => {
            const hasReacted = react.users.includes(currentUserId);
            const pill = document.createElement('div');
            pill.className = `reaction-pill ${hasReacted ? 'user-reacted' : ''}`;
            pill.innerHTML = `
                <span>${react.emoji}</span>
                <span class="reaction-count">${react.count}</span>
            `;

            pill.addEventListener('click', () => {
                this.stateManager.addReaction(
                    state.activeServerId,
                    state.activeChannelId,
                    msg.id,
                    react.emoji
                );
            });

            reactContainer.appendChild(pill);
        });
    }

    renderMembersSidebar(state) {
        this.dom.membersListContainer.innerHTML = "";

        if (!state.activeServerId) {
            // Hide members sidebar in DMs
            this.dom.membersSidebar.classList.add('hidden');
            return;
        }

        const activeServer = state.servers.find(s => s.id === state.activeServerId);
        if (!activeServer) return;

        // Group members by Role
        const grouped = {};
        activeServer.members.forEach(member => {
            const role = member.role || "Online";
            if (!grouped[role]) grouped[role] = [];
            grouped[role].push(member);
        });

        for (const [role, membersList] of Object.entries(grouped)) {
            const header = document.createElement('div');
            header.className = "member-group-header";
            header.innerText = `${role} — ${membersList.length}`;
            this.dom.membersListContainer.appendChild(header);

            membersList.forEach(member => {
                const item = document.createElement('div');
                item.className = "member-item";
                item.innerHTML = `
                    <div class="member-avatar-wrapper">
                        <img src="${member.avatar}" class="member-avatar">
                        <div class="status-dot ${member.status}"></div>
                    </div>
                    <div class="member-details">
                        <span class="member-name">${member.username}</span>
                        <span class="member-status-text">${member.role === 'Bot' ? '[BOT] Connected' : member.status}</span>
                    </div>
                `;
                this.dom.membersListContainer.appendChild(item);
            });
        }
    }

    // Helper Utility Methods
    findChannelById(state, channelId) {
        for (const s of state.servers) {
            const chan = s.channels.find(c => c.id === channelId);
            if (chan) return chan;
        }
        return null;
    }

    formatTimestamp(isoString) {
        try {
            const date = new Date(isoString);
            const now = new Date();
            
            // Check if today
            if (date.toDateString() === now.toDateString()) {
                const hrs = date.getHours().toString().padStart(2, '0');
                const mins = date.getMinutes().toString().padStart(2, '0');
                return `Today at ${hrs}:${mins}`;
            }
            // Check if yesterday
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            if (date.toDateString() === yesterday.toDateString()) {
                const hrs = date.getHours().toString().padStart(2, '0');
                const mins = date.getMinutes().toString().padStart(2, '0');
                return `Yesterday at ${hrs}:${mins}`;
            }

            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return "Just now";
        }
    }

    escapeHTML(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Export for app.js
window.AuraUI = AuraUI;
