/**
 * Bahn 5: Das Labyrinth
 * 
 * Ein verschlungener Pfad, der Geduld erfordert.
 * Layout: S-Form (Snake)
 * Weg: Von oben links nach rechts, dann nach links, dann nach rechts unten.
 * 
 * Schwierigkeit: ★★★★☆
 */

CourseLoader.register({
    name: "Das Labyrinth",
    par: 4,
    
    // Startposition (oben links)
    ballStart: { x: 0.1, y: 0.2 },
    
    // Lochposition (unten rechts)
    hole: { x: 0.9, y: 0.8 },
    
    // Wände
    walls: [
        // Außenwände
        { x1: 0.05, y1: 0.05, x2: 0.95, y2: 0.05 }, // Oben
        { x1: 0.05, y1: 0.95, x2: 0.95, y2: 0.95 }, // Unten
        { x1: 0.05, y1: 0.05, x2: 0.05, y2: 0.95 }, // Links
        { x1: 0.95, y1: 0.05, x2: 0.95, y2: 0.95 }, // Rechts
        
        // Innere Wände für S-Form
        // Obere Trennwand (lässt Lücke rechts)
        { x1: 0.05, y1: 0.35, x2: 0.85, y2: 0.35 },
        
        // Untere Trennwand (lässt Lücke links)
        { x1: 0.15, y1: 0.65, x2: 0.95, y2: 0.65 }
    ],
    
    // Hindernisse
    obstacles: [
        // Blockade in der oberen Gasse
        { x: 0.4, y: 0.15, w: 0.05, h: 0.1 },
        
        // Blockade in der mittleren Gasse
        { x: 0.5, y: 0.45, w: 0.05, h: 0.1 },
        
        // Blockade vor dem Loch
        { x: 0.7, y: 0.75, w: 0.05, h: 0.1 }
    ],
    
    // Dekorationen
    decorations: [
        { type: 'rock', x: 0.9, y: 0.2 },
        { type: 'rock', x: 0.1, y: 0.5 },
        { type: 'flower', x: 0.5, y: 0.5 }
    ],
    
    // Mystisches Lila/Dunkelblau
    bgColor: '#4c1d95',
    accentColor: '#6d28d9'
});
