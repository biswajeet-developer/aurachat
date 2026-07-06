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

    playAirhorn() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            
            const playBlast = (timeOffset) => {
                const osc1 = this.ctx.createOscillator();
                const osc2 = this.ctx.createOscillator();
                const gainNode = this.ctx.createGain();
                
                osc1.type = 'sawtooth';
                osc2.type = 'square';
                
                osc1.frequency.setValueAtTime(220, now + timeOffset);
                osc1.frequency.linearRampToValueAtTime(150, now + timeOffset + 0.35);
                
                osc2.frequency.setValueAtTime(225, now + timeOffset);
                osc2.frequency.linearRampToValueAtTime(155, now + timeOffset + 0.35);
                
                gainNode.gain.setValueAtTime(0, now + timeOffset);
                gainNode.gain.linearRampToValueAtTime(0.2, now + timeOffset + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.2, now + timeOffset + 0.25);
                gainNode.gain.linearRampToValueAtTime(0.001, now + timeOffset + 0.35);
                
                osc1.connect(gainNode);
                osc2.connect(gainNode);
                gainNode.connect(this.ctx.destination);
                
                osc1.start(now + timeOffset);
                osc2.start(now + timeOffset);
                osc1.stop(now + timeOffset + 0.35);
                osc2.stop(now + timeOffset + 0.35);
            };
            
            playBlast(0.0);
            playBlast(0.12);
            playBlast(0.24);
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playCricket() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            
            const playChirp = (timeOffset) => {
                for (let i = 0; i < 4; i++) {
                    const chirpOffset = timeOffset + i * 0.04;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(3800, now + chirpOffset);
                    
                    gain.gain.setValueAtTime(0, now + chirpOffset);
                    gain.gain.linearRampToValueAtTime(0.08, now + chirpOffset + 0.01);
                    gain.gain.linearRampToValueAtTime(0, now + chirpOffset + 0.03);
                    
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    
                    osc.start(now + chirpOffset);
                    osc.stop(now + chirpOffset + 0.03);
                }
            };
            
            playChirp(0.0);
            playChirp(0.3);
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playQuack() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            
            const osc = this.ctx.createOscillator();
            const filter = this.ctx.createBiquadFilter();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.linearRampToValueAtTime(260, now + 0.15);
            osc.frequency.linearRampToValueAtTime(200, now + 0.25);
            
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, now);
            filter.frequency.linearRampToValueAtTime(1800, now + 0.1);
            filter.frequency.linearRampToValueAtTime(1000, now + 0.25);
            filter.Q.value = 4.0;
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.25);
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playLaser() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(1600, now);
            osc.frequency.exponentialRampToValueAtTime(90, now + 0.3);
            
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0.1, now + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playSuccess() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            
            const playNote = (freq, start, duration) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + start);
                
                gain.gain.setValueAtTime(0.1, now + start);
                gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now + start);
                osc.stop(now + start + duration);
            };
            
            playNote(261.63, 0.0, 0.15);  // C4
            playNote(329.63, 0.08, 0.15); // E4
            playNote(392.00, 0.16, 0.15); // G4
            playNote(523.25, 0.24, 0.3);  // C5
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }

    playSadTrombone() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            
            const playToneSegment = (freq, start, duration, endFreq) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + start);
                if (endFreq) {
                    osc.frequency.linearRampToValueAtTime(endFreq, now + start + duration);
                }
                
                gain.gain.setValueAtTime(0.12, now + start);
                gain.gain.linearRampToValueAtTime(0.08, now + start + duration - 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now + start);
                osc.stop(now + start + duration);
            };
            
            playToneSegment(311.13, 0.0, 0.35, 305);  // Eb4
            playToneSegment(293.66, 0.38, 0.35, 287); // D4
            playToneSegment(277.18, 0.76, 0.35, 270); // Db4
            playToneSegment(261.63, 1.14, 0.7, 220);  // C4 sliding down to A3
        } catch (e) {
            console.warn("Audio Context failed:", e);
        }
    }
}

// Export to window
window.AuraAudio = AuraAudio;
