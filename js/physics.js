/**
 * physics.js - Physik-Simulation für das Minigolf-Spiel
 * 
 * Enthält alle Berechnungen für Ballbewegung, Kollisionen und Reibung.
 */

const Physics = {
    /**
     * Aktualisiert die Physik für einen Frame
     * @param {Object} ball - Ball-Objekt mit x, y, vx, vy
     * @param {Object} course - Aktuelle Bahndefinition
     * @param {number} canvasWidth - Canvas-Breite in Pixeln
     * @param {number} canvasHeight - Canvas-Höhe in Pixeln
     * @returns {string|null} - 'stopped' wenn Ball gestoppt, 'holed' wenn eingelocht, null sonst
     */
    update(ball, course, canvasWidth, canvasHeight) {
        // Geschwindigkeit anwenden
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Reibung
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;
        
        // Wandkollisionen
        course.walls.forEach(wall => {
            this.checkWallCollision(ball, wall, canvasWidth, canvasHeight);
        });
        
        // Hindernis-Kollisionen
        course.obstacles.forEach(obs => {
            this.checkObstacleCollision(ball, obs, canvasWidth, canvasHeight);
        });

        let isOnSlope = false;

        // Steigungen anwenden (wenn vorhanden)
        if (course.slopes) {
            course.slopes.forEach(slope => {
                if (this.applySlope(ball, slope, canvasWidth, canvasHeight)) {
                    isOnSlope = true;
                }
            });
        }
        
        // Prüfen ob Ball eingelocht
        const holeX = course.hole.x * canvasWidth;
        const holeY = course.hole.y * canvasHeight;
        const distToHole = Math.sqrt(
            Math.pow(ball.x - holeX, 2) + 
            Math.pow(ball.y - holeY, 2)
        );
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        
        if (distToHole < HOLE_RADIUS && speed < HOLE_CAPTURE_SPEED) {
            // Eingelocht!
            ball.x = holeX;
            ball.y = holeY;
            ball.vx = 0;
            ball.vy = 0;
            return 'holed';
        }
        
        // Ball stoppt wenn langsam genug UND nicht auf einer Steigung
        if (!isOnSlope && Math.abs(ball.vx) < MIN_VELOCITY && Math.abs(ball.vy) < MIN_VELOCITY) {
            ball.vx = 0;
            ball.vy = 0;
            return 'stopped';
        }
        
        return null;
    },
    
    /**
     * Wendet Steigungskräfte auf den Ball an
     */
    applySlope(ball, slope, canvasWidth, canvasHeight) {
        // Koordinaten umrechnen
        const sx = slope.x * canvasWidth;
        const sy = slope.y * canvasHeight;
        const sw = slope.w * canvasWidth;
        const sh = slope.h * canvasHeight;
        
        // Prüfen ob Ball im Bereich ist
        if (ball.x >= sx && ball.x <= sx + sw &&
            ball.y >= sy && ball.y <= sy + sh) {
            
            // Kraft anwenden
            // Wir nehmen an, dass dx/dy bereits die Stärke beinhalten
            // Optionaler Multiplikator für globale Abstimmung
            const forceMultiplier = 3.5; 
            
            ball.vx += slope.dx * forceMultiplier;
            ball.vy += slope.dy * forceMultiplier;
            
            return true;
        }
        return false;
    },

    /**
     * Prüft und behandelt Kollision mit einer Wand
     */
    checkWallCollision(ball, wall, canvasWidth, canvasHeight) {
        const x1 = wall.x1 * canvasWidth;
        const y1 = wall.y1 * canvasHeight;
        const x2 = wall.x2 * canvasWidth;
        const y2 = wall.y2 * canvasHeight;
        
        // Abstand Punkt zu Linie berechnen
        const A = ball.x - x1;
        const B = ball.y - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0) param = dot / lenSq;
        
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = ball.x - xx;
        const dy = ball.y - yy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < BALL_RADIUS) {
            // Reflektion berechnen
            const nx = dx / distance;
            const ny = dy / distance;
            
            const dotProduct = ball.vx * nx + ball.vy * ny;
            
            ball.vx -= 2 * dotProduct * nx;
            ball.vy -= 2 * dotProduct * ny;
            
            // Ball aus Wand schieben
            ball.x = xx + nx * BALL_RADIUS;
            ball.y = yy + ny * BALL_RADIUS;
            
            // Energie verlieren
            ball.vx *= CONFIG.WALL_BOUNCE_DAMPING;
            ball.vy *= CONFIG.WALL_BOUNCE_DAMPING;
        }
    },
    
    /**
     * Prüft und behandelt Kollision mit einem rechteckigen Hindernis
     */
    checkObstacleCollision(ball, obs, canvasWidth, canvasHeight) {
        const ox = obs.x * canvasWidth;
        const oy = obs.y * canvasHeight;
        const ow = obs.w * canvasWidth;
        const oh = obs.h * canvasHeight;
        
        // Nächsten Punkt auf Rechteck finden
        const closestX = Math.max(ox, Math.min(ball.x, ox + ow));
        const closestY = Math.max(oy, Math.min(ball.y, oy + oh));
        
        const dx = ball.x - closestX;
        const dy = ball.y - closestY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < BALL_RADIUS) {
            if (distance === 0) {
                // Ball ist im Hindernis - rausdrücken
                ball.x = closestX + BALL_RADIUS;
                ball.y = closestY + BALL_RADIUS;
                return;
            }
            
            const nx = dx / distance;
            const ny = dy / distance;
            
            const dotProduct = ball.vx * nx + ball.vy * ny;
            
            ball.vx -= 2 * dotProduct * nx;
            ball.vy -= 2 * dotProduct * ny;
            
            ball.x = closestX + nx * BALL_RADIUS;
            ball.y = closestY + ny * BALL_RADIUS;
            
            ball.vx *= CONFIG.OBSTACLE_BOUNCE_DAMPING;
            ball.vy *= CONFIG.OBSTACLE_BOUNCE_DAMPING;
        }
    },
    
    /**
     * Berechnet Schlag-Vektor aus Ziel-Geste
     * @param {Object} aimStart - Startpunkt der Geste
     * @param {Object} aimEnd - Endpunkt der Geste
     * @returns {Object|null} - { vx, vy } oder null wenn zu schwach
     */
    calculateShot(aimStart, aimEnd) {
        const dx = aimStart.x - aimEnd.x;
        const dy = aimStart.y - aimEnd.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Nur schießen wenn genug gezogen wurde
        if (distance <= 10) {
            return null;
        }
        
        const power = Math.min(distance * POWER_MULTIPLIER, MAX_POWER);
        const angle = Math.atan2(dy, dx);
        
        return {
            vx: Math.cos(angle) * power,
            vy: Math.sin(angle) * power
        };
    }
};
