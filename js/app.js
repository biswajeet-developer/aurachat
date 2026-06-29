// app.js - Initialization entrypoint for the AuraChat Web Application

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize State Manager
    const stateManager = new window.AuraState();

    // 2. Initialize Audio Engine
    const audioEngine = new window.AuraAudio();

    // 3. Initialize UI Controller
    const uiController = new window.AuraUI(stateManager, audioEngine);
    uiController.init();

    // 4. Connect Audio Engine to user interaction
    // Modern browsers require a user interaction gesture to unlock Web Audio API
    const unlockAudio = () => {
        audioEngine.init();
        console.log("%c[Audio Engine] Unlocked via user gesture.", "color: #23A55A; font-weight: bold;");
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // 5. Stylized Dev Console Banner
    console.log(
        "%c[ AuraChat Sandbox ]%c\nVersion 1.0.0 // Custom CSS and ES6 State System.\nCreated as a daily contribution sandbox project. Enjoy tweaking and coding!",
        "color: #5865F2; font-size: 18px; font-weight: bold;",
        "color: #949BA4; font-size: 11px;"
    );
});
