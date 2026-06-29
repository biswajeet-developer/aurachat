// audio.js - Web Audio API Sound Synthesizer for AuraChat UI Sounds

class AuraAudio {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(frequency, type, duration, startTimeOffset = 0) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime + startTimeOffset);

        // Linear fade out to prevent clicks
        gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime + startTimeOffset);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTimeOffset + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + startTimeOffset);
        osc.stop(this.ctx.currentTime + startTimeOffset + duration);
    }

    playJoin() {
        try {
            // Sound join: ascending notes (e.g. G4 to C5 or similar)
            this.playTone(392.00, 'triangle', 0.15, 0.0);   // G4
            this.playTone(523.25, 'triangle', 0.25, 0.08);  // C5
        } catch (e) {
            console.warn("Audio Context blocked or failed:", e);
        }
    }

    playLeave() {
        try {
            // Sound leave: descending notes (e.g. C5 to G4 or similar)
            this.playTone(523.25, 'triangle', 0.15, 0.0);   // C5
            this.playTone(392.00, 'triangle', 0.25, 0.08);  // G4
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playMute() {
        try {
            // High sharp tick descending
            this.playTone(600, 'sine', 0.08, 0.0);
            this.playTone(450, 'sine', 0.08, 0.05);
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playUnmute() {
        try {
            // Low ascending tick
            this.playTone(450, 'sine', 0.08, 0.0);
            this.playTone(600, 'sine', 0.08, 0.05);
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }
}

// Export to window
window.AuraAudio = AuraAudio;
