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
            settingsHobbies: document.getElementById('settings-hobbies'),
            settingsActiveProjects: document.getElementById('settings-active-projects'),
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
            cropperCanvas: document.getElementById('cropper-canvas'),

            // GIF Picker elements
            btnGif: document.getElementById('btn-gif'),
            gifPicker: document.getElementById('gif-picker-popover'),
            gifSearch: document.getElementById('gif-search-input'),
            gifGrid: document.getElementById('gif-grid-container'),

            // Create Poll Modal elements
            modalCreatePoll: document.getElementById('modal-create-poll'),
            pollQuestionInput: document.getElementById('poll-question-input'),
            pollOptionsInputsContainer: document.getElementById('poll-options-inputs-container'),
            btnPollAddOption: document.getElementById('btn-poll-add-option'),
            btnCancelPoll: document.getElementById('btn-cancel-poll'),
            btnSubmitPoll: document.getElementById('btn-submit-poll'),
            pollMultipleToggle: document.getElementById('poll-multiple-toggle'),

            // User Profile Popover elements
            profilePopover: document.getElementById('user-profile-popover'),
            profileBannerColor: document.getElementById('profile-banner-color'),
            profileAvatarImg: document.getElementById('profile-avatar-img'),
            profileStatusDot: document.getElementById('profile-status-dot'),
            profileBadgesContainer: document.getElementById('profile-badges-container'),
            profileUsernameText: document.getElementById('profile-username-text'),
            profileTagText: document.getElementById('profile-tag-text'),
            profileCustomStatusText: document.getElementById('profile-custom-status-text'),
            profileJoinedAccountText: document.getElementById('profile-joined-account-text'),
            profileJoinedServerRow: document.getElementById('profile-joined-server-row'),
            profileJoinedServerText: document.getElementById('profile-joined-server-text'),
            profileAboutMeContent: document.getElementById('profile-about-me-content'),
            profileRolesContainer: document.getElementById('profile-roles-container'),
            profileRolesSection: document.getElementById('profile-roles-section'),
            profileCustomFieldsContainer: document.getElementById('profile-custom-fields-container'),
            profileNoteTextarea: document.getElementById('profile-note-textarea'),
            btnProfileSendDm: document.getElementById('btn-profile-send-dm'),
            viewingOlderBanner: document.getElementById('viewing-older-banner'),

            // Pinned Messages
            btnPinnedMessages: document.getElementById('btn-pinned-messages'),
            pinnedPopover: document.getElementById('pinned-popover'),
            pinnedListContainer: document.getElementById('pinned-list-container'),
            btnClosePinned: document.getElementById('btn-close-pinned'),

            // Emoji Picker
            btnEmoji: document.getElementById('btn-emoji'),
            emojiPickerPopover: document.getElementById('emoji-picker-popover'),
            emojiSearchInput: document.getElementById('emoji-search-input'),
            emojiPickerBodyContainer: document.getElementById('emoji-picker-body-container'),
            emojiPreviewGraphic: document.getElementById('emoji-preview-graphic'),
            emojiPreviewName: document.getElementById('emoji-preview-name'),
            emojiPreviewShortcode: document.getElementById('emoji-preview-shortcode'),

            // Attachments
            fileUploadInput: document.getElementById('file-upload-input'),
            attachmentDrawer: document.getElementById('attachment-drawer'),

            // Server Settings and Invites
            serverDropdown: document.getElementById('server-dropdown'),
            modalServerSettings: document.getElementById('modal-server-settings'),
            modalServerInvite: document.getElementById('modal-server-invite'),
            serverSettingsName: document.getElementById('server-settings-name'),
            serverSettingsIcon: document.getElementById('server-settings-icon'),
            btnSaveServerSettings: document.getElementById('btn-save-server-settings'),
            btnCancelServerSettings: document.getElementById('btn-cancel-server-settings'),
            btnServerDeleteModalAction: document.getElementById('btn-server-delete-modal-action'),
            serverInviteLinkInput: document.getElementById('server-invite-link-input'),
            btnCopyInviteLink: document.getElementById('btn-copy-invite-link'),
            btnCloseServerInvite: document.getElementById('btn-close-server-invite'),

            // Slash Autocomplete
            slashCommandsPopover: document.getElementById('slash-commands-popover'),
            slashCommandsList: document.getElementById('slash-commands-list'),

            // Mentions Autocomplete
            mentionsPopover: document.getElementById('mentions-popover'),
            mentionsList: document.getElementById('mentions-list'),

            // Soundboard
            btnSoundboard: document.getElementById('voice-banner-soundboard'),
            soundboardPopover: document.getElementById('soundboard-popover'),
            btnCloseSoundboard: document.getElementById('btn-close-soundboard')
        };

        // Active attachments state (base64 Data URLs with name/size metadata)
        this.activeAttachments = [];

        this.customAvatarDataUrl = null; // custom pfp upload state
        this.cropState = { x: 0, y: 0, width: 0, height: 0, imgWidth: 0, imgHeight: 0 };

        this.selectedChannelType = "text"; // modal state
        this.selectedAvatarIndex = 0; // modal state

        this.collapsedCategories = new Set(); // collapsible channel categories
        this.selectedCommandIndex = 0; // autocomplete index
        this.filteredCommands = []; // autocomplete filtered command list
        this.selectedMentionIndex = 0; // mentions autocomplete index
        this.filteredMentions = []; // mentions autocomplete filtered list
        this.allCommands = [
            { name: '/help', desc: 'Show available commands guide' },
            { name: '/ping', desc: 'Test loopback latency' },
            { name: '/roll', desc: 'Roll a 6-sided die' },
            { name: '/theme', desc: 'Swap theme (dark, light, amoled, cyberpunk, forest, anime, ocean, sunset)' },
            { name: '/poll', desc: 'Create an interactive poll card' },
            { name: '/clear', desc: 'Clear N messages or all history' },
            { name: '/nick', desc: 'Set server-specific nickname' },
            { name: '/whois', desc: 'Inspect detailed profile card inline' },
            { name: '/joke', desc: 'Fetch a random developer joke' },
            { name: '/gif', desc: 'Search and insert Tenor GIFs' }
        ];
    }

    getUserDisplayName(userId, serverId) {
        if (!serverId) {
            const user = this.stateManager.getUserById(userId);
            return user ? user.username : 'Unknown User';
        }
        if (userId === 'current-user-1') {
            const nicknames = this.stateManager.state.currentUser.nicknames || {};
            return nicknames[serverId] || this.stateManager.state.currentUser.username;
        }
        const user = this.stateManager.getUserById(userId);
        return user ? user.username : 'Unknown User';
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
            this.submitChatMessage();
        });

        // Explicit Enter Keydown listener to handle form submissions in all environments
        this.dom.messageInput.addEventListener('keydown', (e) => {
            const autocompleteVisible = !this.dom.slashCommandsPopover.classList.contains('hidden');
            const mentionsVisible = !this.dom.mentionsPopover.classList.contains('hidden');

            if (mentionsVisible) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.selectedMentionIndex = (this.selectedMentionIndex + 1) % this.filteredMentions.length;
                    this.renderFilteredMentions();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.selectedMentionIndex = (this.selectedMentionIndex - 1 + this.filteredMentions.length) % this.filteredMentions.length;
                    this.renderFilteredMentions();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (this.filteredMentions[this.selectedMentionIndex]) {
                        this.selectMention(this.filteredMentions[this.selectedMentionIndex].username);
                    }
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    this.dom.mentionsPopover.classList.add('hidden');
                }
            } else if (autocompleteVisible) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.selectedCommandIndex = (this.selectedCommandIndex + 1) % this.filteredCommands.length;
                    this.renderFilteredCommands();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.selectedCommandIndex = (this.selectedCommandIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
                    this.renderFilteredCommands();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.selectAutocompleteCommand(this.filteredCommands[this.selectedCommandIndex]);
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    this.dom.slashCommandsPopover.classList.add('hidden');
                }
            } else {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.submitChatMessage();
                }
            }
        });

        // Dynamic auto-growing textarea height adjust
        const adjustHeight = () => {
            const input = this.dom.messageInput;
            const wrapper = this.dom.messageInput.closest('.chat-input-wrapper');
            if (!input || !wrapper) return;

            // Collapse to 1-line height to trigger clean scrollHeight recalculation
            input.style.height = '20px';
            const scrollH = input.scrollHeight;

            if (scrollH > 24) {
                const finalHeight = Math.min(scrollH, 200);
                input.style.height = `${finalHeight}px`;
                input.style.overflowY = scrollH > 200 ? 'auto' : 'hidden';

                wrapper.style.height = 'auto';
                wrapper.style.paddingTop = '10px';
                wrapper.style.paddingBottom = '10px';
            } else {
                input.style.height = '20px';
                input.style.overflowY = 'hidden';

                wrapper.style.height = '44px';
                wrapper.style.paddingTop = '0';
                wrapper.style.paddingBottom = '0';
            }
        };

        this.dom.messageInput.addEventListener('input', (e) => {
            adjustHeight();
            this.handleInputAutocomplete();
        });

        // Soundboard toggle
        this.dom.btnSoundboard.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dom.soundboardPopover.classList.toggle('hidden');
        });

        this.dom.btnCloseSoundboard.addEventListener('click', () => {
            this.dom.soundboardPopover.classList.add('hidden');
        });

        // Soundboard items trigger
        this.dom.soundboardPopover.addEventListener('click', (e) => {
            const soundItem = e.target.closest('.soundboard-item');
            if (soundItem) {
                const soundType = soundItem.getAttribute('data-sound');
                if (soundType === 'airhorn') this.audio.playAirhorn();
                else if (soundType === 'cricket') this.audio.playCricket();
                else if (soundType === 'quack') this.audio.playQuack();
                else if (soundType === 'laser') this.audio.playLaser();
                else if (soundType === 'chime') this.audio.playSuccess();
                else if (soundType === 'trombone') this.audio.playSadTrombone();
            }
        });

        // Reset height when form is submitted
        this.dom.chatForm.addEventListener('submit', () => {
            setTimeout(adjustHeight, 0);
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

        // Poll voting event delegation
        this.dom.messagesList.addEventListener('click', (e) => {
            const btn = e.target.closest('.poll-option-btn');
            if (btn) {
                const messageId = btn.getAttribute('data-message-id');
                const optionIndex = parseInt(btn.getAttribute('data-option-index'), 10);

                const activeServerId = this.stateManager.state.activeServerId;
                const activeChannelId = this.stateManager.state.activeChannelId;

                this.stateManager.votePoll(activeServerId, activeChannelId, messageId, optionIndex);
            }
        });

        // Chat message avatar & username profile click delegation
        this.dom.messagesList.addEventListener('click', (e) => {
            const avatarImg = e.target.closest('.message-avatar');
            const usernameSpan = e.target.closest('.message-username');
            const mentionSpan = e.target.closest('.mention');

            if (mentionSpan) {
                e.stopPropagation();
                const rawUsername = mentionSpan.innerText.trim().replace('@', '');
                const resolvedUser = this.resolveUserByUsername(rawUsername);
                if (resolvedUser) {
                    this.showUserProfile(e, resolvedUser);
                }
                return;
            }

            if (avatarImg || usernameSpan) {
                const messageCard = e.target.closest('.message-card');
                if (messageCard) {
                    const messageId = messageCard.getAttribute('data-message-id');
                    const activeServerId = this.stateManager.state.activeServerId;
                    const activeChannelId = this.stateManager.state.activeChannelId;

                    let message = null;
                    if (!activeServerId) {
                        if (this.stateManager.state.directMessages && this.stateManager.state.directMessages[activeChannelId]) {
                            message = this.stateManager.state.directMessages[activeChannelId].find(m => m.id === messageId);
                        }
                    } else {
                        const server = this.stateManager.state.servers.find(s => s.id === activeServerId);
                        if (server && server.messages && server.messages[activeChannelId]) {
                            message = server.messages[activeChannelId].find(m => m.id === messageId);
                        }
                    }

                    if (message) {
                        let role = "Member";
                        let aboutMe = "No bio provided.";

                        if (message.userId === 'user-biswajeet') {
                            role = "Developer";
                            aboutMe = "AuraChat Creator & Lead Frontend Architect. Ask me for features or help!";
                        } else if (message.userId === 'bot-aurora' || message.userId === 'bot-nova') {
                            role = "Bot";
                            aboutMe = "Official AuraChat system assistant.";
                        } else if (message.userId === 'current-user-1') {
                            role = "Owner";
                            aboutMe = "Logged in user. Customizing the AuraChat experience.";
                        } else if (message.userId === 'user-alice') {
                            role = "Admin";
                            aboutMe = "Server Administrator.";
                        } else if (message.userId === 'user-bob') {
                            role = "Moderator";
                            aboutMe = "Server Moderator.";
                        }

                        this.showUserProfile(e, {
                            id: message.userId,
                            username: message.username,
                            avatar: message.avatar,
                            status: message.userId === 'current-user-1' ? this.stateManager.state.currentUser.status : 'online',
                            role: role,
                            aboutMe: aboutMe
                        });
                    }
                }
            }
        });

        // DM Header user click trigger to show profile popover
        const dmHeaderClick = (e) => {
            const activeServerId = this.stateManager.state.activeServerId;
            const activeChannelId = this.stateManager.state.activeChannelId;

            if (!activeServerId && activeChannelId) {
                let userDetails = null;
                if (activeChannelId === 'dm-biswajeet') {
                    userDetails = {
                        id: 'user-biswajeet',
                        username: 'Developer Biswajeet',
                        avatar: window.DEFAULT_AVATARS[0],
                        status: 'online',
                        role: 'Developer',
                        aboutMe: 'AuraChat Creator & Lead Frontend Architect. Ask me for features or help!'
                    };
                } else if (activeChannelId === 'dm-alice') {
                    userDetails = {
                        id: 'user-alice',
                        username: 'Alice',
                        avatar: window.DEFAULT_AVATARS[1],
                        status: 'online',
                        role: 'Admin',
                        aboutMe: 'Server Administrator.'
                    };
                } else if (activeChannelId === 'dm-bob') {
                    userDetails = {
                        id: 'user-bob',
                        username: 'Bob',
                        avatar: window.DEFAULT_AVATARS[2],
                        status: 'idle',
                        role: 'Moderator',
                        aboutMe: 'Server Moderator.'
                    };
                }

                if (userDetails) {
                    this.showUserProfile(e, userDetails);
                }
            }
        };

        this.dom.chatHeaderTitle.addEventListener('click', dmHeaderClick);
        this.dom.headerIconType.addEventListener('click', dmHeaderClick);

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

        // Toggle GIF picker popover on btnGif click
        this.dom.btnGif.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dom.gifPicker.classList.toggle('hidden');
            if (!this.dom.gifPicker.classList.contains('hidden')) {
                this.dom.gifSearch.focus();
                this.renderCuratedGIFs();
            }
        });

        // Close GIF picker, Emoji picker, Pinned Messages popover, User Profile popover, Slash Commands autocomplete, and Soundboard popover on click outside
        document.addEventListener('click', (e) => {
            if (this.dom.gifPicker && !this.dom.gifPicker.contains(e.target) && e.target !== this.dom.btnGif) {
                this.dom.gifPicker.classList.add('hidden');
            }
            if (this.dom.emojiPickerPopover && !this.dom.emojiPickerPopover.contains(e.target) && !e.target.closest('#btn-emoji') && !e.target.closest('.emoji-item')) {
                this.dom.emojiPickerPopover.classList.add('hidden');
            }
            if (this.dom.pinnedPopover && !this.dom.pinnedPopover.contains(e.target) && !e.target.closest('#btn-pinned-messages') && !e.target.closest('.pinned-unpin-btn')) {
                this.dom.pinnedPopover.classList.add('hidden');
            }
            if (this.dom.profilePopover && !this.dom.profilePopover.contains(e.target) &&
                !e.target.closest('.member-item') &&
                !e.target.closest('.message-avatar') &&
                !e.target.closest('.message-username') &&
                !e.target.closest('.mention') &&
                !e.target.closest('#chat-header-title') &&
                !e.target.closest('#header-icon-type')) {
                this.dom.profilePopover.classList.add('hidden');
            }
            if (this.dom.slashCommandsPopover && !this.dom.slashCommandsPopover.contains(e.target) && e.target !== this.dom.messageInput) {
                this.dom.slashCommandsPopover.classList.add('hidden');
            }
            if (this.dom.mentionsPopover && !this.dom.mentionsPopover.contains(e.target) && e.target !== this.dom.messageInput) {
                this.dom.mentionsPopover.classList.add('hidden');
            }
            if (this.dom.soundboardPopover && !this.dom.soundboardPopover.contains(e.target) && !e.target.closest('#voice-banner-soundboard')) {
                this.dom.soundboardPopover.classList.add('hidden');
            }
        });

        // Search GIFs on input change
        let searchTimeout;
        this.dom.gifSearch.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            searchTimeout = setTimeout(() => {
                this.searchGIFs(query);
            }, 300);
        });

        // Handle Escape keys to close modals
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.dom.modalAddServer.classList.add('hidden');
                this.dom.modalAddChannel.classList.add('hidden');
                this.closeSettingsModal();
                this.dom.modalCropper.classList.add('hidden');
                this.dom.gifPicker.classList.add('hidden');
                this.dom.modalCreatePoll.classList.add('hidden');
                this.dom.profilePopover.classList.add('hidden');
                this.dom.slashCommandsPopover.classList.add('hidden');
                this.dom.soundboardPopover.classList.add('hidden');
            }
        });

        // Cancel Poll button click
        this.dom.btnCancelPoll.addEventListener('click', () => {
            this.dom.modalCreatePoll.classList.add('hidden');
        });

        // Add Poll Option click
        this.dom.btnPollAddOption.addEventListener('click', () => {
            const count = this.dom.pollOptionsInputsContainer.querySelectorAll('.poll-option-input-wrapper').length;
            if (count >= 10) return; // limit to 10 options

            const wrapper = document.createElement('div');
            wrapper.className = 'poll-option-input-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.gap = '8px';
            wrapper.style.alignItems = 'center';
            wrapper.innerHTML = `
                <input type="text" class="poll-modal-option-field" placeholder="Option ${count + 1}" maxlength="60" autocomplete="off" style="flex: 1;">
                <button type="button" class="poll-modal-remove-option" style="color: var(--text-muted); opacity: 0.6;" aria-label="Remove option">
                    <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                </button>
            `;
            this.dom.pollOptionsInputsContainer.appendChild(wrapper);
            lucide.createIcons();
        });

        // Remove Poll Option click delegation
        this.dom.pollOptionsInputsContainer.addEventListener('click', (e) => {
            const trashBtn = e.target.closest('.poll-modal-remove-option');
            if (trashBtn) {
                const wrappers = this.dom.pollOptionsInputsContainer.querySelectorAll('.poll-option-input-wrapper');
                if (wrappers.length <= 2) {
                    alert("⚠️ A poll must have at least 2 options!");
                    return;
                }
                trashBtn.closest('.poll-option-input-wrapper').remove();

                // Re-index placeholders
                this.dom.pollOptionsInputsContainer.querySelectorAll('.poll-option-input-wrapper').forEach((wrapper, index) => {
                    wrapper.querySelector('input').placeholder = `Option ${index + 1}`;
                });
            }
        });

        // Submit Poll click
        this.dom.btnSubmitPoll.addEventListener('click', () => {
            const question = this.dom.pollQuestionInput.value.trim();
            if (!question) {
                alert("⚠️ Please enter a poll question!");
                return;
            }

            const optionInputs = this.dom.pollOptionsInputsContainer.querySelectorAll('.poll-modal-option-field');
            const options = [];
            optionInputs.forEach(input => {
                const val = input.value.trim();
                if (val) {
                    options.push({ text: val, votes: [] });
                }
            });

            if (options.length < 2) {
                alert("⚠️ Please fill in at least 2 options!");
                return;
            }

            const isMultiple = this.dom.pollMultipleToggle.checked;
            const currentServerId = this.stateManager.state.activeServerId;
            const currentChannelId = this.stateManager.state.activeChannelId;

            const pollData = {
                question: question,
                options: options,
                multiple: isMultiple
            };

            if (currentChannelId) {
                this.forceScrollToBottom = true;
                if (currentServerId) {
                    this.stateManager.addMessage(currentServerId, currentChannelId, `📊 **POLL**: ${question}`, null, pollData);
                } else {
                    this.stateManager.addDirectMessage(currentChannelId, `📊 **POLL**: ${question}`, null, pollData);
                }
            }

            this.dom.modalCreatePoll.classList.add('hidden');
        });

        // Messages list scroll listener for showing/hiding the older messages banner
        this.dom.messagesList.addEventListener('scroll', () => {
            const scrollContainer = this.dom.messagesList;
            const threshold = 150; // pixels from the bottom
            const distanceFromBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight;

            if (distanceFromBottom > threshold) {
                this.dom.viewingOlderBanner.classList.remove('hidden');
            } else {
                this.dom.viewingOlderBanner.classList.add('hidden');
            }
        });

        // Clicking the banner scrolls back to the bottom smoothly
        this.dom.viewingOlderBanner.addEventListener('click', () => {
            this.dom.messagesList.scrollTo({
                top: this.dom.messagesList.scrollHeight,
                behavior: 'smooth'
            });
        });

        // Pinned messages header button click
        this.dom.btnPinnedMessages.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dom.gifPicker.classList.add('hidden');
            this.dom.emojiPickerPopover.classList.add('hidden');
            this.dom.pinnedPopover.classList.toggle('hidden');
            if (!this.dom.pinnedPopover.classList.contains('hidden')) {
                this.renderPinnedMessages();
            }
        });

        // Close pinned messages popover on click of X
        this.dom.btnClosePinned.addEventListener('click', () => {
            this.dom.pinnedPopover.classList.add('hidden');
        });

        // Server Dropdown open/close
        this.dom.btnServerSettings.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.stateManager.state.activeServerId) return; // Only in servers
            this.dom.serverDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.dom.serverDropdown && !this.dom.serverDropdown.contains(e.target) && e.target !== this.dom.btnServerSettings) {
                this.dom.serverDropdown.classList.add('hidden');
            }
        });

        // Dropdown actions: Invite
        const dropdownInvite = document.getElementById('dropdown-invite');
        dropdownInvite.addEventListener('click', () => {
            this.dom.serverDropdown.classList.add('hidden');
            const activeServerId = this.stateManager.state.activeServerId;
            if (activeServerId) {
                this.dom.serverInviteLinkInput.value = `https://aurachat.gg/invite/${activeServerId}`;
                this.dom.modalServerInvite.classList.remove('hidden');
            }
        });

        // Copy Invite Link
        this.dom.btnCopyInviteLink.addEventListener('click', () => {
            this.dom.serverInviteLinkInput.select();
            document.execCommand('copy');
            const originalText = this.dom.btnCopyInviteLink.innerText;
            this.dom.btnCopyInviteLink.innerText = "Copied!";
            setTimeout(() => {
                this.dom.btnCopyInviteLink.innerText = originalText;
            }, 2000);
        });

        this.dom.btnCloseServerInvite.addEventListener('click', () => {
            this.dom.modalServerInvite.classList.add('hidden');
        });

        // Dropdown actions: Create Channel
        const dropdownCreateChannel = document.getElementById('dropdown-create-channel');
        dropdownCreateChannel.addEventListener('click', () => {
            this.dom.serverDropdown.classList.add('hidden');
            this.dom.modalAddChannel.classList.remove('hidden');
            this.dom.channelNameInput.focus();
        });

        // Dropdown actions: Server Settings
        const dropdownSettings = document.getElementById('dropdown-settings');
        dropdownSettings.addEventListener('click', () => {
            this.dom.serverDropdown.classList.add('hidden');
            const activeServer = this.stateManager.state.servers.find(s => s.id === this.stateManager.state.activeServerId);
            if (activeServer) {
                this.dom.serverSettingsName.value = activeServer.name;
                this.dom.serverSettingsIcon.value = activeServer.icon || "";
                this.dom.modalServerSettings.classList.remove('hidden');
                this.dom.serverSettingsName.focus();
            }
        });

        this.dom.btnCancelServerSettings.addEventListener('click', () => {
            this.dom.modalServerSettings.classList.add('hidden');
        });

        this.dom.btnSaveServerSettings.addEventListener('click', () => {
            const activeServerId = this.stateManager.state.activeServerId;
            const name = this.dom.serverSettingsName.value.trim();
            const icon = this.dom.serverSettingsIcon.value.trim().toUpperCase();
            if (name && activeServerId) {
                this.stateManager.updateServer(activeServerId, name, icon || null);
                this.dom.modalServerSettings.classList.add('hidden');
            }
        });

        // Delete Server
        const dropdownDeleteServer = document.getElementById('dropdown-delete-server');
        const deleteAction = () => {
            const activeServerId = this.stateManager.state.activeServerId;
            if (activeServerId) {
                const serverName = this.stateManager.state.servers.find(s => s.id === activeServerId)?.name;
                if (confirm(`⚠️ Are you absolutely sure you want to delete the server "${serverName}"? This action CANNOT be undone.`)) {
                    this.stateManager.deleteServer(activeServerId);
                    this.dom.modalServerSettings.classList.add('hidden');
                    this.dom.serverDropdown.classList.add('hidden');
                }
            }
        };
        dropdownDeleteServer.addEventListener('click', deleteAction);
        this.dom.btnServerDeleteModalAction.addEventListener('click', deleteAction);

        // Escape keys for server settings
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.dom.modalServerSettings.classList.add('hidden');
                this.dom.modalServerInvite.classList.add('hidden');
            }
        });

        // Initialize Emoji Picker
        this.initEmojiPicker();

        // Initialize Attachments logic
        this.initAttachmentsLogic();
    }

    // Modal helpers
    openSettingsModal() {
        const user = this.stateManager.state.currentUser;
        this.customAvatarDataUrl = null;
        this.dom.settingsPfpUpload.value = "";

        this.dom.settingsUsername.value = user.username;
        this.dom.settingsCustomStatus.value = user.customStatus || "";
        this.dom.settingsStatusSelect.value = user.status;
        this.dom.settingsHobbies.value = user.hobbies || "";
        this.dom.settingsActiveProjects.value = user.activeProjects || "";
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
        const hobbies = this.dom.settingsHobbies.value.trim();
        const activeProjects = this.dom.settingsActiveProjects.value.trim();

        let avatarParam;
        if (this.customAvatarDataUrl) {
            avatarParam = this.customAvatarDataUrl;
        } else if (this.selectedAvatarIndex !== -1) {
            avatarParam = this.selectedAvatarIndex;
        } else {
            avatarParam = this.stateManager.state.currentUser.avatar;
        }

        this.stateManager.updateUserProfile(username, status, customStatus, avatarParam, hobbies, activeProjects);
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
                    "`/theme [name]` - Swap styling (`dark`, `light`, `amoled`, `cyberpunk`, `forest`, `anime`, `ocean`, `sunset`)\n" +
                    "`/poll \"Question\" \"Option A\" \"Option B\" ...` - Create an interactive vote poll\n" +
                    "`/clear [count]` - Clear the last N messages or all chat history\n" +
                    "`/nick [name]` - Set a server-specific nickname\n" +
                    "`/whois [username]` - Inspect detailed profile cards inline\n" +
                    "`/joke` - Fetch a random developer joke\n" +
                    "`/gif [query]` - Open Tenor GIF picker and search automatically"
                );
                break;
            case '/clear':
                const countArg = tokens[1] ? parseInt(tokens[1], 10) : null;
                if (serverId) {
                    const server = this.stateManager.state.servers.find(s => s.id === serverId);
                    if (server && server.messages && server.messages[channelId]) {
                        if (countArg === null || isNaN(countArg)) {
                            server.messages[channelId] = [];
                            postResponse("🧹 **Chat history cleared!**");
                        } else {
                            server.messages[channelId].splice(-countArg);
                            postResponse(`🧹 **Cleared the last ${countArg} messages!**`);
                        }
                    }
                } else {
                    if (this.stateManager.state.directMessages && this.stateManager.state.directMessages[channelId]) {
                        if (countArg === null || isNaN(countArg)) {
                            this.stateManager.state.directMessages[channelId] = [];
                            postResponse("🧹 **Direct Messages cleared!**");
                        } else {
                            this.stateManager.state.directMessages[channelId].splice(-countArg);
                            postResponse(`🧹 **Cleared the last ${countArg} DMs!**`);
                        }
                    }
                }
                this.stateManager.save();
                this.renderMessagesList(this.stateManager.state);
                break;
            case '/nick':
                if (!serverId) {
                    postResponse("⚠️ Nicknames are server-specific and cannot be set in Direct Messages.");
                    break;
                }
                const nick = tokens.slice(1).join(" ").trim();
                this.stateManager.setServerNickname(serverId, nick || null);
                if (nick) {
                    postResponse(`👤 **Your nickname in this server has been changed to:** \`${nick}\``);
                } else {
                    postResponse("👤 **Your nickname in this server has been reset to default.**");
                }
                break;
            case '/joke':
                const jokes = [
                    "Why do programmers wear glasses? Because they need to C#.",
                    "There are 10 types of people in this world: Those who understand binary, and those who don't.",
                    "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
                    "['hip', 'hip'] (hip hip array!)",
                    "Why did the programmer quit his job? Because he didn't get arrays.",
                    "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'"
                ];
                const joke = jokes[Math.floor(Math.random() * jokes.length)];
                postResponse(`🤖 **Here is a developer joke:**\n> ${joke}`);
                break;
            case '/whois':
                const queryUser = tokens.slice(1).join(" ").trim().toLowerCase();
                if (!queryUser) {
                    postResponse("⚠️ Please specify a username. Usage: `/whois [username]`");
                    break;
                }
                let foundUser = null;
                for (const s of this.stateManager.state.servers) {
                    const member = s.members.find(m => m.username.toLowerCase() === queryUser);
                    if (member) { foundUser = member; break; }
                }
                if (!foundUser) {
                    if (queryUser === 'coderpro' || queryUser === 'current-user-1') foundUser = this.stateManager.state.currentUser;
                    else if (queryUser === 'alice') foundUser = { username: 'Alice', role: 'Admin', status: 'online' };
                    else if (queryUser === 'bob') foundUser = { username: 'Bob', role: 'Moderator', status: 'idle' };
                    else if (queryUser === 'aurorabot') foundUser = { username: 'AuroraBot', role: 'Bot', status: 'online' };
                }

                if (foundUser) {
                    postResponse(
                        `👤 **Profile Details for \`${foundUser.username}\`:**\n` +
                        `* **Status:** \`${foundUser.status || 'online'}\`\n` +
                        `* **Role/Privilege:** \`${foundUser.role || 'Member'}\`\n` +
                        `* **Account Type:** \`${foundUser.id === 'bot-aurora' || foundUser.role === 'Bot' ? 'System Bot' : 'Regular User'}\``
                    );
                } else {
                    postResponse(`🔍 User \`${queryUser}\` not found in this sandbox context.`);
                }
                break;
            case '/gif':
                const queryGif = tokens.slice(1).join(" ").trim();
                if (!queryGif) {
                    postResponse("⚠️ Please specify a query. Usage: `/gif [query]`");
                    break;
                }
                this.dom.gifPicker.classList.remove('hidden');
                this.dom.gifSearch.value = queryGif;
                this.dom.gifSearch.focus();
                this.searchGIFs(queryGif);
                postResponse(`🔍 Searching Tenor for **"${queryGif}"**...`);
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
                    'cyberpunk': 'theme-cyberpunk', 'forest': 'theme-forest',
                    'anime': 'theme-anime', 'ocean': 'theme-ocean', 'sunset': 'theme-sunset'
                };
                if (map[specifiedTheme]) {
                    this.setTheme(map[specifiedTheme]);
                    postResponse(`🎨 Shifted UI theme to **${specifiedTheme}**!`);
                } else {
                    postResponse("⚠️ Theme options: `dark`, `light`, `amoled`, `cyberpunk`, `forest`, `anime`, `ocean`, `sunset`");
                }
                break;
            case '/poll':
                // Reset poll inputs
                this.dom.pollQuestionInput.value = "";
                this.dom.pollOptionsInputsContainer.innerHTML = "";
                this.dom.pollMultipleToggle.checked = false;

                // Try to parse command arguments if any
                const matches = [...text.matchAll(/"([^"]+)"/g)].map(m => m[1]);
                if (matches.length > 0) {
                    this.dom.pollQuestionInput.value = matches[0];
                    const optionsText = matches.slice(1);
                    if (optionsText.length > 0) {
                        optionsText.forEach((optText, index) => {
                            const wrapper = document.createElement('div');
                            wrapper.className = 'poll-option-input-wrapper';
                            wrapper.style.display = 'flex';
                            wrapper.style.gap = '8px';
                            wrapper.style.alignItems = 'center';
                            wrapper.innerHTML = `
                                <input type="text" class="poll-modal-option-field" placeholder="Option ${index + 1}" maxlength="60" autocomplete="off" style="flex: 1;" value="${this.escapeHTML(optText)}">
                                <button type="button" class="poll-modal-remove-option" style="color: var(--text-muted); opacity: 0.6;" aria-label="Remove option">
                                    <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                                </button>
                            `;
                            this.dom.pollOptionsInputsContainer.appendChild(wrapper);
                        });
                    }
                }

                // If less than 2 options prefilled, ensure at least 2 empty options exist
                const currentCount = this.dom.pollOptionsInputsContainer.querySelectorAll('.poll-option-input-wrapper').length;
                for (let i = currentCount; i < 2; i++) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'poll-option-input-wrapper';
                    wrapper.style.display = 'flex';
                    wrapper.style.gap = '8px';
                    wrapper.style.alignItems = 'center';
                    wrapper.innerHTML = `
                        <input type="text" class="poll-modal-option-field" placeholder="Option ${i + 1}" maxlength="60" autocomplete="off" style="flex: 1;">
                        <button type="button" class="poll-modal-remove-option" style="color: var(--text-muted); opacity: 0.6;" aria-label="Remove option">
                            <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                        </button>
                    `;
                    this.dom.pollOptionsInputsContainer.appendChild(wrapper);
                }

                lucide.createIcons();

                // Open modal
                this.dom.modalCreatePoll.classList.remove('hidden');
                this.dom.pollQuestionInput.focus();
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

            if (cleanInput.includes('@') || cleanInput.includes('ping')) {
                const mentionedUser = this.stateManager.state.currentUser.username;
                const triggerWord = cleanInput.includes('ping') ? 'ping' : 'mention';
                replyText = `Hey @${mentionedUser}! I saw you send a ${triggerWord}. Thanks for testing the mention system! 🔔`;
                if (isDM) {
                    if (channelId === 'dm-alice') {
                        sender = { userId: 'user-alice', username: 'Alice', avatar: window.DEFAULT_AVATARS[1] };
                    } else if (channelId === 'dm-bob') {
                        sender = { userId: 'user-bob', username: 'Bob', avatar: window.DEFAULT_AVATARS[2] };
                    } else if (channelId === 'dm-biswajeet') {
                        sender = { userId: 'user-biswajeet', username: 'Developer Biswajeet', avatar: "assets/developer_biswajeet_avatar.png" };
                    }
                }
            } else if (isDM) {
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
                        avatar: "assets/developer_biswajeet_avatar.png"
                    };
                    if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                        replyText = "Hello! Developer Biswajeet here. 💻 Welcome to AuraChat! I designed this workspace with a zero-dependency architecture, utilizing pure ES6 state containers and premium CSS variables. What kind of feature are we coding today?";
                    } else if (cleanInput.includes("feature") || cleanInput.includes("add") || cleanInput.includes("change") || cleanInput.includes("build") || cleanInput.includes("new")) {
                        replyText = "I love architecting new features! We just shipped dynamic reactions, markdown compilers, a Tenor GIF picker, and a full Poll Creator. What if we added custom soundboards, file sharing, or maybe dynamic server categories next?";
                    } else if (cleanInput.includes("help") || cleanInput.includes("command") || cleanInput.includes("slash")) {
                        replyText = "AuraChat supports built-in slash command compilation! You can try `/help` for command indexes, `/ping` for checking latency loops, `/roll` to test the randomizer engine, or `/poll` to test the new interactive poll cards.";
                    } else if (cleanInput.includes("code") || cleanInput.includes("how") || cleanInput.includes("write") || cleanInput.includes("js")) {
                        replyText = "I write all my logic in vanilla Javascript using class-based controllers and reactive state subscriptions. It keeps the bundle size incredibly tiny, loads instantly, and runs directly in any modern browser engine!";
                    } else {
                        replyText = "Developer Biswajeet here. Let me know what you think of our brand-new user profile cards and note persistence. Feel free to suggest your ideas and let's keep refactoring!";
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

    submitChatMessage() {
        const text = this.dom.messageInput.value.trim();
        const hasAttachments = this.activeAttachments && this.activeAttachments.length > 0;
        if (!text && !hasAttachments) return;

        this.dom.messageInput.value = "";
        const currentServerId = this.stateManager.state.activeServerId;
        const currentChannelId = this.stateManager.state.activeChannelId;

        // Reset textarea height to default 44px
        const wrapper = this.dom.messageInput.closest('.chat-input-wrapper');
        if (wrapper) {
            this.dom.messageInput.style.height = '20px';
            wrapper.style.height = '44px';
            this.dom.messageInput.style.overflowY = 'hidden';
        }

        const attachmentsToSend = hasAttachments ? [...this.activeAttachments] : null;
        this.activeAttachments = [];
        this.dom.attachmentDrawer.classList.add('hidden');
        this.dom.attachmentDrawer.innerHTML = '';

        if (currentChannelId) {
            this.forceScrollToBottom = true;
            if (currentServerId) {
                this.stateManager.addMessage(currentServerId, currentChannelId, text, null, null, attachmentsToSend);
            } else {
                this.stateManager.addDirectMessage(currentChannelId, text, null, null, attachmentsToSend);
            }

            if (text.startsWith('/')) {
                this.handleCommand(text, currentServerId, currentChannelId);
            } else {
                this.triggerMockReply(text, currentServerId, currentChannelId);
            }
        }
    }

    // Autocomplete rendering and selection methods
    handleInputAutocomplete() {
        const text = this.dom.messageInput.value;
        const cursor = this.dom.messageInput.selectionStart;

        // Process Mentions Autocomplete
        const textBeforeCursor = text.substring(0, cursor);
        const lastWordMatch = textBeforeCursor.match(/@(\S*)$/);
        
        if (lastWordMatch) {
            this.dom.slashCommandsPopover.classList.add('hidden'); // Hide commands if typing mention
            const query = lastWordMatch[1].toLowerCase();
            this.showMentionsAutocomplete(query);
            return;
        } else {
            this.dom.mentionsPopover.classList.add('hidden');
        }

        if (text.startsWith('/')) {
            const tokens = text.trim().split(/\s+/);
            const command = tokens[0].toLowerCase();
            const textEndsWithSpace = this.dom.messageInput.value.endsWith(' ');

            if ((command === '/theme' && tokens.length >= 2) || (command === '/theme' && textEndsWithSpace)) {
                const subQuery = tokens[1] ? tokens[1].toLowerCase() : '';
                const themeOptions = [
                    { name: 'dark', desc: 'Dark theme' },
                    { name: 'light', desc: 'Light theme' },
                    { name: 'amoled', desc: 'AMOLED black theme' },
                    { name: 'cyberpunk', desc: 'Cyberpunk neon theme' },
                    { name: 'forest', desc: 'Forest green theme' },
                    { name: 'anime', desc: 'Midnight Sakura (Anime) theme' },
                    { name: 'ocean', desc: 'Ocean Breeze theme' },
                    { name: 'sunset', desc: 'Sunset Glow theme' }
                ];
                this.filteredCommands = themeOptions
                    .filter(opt => opt.name.startsWith(subQuery) && opt.name !== subQuery)
                    .map(opt => ({
                        name: `/theme ${opt.name}`,
                        desc: opt.desc,
                        isSubOption: true,
                        rawName: opt.name
                    }));
            } else if ((command === '/clear' && tokens.length >= 2) || (command === '/clear' && textEndsWithSpace)) {
                const subQuery = tokens[1] ? tokens[1].toLowerCase() : '';
                const clearOptions = [
                    { name: '10', desc: 'Clear the last 10 messages' },
                    { name: '50', desc: 'Clear the last 50 messages' },
                    { name: 'all', desc: 'Clear the entire chat history' }
                ];
                this.filteredCommands = clearOptions
                    .filter(opt => opt.name.startsWith(subQuery) && opt.name !== subQuery)
                    .map(opt => ({
                        name: `/clear ${opt.name}`,
                        desc: opt.desc,
                        isSubOption: true,
                        rawName: opt.name
                    }));
            } else if ((command === '/whois' && tokens.length >= 2) || (command === '/whois' && textEndsWithSpace)) {
                const subQuery = tokens.slice(1).join(" ").toLowerCase();
                const activeServer = this.stateManager.state.servers.find(s => s.id === this.stateManager.state.activeServerId);
                const members = activeServer ? activeServer.members : [];
                const candidates = members.length > 0 ? members : [
                    { username: 'Alice' },
                    { username: 'Bob' },
                    { username: 'Developer Biswajeet' }
                ];
                this.filteredCommands = candidates
                    .filter(m => m.username.toLowerCase().startsWith(subQuery) && m.username.toLowerCase() !== subQuery)
                    .map(m => ({
                        name: `/whois ${m.username}`,
                        desc: `Inspect profile details for ${m.username}`,
                        isSubOption: true,
                        rawName: m.username
                    }));
            } else {
                const query = text.toLowerCase();
                this.filteredCommands = this.allCommands.filter(cmd => cmd.name.startsWith(query));
            }

            if (this.filteredCommands.length > 0) {
                this.selectedCommandIndex = Math.min(this.selectedCommandIndex, this.filteredCommands.length - 1);
                if (this.selectedCommandIndex < 0) this.selectedCommandIndex = 0;
                this.renderFilteredCommands();
                this.dom.slashCommandsPopover.classList.remove('hidden');
            } else {
                this.dom.slashCommandsPopover.classList.add('hidden');
            }
        } else {
            this.dom.slashCommandsPopover.classList.add('hidden');
        }
    }

    renderFilteredCommands() {
        this.dom.slashCommandsList.innerHTML = '';
        this.filteredCommands.forEach((cmd, idx) => {
            const item = document.createElement('div');
            item.className = `slash-command-item ${idx === this.selectedCommandIndex ? 'selected' : ''}`;
            item.innerHTML = `
                <span class="slash-command-name">${cmd.name}</span>
                <span class="slash-command-desc">${cmd.desc}</span>
            `;
            item.addEventListener('click', () => {
                this.selectAutocompleteCommand(cmd);
            });
            this.dom.slashCommandsList.appendChild(item);
        });
    }

    selectAutocompleteCommand(cmd) {
        if (!cmd) return;
        let shouldSubmit = false;
        if (cmd.isSubOption) {
            this.dom.messageInput.value = cmd.name;
            shouldSubmit = true;
        } else {
            this.dom.messageInput.value = cmd.name + ' ';
            const instantCommands = ['/help', '/ping', '/roll', '/joke'];
            if (instantCommands.includes(cmd.name.toLowerCase())) {
                shouldSubmit = true;
            }
        }
        this.dom.slashCommandsPopover.classList.add('hidden');
        this.dom.messageInput.focus();
        this.dom.messageInput.dispatchEvent(new Event('input', { bubbles: true }));

        if (shouldSubmit) {
            this.submitChatMessage();
        }
    }

    showMentionsAutocomplete(query) {
        const activeServer = this.stateManager.state.servers.find(s => s.id === this.stateManager.state.activeServerId);
        const serverMembers = activeServer ? activeServer.members : [];
        
        const candidates = [];
        
        // Special pings
        candidates.push({ username: 'everyone', tag: '', desc: 'Notify everyone in this channel', avatar: '' });
        candidates.push({ username: 'here', tag: '', desc: 'Notify active members in this channel', avatar: '' });
        
        const seenIds = new Set();
        
        // Server members
        serverMembers.forEach(m => {
            if (!seenIds.has(m.id)) {
                seenIds.add(m.id);
                candidates.push({
                    username: m.username,
                    tag: m.tag || '0000',
                    avatar: m.avatar || '',
                    desc: m.role || 'Member'
                });
            }
        });
        
        // Current user
        const curUser = this.stateManager.state.currentUser;
        if (curUser && !seenIds.has(curUser.id)) {
            seenIds.add(curUser.id);
            candidates.push({
                username: curUser.username,
                tag: curUser.tag || '1337',
                avatar: curUser.avatar,
                desc: 'You'
            });
        }
        
        // DM users
        if (this.stateManager.state.directMessages) {
            Object.keys(this.stateManager.state.directMessages).forEach(k => {
                const partnerName = k.replace('dm-', '');
                const capitalized = partnerName.charAt(0).toUpperCase() + partnerName.slice(1);
                const partnerId = `user-${partnerName}`;
                if (!seenIds.has(partnerId)) {
                    seenIds.add(partnerId);
                    candidates.push({
                        username: capitalized,
                        tag: '0000',
                        avatar: window.DEFAULT_AVATARS[1],
                        desc: 'Friend'
                    });
                }
            });
        }
        
        // Filter
        this.filteredMentions = candidates.filter(c => c.username.toLowerCase().includes(query));
        
        if (this.filteredMentions.length > 0) {
            this.selectedMentionIndex = Math.min(this.selectedMentionIndex, this.filteredMentions.length - 1);
            if (this.selectedMentionIndex < 0) this.selectedMentionIndex = 0;
            this.renderFilteredMentions();
            this.dom.mentionsPopover.classList.remove('hidden');
        } else {
            this.dom.mentionsPopover.classList.add('hidden');
        }
    }

    renderFilteredMentions() {
        this.dom.mentionsList.innerHTML = '';
        this.filteredMentions.forEach((mention, index) => {
            const div = document.createElement('div');
            div.className = `mention-item ${index === this.selectedMentionIndex ? 'selected' : ''}`;
            
            let avatarHtml = '';
            if (mention.avatar) {
                avatarHtml = `<img class="mention-item-avatar" src="${mention.avatar}" alt="${mention.username}">`;
            } else {
                const initial = mention.username.charAt(0).toUpperCase();
                avatarHtml = `<div class="mention-item-avatar-placeholder">${initial}</div>`;
            }
            
            div.innerHTML = `
                ${avatarHtml}
                <span class="mention-name">@${mention.username}</span>
                ${mention.tag ? `<span class="mention-tag">#${mention.tag}</span>` : ''}
                <span class="mention-desc">${mention.desc}</span>
            `;
            
            div.addEventListener('click', () => {
                this.selectMention(mention.username);
            });
            
            this.dom.mentionsList.appendChild(div);
        });
    }

    selectMention(username) {
        const text = this.dom.messageInput.value;
        const cursor = this.dom.messageInput.selectionStart;
        const textBeforeCursor = text.substring(0, cursor);
        const textAfterCursor = text.substring(cursor);
        
        const lastWordMatch = textBeforeCursor.match(/@(\S*)$/);
        if (lastWordMatch) {
            const startIndex = lastWordMatch.index;
            const newTextBefore = textBeforeCursor.substring(0, startIndex) + `@${username} `;
            this.dom.messageInput.value = newTextBefore + textAfterCursor;
            this.dom.messageInput.focus();
            const newCursorPos = newTextBefore.length;
            this.dom.messageInput.setSelectionRange(newCursorPos, newCursorPos);
            this.dom.messageInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        this.dom.mentionsPopover.classList.add('hidden');
    }

    getKnownUsernames() {
        const usernames = new Set(['everyone', 'here']);
        
        if (this.stateManager.state.currentUser) {
            usernames.add(this.stateManager.state.currentUser.username);
        }
        
        if (this.stateManager.state.servers) {
            this.stateManager.state.servers.forEach(server => {
                if (server.members) {
                    server.members.forEach(m => usernames.add(m.username));
                }
            });
        }
        
        if (this.stateManager.state.directMessages) {
            Object.keys(this.stateManager.state.directMessages).forEach(k => {
                const partnerName = k.replace('dm-', '');
                const capitalized = partnerName.charAt(0).toUpperCase() + partnerName.slice(1);
                usernames.add(capitalized);
                
                const msgs = this.stateManager.state.directMessages[k];
                if (msgs && msgs.length > 0) {
                    msgs.forEach(m => usernames.add(m.username));
                }
            });
        }
        
        usernames.add('Alice');
        usernames.add('Bob');
        usernames.add('Developer Biswajeet');
        usernames.add('CoderPro');
        
        return Array.from(usernames);
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
                { id: "dm-biswajeet", username: "Developer Biswajeet", avatar: "assets/developer_biswajeet_avatar.png", status: "online", verified: true }
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
        const textKey = activeServer.id + '-text';
        const isTextCollapsed = this.collapsedCategories.has(textKey);

        const textHeader = document.createElement('div');
        textHeader.className = `channel-section-header category-header ${isTextCollapsed ? 'collapsed' : ''}`;
        textHeader.innerHTML = `
            <span class="channel-section-title"><i data-lucide="chevron-down" style="width:12px; height:12px;"></i> Text Channels</span>
            <button class="add-channel-btn" id="btn-add-channel-text" data-tooltip="Create Channel" aria-label="Add Text Channel">
                <i data-lucide="plus" style="width:14px; height:14px;"></i>
            </button>
        `;
        this.dom.channelsListContainer.appendChild(textHeader);

        const textList = document.createElement('div');
        textList.className = `channel-list channel-list-wrapper ${isTextCollapsed ? 'collapsed' : ''}`;

        activeServer.channels.filter(c => c.type === "text").forEach(c => {
            const isSelected = state.activeChannelId === c.id;
            const unreadsCount = (state.unreads && state.unreads[c.id]) || 0;
            const item = document.createElement('div');
            item.className = `channel-item ${isSelected ? 'active' : ''} ${unreadsCount > 0 ? 'has-unread' : ''}`;
            item.innerHTML = `
                <div class="channel-unread-pill"></div>
                <div class="channel-item-left">
                    <i data-lucide="hash"></i>
                    <span class="channel-item-name">${c.name}</span>
                </div>
                ${unreadsCount > 0 ? `<span class="channel-unread-badge">${unreadsCount}</span>` : ''}
            `;
            item.addEventListener('click', () => {
                if (state.unreads && state.unreads[c.id]) {
                    delete state.unreads[c.id];
                    this.stateManager.save();
                }
                this.stateManager.setActiveChannel(c.id);
            });
            textList.appendChild(item);
        });
        this.dom.channelsListContainer.appendChild(textList);

        // Category Collapse/Expand Click Listeners
        textHeader.querySelector('.channel-section-title').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.collapsedCategories.has(textKey)) {
                this.collapsedCategories.delete(textKey);
            } else {
                this.collapsedCategories.add(textKey);
            }
            this.renderChannelsList(state);
            lucide.createIcons();
        });

        // Voice Channels Section
        const voiceKey = activeServer.id + '-voice';
        const isVoiceCollapsed = this.collapsedCategories.has(voiceKey);

        const voiceHeader = document.createElement('div');
        voiceHeader.className = `channel-section-header category-header ${isVoiceCollapsed ? 'collapsed' : ''}`;
        voiceHeader.style.marginTop = "16px";
        voiceHeader.innerHTML = `
            <span class="channel-section-title"><i data-lucide="chevron-down" style="width:12px; height:12px;"></i> Voice Channels</span>
            <button class="add-channel-btn" id="btn-add-channel-voice" data-tooltip="Create Channel" aria-label="Add Voice Channel">
                <i data-lucide="plus" style="width:14px; height:14px;"></i>
            </button>
        `;
        this.dom.channelsListContainer.appendChild(voiceHeader);

        const voiceList = document.createElement('div');
        voiceList.className = `channel-list channel-list-wrapper ${isVoiceCollapsed ? 'collapsed' : ''}`;

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

            if (isConnected) {
                const usersList = document.createElement('div');
                usersList.className = "voice-users-list";
                const isSpeaking = !state.isMuted;
                usersList.innerHTML = `
                    <div class="voice-user ${isSpeaking ? 'speaking' : ''}">
                        <img src="${state.currentUser.avatar}">
                        <span>${this.getUserDisplayName(state.currentUser.id, state.activeServerId)}</span>
                    </div>
                `;
                voiceList.appendChild(usersList);
            }
        });
        this.dom.channelsListContainer.appendChild(voiceList);

        voiceHeader.querySelector('.channel-section-title').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.collapsedCategories.has(voiceKey)) {
                this.collapsedCategories.delete(voiceKey);
            } else {
                this.collapsedCategories.add(voiceKey);
            }
            this.renderChannelsList(state);
            lucide.createIcons();
        });

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
            this.dom.soundboardPopover.classList.add('hidden');
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
        const scrollContainer = this.dom.messagesList;
        const previousScrollTop = scrollContainer.scrollTop;
        const previousScrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;

        let wasNearBottom = previousScrollHeight === 0 || (previousScrollHeight - previousScrollTop - clientHeight) < 45;
        if (this.forceScrollToBottom) {
            wasNearBottom = true;
            this.forceScrollToBottom = false;
        }

        scrollContainer.innerHTML = "";
        this.dom.viewingOlderBanner.classList.add('hidden');

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
            scrollContainer.innerHTML = `
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
            const isNew = (Date.now() - new Date(msg.timestamp).getTime()) < 3000;

            if (!this.playedPingMessageIds) {
                this.playedPingMessageIds = new Set();
            }
            const curUsername = state.currentUser.username.toLowerCase();
            const hasMention = msg.content && (msg.content.toLowerCase().includes('@' + curUsername) || msg.content.toLowerCase().includes('@everyone') || msg.content.toLowerCase().includes('@here'));

            if (hasMention) {
                const isNewMsg = (Date.now() - new Date(msg.timestamp).getTime()) < 5000;
                if (isNewMsg && msg.userId !== 'current-user-1' && !this.playedPingMessageIds.has(msg.id)) {
                    this.playedPingMessageIds.add(msg.id);
                    this.audio.playPing();
                }
            }

            card.className = `message-card message-item ${isNew ? 'message-slide-in' : ''} ${hasMention ? 'mentioned' : ''}`;
            card.setAttribute('data-message-id', msg.id);

            const timestampFormatted = this.formatTimestamp(msg.timestamp);
            const isOwnMessage = msg.userId === 'current-user-1' || msg.userId === 'user-biswajeet';
            const pinIcon = msg.pinned ? "pin-off" : "pin";
            const pinTooltip = msg.pinned ? "Unpin Message" : "Pin Message";

            card.innerHTML = `
                <img src="${msg.avatar}" class="message-avatar" alt="${msg.username}'s avatar">
                <div class="message-body">
                    <div class="message-header">
                        <span class="message-username">${msg.username}${msg.username === "Developer Biswajeet" ? `<i data-lucide="badge-check" style="color: #00A8FC; width: 14px; height: 14px; margin-left: 4px; display: inline-flex; align-items: center; justify-content: center; transform: translateY(2px);"></i>` : ''}</span>
                        <span class="message-timestamp">${timestampFormatted}${msg.edited ? `<span class="message-edited-tag">(edited)</span>` : ''}</span>
                    </div>
                    <div class="message-content" id="message-content-${msg.id}">${this.renderMessageContent(msg)}</div>
                    <!-- Attachments -->
                    <div class="message-attachments-container" id="attachments-container-${msg.id}"></div>
                    <div class="message-reactions" id="reactions-container-${msg.id}">
                        <!-- Reactions rendered here -->
                    </div>
                </div>
                <div class="message-actions-bar">
                    <button class="action-bar-btn add-reaction-btn" data-tooltip="Add Reaction" aria-label="Add reaction">
                        <i data-lucide="smile"></i>
                    </button>
                    <button class="action-bar-btn pin-msg-btn" data-tooltip="${pinTooltip}" aria-label="${pinTooltip}">
                        <i data-lucide="${pinIcon}"></i>
                    </button>
                    ${isOwnMessage ? `
                    <button class="action-bar-btn edit-msg-btn" data-tooltip="Edit" aria-label="Edit message">
                        <i data-lucide="edit-3"></i>
                    </button>
                    <button class="action-bar-btn delete-btn" data-tooltip="Delete" aria-label="Delete message">
                        <i data-lucide="trash-2"></i>
                    </button>
                    ` : ''}
                </div>
            `;

            scrollContainer.appendChild(card);

            // Bind message action listeners
            const reactBtn = card.querySelector('.add-reaction-btn');
            reactBtn.addEventListener('click', (e) => {
                this.showReactionPicker(e, msg.id);
            });

            const pinBtn = card.querySelector('.pin-msg-btn');
            pinBtn.addEventListener('click', () => {
                this.togglePinMessage(msg.id);
            });

            if (isOwnMessage) {
                const editBtn = card.querySelector('.edit-msg-btn');
                editBtn.addEventListener('click', () => {
                    this.editMessageInline(msg.id);
                });

                const deleteBtn = card.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => {
                    this.deleteMessage(msg.id);
                });
            }

            // Render attachments and previews
            this.renderMessageAttachments(msg);
            this.renderLinkPreviews(msg);

            // Render reactions for this message
            this.renderReactions(state, msg);
        });

        // Restore scroll position or snap to bottom
        if (wasNearBottom) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        } else {
            scrollContainer.scrollTop = previousScrollTop;
        }
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
            pill.className = `reaction-chip ${hasReacted ? 'active' : ''}`;
            pill.innerHTML = `
                <span class="reaction-emoji">${react.emoji}</span>
                <span class="reaction-count">${react.count}</span>
            `;

            pill.addEventListener('click', () => {
                pill.classList.add('reaction-pop');
                setTimeout(() => {
                    this.stateManager.addReaction(
                        state.activeServerId,
                        state.activeChannelId,
                        msg.id,
                        react.emoji
                    );
                }, 150);
            });

            reactContainer.appendChild(pill);
        });
    }

    renderMessageContent(msg) {
        if (msg.poll) {
            return this.renderPollCard(msg);
        }

        const content = msg.content;
        const isGif = content.startsWith('http') && (content.includes('.gif') || content.includes('tenor.co') || content.includes('giphy.com'));
        if (isGif) {
            return `<img src="${this.escapeHTML(content)}" class="gif-attachment" alt="Animated GIF">`;
        }

        let compiled = this.compileMarkdown(content).replace(/\n/g, '<br>');
        
        // Parse @mentions
        const knownNames = this.getKnownUsernames();
        knownNames.sort((a, b) => b.length - a.length);
        
        knownNames.forEach(name => {
            const escaped = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`@(${escaped})\\b`, 'gi');
            compiled = compiled.replace(regex, '<span class="mention">@$1</span>');
        });

        return compiled;
    }

    renderPollCard(msg) {
        const poll = msg.poll;
        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);

        let optionsHtml = "";
        poll.options.forEach((opt, idx) => {
            const currentUserId = this.stateManager.state.currentUser.id;
            const hasVoted = opt.votes.includes(currentUserId);

            // Calculate percentage
            const pct = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;

            optionsHtml += `
                <button class="poll-option-btn ${hasVoted ? 'voted' : ''}" data-message-id="${msg.id}" data-option-index="${idx}">
                    <div class="poll-progress-bg" style="width: ${pct}%"></div>
                    <div class="poll-option-left">
                        <div class="poll-indicator-circle"></div>
                        <span class="poll-option-text">${this.escapeHTML(opt.text)}</span>
                    </div>
                    <span class="poll-option-stats">
                        <span>${opt.votes.length} vote${opt.votes.length !== 1 ? 's' : ''}</span>
                        <span>${pct}%</span>
                    </span>
                </button>
            `;
        });

        return `
            <div class="poll-card ${poll.multiple ? 'multiple-choice' : ''}">
                <div class="poll-question">
                    <i data-lucide="bar-chart-3" style="width: 18px; height: 18px;"></i>
                    <span>${this.escapeHTML(poll.question)}</span>
                </div>
                <div class="poll-options">
                    ${optionsHtml}
                </div>
                <div class="poll-footer">
                    <span>${poll.multiple ? '☑️ Multiple Answers Allowed' : '🔘 Single Answer Only'}</span>
                    <span>${totalVotes} vote${totalVotes !== 1 ? 's' : ''} total</span>
                </div>
            </div>
        `;
    }

    showReactionPicker(e, messageId) {
        e.stopPropagation();

        // Remove any existing picker
        const oldPicker = document.querySelector('.reaction-picker-menu');
        if (oldPicker) {
            const oldParent = oldPicker.closest('.message-hover-actions');
            if (oldParent) oldParent.classList.remove('has-active-picker');
            oldPicker.remove();
        }

        const btn = e.currentTarget;
        const hoverActions = btn.closest('.message-hover-actions');
        if (hoverActions) {
            hoverActions.classList.add('has-active-picker');
        }

        const picker = document.createElement('div');
        picker.className = 'reaction-picker-menu';

        // Dynamic positioning: if button is near the top of the viewport, open downwards
        const rect = btn.getBoundingClientRect();
        if (rect.top < 160) {
            picker.classList.add('open-below');
        }

        const emojis = ['👍', '❤️', '🔥', '😂', '🚀', '👀'];
        emojis.forEach(emoji => {
            const item = document.createElement('button');
            item.className = 'picker-emoji';
            item.innerText = emoji;
            item.addEventListener('click', () => {
                const activeServerId = this.stateManager.state.activeServerId;
                const activeChannelId = this.stateManager.state.activeChannelId;
                this.stateManager.addReaction(activeServerId, activeChannelId, messageId, emoji);
                if (hoverActions) {
                    hoverActions.classList.remove('has-active-picker');
                }
                picker.remove();
            });
            picker.appendChild(item);
        });

        btn.appendChild(picker);

        // Click outside closes the reaction picker
        const closePicker = () => {
            if (hoverActions) {
                hoverActions.classList.remove('has-active-picker');
            }
            picker.remove();
            document.removeEventListener('click', closePicker);
        };
        setTimeout(() => {
            document.addEventListener('click', closePicker);
        }, 0);
    }

    compileMarkdown(text) {
        if (!text) return "";
        let html = this.escapeHTML(text);

        // Code Blocks: ```lang\ncode\n```
        html = html.replace(/```([a-zA-Z0-9]+)?(?:\s+)?([\s\S]*?)```/g, (match, lang, code) => {
            const displayLang = (lang || 'code').toUpperCase();
            const cleanCode = code.replace(/^\r?\n|\r?\n$/g, '');
            return `
                <div class="block-code-wrapper">
                    <div class="block-code-header">
                        <span class="block-code-lang">${displayLang}</span>
                        <button class="block-code-copy-btn" onclick="navigator.clipboard.writeText(this.closest('.block-code-wrapper').querySelector('.block-code').innerText).then(() => { this.innerText='Copied!'; setTimeout(() => this.innerText='Copy', 2000); })">Copy</button>
                    </div>
                    <code class="block-code">${cleanCode}</code>
                </div>
            `;
        });

        // Inline Code: `code`
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

        // Bold: **text**
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Italic: *text*
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        // Underline: __text__
        html = html.replace(/__([^_]+)__/g, '<u>$1</u>');

        // Strikethrough: ~~text~~
        html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');

        return html;
    }

    async searchGIFs(query) {
        this.dom.gifGrid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); font-size: 0.8rem; padding-top: 20px;">Searching...</div>`;
        if (!query) {
            this.renderCuratedGIFs();
            return;
        }

        try {
            const response = await fetch(`https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA&limit=16`);
            if (!response.ok) throw new Error("API response error");
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                this.dom.gifGrid.innerHTML = "";
                data.results.forEach(result => {
                    const gifUrl = result.media && result.media[0] && result.media[0].tinygif ? result.media[0].tinygif.url : result.url;

                    const img = document.createElement('img');
                    img.src = gifUrl;
                    img.className = 'gif-item';
                    img.alt = query;
                    img.addEventListener('click', () => {
                        this.sendGIF(gifUrl);
                    });
                    this.dom.gifGrid.appendChild(img);
                });
            } else {
                this.renderCuratedGIFs(query);
            }
        } catch (err) {
            console.warn("Tenor API search failed, falling back to local dictionary:", err);
            this.renderCuratedGIFs(query);
        }
    }

    renderCuratedGIFs(filterQuery = "") {
        this.dom.gifGrid.innerHTML = "";

        let gifs = CURATED_GIFS;
        if (filterQuery) {
            const lowerQuery = filterQuery.toLowerCase();
            gifs = CURATED_GIFS.filter(gif =>
                gif.tags.some(tag => tag.includes(lowerQuery))
            );
        }

        if (gifs.length === 0) {
            this.dom.gifGrid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); font-size: 0.8rem; padding-top: 20px;">No GIFs found</div>`;
            return;
        }

        gifs.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif.url;
            img.className = 'gif-item';
            img.alt = gif.tags.join(" ");
            img.addEventListener('click', () => {
                this.sendGIF(gif.url);
            });
            this.dom.gifGrid.appendChild(img);
        });
    }

    sendGIF(gifUrl) {
        const currentServerId = this.stateManager.state.activeServerId;
        const currentChannelId = this.stateManager.state.activeChannelId;

        if (currentChannelId) {
            this.forceScrollToBottom = true;
            if (currentServerId) {
                this.stateManager.addMessage(currentServerId, currentChannelId, gifUrl);
            } else {
                this.stateManager.addDirectMessage(currentChannelId, gifUrl);
            }

            this.dom.gifPicker.classList.add('hidden');
            this.dom.gifSearch.value = "";
        }
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
                let subtext = member.status;
                if (member.role === 'Bot') {
                    subtext = '[BOT] Connected';
                } else if (member.activity) {
                    subtext = `${member.activity.type} <strong>${member.activity.name}</strong>`;
                }

                item.innerHTML = `
                    <div class="member-avatar-wrapper">
                        <img src="${member.avatar}" class="member-avatar">
                        <div class="status-dot ${member.status}"></div>
                    </div>
                    <div class="member-details">
                        <span class="member-name">${member.username}</span>
                        <span class="member-status-text">${subtext}</span>
                    </div>
                `;

                item.addEventListener('click', (e) => {
                    let aboutMe = "No bio provided.";
                    if (member.id === 'user-biswajeet') {
                        aboutMe = "AuraChat Creator & Lead Frontend Architect. Ask me for features or help!";
                    } else if (member.id === 'bot-aurora') {
                        aboutMe = "Official AuraChat system assistant.";
                    } else if (member.id === 'user-alice') {
                        aboutMe = "Server Administrator.";
                    } else if (member.id === 'user-bob') {
                        aboutMe = "Server Moderator.";
                    }

                    this.showUserProfile(e, {
                        id: member.id,
                        username: member.username,
                        avatar: member.avatar,
                        status: member.status,
                        role: member.role || "Member",
                        aboutMe: aboutMe
                    });
                });

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

    resolveUserByUsername(username) {
        const lower = username.toLowerCase();
        
        // 1. Check current user
        const curUser = this.stateManager.state.currentUser;
        if (curUser && curUser.username.toLowerCase() === lower) {
            return {
                id: curUser.id,
                username: curUser.username,
                avatar: curUser.avatar,
                status: curUser.status,
                role: 'Owner',
                aboutMe: 'Logged in user. Customizing the AuraChat experience.',
                hobbies: curUser.hobbies || '',
                activeProjects: curUser.activeProjects || ''
            };
        }
        
        // 2. Check server members
        if (this.stateManager.state.servers) {
            for (const server of this.stateManager.state.servers) {
                if (server.members) {
                    const found = server.members.find(m => m.username.toLowerCase() === lower);
                    if (found) {
                        let role = found.role || "Member";
                        let aboutMe = "No bio provided.";
                        if (found.id === 'user-biswajeet') {
                            role = "Developer";
                            aboutMe = "AuraChat Creator & Lead Frontend Architect. Ask me for features or help!";
                        } else if (found.id === 'user-alice') {
                            role = "Wizard";
                            aboutMe = "Server Administrator.";
                        } else if (found.id === 'user-bob') {
                            role = "Wizard";
                            aboutMe = "Server Moderator.";
                        }
                        return {
                            id: found.id,
                            username: found.username,
                            avatar: found.avatar,
                            status: found.status || 'online',
                            role: role,
                            aboutMe: aboutMe
                        };
                    }
                }
            }
        }
        
        // 3. Fallbacks for system users / bot
        if (lower === 'aurorabot' || lower === 'aurora') {
            return {
                id: 'bot-aurora',
                username: 'AuroraBot',
                avatar: window.BOT_AVATAR,
                status: 'online',
                role: 'Bot',
                aboutMe: 'Official AuraChat system assistant.'
            };
        }
        if (lower === 'alice') {
            return {
                id: 'user-alice',
                username: 'Alice',
                avatar: window.DEFAULT_AVATARS[1],
                status: 'online',
                role: 'Wizard',
                aboutMe: 'Server Administrator.'
            };
        }
        if (lower === 'bob') {
            return {
                id: 'user-bob',
                username: 'Bob',
                avatar: window.DEFAULT_AVATARS[2],
                status: 'idle',
                role: 'Wizard',
                aboutMe: 'Server Moderator.'
            };
        }
        if (lower === 'developer biswajeet' || lower === 'biswajeet') {
            return {
                id: 'user-biswajeet',
                username: 'Developer Biswajeet',
                avatar: 'assets/developer_biswajeet_avatar.png',
                status: 'online',
                role: 'Developer',
                aboutMe: 'AuraChat Creator & Lead Frontend Architect. Ask me for features or help!'
            };
        }
        if (lower === 'coderpro') {
            return {
                id: 'current-user-1',
                username: 'CoderPro',
                avatar: window.DEFAULT_AVATARS[0],
                status: 'online',
                role: 'Owner',
                aboutMe: 'Logged in user. Customizing the AuraChat experience.'
            };
        }
        
        return null;
    }

    showUserProfile(e, user) {
        e.stopPropagation();

        // 1. Banner colors based on role
        let bannerBg = 'linear-gradient(90deg, #5865f2, #00A8FC)';
        if (user.role === 'Developer') {
            bannerBg = 'linear-gradient(135deg, #00f0ff 0%, #ff007a 100%)';
        } else if (user.role === 'Admin' || user.role === 'Wizard') {
            bannerBg = 'linear-gradient(90deg, #f0b232, #da373c)';
        } else if (user.role === 'Bot') {
            bannerBg = 'linear-gradient(90deg, #23a55a, #5865f2)';
        }
        this.dom.profileBannerColor.style.background = bannerBg;

        // 2. Set Avatar and Status
        this.dom.profileAvatarImg.src = user.avatar;
        this.dom.profileStatusDot.className = `profile-status-dot ${user.status || 'online'}`;

        // 3. Set Badges
        this.dom.profileBadgesContainer.innerHTML = "";
        if (user.id === 'user-biswajeet') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-staff" data-tooltip="AuraStaff Creator">
                    <i data-lucide="shield-alert"></i>
                </div>
                <div class="profile-badge-icon badge-verified-creator" data-tooltip="Verified Creator">
                    <i data-lucide="badge-check"></i>
                </div>
                <div class="profile-badge-icon badge-aura-architect" data-tooltip="Aura Architect">
                    <i data-lucide="shield-check"></i>
                </div>
                <div class="profile-badge-icon badge-active-developer" data-tooltip="Active Developer">
                    <i data-lucide="terminal"></i>
                </div>
                <div class="profile-badge-icon badge-bug-hunter" data-tooltip="Aura Bug Hunter">
                    <i data-lucide="bug"></i>
                </div>
                <div class="profile-badge-icon badge-early-contributor" data-tooltip="Early Contributor">
                    <i data-lucide="star"></i>
                </div>
                <div class="profile-badge-icon badge-aurasquad" data-tooltip="Aura Squad Balance">
                    <i data-lucide="gem"></i>
                </div>
                <div class="profile-badge-icon badge-auraboost" data-tooltip="Aura Booster Level 3">
                    <i data-lucide="zap"></i>
                </div>
            `;
        } else if (user.id === 'user-alice') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-server-owner" data-tooltip="Server Owner">
                    <i data-lucide="crown"></i>
                </div>
                <div class="profile-badge-icon badge-early-contributor" data-tooltip="Early Contributor">
                    <i data-lucide="star"></i>
                </div>
                <div class="profile-badge-icon badge-aurasquad" data-tooltip="Aura Squad Brilliance">
                    <i data-lucide="gem"></i>
                </div>
            `;
        } else if (user.id === 'user-bob') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-server-moderator" data-tooltip="Server Moderator">
                    <i data-lucide="shield"></i>
                </div>
                <div class="profile-badge-icon badge-active-contributor" data-tooltip="Active Contributor">
                    <i data-lucide="git-branch"></i>
                </div>
            `;
        } else if (user.role === 'Bot') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-verified-bot" data-tooltip="Aura Verified Bot">
                    <i data-lucide="cpu"></i>
                </div>
            `;
        } else if (user.role === 'Owner') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-customizer" data-tooltip="Customizer">
                    <i data-lucide="wrench"></i>
                </div>
                <div class="profile-badge-icon badge-early-contributor" data-tooltip="Early Contributor">
                    <i data-lucide="star"></i>
                </div>
            `;
        }

        // 4. Set Username and Tag
        this.dom.profileUsernameText.innerText = user.username;
        let tag = "0001";
        if (user.id === 'user-alice') tag = "1024";
        if (user.id === 'user-bob') tag = "2048";
        if (user.id === 'user-biswajeet') tag = "0007";
        if (user.id === 'current-user-1') tag = this.stateManager.state.currentUser.tag || "1337";
        this.dom.profileTagText.innerText = `#${tag}`;

        // 5. Custom status text
        let customStatus = "";
        if (user.id === 'current-user-1') {
            customStatus = this.stateManager.state.currentUser.customStatus || "";
        } else if (user.id === 'user-biswajeet') {
            customStatus = "💬 Ask me for features or assistance!";
        } else if (user.id === 'user-alice') {
            customStatus = "💬 Out for coffee ☕";
        } else if (user.id === 'user-bob') {
            customStatus = "🎮 Playing games";
        }
        this.dom.profileCustomStatusText.innerText = customStatus;
        if (!customStatus) {
            this.dom.profileCustomStatusText.style.display = 'none';
        } else {
            this.dom.profileCustomStatusText.style.display = 'block';
        }

        // 5.5. Set Joined Dates
        let joinedAccount = "Jan 1, 2026";
        let joinedServer = "Jan 15, 2026";

        if (user.id === 'user-biswajeet') {
            joinedAccount = "Jan 1, 2026";
            joinedServer = "Jan 15, 2026";
        } else if (user.id === 'user-alice') {
            joinedAccount = "Mar 12, 2026";
            joinedServer = "May 20, 2026";
        } else if (user.id === 'user-bob') {
            joinedAccount = "Feb 28, 2026";
            joinedServer = "Jun 1, 2026";
        } else if (user.role === 'Bot') {
            joinedAccount = "Jun 1, 2026";
            joinedServer = "Jun 1, 2026";
        } else if (user.id === 'current-user-1') {
            joinedAccount = "May 5, 2026";
            joinedServer = "Jun 15, 2026";
        } else {
            joinedAccount = "May 1, 2026";
            joinedServer = "Jun 20, 2026";
        }

        this.dom.profileJoinedAccountText.innerText = joinedAccount;

        const activeServerId = this.stateManager.state.activeServerId;
        if (activeServerId) {
            this.dom.profileJoinedServerRow.style.display = 'flex';
            this.dom.profileJoinedServerText.innerText = joinedServer;
        } else {
            this.dom.profileJoinedServerRow.style.display = 'none';
        }

        // 6. About Me
        this.dom.profileAboutMeContent.innerText = user.aboutMe || "No bio provided.";

        // 7. Roles Container
        if (activeServerId) {
            this.dom.profileRolesSection.style.display = 'flex';
            this.dom.profileRolesContainer.innerHTML = "";
            const roleColors = {
                'Developer': '#00f0ff',
                'Admin': '#f0b232',
                'Wizard': '#f0b232',
                'Moderator': '#2ecc71',
                'Bot': '#5865f2',
                'Owner': '#da373c',
                'Member': '#949ba4'
            };
            const rColor = roleColors[user.role] || '#949ba4';

            this.dom.profileRolesContainer.innerHTML += `
                <div class="profile-role-chip">
                    <div class="profile-role-circle" style="background-color: ${rColor};"></div>
                    <span>${user.role}</span>
                </div>
            `;
        } else {
            this.dom.profileRolesSection.style.display = 'none';
        }

        // 7.5. Render Dynamic Profile Custom Fields
        this.dom.profileCustomFieldsContainer.innerHTML = "";
        let fields = [];
        if (user.id === 'user-biswajeet') {
            fields = [
                { name: "Active Projects", value: "AuraChat Engine, Web Sandbox v1.1.5, Glassmorphism CSS kit" },
                { name: "Primary Stack", value: "Vanilla JS (ES6+), HTML5, Pure HSL CSS, Web Audio API" }
            ];
        } else if (user.id === 'user-alice') {
            fields = [
                { name: "Hobbies", value: "UI/UX Design, Coffee brewing ☕, Illustrating" }
            ];
        } else if (user.id === 'user-bob') {
            fields = [
                { name: "Interests", value: "Docker, CI/CD pipelines, Retro gaming" }
            ];
        } else if (user.role === 'Bot') {
            fields = [
                { name: "Hosting Context", value: "Client-side Browser Sandbox environment" }
            ];
        } else if (user.id === 'current-user-1') {
            fields = [];
            if (user.activeProjects) {
                fields.push({ name: "Active Projects", value: user.activeProjects });
            }
            if (user.hobbies) {
                fields.push({ name: "Hobbies", value: user.hobbies });
            }
        }

        if (fields.length > 0) {
            document.getElementById('profile-custom-fields-section').style.display = 'flex';
            fields.forEach(f => {
                const fDiv = document.createElement('div');
                fDiv.className = 'profile-section';
                fDiv.style.marginTop = '4px';
                fDiv.innerHTML = `
                    <span class="profile-section-title">${f.name}</span>
                    <p class="profile-section-content" style="background-color: rgba(0, 0, 0, 0.2); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.03); font-size: 0.8rem; word-break: break-word;">${f.value}</p>
                `;
                this.dom.profileCustomFieldsContainer.appendChild(fDiv);
            });
        } else {
            document.getElementById('profile-custom-fields-section').style.display = 'none';
        }

        // 8. Notes Textarea
        const notes = this.stateManager.state.userNotes || {};
        this.dom.profileNoteTextarea.value = notes[user.id] || "";

        // Remove previous event listeners by cloning
        const newTextarea = this.dom.profileNoteTextarea.cloneNode(true);
        this.dom.profileNoteTextarea.parentNode.replaceChild(newTextarea, this.dom.profileNoteTextarea);
        this.dom.profileNoteTextarea = newTextarea;

        // Save note on change or blur
        const saveNote = () => {
            this.stateManager.saveUserNote(user.id, this.dom.profileNoteTextarea.value);
        };
        this.dom.profileNoteTextarea.addEventListener('blur', saveNote);
        this.dom.profileNoteTextarea.addEventListener('input', saveNote);

        // 9. Send Message routing button
        const newDmBtn = this.dom.btnProfileSendDm.cloneNode(true);
        this.dom.btnProfileSendDm.parentNode.replaceChild(newDmBtn, this.dom.btnProfileSendDm);
        this.dom.btnProfileSendDm = newDmBtn;

        if (user.id === 'current-user-1') {
            this.dom.btnProfileSendDm.style.display = 'none';
        } else {
            this.dom.btnProfileSendDm.style.display = 'flex';
            this.dom.btnProfileSendDm.addEventListener('click', () => {
                this.dom.profilePopover.classList.add('hidden');

                let dmChannelId = `dm-${user.username.toLowerCase().split(' ')[0]}`;
                if (user.id === 'user-biswajeet') dmChannelId = 'dm-biswajeet';
                if (user.id === 'user-alice') dmChannelId = 'dm-alice';
                if (user.id === 'user-bob') dmChannelId = 'dm-bob';

                this.stateManager.state.activeServerId = null;
                this.stateManager.state.activeChannelId = dmChannelId;
                this.stateManager.save();
            });
        }

        // 10. Position the popover near the clicked target
        this.dom.profilePopover.classList.remove('hidden');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Calculate positions dynamically based on actual rendered dimensions
        const clickX = e.clientX;
        const clickY = e.clientY;

        const cardWidth = this.dom.profilePopover.offsetWidth || 300;
        const cardHeight = this.dom.profilePopover.offsetHeight || 480;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let posX = clickX + 15;
        let posY = clickY - 100;

        if (posX + cardWidth > viewportWidth) {
            posX = clickX - cardWidth - 15;
        }
        if (posY + cardHeight > viewportHeight) {
            posY = viewportHeight - cardHeight - 15;
        }
        if (posX < 15) posX = 15;
        if (posY < 15) posY = 15;

        this.dom.profilePopover.style.left = `${posX}px`;
        this.dom.profilePopover.style.top = `${posY}px`;
    }

    initEmojiPicker() {
        // Toggle picker on button click
        this.dom.btnEmoji.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dom.gifPicker.classList.add('hidden');
            this.dom.pinnedPopover.classList.add('hidden');
            this.dom.emojiPickerPopover.classList.toggle('hidden');
            if (!this.dom.emojiPickerPopover.classList.contains('hidden')) {
                this.renderEmojiPicker();
                this.dom.emojiSearchInput.value = '';
                this.dom.emojiSearchInput.focus();
            }
        });

        // Search filtering
        this.dom.emojiSearchInput.addEventListener('input', () => {
            this.renderEmojiPicker(this.dom.emojiSearchInput.value);
        });
    }

    renderEmojiPicker(filterQuery = "") {
        this.dom.emojiPickerBodyContainer.innerHTML = '';
        const query = filterQuery.toLowerCase().trim();

        EMOJI_CATEGORIES.forEach(category => {
            const filteredEmojis = category.emojis.filter(emoji =>
                emoji.name.toLowerCase().includes(query) || emoji.code.toLowerCase().includes(query)
            );

            if (filteredEmojis.length === 0) return;

            const catSection = document.createElement('div');
            catSection.className = 'emoji-category-section';

            const catTitle = document.createElement('div');
            catTitle.className = 'emoji-category-title';
            catTitle.textContent = category.name;
            catSection.appendChild(catTitle);

            const grid = document.createElement('div');
            grid.className = 'emoji-grid';

            filteredEmojis.forEach(emoji => {
                const item = document.createElement('div');
                item.className = 'emoji-item';
                item.textContent = emoji.char;
                item.title = emoji.code;

                item.addEventListener('mouseenter', () => {
                    this.dom.emojiPreviewGraphic.textContent = emoji.char;
                    this.dom.emojiPreviewName.textContent = emoji.name;
                    this.dom.emojiPreviewShortcode.textContent = emoji.code;
                });

                item.addEventListener('click', () => {
                    const startPos = this.dom.messageInput.selectionStart;
                    const endPos = this.dom.messageInput.selectionEnd;
                    const text = this.dom.messageInput.value;

                    this.dom.messageInput.value = text.substring(0, startPos) + emoji.char + text.substring(endPos);
                    this.dom.messageInput.selectionStart = this.dom.messageInput.selectionEnd = startPos + emoji.char.length;
                    this.dom.messageInput.focus();

                    // Auto-expand textarea height
                    const adjustHeight = window.adjustChatTextareaHeight || (() => {
                        this.dom.messageInput.style.height = '20px';
                        this.dom.messageInput.style.height = Math.min(this.dom.messageInput.scrollHeight - 16, 200) + 'px';
                    });
                    adjustHeight();

                    this.dom.emojiPickerPopover.classList.add('hidden');
                });

                grid.appendChild(item);
            });

            catSection.appendChild(grid);
            this.dom.emojiPickerBodyContainer.appendChild(catSection);
        });

        if (this.dom.emojiPickerBodyContainer.children.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'pinned-empty-state';
            empty.textContent = 'No emojis match your search.';
            this.dom.emojiPickerBodyContainer.appendChild(empty);
        }
    }

    editMessageInline(messageId) {
        const activeServerId = this.stateManager.state.activeServerId;
        const activeChannelId = this.stateManager.state.activeChannelId;

        let message = null;
        if (!activeServerId) {
            message = this.stateManager.state.directMessages[activeChannelId].find(m => m.id === messageId);
        } else {
            const server = this.stateManager.state.servers.find(s => s.id === activeServerId);
            message = server.messages[activeChannelId].find(m => m.id === messageId);
        }

        if (!message) return;

        const contentDiv = document.getElementById(`message-content-${messageId}`);
        if (!contentDiv) return;

        // Save original HTML in case user cancels
        const originalHTML = contentDiv.innerHTML;

        contentDiv.innerHTML = `
            <div class="message-edit-container">
                <textarea class="message-edit-textarea">${message.content}</textarea>
                <div class="message-edit-actions">
                    <button class="edit-action-btn save">Save</button>
                    <button class="edit-action-btn cancel">Cancel</button>
                </div>
            </div>
        `;

        const textarea = contentDiv.querySelector('.message-edit-textarea');
        const saveBtn = contentDiv.querySelector('.edit-action-btn.save');
        const cancelBtn = contentDiv.querySelector('.edit-action-btn.cancel');

        textarea.focus();

        const saveChanges = () => {
            const newContent = textarea.value.trim();
            if (newContent && newContent !== message.content) {
                message.content = newContent;
                message.edited = true;
                this.stateManager.save();
                this.render(this.stateManager.state);
            } else {
                contentDiv.innerHTML = originalHTML;
            }
        };

        saveBtn.addEventListener('click', saveChanges);
        cancelBtn.addEventListener('click', () => {
            contentDiv.innerHTML = originalHTML;
        });

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveChanges();
            } else if (e.key === 'Escape') {
                contentDiv.innerHTML = originalHTML;
            }
        });
    }

    deleteMessage(messageId) {
        const confirmDelete = confirm("⚠️ Are you sure you want to delete this message? This action cannot be undone.");
        if (!confirmDelete) return;

        const activeServerId = this.stateManager.state.activeServerId;
        const activeChannelId = this.stateManager.state.activeChannelId;

        if (!activeServerId) {
            const list = this.stateManager.state.directMessages[activeChannelId];
            this.stateManager.state.directMessages[activeChannelId] = list.filter(m => m.id !== messageId);
        } else {
            const server = this.stateManager.state.servers.find(s => s.id === activeServerId);
            const list = server.messages[activeChannelId];
            server.messages[activeChannelId] = list.filter(m => m.id !== messageId);
        }

        this.stateManager.save();
        this.render(this.stateManager.state);
    }

    togglePinMessage(messageId) {
        const activeServerId = this.stateManager.state.activeServerId;
        const activeChannelId = this.stateManager.state.activeChannelId;

        let message = null;
        if (!activeServerId) {
            message = this.stateManager.state.directMessages[activeChannelId].find(m => m.id === messageId);
        } else {
            const server = this.stateManager.state.servers.find(s => s.id === activeServerId);
            message = server.messages[activeChannelId].find(m => m.id === messageId);
        }

        if (message) {
            message.pinned = !message.pinned;
            this.stateManager.save();
            this.render(this.stateManager.state);
        }
    }

    renderPinnedMessages() {
        const activeServerId = this.stateManager.state.activeServerId;
        const activeChannelId = this.stateManager.state.activeChannelId;

        let messages = [];
        if (!activeServerId) {
            if (this.stateManager.state.directMessages && this.stateManager.state.directMessages[activeChannelId]) {
                messages = this.stateManager.state.directMessages[activeChannelId];
            }
        } else {
            const server = this.stateManager.state.servers.find(s => s.id === activeServerId);
            if (server && server.messages && server.messages[activeChannelId]) {
                messages = server.messages[activeChannelId];
            }
        }

        const pinned = messages.filter(m => m.pinned);
        const listContainer = this.dom.pinnedListContainer;
        listContainer.innerHTML = '';

        if (pinned.length === 0) {
            listContainer.innerHTML = `
                <div class="pinned-empty-state">
                    <i data-lucide="pin" style="width: 32px; height: 32px;"></i>
                    <p>No pinned messages in this channel.</p>
                </div>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            return;
        }

        pinned.forEach(msg => {
            const item = document.createElement('div');
            item.className = 'pinned-item';
            item.setAttribute('data-message-id', msg.id);

            item.innerHTML = `
                <div class="pinned-item-header">
                    <img src="${msg.avatar}" class="pinned-item-avatar" alt="${msg.username}'s avatar">
                    <span class="pinned-item-username">${msg.username}</span>
                    <span class="pinned-item-timestamp">${this.formatTimestamp(msg.timestamp)}</span>
                </div>
                <div class="pinned-item-content">${msg.content}</div>
                <button type="button" class="pinned-unpin-btn" title="Unpin" aria-label="Unpin message">
                    <i data-lucide="pin-off"></i>
                </button>
            `;

            // Click to scroll to message
            item.addEventListener('click', (e) => {
                if (e.target.closest('.pinned-unpin-btn')) return;
                const targetCard = document.querySelector(`.message-card[data-message-id="${msg.id}"]`);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.style.backgroundColor = 'rgba(88, 101, 242, 0.15)';
                    setTimeout(() => {
                        targetCard.style.backgroundColor = '';
                    }, 2000);
                    this.dom.pinnedPopover.classList.add('hidden');
                }
            });

            // Click to unpin
            const unpinBtn = item.querySelector('.pinned-unpin-btn');
            unpinBtn.addEventListener('click', () => {
                this.togglePinMessage(msg.id);
            });

            listContainer.appendChild(item);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    initAttachmentsLogic() {
        // Trigger file input click when plus icon is clicked
        const btnAttach = document.getElementById('btn-attach');
        if (btnAttach) {
            btnAttach.addEventListener('click', () => {
                this.dom.fileUploadInput.click();
            });
        }

        // Read files when selected
        this.dom.fileUploadInput.addEventListener('change', (e) => {
            this.handleSelectedFiles(e.target.files);
            this.dom.fileUploadInput.value = ''; // Reset input
        });

        // Drag & drop logic on active workspace
        const workspace = this.dom.chatPaneMain;
        if (workspace) {
            workspace.addEventListener('dragenter', (e) => {
                e.preventDefault();
                e.stopPropagation();
                workspace.classList.add('drag-active');
            });

            workspace.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                workspace.classList.add('drag-active');
            });

            workspace.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                workspace.classList.remove('drag-active');
            });

            workspace.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                workspace.classList.remove('drag-active');
                if (e.dataTransfer && e.dataTransfer.files) {
                    this.handleSelectedFiles(e.dataTransfer.files);
                }
            });
        }
    }

    handleSelectedFiles(files) {
        if (!files || files.length === 0) return;

        Array.from(files).forEach(file => {
            const reader = new FileReader();

            // Format size beautifully
            let sizeText = "";
            if (file.size < 1024) sizeText = `${file.size} B`;
            else if (file.size < 1024 * 1024) sizeText = `${(file.size / 1024).toFixed(1)} KB`;
            else sizeText = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

            reader.onload = (event) => {
                const attachment = {
                    id: "att-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
                    name: file.name,
                    size: sizeText,
                    type: file.type,
                    dataUrl: event.target.result
                };

                this.activeAttachments.push(attachment);
                this.renderAttachmentDrawer();
            };

            reader.readAsDataURL(file);
        });
    }

    renderAttachmentDrawer() {
        const drawer = this.dom.attachmentDrawer;
        drawer.innerHTML = '';

        if (this.activeAttachments.length === 0) {
            drawer.classList.add('hidden');
            return;
        }

        drawer.classList.remove('hidden');

        this.activeAttachments.forEach(att => {
            const card = document.createElement('div');
            card.className = 'attachment-preview-card';

            const isImage = att.type.startsWith('image/');

            if (isImage) {
                card.innerHTML = `
                    <img src="${att.dataUrl}" alt="${att.name}">
                    <button type="button" class="attachment-remove-btn" title="Remove attachment" aria-label="Remove attachment">
                        <i data-lucide="x"></i>
                    </button>
                `;
            } else {
                card.innerHTML = `
                    <div class="file-icon-wrapper">
                        <i data-lucide="file" style="width: 32px; height: 32px; color: var(--text-muted);"></i>
                        <span class="file-name">${att.name}</span>
                        <span class="file-size">${att.size}</span>
                    </div>
                    <button type="button" class="attachment-remove-btn" title="Remove attachment" aria-label="Remove attachment">
                        <i data-lucide="x"></i>
                    </button>
                `;
            }

            // Remove attachment click listener
            const removeBtn = card.querySelector('.attachment-remove-btn');
            removeBtn.addEventListener('click', () => {
                this.activeAttachments = this.activeAttachments.filter(a => a.id !== att.id);
                this.renderAttachmentDrawer();
            });

            drawer.appendChild(card);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderMessageAttachments(msg) {
        const container = document.getElementById(`attachments-container-${msg.id}`);
        if (!container) return;
        container.innerHTML = '';

        if (!msg.attachments || msg.attachments.length === 0) return;

        msg.attachments.forEach(att => {
            const isImage = att.type.startsWith('image/');

            if (isImage) {
                const img = document.createElement('img');
                img.className = 'message-attachment-image';
                img.src = att.dataUrl;
                img.alt = att.name;
                img.title = `Click to open full size (${att.name})`;

                img.addEventListener('click', () => {
                    window.open(att.dataUrl, '_blank');
                });

                container.appendChild(img);
            } else {
                const fileLink = document.createElement('a');
                fileLink.className = 'message-attachment-file';
                fileLink.href = att.dataUrl;
                fileLink.download = att.name;

                fileLink.innerHTML = `
                    <i data-lucide="file-text" style="width: 36px; height: 36px; color: var(--text-muted); flex-shrink: 0;"></i>
                    <div class="file-attachment-info">
                        <span class="file-attachment-name" title="${att.name}">${att.name}</span>
                        <span class="file-attachment-size">${att.size}</span>
                    </div>
                    <i data-lucide="download" style="width: 18px; height: 18px; color: var(--text-muted); margin-left: auto; flex-shrink: 0;"></i>
                `;

                container.appendChild(fileLink);
            }
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderLinkPreviews(msg) {
        const container = document.getElementById(`attachments-container-${msg.id}`);
        if (!container) return;

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matches = msg.content.match(urlRegex);
        if (!matches) return;

        matches.forEach(url => {
            // Remove any trailing punctuation from URL matching
            let cleanUrl = url;
            if (url.endsWith(')') || url.endsWith('.') || url.endsWith(',')) {
                cleanUrl = url.substring(0, url.length - 1);
            }

            // 1. Direct Image URL Preview
            if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)/i)) {
                const imgExists = Array.from(container.querySelectorAll('img')).some(img => img.src === cleanUrl);
                if (!imgExists) {
                    const img = document.createElement('img');
                    img.className = 'message-attachment-image';
                    img.src = cleanUrl;
                    img.alt = 'External Image Preview';
                    img.addEventListener('click', () => {
                        window.open(cleanUrl, '_blank');
                    });
                    container.appendChild(img);
                }
                return;
            }

            // 2. YouTube Link Preview
            const ytRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i;
            const ytMatch = cleanUrl.match(ytRegex);
            if (ytMatch) {
                const videoId = ytMatch[1];
                const previewCard = document.createElement('div');
                previewCard.className = 'link-preview-card';
                previewCard.innerHTML = `
                    <div class="link-preview-content">
                        <span class="link-preview-site">YouTube</span>
                        <a href="${cleanUrl}" target="_blank" class="link-preview-title">AuraChat Introduction - Modern Web Sandboxing</a>
                        <p class="link-preview-desc">A deep dive into building premium, high-fidelity collaborative workspaces using vanilla ES6 JavaScript and CSS. Learn about oscillator UI sound design and glassmorphic profile cards.</p>
                    </div>
                    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                        <iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                    </div>
                `;
                container.appendChild(previewCard);
                return;
            }

            // 3. GitHub Link Preview
            const ghRegex = /github\.com\/([^\s\/]+)\/([^\s\/#?]+)/i;
            const ghMatch = cleanUrl.match(ghRegex);
            if (ghMatch) {
                const owner = ghMatch[1];
                const repo = ghMatch[2];
                const previewCard = document.createElement('div');
                previewCard.className = 'link-preview-card';
                previewCard.innerHTML = `
                    <div class="link-preview-content">
                        <span class="link-preview-site">GitHub</span>
                        <a href="${cleanUrl}" target="_blank" class="link-preview-title">${owner}/${repo}</a>
                        <p class="link-preview-desc">A high-fidelity frontend sandbox application for collaborative workspaces. Built using clean, modern web technologies: HTML5, Vanilla CSS3, and ES6 Javascript.</p>
                        <div class="link-preview-meta">
                            <span class="link-preview-meta-item">
                                <i data-lucide="star" style="width: 12px; height: 12px; color: var(--text-muted);"></i> 142 stars
                            </span>
                            <span class="link-preview-meta-item">
                                <i data-lucide="git-fork" style="width: 12px; height: 12px; color: var(--text-muted);"></i> 28 forks
                            </span>
                            <span class="link-preview-meta-item">
                                <span style="width: 8px; height: 8px; background-color: #f1e05a; border-radius: 50%; display: inline-block;"></span> JavaScript
                            </span>
                        </div>
                    </div>
                `;
                container.appendChild(previewCard);
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                return;
            }
        });
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

const CURATED_GIFS = [
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BndjZnbXlzbjVxZThpNXoxdHl0eWtzY3RsdmlyZWt2azBvZHR5MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t3s3G2TXEHN04/giphy.gif", tags: ["happy", "celebrate", "excited", "minions"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG1hOTgydzVrb3c5czJ0dmh5cTBtdHBmZXpucDBtdTNwMXdzaTZpayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DhstvI3zZ598A/giphy.gif", tags: ["yes", "agree", "nod", "success"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRiOW1oYzdrbjhmdmlhbGRnZTZtZ2Q0bXZ2bWh2NWYxMmFob3M1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufcVAp3AiJJsrIs/giphy.gif", tags: ["sad", "cry", "tears", "sorry"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmN6aW4ydmdvdW9zN2psOXc2bDFncmMxaWkxd2w5OWg0ajhkbW4wbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ornk57KwDXf81rjWM/giphy.gif", tags: ["shocked", "wow", "mindblown", "what"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDM4ZjJpY3d4OTU1aXNud29iZHR2NnBrMGp1MnA3anlsamhrMmI1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mlvseq9yvZhba/giphy.gif", tags: ["cat", "cute", "funny", "kitten"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczM3b2s5OG80c3cydHBkMmNxYTY0eHNkcnlzbWRsNXBqZ3VpczhhMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3hX3ODk9O7A30c6Yw/giphy.gif", tags: ["dance", "party", "dancing", "groove"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejAwaWFocmtxZTRnbnpqNDMzaWh0NXF0bzkwN3N6NzA4Mzl0NG1kMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NEvPzZyiqHySubIpYg/giphy.gif", tags: ["agree", "nod", "thumbsup", "cool"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hveGRnbm4yZWp6cm1rZ2oxMTloNHg1bmtic2o1NmI1eHBkZjhyMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L3X9GvptPp674RYY2a/giphy.gif", tags: ["applause", "clapping", "bravo", "nice"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ptMHpsNGxwd3hxMDRhNms3dG53aXJvdmVpdDcyMHV0aHhiM3A3dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13ZQBmtXDsNV1m/giphy.gif", tags: ["code", "developer", "coding", "hacking"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnk3bTN5eDk5cWd2NWN0dDJ5eWc1OXcwbzNncTV2cGFwbDB0ODVvNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9sDNyvlqFxO09Ax5XX/giphy.gif", tags: ["lol", "laughing", "haha", "giggle"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWdzNnRhYjlyZHBwM3drN2l4MXpweTRwMHJ6amthczVnZmt4NzRnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oGO1MPWiVzyuSkLSvA/giphy.gif", tags: ["facepalm", "smh", "sigh", "disbelief"] },
    { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTV4eTJtYzh2bHprOGl4eTllOGh0bmlhb21mYXZoMjJ0Y3BqNjd6aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a5viI92UXDSg0/giphy.gif", tags: ["thinking", "hmmm", "wonder", "ponder"] }
];

// Export for app.js
const EMOJI_CATEGORIES = [
    {
        name: "Smileys",
        emojis: [
            { char: "😀", name: "Grinning Face", code: ":grinning:" },
            { char: "😃", name: "Grinning Face with Big Eyes", code: ":smiley:" },
            { char: "😄", name: "Grinning Face with Smiling Eyes", code: ":smile:" },
            { char: "😁", name: "Beaming Face with Smiling Eyes", code: ":grin:" },
            { char: "😆", name: "Grinning Squinting Face", code: ":laughing:" },
            { char: "😅", name: "Grinning Face with Sweat", code: ":sweat_smile:" },
            { char: "😂", name: "Face with Tears of Joy", code: ":joy:" },
            { char: "🤣", name: "Rolling on the Floor Laughing", code: ":rofl:" },
            { char: "😊", name: "Smiling Face with Smiling Eyes", code: ":blush:" },
            { char: "😇", name: "Smiling Face with Halo", code: ":innocent:" },
            { char: "🙂", name: "Slightly Smiling Face", code: ":slight_smile:" },
            { char: "🙃", name: "Upside-Down Face", code: ":upside_down:" },
            { char: "😉", name: "Winking Face", code: ":wink:" },
            { char: "😌", name: "Relieved Face", code: ":relieved:" },
            { char: "😍", name: "Smiling Face with Heart-Eyes", code: ":heart_eyes:" },
            { char: "🥰", name: "Smiling Face with Hearts", code: ":smiling_face_with_3_hearts:" }
        ]
    },
    {
        name: "Gestures",
        emojis: [
            { char: "👍", name: "Thumbs Up", code: "+1" },
            { char: "👎", name: "Thumbs Down", code: "-1" },
            { char: "✊", name: "Raised Fist", code: ":fist:" },
            { char: "👊", name: "Oncoming Fist", code: ":facepunch:" },
            { char: "🤛", name: "Left-Facing Fist", code: ":left_fist:" },
            { char: "🤜", name: "Right-Facing Fist", code: ":right_fist:" },
            { char: "👏", name: "Clapping Hands", code: ":clapping_hands:" },
            { char: "🙌", name: "Raising Hands", code: ":raised_hands:" },
            { char: "👐", name: "Open Hands", code: ":open_hands:" },
            { char: "🤲", name: "Palms Up Together", code: ":palms_up:" },
            { char: "🤝", name: "Handshake", code: ":handshake:" },
            { char: "🙏", name: "Folded Hands", code: ":pray:" },
            { char: "✍️", name: "Writing Hand", code: ":writing_hand:" },
            { char: "💅", name: "Nail Polish", code: ":nail_polish:" },
            { char: "🤳", name: "Selfie", code: ":selfie:" },
            { char: "💪", name: "Flexed Biceps", code: ":muscle:" }
        ]
    },
    {
        name: "Objects & Symbols",
        emojis: [
            { char: "❤️", name: "Red Heart", code: ":heart:" },
            { char: "🧡", name: "Orange Heart", code: ":orange_heart:" },
            { char: "💛", name: "Yellow Heart", code: ":yellow_heart:" },
            { char: "💚", name: "Green Heart", code: ":green_heart:" },
            { char: "💙", name: "Blue Heart", code: ":blue_heart:" },
            { char: "💜", name: "Purple Heart", code: ":purple_heart:" },
            { char: "🖤", name: "Black Heart", code: ":black_heart:" },
            { char: "🤍", name: "White Heart", code: ":white_heart:" },
            { char: "🔥", name: "Fire", code: ":fire:" },
            { char: "✨", name: "Sparkles", code: ":sparkles:" },
            { char: "🎈", name: "Balloon", code: ":balloon:" },
            { char: "🎉", name: "Partypopper", code: ":tada:" },
            { char: "🎊", name: "Confetti Ball", code: ":confetti_ball:" },
            { char: "💡", name: "Light Bulb", code: ":bulb:" },
            { char: "💻", name: "Laptop", code: ":laptop:" },
            { char: "🚀", name: "Rocket", code: ":rocket:" }
        ]
    }
];

window.AuraUI = AuraUI;
