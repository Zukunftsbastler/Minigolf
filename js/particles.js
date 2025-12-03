/**
 * particles.js - Partikel-System für visuelle Effekte
 * 
 * Erzeugt und verwaltet Partikel für Feier-Animationen und andere Effekte.
 */

const ParticleSystem = {
    particles: [],
    
    /**
     * Erzeugt eine Feier-Explosion
     * @param {number} x - X-Position
     * @param {number} y - Y-Position
     */
    createCelebration(x, y) {
        const colors = CONFIG.PARTICLE_COLORS;
        const count = CONFIG.CELEBRATION_PARTICLE_COUNT;
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const speed = 3 + Math.random() * 5;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 4 + Math.random() * 4
            });
        }
    },
    
    /**
     * Erzeugt einen Aufprall-Effekt (z.B. bei Wandkollision)
     * @param {number} x - X-Position
     * @param {number} y - Y-Position
     * @param {string} color - Partikel-Farbe
     */
    createImpact(x, y, color = '#ffffff') {
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.8,
                decay: 0.05 + Math.random() * 0.03,
                color: color,
                size: 2 + Math.random() * 2
            });
        }
    },
    
    /**
     * Erzeugt einen Schlag-Effekt
     * @param {number} x - X-Position
     * @param {number} y - Y-Position
     */
    createHit(x, y) {
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                life: 0.6,
                decay: 0.03,
                color: '#4ade80',
                size: 3 + Math.random() * 2
            });
        }
    },
    
    /**
     * Aktualisiert alle Partikel
     */
    update() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // Gravitation
            p.life -= p.decay;
            return p.life > 0;
        });
    },
    
    /**
     * Gibt alle aktiven Partikel zurück
     * @returns {Array}
     */
    getAll() {
        return this.particles;
    },
    
    /**
     * Löscht alle Partikel
     */
    clear() {
        this.particles = [];
    }
};
