/**
 * config.js - Spielkonstanten und Konfiguration
 * 
 * Alle grundlegenden Spielparameter an einem Ort.
 * Änderungen hier wirken sich auf das gesamte Spiel aus.
 */

const CONFIG = {
    // Physik-Parameter
    FRICTION: 0.985,           // Reibung – je näher an 1, desto länger rollt der Ball
    MIN_VELOCITY: 0.15,        // Mindestgeschwindigkeit, unter der der Ball stoppt
    MAX_POWER: 18,             // Maximale Schlagkraft
    POWER_MULTIPLIER: 0.12,    // Umrechnung Mausziehung -> Kraft
    
    // Größen
    BALL_RADIUS: 12,           // Ballgröße
    HOLE_RADIUS: 16,           // Lochgröße
    
    // Gameplay
    HOLE_CAPTURE_SPEED: 4,     // Max. Geschwindigkeit für Loch-Treffer
    HIT_AREA_MULTIPLIER: 2.5,  // Trefferbereich um den Ball herum
    
    // Kollisions-Dämpfung
    WALL_BOUNCE_DAMPING: 0.85,
    OBSTACLE_BOUNCE_DAMPING: 0.8,
    
    // Visuelle Effekte
    CELEBRATION_PARTICLE_COUNT: 30,
    PARTICLE_COLORS: ['#fcd34d', '#f97316', '#ef4444', '#22c55e', '#3b82f6', '#8b5cf6'],
    
    // Timing
    HOLE_COMPLETE_DELAY: 800    // ms bis zum Anzeigen des Hole-Complete-Overlays
};

// Für Kompatibilität mit bestehendem Code auch als einzelne Konstanten
const FRICTION = CONFIG.FRICTION;
const MIN_VELOCITY = CONFIG.MIN_VELOCITY;
const MAX_POWER = CONFIG.MAX_POWER;
const POWER_MULTIPLIER = CONFIG.POWER_MULTIPLIER;
const BALL_RADIUS = CONFIG.BALL_RADIUS;
const HOLE_RADIUS = CONFIG.HOLE_RADIUS;
const HOLE_CAPTURE_SPEED = CONFIG.HOLE_CAPTURE_SPEED;
