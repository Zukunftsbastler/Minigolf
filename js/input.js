/**
 * input.js - Input-Handler für Maus- und Touch-Steuerung
 * 
 * Verarbeitet alle Benutzereingaben und wandelt sie in Spielaktionen um.
 */

const InputHandler = {
    canvas: null,
    isAiming: false,
    aimStart: { x: 0, y: 0 },
    aimEnd: { x: 0, y: 0 },
    
    // Callbacks für Spielaktionen
    onAimStart: null,
    onAimMove: null,
    onShot: null,
    onCancel: null,
    
    /**
     * Initialisiert den Input-Handler
     * @param {HTMLCanvasElement} canvas - Das Spielfeld-Canvas
     */
    init(canvas) {
        this.canvas = canvas;
        
        // Maus-Events
        canvas.addEventListener('mousedown', (e) => this.handleStart(e));
        canvas.addEventListener('mousemove', (e) => this.handleMove(e));
        canvas.addEventListener('mouseup', (e) => this.handleEnd(e));
        canvas.addEventListener('mouseleave', (e) => this.handleEnd(e));
        
        // Touch-Events für Mobile
        canvas.addEventListener('touchstart', (e) => this.handleStart(e), { passive: false });
        canvas.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
        canvas.addEventListener('touchend', (e) => this.handleEnd(e));
        canvas.addEventListener('touchcancel', (e) => this.handleEnd(e));
    },
    
    /**
     * Extrahiert Koordinaten aus Maus- oder Touch-Event
     */
    getEventPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    },
    
    /**
     * Start der Ziel-Geste
     */
    handleStart(e) {
        e.preventDefault();
        
        const pos = this.getEventPos(e);
        
        if (this.onAimStart && this.onAimStart(pos)) {
            this.isAiming = true;
            this.aimStart = { ...pos };
            this.aimEnd = { ...pos };
        }
    },
    
    /**
     * Bewegung während des Zielens
     */
    handleMove(e) {
        e.preventDefault();
        
        if (!this.isAiming) return;
        
        this.aimEnd = this.getEventPos(e);
        
        if (this.onAimMove) {
            this.onAimMove(this.aimStart, this.aimEnd);
        }
    },
    
    /**
     * Ende der Ziel-Geste (Schuss ausführen)
     */
    handleEnd(e) {
        if (!this.isAiming) return;
        
        this.isAiming = false;
        
        if (this.onShot) {
            this.onShot(this.aimStart, this.aimEnd);
        }
    },
    
    /**
     * Bricht das aktuelle Zielen ab
     */
    cancel() {
        this.isAiming = false;
        if (this.onCancel) {
            this.onCancel();
        }
    },
    
    /**
     * Gibt den aktuellen Aim-Zustand zurück
     */
    getAimState() {
        return {
            isAiming: this.isAiming,
            aimStart: this.aimStart,
            aimEnd: this.aimEnd
        };
    }
};
