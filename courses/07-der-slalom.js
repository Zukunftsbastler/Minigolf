/**
 * Bahn 7: Der Slalom
 * 
 * Ein Zick-Zack-Kurs um Hindernisse.
 * Layout: Gerade Bahn mit versetzten Hindernissen.
 * Weg: Links-Rechts-Kombinationen sind erforderlich.
 * 
 * Schwierigkeit: ★★★☆☆
 */

CourseLoader.register({
    name: "Der Slalom",
    par: 3,
    
    // Startposition (unten mitte)
    ballStart: { x: 0.5, y: 0.9 },
    
    // Lochposition (oben mitte)
    hole: { x: 0.5, y: 0.1 },
    
    // Einfaches Rechteck als Spielfeld
    walls: [
        { x1: 0.2, y1: 0.05, x2: 0.8, y2: 0.05 },   // Oben
        { x1: 0.2, y1: 0.95, x2: 0.8, y2: 0.95 },   // Unten
        { x1: 0.2, y1: 0.05, x2: 0.2, y2: 0.95 },   // Links
        { x1: 0.8, y1: 0.05, x2: 0.8, y2: 0.95 }    // Rechts
    ],
    
    // Versetzte Hindernisse
    obstacles: [
        // Erstes Hindernis von links
        { x: 0.2, y: 0.7, w: 0.35, h: 0.05 },
        
        // Zweites Hindernis von rechts
        { x: 0.45, y: 0.5, w: 0.35, h: 0.05 },
        
        // Drittes Hindernis von links
        { x: 0.2, y: 0.3, w: 0.35, h: 0.05 }
    ],
    
    // Dekorationen
    decorations: [
        { type: 'tree', x: 0.1, y: 0.2 },
        { type: 'tree', x: 0.9, y: 0.5 },
        { type: 'tree', x: 0.1, y: 0.8 },
        { type: 'flower', x: 0.9, y: 0.2 }
    ],
    
    // Wald-Grün
    bgColor: '#15803d',
    accentColor: '#166534'
});
