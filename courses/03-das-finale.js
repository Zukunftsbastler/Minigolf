/**
 * Bahn 3: Das Finale
 * 
 * Ein Hindernisparcours, der Präzision erfordert.
 * Layout: Breites Rechteck mit mehreren Hindernissen
 * Weg: Ball muss zwischen den Hindernissen hindurch navigiert werden
 * 
 * Schwierigkeit: ★★★☆☆
 */

CourseLoader.register({
    name: "Das Finale",
    par: 4,
    
    // Startposition des Balls (Mitte unten)
    ballStart: { x: 0.5, y: 0.85 },
    
    // Position des Lochs (Mitte oben)
    hole: { x: 0.5, y: 0.12 },
    
    // Rechteckige Begrenzung
    walls: [
        { x1: 0.1, y1: 0.05, x2: 0.9, y2: 0.05 },   // Oben
        { x1: 0.1, y1: 0.92, x2: 0.9, y2: 0.92 },   // Unten
        { x1: 0.1, y1: 0.05, x2: 0.1, y2: 0.92 },   // Links
        { x1: 0.9, y1: 0.05, x2: 0.9, y2: 0.92 }    // Rechts
    ],
    
    // Hindernisse erschweren den Weg
    // Format: { x, y, w, h } - Position und Größe (alles relativ 0-1)
    obstacles: [
        // Erste Hindernis-Reihe (näher am Loch) - Lücke in der Mitte
        { x: 0.15, y: 0.28, w: 0.25, h: 0.06 },  // Links
        { x: 0.60, y: 0.28, w: 0.25, h: 0.06 },  // Rechts
        
        // Mittleres Hindernis - mittig, zwingt zu Umwegen
        { x: 0.42, y: 0.48, w: 0.16, h: 0.08 },
        
        // Untere Hindernis-Reihe - Lücken links und rechts
        { x: 0.30, y: 0.68, w: 0.40, h: 0.05 }
    ],
    
    // Dekorationen
    decorations: [
        { type: 'rock', x: 0.05, y: 0.2 },
        { type: 'rock', x: 0.95, y: 0.8 },
        { type: 'flower', x: 0.05, y: 0.5 },
        { type: 'flower', x: 0.95, y: 0.4 }
    ],
    
    // Lila Farbschema für die Finalbahn
    bgColor: '#8b5cf6',
    accentColor: '#7c3aed'
});
