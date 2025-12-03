/**
 * Bahn 4: Das Nadelöhr
 * 
 * Ein klassisches Minigolf-Layout mit einer engen Passage.
 * Layout: Zwei weite Bereiche verbunden durch einen schmalen Tunnel.
 * Weg: Präzision ist gefragt, um den Ball durch die Engstelle zu spielen.
 * 
 * Schwierigkeit: ★★★☆☆
 */

CourseLoader.register({
    name: "Das Nadelöhr",
    par: 3,
    
    // Startposition des Balls (links mittig)
    ballStart: { x: 0.2, y: 0.5 },
    
    // Position des Lochs (rechts mittig)
    hole: { x: 0.8, y: 0.5 },
    
    // Wände für die Hantel-Form / Nadelöhr
    walls: [
        // Linker Bereich (Start)
        { x1: 0.1, y1: 0.2, x2: 0.1, y2: 0.8 },    // Linke Wand
        { x1: 0.1, y1: 0.2, x2: 0.4, y2: 0.2 },    // Oben links
        { x1: 0.1, y1: 0.8, x2: 0.4, y2: 0.8 },    // Unten links
        
        // Verengung zum Tunnel
        { x1: 0.4, y1: 0.2, x2: 0.4, y2: 0.45 },   // Wand zum Tunnel oben
        { x1: 0.4, y1: 0.8, x2: 0.4, y2: 0.55 },   // Wand zum Tunnel unten
        
        // Tunnel
        { x1: 0.4, y1: 0.45, x2: 0.6, y2: 0.45 },  // Tunnel oben
        { x1: 0.4, y1: 0.55, x2: 0.6, y2: 0.55 },  // Tunnel unten
        
        // Erweiterung vom Tunnel
        { x1: 0.6, y1: 0.45, x2: 0.6, y2: 0.2 },   // Wand vom Tunnel oben
        { x1: 0.6, y1: 0.55, x2: 0.6, y2: 0.8 },   // Wand vom Tunnel unten
        
        // Rechter Bereich (Ziel)
        { x1: 0.6, y1: 0.2, x2: 0.9, y2: 0.2 },    // Oben rechts
        { x1: 0.6, y1: 0.8, x2: 0.9, y2: 0.8 },    // Unten rechts
        { x1: 0.9, y1: 0.2, x2: 0.9, y2: 0.8 }     // Rechte Wand
    ],
    
    // Hindernisse
    obstacles: [
        // Diamant-Hindernis im Startbereich, zwingt zum Zielen
        { x: 0.25, y: 0.35, w: 0.05, h: 0.3 },
        
        // Zwei Blöcke im Zielbereich, die das Loch schützen
        { x: 0.7, y: 0.3, w: 0.05, h: 0.15 },
        { x: 0.7, y: 0.55, w: 0.05, h: 0.15 }
    ],
    
    // Dekorationen
    decorations: [
        { type: 'tree', x: 0.05, y: 0.1 },
        { type: 'tree', x: 0.05, y: 0.9 },
        { type: 'rock', x: 0.95, y: 0.15 },
        { type: 'flower', x: 0.5, y: 0.3 },
        { type: 'flower', x: 0.5, y: 0.7 }
    ],
    
    // Oranges Farbschema (Wüste/Sandstein)
    bgColor: '#f97316',
    accentColor: '#c2410c'
});
