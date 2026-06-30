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
            settingsAvatarTrigger: document.getElementById('settings-avatar-trigger'),
            settingsPfpUpload: document.getElementById('settings-pfp-upload'),
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
            tabAppearance: document.getElementById('tab-appearance'),
            
            // Cropper elements
            modalCropper: document.getElementById('modal-cropper'),
            cropperSourceImg: document.getElementById('cropper-source-img'),
            cropperSelector: document.getElementById('cropper-selector'),
            cropperImageWrapper: document.getElementById('cropper-image-wrapper'),
            btnCancelCrop: document.getElementById('btn-cancel-crop'),
            btnSaveCrop: document.getElementById('btn-save-crop'),
            cropperCanvas: document.getElementById('cropper-canvas')
        };
        this.customAvatarDataUrl = null; // custom pfp upload state
        this.cropState = { x: 0, y: 0, width: 0, height: 0, imgWidth: 0, imgHeight: 0 };

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

            if (currentChannelId) {
                if (currentServerId) {
                    // Add server message
                    this.stateManager.addMessage(currentServerId, currentChannelId, text);
                } else {
                    // Add direct message
                    this.stateManager.addDirectMessage(currentChannelId, text);
                }
                
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

        // Custom PFP upload trigger
        this.dom.settingsAvatarTrigger.addEventListener('click', () => {
            this.dom.settingsPfpUpload.click();
        });

        this.dom.settingsPfpUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const customUrl = event.target.result;
                    this.openCropperModal(customUrl);
                };
                reader.readAsDataURL(file);
            }
        });

        // Cancel cropping
        this.dom.btnCancelCrop.addEventListener('click', () => {
            this.dom.modalCropper.classList.add('hidden');
        });

        // Save cropped region
        this.dom.btnSaveCrop.addEventListener('click', () => {
            const img = this.dom.cropperSourceImg;
            const canvas = this.dom.cropperCanvas;
            
            if (!this.cropState || this.cropState.imgWidth === 0) return;

            // Calculate scaling between rendered image and original natural size
            const scaleX = img.naturalWidth / this.cropState.imgWidth;
            const scaleY = img.naturalHeight / this.cropState.imgHeight;
            
            const sx = this.cropState.x * scaleX;
            const sy = this.cropState.y * scaleY;
            const sWidth = this.cropState.width * scaleX;
            const sHeight = this.cropState.height * scaleY;
            
            // Set canvas size for optimized high-fidelity avatar rendering
            const targetSize = 256;
            canvas.width = targetSize;
            canvas.height = targetSize;
            
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, targetSize, targetSize);
            ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetSize, targetSize);
            
            try {
                const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
                
                // Apply cropped image
                this.dom.settingsAvatarPreview.src = croppedUrl;
                this.customAvatarDataUrl = croppedUrl;
                this.selectedAvatarIndex = -1; // Deselect preset options
                
                // Remove selected highlighting in avatar list
                document.querySelectorAll('.avatar-opt').forEach(o => o.classList.remove('selected'));
                
                // Close cropper modal
                this.dom.modalCropper.classList.add('hidden');
            } catch (err) {
                console.error("Failed to crop image on canvas: ", err);
            }
        });

        // Drag physics variables
        let isDragging = false;
        let startX = 0, startY = 0;
        let origX = 0, origY = 0;

        const startDrag = (clientX, clientY) => {
            if (!this.cropState || this.cropState.imgWidth === 0) return;
            isDragging = true;
            startX = clientX;
            startY = clientY;
            origX = this.cropState.x;
            origY = this.cropState.y;
        };

        const moveDrag = (clientX, clientY) => {
            if (!isDragging) return;
            const dx = clientX - startX;
            const dy = clientY - startY;
            
            let newX = origX + dx;
            let newY = origY + dy;
            
            // Constrain inside image wrapper
            const maxLimitX = this.cropState.imgWidth - this.cropState.width;
            const maxLimitY = this.cropState.imgHeight - this.cropState.height;
            
            newX = Math.max(0, Math.min(newX, maxLimitX));
            newY = Math.max(0, Math.min(newY, maxLimitY));
            
            this.cropState.x = newX;
            this.cropState.y = newY;
            
            this.dom.cropperSelector.style.left = newX + 'px';
            this.dom.cropperSelector.style.top = newY + 'px';
        };

        // Mouse Drag Events
        this.dom.cropperSelector.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            moveDrag(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch Drag Events (Mobile/Tablet Support)
        this.dom.cropperSelector.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                moveDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Handle Escape keys to close modals
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.dom.modalAddServer.classList.add('hidden');
                this.dom.modalAddChannel.classList.add('hidden');
                this.closeSettingsModal();
                this.dom.modalCropper.classList.add('hidden');
            }
        });
    }

    // Modal helpers
    openSettingsModal() {
        const user = this.stateManager.state.currentUser;
        this.customAvatarDataUrl = null;
        this.dom.settingsPfpUpload.value = "";
        
        this.dom.settingsUsername.value = user.username;
        this.dom.settingsCustomStatus.value = user.customStatus || "";
        this.dom.settingsStatusSelect.value = user.status;
        this.dom.settingsUsernameDisplay.innerText = user.username;
        this.dom.settingsTagDisplay.innerText = `#${user.tag}`;
        this.dom.settingsAvatarPreview.src = user.avatar;
        
        // Find avatar index
        this.selectedAvatarIndex = window.DEFAULT_AVATARS.indexOf(user.avatar);

        // Render avatar list
        this.dom.avatarOptionsList.innerHTML = "";
        window.DEFAULT_AVATARS.forEach((avUrl, index) => {
            const img = document.createElement('img');
            img.src = avUrl;
            img.alt = `Avatar option ${index + 1}`;
            img.className = `avatar-opt ${index === this.selectedAvatarIndex ? 'selected' : ''}`;
            img.addEventListener('click', () => {
                this.selectedAvatarIndex = index;
                this.customAvatarDataUrl = null; // Clear custom upload if selecting preset
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
        
        let avatarParam;
        if (this.customAvatarDataUrl) {
            avatarParam = this.customAvatarDataUrl;
        } else if (this.selectedAvatarIndex !== -1) {
            avatarParam = this.selectedAvatarIndex;
        } else {
            avatarParam = this.stateManager.state.currentUser.avatar;
        }
        
        this.stateManager.updateUserProfile(username, status, customStatus, avatarParam);
        this.dom.modalSettings.classList.add('hidden');
    }

    openCropperModal(imageSrc) {
        this.dom.cropperSourceImg.src = imageSrc;
        this.dom.modalCropper.classList.remove('hidden');
        
        // Reset crop wrapper style
        this.dom.cropperImageWrapper.style.width = 'auto';
        this.dom.cropperImageWrapper.style.height = 'auto';

        // When source image loads, center the selection box
        this.dom.cropperSourceImg.onload = () => {
            const clientWidth = this.dom.cropperSourceImg.clientWidth;
            const clientHeight = this.dom.cropperSourceImg.clientHeight;
            
            if (clientWidth === 0 || clientHeight === 0) return;

            // Set image wrapper boundaries to exactly match layout size of the image
            this.dom.cropperImageWrapper.style.width = clientWidth + 'px';
            this.dom.cropperImageWrapper.style.height = clientHeight + 'px';
            
            // Selector box size: square, 80% of smallest dimension
            const size = Math.min(clientWidth, clientHeight) * 0.8;
            const left = (clientWidth - size) / 2;
            const top = (clientHeight - size) / 2;
            
            // Update crop state
            this.cropState = {
                x: left,
                y: top,
                width: size,
                height: size,
                imgWidth: clientWidth,
                imgHeight: clientHeight
            };
            
            // Position DOM element
            this.dom.cropperSelector.style.width = size + 'px';
            this.dom.cropperSelector.style.height = size + 'px';
            this.dom.cropperSelector.style.left = left + 'px';
            this.dom.cropperSelector.style.top = top + 'px';
        };
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

        const postResponse = (content) => {
            if (serverId) {
                this.stateManager.addMessage(serverId, channelId, content, systemSender);
            } else {
                this.stateManager.addDirectMessage(channelId, content, systemSender);
            }
        };

        switch (command) {
            case '/help':
                postResponse(
                    "🤖 **Available commands:**\n" + 
                    "`/help` - Show this guide\n" + 
                    "`/ping` - Test server response\n" + 
                    "`/roll` - Roll a 6-sided die\n" + 
                    "`/theme [name]` - Swap styling (`dark`, `light`, `amoled`, `cyberpunk`, `forest`)\n" +
                    "`/clear` - Log a clear command instruction"
                );
                break;
            case '/ping':
                postResponse("🏓 **Pong!** Response latency: `4ms`");
                break;
            case '/roll':
                const roll = Math.floor(Math.random() * 6) + 1;
                postResponse(`🎲 You rolled a **${roll}**!`);
                break;
            case '/theme':
                const specifiedTheme = tokens[1] ? tokens[1].toLowerCase() : '';
                const map = {
                    'dark': 'theme-dark', 'light': 'theme-light', 'amoled': 'theme-amoled',
                    'cyberpunk': 'theme-cyberpunk', 'forest': 'theme-forest'
                };
                if (map[specifiedTheme]) {
                    this.setTheme(map[specifiedTheme]);
                    postResponse(`🎨 Shifted UI theme to **${specifiedTheme}**!`);
                } else {
                    postResponse("⚠️ Theme options: `dark`, `light`, `amoled`, `cyberpunk`, `forest`");
                }
                break;
            default:
                postResponse(`⚠️ Command \`${command}\` not recognized. Type \`/help\` for assistance.`);
                break;
        }
    }

    // Mock bot responses
    triggerMockReply(userInput, serverId, channelId) {
        // Wait 1.5 seconds, then reply
        setTimeout(() => {
            const cleanInput = userInput.toLowerCase();
            let replyText = "";
            let sender = {
                userId: 'bot-aurora',
                username: 'AuroraBot',
                avatar: window.BOT_AVATAR
            };

            const isDM = !serverId;

            if (isDM) {
                if (channelId === 'dm-alice') {
                    sender = {
                        userId: 'user-alice',
                        username: 'Alice',
                        avatar: window.DEFAULT_AVATARS[1]
                    };
                    if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                        replyText = "Hey! Hope you are having a wonderful day. Did you check the custom PFP cropper Biswajeet added?";
                    } else if (cleanInput.includes("theme") || cleanInput.includes("design") || cleanInput.includes("look")) {
                        replyText = "I really love the glassmorphic designs and custom transitions. The Cyberpunk theme is so futuristic!";
                    } else {
                        replyText = "Product design is my passion. Let's make sure our layout is clean and aligns with modern design guidelines!";
                    }
                } else if (channelId === 'dm-bob') {
                    sender = {
                        userId: 'user-bob',
                        username: 'Bob',
                        avatar: window.DEFAULT_AVATARS[2]
                    };
                    if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                        replyText = "Hey! How's it going? Bob here, working on some automation scripts.";
                    } else if (cleanInput.includes("sound") || cleanInput.includes("audio")) {
                        replyText = "The audio oscillator tones in js/audio.js are super neat. No assets required, pure browser synthesis!";
                    } else {
                        replyText = "Always keep your commits green and your automated test scripts running!";
                    }
                } else if (channelId === 'dm-biswajeet') {
                    sender = {
                        userId: 'user-biswajeet',
                        username: 'Developer Biswajeet',
                        avatar: window.DEFAULT_AVATARS[0]
                    };
                    if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                        replyText = "Hello! Developer Biswajeet here. Thanks for testing AuraChat. Feel free to request new features or run some command tests!";
                    } else if (cleanInput.includes("feature") || cleanInput.includes("add") || cleanInput.includes("change") || cleanInput.includes("build") || cleanInput.includes("new")) {
                        replyText = "As the developer, I'd love to hear your suggestions! I'm planning to add features like a Markdown parser, user search, custom sound uploads, and full Voice channel calling next.";
                    } else if (cleanInput.includes("help") || cleanInput.includes("command") || cleanInput.includes("slash")) {
                        replyText = "You can test slash commands here too! Type /help to see all available commands, /ping for latency response, /roll for a die, or /theme to switch layouts.";
                    } else {
                        replyText = "Developer Biswajeet here. Let me know what you think of the new profile picture cropper, and feel free to suggest the next feature we should build!";
                    }
                }
            } else {
                // Server channel bot reply
                if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                    replyText = "Hello! 👋 Welcome to my corner of the internet. Hope you are enjoying AuraChat!";
                } else if (cleanInput.includes("voice") || cleanInput.includes("audio")) {
                    replyText = "🔊 Try clicking one of the voice channels (like *Lounge Voice*). You'll hear authentic audio synthesis cues built from the browser Web Audio API!";
                } else if (cleanInput.includes("github") || cleanInput.includes("contribution")) {
                    replyText = "📈 Keep making progress and pushing commits! Every feature counts towards making your github history look green and shiny.";
                } else if (cleanInput.includes("theme") || cleanInput.includes("color")) {
                    replyText = "🎨 Open **User Settings** (gear icon bottom left) and head to **Appearance** to try out the custom themes (Cyberpunk is my personal favorite)!";
                } else {
                    const replies = [
                        "Nice! That sounds interesting.",
                        "Have you tried editing your user profile in settings? You can change your name, avatar, and custom status.",
                        "If you ever want a fresh canvas, click User Settings -> Reset App Data to start clean.",
                        "I am a simulated bot response running completely client-side. Real-time updates are saved to LocalStorage!",
                        "Try using the `/roll` command to test my command processing engine."
                    ];
                    replyText = replies[Math.floor(Math.random() * replies.length)];
                }
            }

            // Save reply to either DM or server
            if (isDM) {
                this.stateManager.addDirectMessage(channelId, replyText, sender);
            } else {
                this.stateManager.addMessage(serverId, channelId, replyText, sender);
            }
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
            
            // Render virtual direct messaging options (Alice, Bob, and Developer Biswajeet)
            const dms = [
                { id: "dm-alice", username: "Alice", avatar: window.DEFAULT_AVATARS[1], status: "online" },
                { id: "dm-bob", username: "Bob", avatar: window.DEFAULT_AVATARS[2], status: "idle" },
                { id: "dm-biswajeet", username: "Developer Biswajeet", avatar: window.DEFAULT_AVATARS[0], status: "online", verified: true }
            ];

            dms.forEach(dm => {
                const item = document.createElement('div');
                item.className = `channel-item ${state.activeChannelId === dm.id ? 'active' : ''}`;
                const verifiedTick = dm.verified ? `<i data-lucide="badge-check" style="color: #00A8FC; width: 14px; height: 14px; margin-left: 4px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; transform: translateY(1px);"></i>` : '';
                item.innerHTML = `
                    <div class="channel-item-left">
                        <div class="avatar-container" style="width:20px; height:20px;">
                            <img src="${dm.avatar}" class="user-avatar">
                            <div class="status-dot ${dm.status}" style="width:8px; height:8px; border-width:1px;"></div>
                        </div>
                        <span class="channel-item-name">${dm.username}</span>
                        ${verifiedTick}
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
            this.dom.btnToggleMembers.classList.add('hidden');
            // Home Direct Message view
            this.dom.headerIconType.setAttribute('data-lucide', 'at-sign');
            
            if (state.activeChannelId === 'dm-alice') {
                this.dom.chatHeaderTitle.innerText = "Alice";
                this.dom.chatHeaderDescription.innerText = "Product designer & React Developer. Let's make this app shine!";
                this.dom.messageInput.placeholder = `Message @Alice`;
            } else if (state.activeChannelId === 'dm-bob') {
                this.dom.chatHeaderTitle.innerText = "Bob";
                this.dom.chatHeaderDescription.innerText = "Python automation engineer. Streaks are looking green!";
                this.dom.messageInput.placeholder = `Message @Bob`;
            } else if (state.activeChannelId === 'dm-biswajeet') {
                this.dom.chatHeaderTitle.innerHTML = `Developer Biswajeet <i data-lucide="badge-check" style="color: #00A8FC; width: 16px; height: 16px; margin-left: 4px; display: inline-block; vertical-align: middle;"></i>`;
                this.dom.chatHeaderDescription.innerText = "AuraChat Creator & Lead Frontend Architect. Ask me for features or help!";
                this.dom.messageInput.placeholder = `Message @Developer Biswajeet`;
            } else {
                this.dom.chatHeaderTitle.innerText = "Welcome Home";
                this.dom.chatHeaderDescription.innerText = "Select a channel or friend to get started";
                this.dom.messageInput.placeholder = `Select a conversation`;
            }
            this.renderMessagesList(state);
            return;
        }

        // Server view
        this.dom.btnToggleMembers.classList.remove('hidden');
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
            // Read from persistent state manager's direct messages log
            if (state.directMessages && state.directMessages[state.activeChannelId]) {
                messages = state.directMessages[state.activeChannelId];
            }
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
                        <span class="message-username">${msg.username}${msg.username === "Developer Biswajeet" ? `<i data-lucide="badge-check" style="color: #00A8FC; width: 14px; height: 14px; margin-left: 4px; display: inline-flex; align-items: center; justify-content: center; transform: translateY(2px);"></i>` : ''}</span>
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
