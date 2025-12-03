/**
 * Bahn 9: Der Trichter
 * 
 * Ein großer Trichter, der sich zum Ziel hin verengt.
 * Layout: Dreieckige Form (Trichter).
 * Weg: Von der breiten Basis zur engen Spitze.
 * 
 * Schwierigkeit: ★★★☆☆
 */

CourseLoader.register({
    name: "Der Trichter",
    par: 3,
    
    // Startposition (oben mitte)
    ballStart: { x: 0.5, y: 0.2 },
    
    // Lochposition (unten mitte)
    hole: { x: 0.5, y: 0.85 },
    
    // Steigungen (Sog zur Mitte)
    slopes: [
        // Links: Drückt nach rechts
        { x: 0.1, y: 0.1, w: 0.3, h: 0.8, dx: 0.03, dy: 0 },
        // Rechts: Drückt nach links
        { x: 0.6, y: 0.1, w: 0.3, h: 0.8, dx: -0.03, dy: 0 },
        // Mitte Oben: Drückt nach unten
        { x: 0.4, y: 0.1, w: 0.2, h: 0.3, dx: 0, dy: 0.03 }
    ],

    // Trichter-Form
    walls: [
        { x1: 0.1, y1: 0.1, x2: 0.9, y2: 0.1 },   // Oben (Basis)
        { x1: 0.1, y1: 0.1, x2: 0.4, y2: 0.9 },   // Linke Schräge
        { x1: 0.9, y1: 0.1, x2: 0.6, y2: 0.9 },   // Rechte Schräge
        { x1: 0.4, y1: 0.9, x2: 0.6, y2: 0.9 }    // Unten (Spitze)
    ],
    
    // Hindernisse im Trichter
    obstacles: [
        // Mittiges Hindernis, das den direkten Weg blockiert
        { x: 0.45, y: 0.4, w: 0.1, h: 0.1 },
        
        // Zwei kleine Hindernisse weiter unten
        { x: 0.4, y: 0.65, w: 0.05, h: 0.05 },
        { x: 0.55, y: 0.65, w: 0.05, h: 0.05 }
    ],
    
    // Dekorationen
    decorations: [
        { type: 'rock', x: 0.2, y: 0.2 },
        { type: 'rock', x: 0.8, y: 0.2 },
        { type: 'flower', x: 0.5, y: 0.95 }
    ],
    
    // Wüsten-Gelb
    bgColor: '#facc15',
    accentColor: '#eab308'
});
