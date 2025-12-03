/**
 * Bahn 6: Die Brücken
 * 
 * Präzision ist gefragt auf den schmalen Verbindungen.
 * Layout: Drei Inseln verbunden durch schmale Stege.
 * Thema: Wasserwelt
 * 
 * Schwierigkeit: ★★★★☆
 */

CourseLoader.register({
    name: "Die Brücken",
    par: 4,
    
    // Start auf linker Insel
    ballStart: { x: 0.2, y: 0.5 },
    
    // Loch auf rechter Insel
    hole: { x: 0.8, y: 0.5 },
    
    // Wände definieren die Inseln und Brücken
    walls: [
        // Insel 1 (Links)
        { x1: 0.1, y1: 0.3, x2: 0.3, y2: 0.3 },   // Oben
        { x1: 0.1, y1: 0.7, x2: 0.3, y2: 0.7 },   // Unten
        { x1: 0.1, y1: 0.3, x2: 0.1, y2: 0.7 },   // Links
        { x1: 0.3, y1: 0.3, x2: 0.3, y2: 0.45 },  // Rechts oben
        { x1: 0.3, y1: 0.55, x2: 0.3, y2: 0.7 },  // Rechts unten
        
        // Brücke 1
        { x1: 0.3, y1: 0.45, x2: 0.45, y2: 0.45 }, // Oben
        { x1: 0.3, y1: 0.55, x2: 0.45, y2: 0.55 }, // Unten
        
        // Insel 2 (Mitte)
        { x1: 0.45, y1: 0.3, x2: 0.55, y2: 0.3 }, // Oben
        { x1: 0.45, y1: 0.7, x2: 0.55, y2: 0.7 }, // Unten
        { x1: 0.45, y1: 0.3, x2: 0.45, y2: 0.45 },// Links oben
        { x1: 0.45, y1: 0.55, x2: 0.45, y2: 0.7 },// Links unten
        { x1: 0.55, y1: 0.3, x2: 0.55, y2: 0.45 },// Rechts oben
        { x1: 0.55, y1: 0.55, x2: 0.55, y2: 0.7 },// Rechts unten
        
        // Brücke 2
        { x1: 0.55, y1: 0.45, x2: 0.7, y2: 0.45 }, // Oben
        { x1: 0.55, y1: 0.55, x2: 0.7, y2: 0.55 }, // Unten
        
        // Insel 3 (Rechts)
        { x1: 0.7, y1: 0.3, x2: 0.9, y2: 0.3 },   // Oben
        { x1: 0.7, y1: 0.7, x2: 0.9, y2: 0.7 },   // Unten
        { x1: 0.7, y1: 0.3, x2: 0.7, y2: 0.45 },  // Links oben
        { x1: 0.7, y1: 0.55, x2: 0.7, y2: 0.7 },  // Links unten
        { x1: 0.9, y1: 0.3, x2: 0.9, y2: 0.7 }    // Rechts
    ],
    
    // Hindernisse (Kisten auf den Inseln)
    obstacles: [
        { x: 0.5, y: 0.32, w: 0.05, h: 0.1 } // Kleiner Block oben
    ],
    
    // Dekorationen
    decorations: [
        { type: 'tree', x: 0.5, y: 0.2 },
        { type: 'tree', x: 0.5, y: 0.8 },
        { type: 'rock', x: 0.2, y: 0.8 }
    ],
    
    // Wasser-Blau
    bgColor: '#0ea5e9',
    accentColor: '#0284c7'
});
