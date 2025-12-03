/**
 * Bahn 10: Der Boss
 * 
 * Das große Finale.
 * Layout: Eine Spirale, die ins Zentrum führt.
 * Weg: Von außen nach innen durch präzise Lücken.
 * 
 * Schwierigkeit: ★★★★★
 */

CourseLoader.register({
    name: "Der Boss",
    par: 5,
    
    // Startposition (unten)
    ballStart: { x: 0.5, y: 0.9 },
    
    // Lochposition (Zentrum)
    hole: { x: 0.5, y: 0.5 },
    
    // Spiral-Layout
    walls: [
        // Außenwände
        { x1: 0.05, y1: 0.05, x2: 0.95, y2: 0.05 },
        { x1: 0.05, y1: 0.95, x2: 0.95, y2: 0.95 },
        { x1: 0.05, y1: 0.05, x2: 0.05, y2: 0.95 },
        { x1: 0.95, y1: 0.05, x2: 0.95, y2: 0.95 },
        
        // Erste Innenwand (Öffnung oben)
        { x1: 0.2, y1: 0.2, x2: 0.2, y2: 0.8 },    // Links
        { x1: 0.2, y1: 0.8, x2: 0.8, y2: 0.8 },    // Unten
        { x1: 0.8, y1: 0.8, x2: 0.8, y2: 0.2 },    // Rechts
        { x1: 0.2, y1: 0.2, x2: 0.4, y2: 0.2 },    // Oben Links
        { x1: 0.6, y1: 0.2, x2: 0.8, y2: 0.2 },    // Oben Rechts
        
        // Zweite Innenwand / Zentrum (Öffnung unten)
        { x1: 0.35, y1: 0.35, x2: 0.65, y2: 0.35 }, // Oben
        { x1: 0.35, y1: 0.35, x2: 0.35, y2: 0.65 }, // Links
        { x1: 0.65, y1: 0.35, x2: 0.65, y2: 0.65 }, // Rechts
        { x1: 0.35, y1: 0.65, x2: 0.45, y2: 0.65 }, // Unten Links
        { x1: 0.55, y1: 0.65, x2: 0.65, y2: 0.65 }  // Unten Rechts
    ],
    
    // Hindernisse (Ecken entschärfen / erschweren)
    obstacles: [
        { x: 0.05, y: 0.05, w: 0.1, h: 0.1 }, // Ecke Oben Links
        { x: 0.85, y: 0.05, w: 0.1, h: 0.1 }, // Ecke Oben Rechts
        // Keine Hindernisse unten, da Startbereich
        
        // Hindernis im inneren Ring oben (zw. den Öffnungen)
        { x: 0.45, y: 0.25, w: 0.1, h: 0.05 }
    ],
    
    // Dekorationen
    decorations: [
        { type: 'rock', x: 0.1, y: 0.5 },
        { type: 'rock', x: 0.9, y: 0.5 },
        { type: 'flower', x: 0.5, y: 0.55 } // Nahe dem Loch
    ],
    
    // Boss-Theme (Dunkelgrau/Rot)
    bgColor: '#1f2937',
    accentColor: '#dc2626'
});
