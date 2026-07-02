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
            btnProfileSendDm: document.getElementById('btn-profile-send-dm')
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
                this.forceScrollToBottom = true;
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

        // Explicit Enter Keydown listener to handle form submissions in all environments
        this.dom.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.dom.chatForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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

        // Close GIF picker and User Profile popover on click outside
        document.addEventListener('click', (e) => {
            if (this.dom.gifPicker && !this.dom.gifPicker.contains(e.target) && e.target !== this.dom.btnGif) {
                this.dom.gifPicker.classList.add('hidden');
            }
            if (this.dom.profilePopover && !this.dom.profilePopover.contains(e.target) && 
                !e.target.closest('.member-item') && 
                !e.target.closest('.message-avatar') && 
                !e.target.closest('.message-username') &&
                !e.target.closest('#chat-header-title') &&
                !e.target.closest('#header-icon-type')) {
                this.dom.profilePopover.classList.add('hidden');
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
                    "`/poll \"Question\" \"Option A\" \"Option B\" ...` - Create an interactive vote poll\n" +
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
            card.className = "message-card message-item";
            card.setAttribute('data-message-id', msg.id);

            const timestampFormatted = this.formatTimestamp(msg.timestamp);

            card.innerHTML = `
                <img src="${msg.avatar}" class="message-avatar" alt="${msg.username}'s avatar">
                <div class="message-body">
                    <div class="message-header">
                        <span class="message-username">${msg.username}${msg.username === "Developer Biswajeet" ? `<i data-lucide="badge-check" style="color: #00A8FC; width: 14px; height: 14px; margin-left: 4px; display: inline-flex; align-items: center; justify-content: center; transform: translateY(2px);"></i>` : ''}</span>
                        <span class="message-timestamp">${timestampFormatted}</span>
                    </div>
                    <div class="message-content">${this.renderMessageContent(msg)}</div>
                    <div class="message-reactions" id="reactions-container-${msg.id}">
                        <!-- Reactions rendered here -->
                    </div>
                </div>
                <div class="message-hover-actions">
                    <button class="hover-action-btn add-reaction-trigger" data-message-id="${msg.id}" data-tooltip="Add Reaction" aria-label="Add reaction">
                        <i data-lucide="smile" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            `;

            scrollContainer.appendChild(card);

            // Bind reaction trigger
            const trigger = card.querySelector('.add-reaction-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    this.showReactionPicker(e, msg.id);
                });
            }

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

    renderMessageContent(msg) {
        if (msg.poll) {
            return this.renderPollCard(msg);
        }
        
        const content = msg.content;
        const isGif = content.startsWith('http') && (content.includes('.gif') || content.includes('tenor.co') || content.includes('giphy.com'));
        if (isGif) {
            return `<img src="${this.escapeHTML(content)}" class="gif-attachment" alt="Animated GIF">`;
        }

        return this.compileMarkdown(content).replace(/\n/g, '<br>');
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
        html = html.replace(/```(?:[a-zA-Z0-9]+)?\n([\s\S]*?)\n```/g, (match, code) => {
            return `<div class="block-code-wrapper"><code class="block-code">${code}</code></div>`;
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
                <div class="profile-badge-icon badge-bug-hunter" data-tooltip="Bug Hunter Extraordinaire">
                    <i data-lucide="bug"></i>
                </div>
                <div class="profile-badge-icon badge-early-supporter" data-tooltip="Early Supporter">
                    <i data-lucide="star"></i>
                </div>
                <div class="profile-badge-icon badge-hypesquad" data-tooltip="HypeSquad Balance">
                    <i data-lucide="gem"></i>
                </div>
                <div class="profile-badge-icon badge-boost" data-tooltip="Server Booster Level 3">
                    <i data-lucide="zap"></i>
                </div>
            `;
        } else if (user.id === 'user-alice') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-server-owner" data-tooltip="Server Owner">
                    <i data-lucide="crown"></i>
                </div>
                <div class="profile-badge-icon badge-early-supporter" data-tooltip="Early Supporter">
                    <i data-lucide="star"></i>
                </div>
                <div class="profile-badge-icon badge-hypesquad" data-tooltip="HypeSquad Brilliance">
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
                <div class="profile-badge-icon badge-verified-bot" data-tooltip="Verified Bot">
                    <i data-lucide="cpu"></i>
                </div>
            `;
        } else if (user.role === 'Owner') {
            this.dom.profileBadgesContainer.innerHTML += `
                <div class="profile-badge-icon badge-customizer" data-tooltip="Customizer">
                    <i data-lucide="wrench"></i>
                </div>
                <div class="profile-badge-icon badge-early-supporter" data-tooltip="Early Supporter">
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
            fields = [
                { name: "Customization Mode", value: "Active Theme & Settings Editor" }
            ];
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

        // Calculate positions
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        const cardWidth = 300;
        const cardHeight = 420;
        
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
        if (posX < 0) posX = 15;
        if (posY < 0) posY = 15;
        
        this.dom.profilePopover.style.left = `${posX}px`;
        this.dom.profilePopover.style.top = `${posY}px`;
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
window.AuraUI = AuraUI;
