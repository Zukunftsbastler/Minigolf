/**
 * renderer.js - Rendering-Engine für das Minigolf-Spiel
 * 
 * Enthält alle Zeichenfunktionen für Spielfeld, Ball, Hindernisse, etc.
 */

const Renderer = {
    ctx: null,
    canvasWidth: 0,
    canvasHeight: 0,
    
    /**
     * Initialisiert den Renderer
     * @param {CanvasRenderingContext2D} context - Canvas 2D Context
     * @param {number} width - Canvas-Breite
     * @param {number} height - Canvas-Höhe
     */
    init(context, width, height) {
        this.ctx = context;
        this.canvasWidth = width;
        this.canvasHeight = height;
    },
    
    /**
     * Aktualisiert die Canvas-Dimensionen
     */
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    },
    
    /**
     * Rendert einen kompletten Frame
     */
    render(course, ball, gameState, isAiming, aimStart, aimEnd, particles, currentHoleIndex) {
        if (!this.ctx || this.canvasWidth === 0 || this.canvasHeight === 0) {
            return;
        }
        
        // Hintergrund
        this.ctx.fillStyle = course.bgColor;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // Spielfeld-Bereich (Gras)
        this.drawPlayArea(course, currentHoleIndex);

        // Steigungen
        this.drawSlopes(course);
        
        // Dekorationen
        this.drawDecorations(course);
        
        // Wände
        this.drawWalls(course);
        
        // Hindernisse
        this.drawObstacles(course);
        
        // Loch
        this.drawHole(course);
        
        // Ziellinie (beim Aiming)
        if (isAiming) {
            this.drawAimLine(ball, aimStart, aimEnd);
        }
        
        // Ball
        this.drawBall(ball, gameState);
        
        // Partikel
        this.drawParticles(particles);
    },
    
    /**
     * Zeichnet den Spielbereich (Gras)
     */
    drawPlayArea(course, currentHoleIndex) {
        this.ctx.fillStyle = '#4ade80';
        this.ctx.strokeStyle = '#16a34a';
        this.ctx.lineWidth = 4;
        
        // Für L-förmige Bahnen
        if (course.layout === 'L-shape' || currentHoleIndex === 1) {
            // L-förmige Bahn: Vertikaler Teil + Horizontaler Teil
            const v_x = 0.15 * this.canvasWidth;
            const v_y = 0.45 * this.canvasHeight;
            const v_w = 0.20 * this.canvasWidth;
            const v_h = 0.45 * this.canvasHeight;
            
            const h_x = 0.15 * this.canvasWidth;
            const h_y = 0.10 * this.canvasHeight;
            const h_w = 0.70 * this.canvasWidth;
            const h_h = 0.35 * this.canvasHeight;
            
            // Zeichne zusammenhängende L-Form als Pfad
            this.ctx.beginPath();
            this.ctx.moveTo(v_x, h_y);
            this.ctx.lineTo(h_x + h_w, h_y);
            this.ctx.lineTo(h_x + h_w, h_y + h_h);
            this.ctx.lineTo(v_x + v_w, h_y + h_h);
            this.ctx.lineTo(v_x + v_w, v_y + v_h);
            this.ctx.lineTo(v_x, v_y + v_h);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            
            // Gras-Textur
            this.ctx.save();
            this.ctx.clip();
            this.ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
            this.ctx.lineWidth = 1;
            for (let y = h_y; y < v_y + v_h; y += 15) {
                this.ctx.beginPath();
                this.ctx.moveTo(v_x, y);
                this.ctx.lineTo(h_x + h_w, y);
                this.ctx.stroke();
            }
            this.ctx.restore();
        } else {
            // Standard-Rechteck basierend auf den Wänden
            const minX = Math.min(...course.walls.map(w => Math.min(w.x1, w.x2))) * this.canvasWidth;
            const maxX = Math.max(...course.walls.map(w => Math.max(w.x1, w.x2))) * this.canvasWidth;
            const minY = Math.min(...course.walls.map(w => Math.min(w.y1, w.y2))) * this.canvasHeight;
            const maxY = Math.max(...course.walls.map(w => Math.max(w.y1, w.y2))) * this.canvasHeight;
            
            this.ctx.beginPath();
            this.ctx.roundRect(minX - 2, minY - 2, maxX - minX + 4, maxY - minY + 4, 10);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Gras-Textur (subtile Linien)
            this.ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
            this.ctx.lineWidth = 1;
            for (let y = minY; y < maxY; y += 15) {
                this.ctx.beginPath();
                this.ctx.moveTo(minX, y);
                this.ctx.lineTo(maxX, y);
                this.ctx.stroke();
            }
        }
    },
    
    /**
     * Zeichnet Wände
     */
    drawWalls(course) {
        this.ctx.strokeStyle = '#78716c';
        this.ctx.lineWidth = 8;
        this.ctx.lineCap = 'round';
        
        course.walls.forEach(wall => {
            this.ctx.beginPath();
            this.ctx.moveTo(wall.x1 * this.canvasWidth, wall.y1 * this.canvasHeight);
            this.ctx.lineTo(wall.x2 * this.canvasWidth, wall.y2 * this.canvasHeight);
            this.ctx.stroke();
        });
        
        // Highlight oben
        this.ctx.strokeStyle = '#a8a29e';
        this.ctx.lineWidth = 3;
        
        course.walls.forEach(wall => {
            this.ctx.beginPath();
            this.ctx.moveTo(wall.x1 * this.canvasWidth, wall.y1 * this.canvasHeight - 2);
            this.ctx.lineTo(wall.x2 * this.canvasWidth, wall.y2 * this.canvasHeight - 2);
            this.ctx.stroke();
        });
    },
    
    /**
     * Zeichnet Hindernisse
     */
    drawObstacles(course) {
        course.obstacles.forEach(obs => {
            const x = obs.x * this.canvasWidth;
            const y = obs.y * this.canvasHeight;
            const w = obs.w * this.canvasWidth;
            const h = obs.h * this.canvasHeight;
            
            // Schatten
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.beginPath();
            this.ctx.roundRect(x + 3, y + 3, w, h, 4);
            this.ctx.fill();
            
            // Block
            this.ctx.fillStyle = '#78716c';
            this.ctx.beginPath();
            this.ctx.roundRect(x, y, w, h, 4);
            this.ctx.fill();
            
            // Highlight
            this.ctx.fillStyle = '#a8a29e';
            this.ctx.beginPath();
            this.ctx.roundRect(x, y, w, h * 0.3, [4, 4, 0, 0]);
            this.ctx.fill();
        });
    },
    
    /**
     * Zeichnet das Loch mit Fahne
     */
    drawHole(course) {
        const x = course.hole.x * this.canvasWidth;
        const y = course.hole.y * this.canvasHeight;
        
        // Äußerer Ring (Schatten)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, HOLE_RADIUS + 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Loch
        this.ctx.fillStyle = '#1f2937';
        this.ctx.beginPath();
        this.ctx.arc(x, y, HOLE_RADIUS, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Innerer dunkler Bereich
        this.ctx.fillStyle = '#0f172a';
        this.ctx.beginPath();
        this.ctx.arc(x, y, HOLE_RADIUS - 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Flagge
        const flagHeight = 50;
        const flagWidth = 25;
        
        // Fahnenstange
        this.ctx.strokeStyle = '#78716c';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y - flagHeight);
        this.ctx.stroke();
        
        // Fahne
        this.ctx.fillStyle = '#ef4444';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - flagHeight);
        this.ctx.lineTo(x + flagWidth, y - flagHeight + 10);
        this.ctx.lineTo(x, y - flagHeight + 20);
        this.ctx.closePath();
        this.ctx.fill();
    },
    
    /**
     * Zeichnet Dekorationen (Bäume, Blumen, Steine)
     */
    drawDecorations(course) {
        course.decorations.forEach(deco => {
            const x = deco.x * this.canvasWidth;
            const y = deco.y * this.canvasHeight;
            
            if (deco.type === 'tree') {
                // Baumstamm
                this.ctx.fillStyle = '#92400e';
                this.ctx.fillRect(x - 4, y, 8, 20);
                
                // Baumkrone
                this.ctx.fillStyle = '#22c55e';
                this.ctx.beginPath();
                this.ctx.arc(x, y - 5, 18, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.fillStyle = '#16a34a';
                this.ctx.beginPath();
                this.ctx.arc(x - 8, y, 12, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.beginPath();
                this.ctx.arc(x + 8, y, 12, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            if (deco.type === 'flower') {
                const colors = ['#f472b6', '#fb923c', '#facc15'];
                this.ctx.fillStyle = colors[Math.floor(x + y) % 3];
                
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 / 5) * i;
                    this.ctx.beginPath();
                    this.ctx.arc(
                        x + Math.cos(angle) * 6,
                        y + Math.sin(angle) * 6,
                        5, 0, Math.PI * 2
                    );
                    this.ctx.fill();
                }
                
                this.ctx.fillStyle = '#fcd34d';
                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            if (deco.type === 'rock') {
                this.ctx.fillStyle = '#78716c';
                this.ctx.beginPath();
                this.ctx.ellipse(x, y, 15, 10, 0, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.fillStyle = '#a8a29e';
                this.ctx.beginPath();
                this.ctx.ellipse(x - 3, y - 3, 8, 5, -0.3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    },
    
    /**
     * Zeichnet den Ball
     */
    drawBall(ball, gameState) {
        // Schatten
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(ball.x + 3, ball.y + 3, BALL_RADIUS, BALL_RADIUS * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Ball (Gradient für 3D-Effekt)
        const gradient = this.ctx.createRadialGradient(
            ball.x - 4, ball.y - 4, 0,
            ball.x, ball.y, BALL_RADIUS
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#f8fafc');
        gradient.addColorStop(1, '#e2e8f0');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(ball.x - 4, ball.y - 4, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Hover-Effekt wenn spielbereit
        if (gameState === 'playing') {
            this.ctx.strokeStyle = 'rgba(249, 115, 22, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, BALL_RADIUS + 4 + Math.sin(Date.now() / 200) * 2, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    },
    
    /**
     * Zeichnet die Ziellinie beim Aiming
     */
    drawAimLine(ball, aimStart, aimEnd) {
        const dx = aimStart.x - aimEnd.x;
        const dy = aimStart.y - aimEnd.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const power = Math.min(distance * POWER_MULTIPLIER, MAX_POWER);
        const powerRatio = power / MAX_POWER;
        
        // Richtungsvektor normalisieren
        const nx = dx / distance || 0;
        const ny = dy / distance || 0;
        
        // Linienlänge proportional zur Kraft
        const lineLength = Math.min(distance, 150);
        const endX = ball.x + nx * lineLength;
        const endY = ball.y + ny * lineLength;
        
        // Gestrichelte Linie
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + powerRatio * 0.3})`;
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([8, 6]);
        
        this.ctx.beginPath();
        this.ctx.moveTo(ball.x, ball.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
        
        // Pfeilspitze
        const arrowSize = 12;
        const arrowAngle = Math.atan2(ny, nx);
        
        this.ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + powerRatio * 0.3})`;
        this.ctx.beginPath();
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - arrowSize * Math.cos(arrowAngle - 0.4),
            endY - arrowSize * Math.sin(arrowAngle - 0.4)
        );
        this.ctx.lineTo(
            endX - arrowSize * Math.cos(arrowAngle + 0.4),
            endY - arrowSize * Math.sin(arrowAngle + 0.4)
        );
        this.ctx.closePath();
        this.ctx.fill();
        
        // Kraftanzeige
        const barWidth = 60;
        const barHeight = 8;
        const barX = ball.x - barWidth / 2;
        const barY = ball.y + BALL_RADIUS + 20;
        
        // Hintergrund
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.roundRect(barX, barY, barWidth, barHeight, 4);
        this.ctx.fill();
        
        // Füllstand mit Farbverlauf je nach Stärke
        const powerColor = powerRatio < 0.5 
            ? `rgb(34, 197, 94)` 
            : powerRatio < 0.8 
                ? `rgb(251, 191, 36)` 
                : `rgb(239, 68, 68)`;
        
        this.ctx.fillStyle = powerColor;
        this.ctx.beginPath();
        this.ctx.roundRect(barX, barY, barWidth * powerRatio, barHeight, 4);
        this.ctx.fill();
    },
    
    /**
     * Zeichnet Partikel-Effekte
     */
    drawParticles(particles) {
        particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    },

    /**
     * Zeichnet Steigungen (Pfeile)
     */
    drawSlopes(course) {
        if (!course.slopes) return;

        course.slopes.forEach(slope => {
            const x = slope.x * this.canvasWidth;
            const y = slope.y * this.canvasHeight;
            const w = slope.w * this.canvasWidth;
            const h = slope.h * this.canvasHeight;

            // Transparenter Hintergrund für den Bereich
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.fillRect(x, y, w, h);
            
            // Pfeile zeichnen
            const angle = Math.atan2(slope.dy, slope.dx);
            const size = 15;
            const step = 30; // Abstand zwischen Pfeilen
            
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.clip(); // Nur innerhalb des Bereichs zeichnen

            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.lineWidth = 2;

            for(let px = x + step/2; px < x + w; px += step) {
                for(let py = y + step/2; py < y + h; py += step) {
                    this.ctx.save();
                    this.ctx.translate(px, py);
                    this.ctx.rotate(angle);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(-size/2, 0);
                    this.ctx.lineTo(size/2, 0);
                    this.ctx.lineTo(size/6, -size/3);
                    this.ctx.moveTo(size/2, 0);
                    this.ctx.lineTo(size/6, size/3);
                    this.ctx.stroke();
                    
                    this.ctx.restore();
                }
            }
            this.ctx.restore();
        });
    }
};
