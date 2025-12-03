/**
 * TEMPLATE: Neue Bahn erstellen
 * 
 * Kopiere diese Datei und benenne sie nach dem Schema: XX-bahn-name.js
 * Beispiel: 04-der-tunnel.js, 05-windmuehle.js
 * 
 * WICHTIG: 
 * - Alle Koordinaten sind relativ (0-1), werden automatisch skaliert
 * - Die Datei muss in index.html eingebunden werden
 * - Bahnen werden in der Reihenfolge der Script-Tags geladen
 */

CourseLoader.register({
    // ============================================
    // Grundlegende Bahn-Eigenschaften
    // ============================================
    
    /**
     * Name der Bahn (wird in der Ergebnis-Übersicht angezeigt)
     */
    name: "Bahn-Name hier",
    
    /**
     * Par-Wert: Erwartete Anzahl der Schläge für diese Bahn
     * - Einfache Bahn: 2
     * - Mittlere Bahn: 3
     * - Schwere Bahn: 4-5
     */
    par: 3,
    
    // ============================================
    // Positionen (relative Koordinaten 0-1)
    // ============================================
    
    /**
     * Startposition des Balls
     * x: 0 = links, 1 = rechts
     * y: 0 = oben, 1 = unten
     */
    ballStart: { x: 0.5, y: 0.85 },
    
    /**
     * Position des Lochs
     */
    hole: { x: 0.5, y: 0.15 },
    
    // ============================================
    // Wände (definieren die Spielfeldgrenzen)
    // ============================================
    
    /**
     * Wände sind Linien von Punkt 1 (x1, y1) zu Punkt 2 (x2, y2)
     * Der Ball prallt an Wänden ab.
     * 
     * Tipps:
     * - Wände sollten ein geschlossenes Spielfeld bilden
     * - Stelle sicher, dass Ball und Loch INNERHALB der Wände liegen
     * - Wände können auch Kurven und Winkel bilden
     */
    walls: [
        // Beispiel: Einfaches Rechteck
        { x1: 0.2, y1: 0.08, x2: 0.8, y2: 0.08 },   // Oben
        { x1: 0.2, y1: 0.92, x2: 0.8, y2: 0.92 },   // Unten
        { x1: 0.2, y1: 0.08, x2: 0.2, y2: 0.92 },   // Links
        { x1: 0.8, y1: 0.08, x2: 0.8, y2: 0.92 }    // Rechts
    ],
    
    // ============================================
    // Steigungen (optional)
    // ============================================
    
    /**
     * Steigungen beschleunigen den Ball in eine Richtung
     * Format: { x, y, w, h, dx, dy }
     * dx, dy: Richtung und Stärke (z.B. dx: 0.05 für leichten Schub nach rechts)
     */
    slopes: [
        // Beispiel: Steigung nach rechts oben
        // { x: 0.2, y: 0.2, w: 0.6, h: 0.6, dx: 0.05, dy: -0.05 }
    ],

    // ============================================
    // Hindernisse (optional)
    // ============================================
    
    /**
     * Hindernisse sind Rechtecke, an denen der Ball abprallt
     * Format: { x, y, w, h }
     * x, y = Position der oberen linken Ecke
     * w, h = Breite und Höhe
     * 
     * Tipps:
     * - Lass genug Platz für den Ball (mind. 0.1 Breite)
     * - Stelle sicher, dass es immer einen Weg zum Loch gibt
     */
    obstacles: [
        // Beispiel: Hindernis in der Mitte
        // { x: 0.4, y: 0.45, w: 0.2, h: 0.1 }
    ],
    
    // ============================================
    // Dekorationen (optional, nur visuell)
    // ============================================
    
    /**
     * Dekorative Elemente außerhalb des Spielfelds
     * Verfügbare Typen: 'tree', 'flower', 'rock'
     * 
     * Position sollte AUSSERHALB der Wände sein!
     */
    decorations: [
        { type: 'tree', x: 0.1, y: 0.3 },
        { type: 'flower', x: 0.9, y: 0.6 },
        { type: 'rock', x: 0.05, y: 0.5 }
    ],
    
    // ============================================
    // Farbschema (optional)
    // ============================================
    
    /**
     * Hintergrundfarbe der Bahn
     * Empfohlene Farben für verschiedene Themen:
     * - Grün: '#22c55e' (Standard, Wiese)
     * - Blau: '#3b82f6' (Wasser-Thema)
     * - Lila: '#8b5cf6' (Mystisch)
     * - Orange: '#f97316' (Wüste)
     * - Rot: '#ef4444' (Vulkan)
     */
    bgColor: '#22c55e',
    
    /**
     * Akzentfarbe (für Rahmen etc.)
     */
    accentColor: '#16a34a',
    
    // ============================================
    // Spezielle Eigenschaften (optional)
    // ============================================
    
    /**
     * Layout-Typ für spezielle Formen
     * Aktuell unterstützt: 'L-shape'
     * Standard: nicht gesetzt (Rechteck)
     */
    // layout: 'L-shape'
});

/**
 * CHECKLISTE VOR DEM SPEICHERN:
 * 
 * [ ] Name ist einzigartig und beschreibend
 * [ ] Par-Wert ist angemessen für die Schwierigkeit
 * [ ] Ball-Startposition liegt innerhalb der Wände
 * [ ] Loch liegt innerhalb der Wände
 * [ ] Es gibt einen freien Weg vom Start zum Loch
 * [ ] Hindernisse blockieren nicht komplett den Weg
 * [ ] Dekorationen liegen außerhalb des Spielfelds
 * [ ] Datei in index.html eingebunden
 */
