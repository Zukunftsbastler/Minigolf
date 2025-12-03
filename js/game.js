/**
 * game.js - Hauptspiel-Logik
 * 
 * Koordiniert alle Spielmodule und enthält die Haupt-Spielschleife.
 */

const Game = {
    // Canvas-Referenzen
    canvas: null,
    ctx: null,
    canvasWidth: 0,
    canvasHeight: 0,
    
    // Spielzustand
    ball: { x: 0, y: 0, vx: 0, vy: 0 },
    currentHole: 0,
    strokes: 0,
    strokesPerHole: [],
    gameState: 'welcome', // 'welcome', 'playing', 'aiming', 'rolling', 'holecomplete', 'gameover'
    
    // Aim-State (wird vom InputHandler verwaltet)
    isAiming: false,
    aimStart: { x: 0, y: 0 },
    aimEnd: { x: 0, y: 0 },
    
    /**
     * Initialisiert das Spiel
     */
    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Canvas-Größe setzen
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Module initialisieren
        UI.init();
        this.setupInput();
        this.setupButtons();
        
        // Bahnen finalisieren (COURSES Array befüllen)
        finalizeCourses();
        
        // Renderer initialisieren
        Renderer.init(this.ctx, this.canvasWidth, this.canvasHeight);
        
        // UI aktualisieren
        this.updateUI();
        
        // Spiel-Loop starten
        requestAnimationFrame(() => this.gameLoop());
    },
    
    /**
     * Passt Canvas-Größe an Container an
     */
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Pixel-Ratio für scharfe Darstellung auf Retina-Displays
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
        
        // Renderer aktualisieren
        Renderer.resize(this.canvasWidth, this.canvasHeight);
    },
    
    /**
     * Richtet Input-Handler ein
     */
    setupInput() {
        InputHandler.init(this.canvas);
        
        // Callback: Prüfen ob Schuss gestartet werden kann
        InputHandler.onAimStart = (pos) => {
            if (this.gameState !== 'playing') return false;
            
            // Prüfen ob Ball angeklickt und Ball steht
            const dx = pos.x - this.ball.x;
            const dy = pos.y - this.ball.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < BALL_RADIUS * CONFIG.HIT_AREA_MULTIPLIER && 
                Math.abs(this.ball.vx) < MIN_VELOCITY && 
                Math.abs(this.ball.vy) < MIN_VELOCITY) {
                this.isAiming = true;
                this.gameState = 'aiming';
                this.aimStart = { x: this.ball.x, y: this.ball.y };
                this.aimEnd = { ...pos };
                return true;
            }
            return false;
        };
        
        // Callback: Aim-Position aktualisieren
        InputHandler.onAimMove = (start, end) => {
            this.aimEnd = { ...end };
        };
        
        // Callback: Schuss ausführen
        InputHandler.onShot = (start, end) => {
            this.isAiming = false;
            
            const shot = Physics.calculateShot(this.aimStart, end);
            
            if (shot) {
                this.ball.vx = shot.vx;
                this.ball.vy = shot.vy;
                this.strokes++;
                this.updateUI();
                this.gameState = 'rolling';
                
                // Optional: Schlag-Effekt
                // ParticleSystem.createHit(this.ball.x, this.ball.y);
            } else {
                this.gameState = 'playing';
            }
        };
    },
    
    /**
     * Richtet Button-Events ein
     */
    setupButtons() {
        UI.elements.startBtn.addEventListener('click', () => this.startGame());
        UI.elements.resetBtn.addEventListener('click', () => this.resetBall());
        UI.elements.newGameBtn.addEventListener('click', () => this.newGame());
        UI.elements.nextHoleBtn.addEventListener('click', () => this.nextHole());
        UI.elements.playAgainBtn.addEventListener('click', () => this.newGame());
    },
    
    /**
     * Startet ein neues Spiel
     */
    startGame() {
        UI.hideWelcome();
        this.gameState = 'playing';
        this.currentHole = 0;
        this.strokes = 0;
        this.strokesPerHole = [];
        this.loadHole(this.currentHole);
        this.updateUI();
    },
    
    /**
     * Lädt eine Bahn
     */
    loadHole(holeIndex) {
        const course = COURSES[holeIndex];
        this.ball.x = course.ballStart.x * this.canvasWidth;
        this.ball.y = course.ballStart.y * this.canvasHeight;
        this.ball.vx = 0;
        this.ball.vy = 0;
        this.strokes = 0;
        ParticleSystem.clear();
        this.updateUI();
    },
    
    /**
     * Setzt den Ball zurück
     */
    resetBall() {
        if (this.gameState === 'rolling') return;
        
        const course = COURSES[this.currentHole];
        this.ball.x = course.ballStart.x * this.canvasWidth;
        this.ball.y = course.ballStart.y * this.canvasHeight;
        this.ball.vx = 0;
        this.ball.vy = 0;
        this.gameState = 'playing';
    },
    
    /**
     * Geht zur nächsten Bahn
     */
    nextHole() {
        UI.hideHoleComplete();
        this.currentHole++;
        
        if (this.currentHole >= COURSES.length) {
            this.showGameEnd();
        } else {
            this.loadHole(this.currentHole);
            this.gameState = 'playing';
        }
    },
    
    /**
     * Startet ein komplett neues Spiel
     */
    newGame() {
        UI.hideAllOverlays();
        UI.resetNextHoleButton();
        
        this.currentHole = 0;
        this.strokes = 0;
        this.strokesPerHole = [];
        this.isAiming = false;
        ParticleSystem.clear();
        
        if (this.canvasWidth === 0 || this.canvasHeight === 0) {
            this.resizeCanvas();
        }
        
        this.loadHole(0);
        this.gameState = 'playing';
        this.updateUI();
    },
    
    /**
     * Zeigt Bahn-geschafft-Overlay
     */
    showHoleComplete() {
        const course = COURSES[this.currentHole];
        this.strokesPerHole.push(this.strokes);
        
        UI.showHoleComplete(
            this.currentHole + 1,
            this.strokes,
            course.par,
            this.currentHole >= COURSES.length - 1
        );
        
        this.gameState = 'holecomplete';
    },
    
    /**
     * Zeigt Spielende-Overlay
     */
    showGameEnd() {
        UI.showGameEnd(this.strokesPerHole, COURSES);
        this.gameState = 'gameover';
    },
    
    /**
     * Aktualisiert die UI-Anzeigen
     */
    updateUI() {
        UI.updateStats(this.currentHole, COURSES.length, this.strokes);
    },
    
    /**
     * Aktualisiert die Physik
     */
    updatePhysics() {
        if (this.gameState !== 'rolling') return;
        
        const course = COURSES[this.currentHole];
        const result = Physics.update(this.ball, course, this.canvasWidth, this.canvasHeight);
        
        if (result === 'holed') {
            ParticleSystem.createCelebration(this.ball.x, this.ball.y);
            setTimeout(() => this.showHoleComplete(), CONFIG.HOLE_COMPLETE_DELAY);
            this.gameState = 'holecomplete';
        } else if (result === 'stopped') {
            this.gameState = 'playing';
        }
    },
    
    /**
     * Rendert einen Frame
     */
    render() {
        if (!this.ctx || this.canvasWidth === 0 || this.canvasHeight === 0) {
            return;
        }
        
        if (this.currentHole < 0 || this.currentHole >= COURSES.length) {
            this.currentHole = 0;
        }
        
        const course = COURSES[this.currentHole];
        
        Renderer.render(
            course,
            this.ball,
            this.gameState,
            this.isAiming,
            this.aimStart,
            this.aimEnd,
            ParticleSystem.getAll(),
            this.currentHole
        );
    },
    
    /**
     * Haupt-Spielschleife
     */
    gameLoop() {
        try {
            this.updatePhysics();
            ParticleSystem.update();
            this.render();
        } catch (error) {
            console.error('Fehler in gameLoop:', error);
        }
        requestAnimationFrame(() => this.gameLoop());
    }
};

// Spiel starten wenn DOM geladen
document.addEventListener('DOMContentLoaded', () => Game.init());
