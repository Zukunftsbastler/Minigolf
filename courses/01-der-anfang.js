/**
 * Bahn 1: Der Anfang
 * 
 * Eine einfache gerade Strecke für Anfänger.
 * Layout: Einfaches Rechteck, Ball unten, Loch oben
 * Weg: Direkter gerader Schuss möglich
 * 
 * Schwierigkeit: ★☆☆☆☆
 */

CourseLoader.register({
    name: "Der Anfang",
    par: 2,
    
    // Startposition des Balls (relative Koordinaten 0-1)
    ballStart: { x: 0.5, y: 0.85 },
    
    // Position des Lochs (relative Koordinaten 0-1)
    hole: { x: 0.5, y: 0.15 },
    
    // Wände definieren die Spielfeldgrenzen
    // Format: { x1, y1, x2, y2 } - Linie von Punkt 1 zu Punkt 2
    walls: [
        { x1: 0.2, y1: 0.08, x2: 0.8, y2: 0.08 },   // Oben
        { x1: 0.2, y1: 0.92, x2: 0.8, y2: 0.92 },   // Unten
        { x1: 0.2, y1: 0.08, x2: 0.2, y2: 0.92 },   // Links
        { x1: 0.8, y1: 0.08, x2: 0.8, y2: 0.92 }    // Rechts
    ],
    
    // Steigung, die dem Spieler hilft (Rückenwind)
    slopes: [
        { x: 0.25, y: 0.4, w: 0.5, h: 0.2, dx: 0, dy: -0.04 }
    ],

    // Keine Hindernisse auf dieser einfachen Bahn
    obstacles: [],
    
    // Dekorative Elemente (außerhalb des Spielfelds)
    decorations: [
        { type: 'tree', x: 0.1, y: 0.3 },
        { type: 'tree', x: 0.9, y: 0.6 },
        { type: 'flower', x: 0.1, y: 0.7 },
        { type: 'flower', x: 0.9, y: 0.25 }
    ],
    
    // Farbschema der Bahn
    bgColor: '#22c55e',
    accentColor: '#16a34a'
});
