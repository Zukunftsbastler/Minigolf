/**
 * Bahn 2: Die Kurve
 * 
 * Eine L-förmige Bahn, die strategisches Spielen erfordert.
 * Layout: L-Form - Ball startet unten links, Loch oben rechts
 * Weg: Ball muss um die Ecke gespielt werden (Bankenschuss oder 2 Schläge)
 * 
 * Schwierigkeit: ★★☆☆☆
 */

CourseLoader.register({
    name: "Die Kurve",
    par: 3,
    
    // Startposition des Balls (unten links im vertikalen Teil)
    ballStart: { x: 0.25, y: 0.8 },
    
    // Position des Lochs (oben rechts im horizontalen Teil)
    hole: { x: 0.75, y: 0.2 },
    
    // L-förmige Wandstruktur
    walls: [
        // Vertikaler Teil (unten) - linke Seite der L-Form
        { x1: 0.15, y1: 0.45, x2: 0.15, y2: 0.9 },  // Linke Außenwand
        { x1: 0.15, y1: 0.9, x2: 0.35, y2: 0.9 },   // Untere Wand
        { x1: 0.35, y1: 0.45, x2: 0.35, y2: 0.9 },  // Rechte Innenwand (bis zur Ecke)
        
        // Horizontaler Teil (oben) - obere Seite der L-Form
        { x1: 0.15, y1: 0.1, x2: 0.85, y2: 0.1 },   // Obere Außenwand
        { x1: 0.85, y1: 0.1, x2: 0.85, y2: 0.35 },  // Rechte Außenwand
        { x1: 0.35, y1: 0.35, x2: 0.85, y2: 0.35 }, // Untere Innenwand
        
        // Verbindung / Ecke
        { x1: 0.15, y1: 0.1, x2: 0.15, y2: 0.45 },  // Linke Wand oben (verbindet beide Teile)
        { x1: 0.35, y1: 0.35, x2: 0.35, y2: 0.45 }  // Lücke schließen (Innere Ecke)
    ],
    
    // Keine zusätzlichen Hindernisse
    obstacles: [],
    
    // Dekorationen
    decorations: [
        { type: 'rock', x: 0.08, y: 0.7 },
        { type: 'tree', x: 0.92, y: 0.5 },
        { type: 'flower', x: 0.5, y: 0.05 }
    ],
    
    // Blaues Farbschema
    bgColor: '#3b82f6',
    accentColor: '#2563eb',
    
    // Spezielle Eigenschaft für L-förmiges Rendering
    layout: 'L-shape'
});
