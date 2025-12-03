/**
 * Bahn 8: Die Gabelung
 * 
 * Wähle deinen Weg weise.
 * Layout: Ein Hindernis teilt den Weg in zwei Pfade.
 * Weg: Links ist sicher aber länger (Kurve), rechts ist direkt aber gefährlich (Hindernisse).
 * 
 * Schwierigkeit: ★★★☆☆
 */

CourseLoader.register({
    name: "Die Gabelung",
    par: 3,
    
    // Startposition (unten mitte)
    ballStart: { x: 0.5, y: 0.85 },
    
    // Lochposition (oben mitte)
    hole: { x: 0.5, y: 0.15 },
    
    // Spielfeld
    walls: [
        { x1: 0.1, y1: 0.05, x2: 0.9, y2: 0.05 },   // Oben
        { x1: 0.1, y1: 0.95, x2: 0.9, y2: 0.95 },   // Unten
        { x1: 0.1, y1: 0.05, x2: 0.1, y2: 0.95 },   // Links
        { x1: 0.9, y1: 0.05, x2: 0.9, y2: 0.95 }    // Rechts
    ],
    
    // Hindernisse
    obstacles: [
        // Zentraler Block, der die Wege trennt
        { x: 0.3, y: 0.3, w: 0.4, h: 0.4 },
        
        // Hindernisse auf dem rechten (kürzeren/direkteren?) Weg
        // Momentan sind beide gleich lang, aber wir machen den rechten Weg "enger" durch Hindernisse
        { x: 0.75, y: 0.4, w: 0.1, h: 0.05 },
        { x: 0.75, y: 0.6, w: 0.1, h: 0.05 },
        
        // Linker Weg bleibt frei
    ],
    
    // Dekorationen
    decorations: [
        { type: 'rock', x: 0.05, y: 0.5 },
        { type: 'rock', x: 0.95, y: 0.5 },
        { type: 'flower', x: 0.5, y: 0.5 } // Auf dem mittleren Block (deko wird drunter gemalt? hoffentlich nicht, oder drüber)
        // Deko ist nur visuell, also egal wo
    ],
    
    // Vulkan-Rot
    bgColor: '#7f1d1d',
    accentColor: '#991b1b'
});
