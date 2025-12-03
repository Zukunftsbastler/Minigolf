# 🏌️ Mini Golf Deluxe

Ein modulares Minigolf-Browserspiel mit erweiterbare Bahnen.

## 📁 Projektstruktur

```
minigolf-game/
├── index.html              # Haupt-HTML (lädt alle Module)
├── README.md               # Diese Datei
├── css/
│   └── styles.css          # Alle CSS-Styles
├── js/
│   ├── config.js           # Spielkonstanten und Konfiguration
│   ├── course-loader.js    # Lädt und verwaltet Bahnen
│   ├── physics.js          # Physik-Engine (Kollisionen, Bewegung)
│   ├── renderer.js         # Rendering-Engine (Zeichenfunktionen)
│   ├── input.js            # Input-Handler (Maus/Touch)
│   ├── particles.js        # Partikel-System für Effekte
│   ├── ui.js               # UI-Manager (Overlays, Stats)
│   └── game.js             # Hauptspiel-Logik
└── courses/
    ├── _TEMPLATE.js        # Vorlage für neue Bahnen
    ├── 01-der-anfang.js    # Bahn 1: Einfache gerade Strecke
    ├── 02-die-kurve.js     # Bahn 2: L-förmige Bahn
    └── 03-das-finale.js    # Bahn 3: Hindernisparcours
```

## 🎮 Neue Bahnen erstellen

### Schnellstart

1. Kopiere `courses/_TEMPLATE.js` zu einer neuen Datei (z.B. `courses/04-meine-bahn.js`)
2. Passe die Bahn-Eigenschaften an
3. Füge die Datei in `index.html` ein:

```html
<!-- In index.html, nach den anderen Bahnen: -->
<script src="courses/04-meine-bahn.js"></script>
```

### Bahn-Struktur

```javascript
CourseLoader.register({
    name: "Bahn-Name",        // Anzeigename
    par: 3,                   // Erwartete Schläge
    ballStart: { x: 0.5, y: 0.85 },  // Startposition (0-1)
    hole: { x: 0.5, y: 0.15 },       // Loch-Position (0-1)
    walls: [...],             // Wände (Linien)
    obstacles: [...],         // Hindernisse (Rechtecke)
    decorations: [...],       // Deko-Elemente
    bgColor: '#22c55e',       // Hintergrundfarbe
    accentColor: '#16a34a'    // Akzentfarbe
});
```

### Koordinaten-System

Alle Positionen sind **relativ** (0-1):
- `x: 0` = linker Rand, `x: 1` = rechter Rand
- `y: 0` = oberer Rand, `y: 1` = unterer Rand

### Wände definieren

Wände sind Linien von Punkt A zu Punkt B:

```javascript
walls: [
    { x1: 0.2, y1: 0.1, x2: 0.8, y2: 0.1 },  // Horizontale Linie
    { x1: 0.2, y1: 0.1, x2: 0.2, y2: 0.9 },  // Vertikale Linie
]
```

### Hindernisse definieren

Hindernisse sind Rechtecke:

```javascript
obstacles: [
    { x: 0.4, y: 0.5, w: 0.2, h: 0.1 }  // x, y = Position, w, h = Größe
]
```

### Dekorationen

Verfügbare Typen: `'tree'`, `'flower'`, `'rock'`

```javascript
decorations: [
    { type: 'tree', x: 0.1, y: 0.3 },
    { type: 'flower', x: 0.9, y: 0.6 }
]
```

## ⚙️ Konfiguration anpassen

In `js/config.js` findest du alle Spielparameter:

```javascript
const CONFIG = {
    FRICTION: 0.985,        // Ball-Reibung (0.99 = weniger, 0.97 = mehr)
    MAX_POWER: 18,          // Maximale Schlagkraft
    BALL_RADIUS: 12,        // Ballgröße in Pixeln
    HOLE_RADIUS: 16,        // Lochgröße in Pixeln
    // ...
};
```

## 🏗️ Module erweitern

### Neue Hindernis-Typen

In `js/physics.js` kannst du neue Kollisionstypen hinzufügen:

```javascript
checkCircleObstacleCollision(ball, obs, canvasWidth, canvasHeight) {
    // Implementierung für runde Hindernisse
}
```

### Neue Dekorationen

In `js/renderer.js`, Funktion `drawDecorations()`:

```javascript
if (deco.type === 'windmill') {
    // Windmühle zeichnen
}
```

### Neue Effekte

In `js/particles.js`:

```javascript
createSplash(x, y) {
    // Wasser-Splash-Effekt
}
```

## 🚀 Deployment

Das Spiel besteht nur aus statischen Dateien und kann auf jedem Webserver gehostet werden:

1. Alle Dateien hochladen
2. `index.html` im Browser öffnen
3. Fertig!

## 📝 Tipps für gute Bahnen

1. **Balance**: Par sollte erreichbar, aber nicht zu einfach sein
2. **Sichtbarkeit**: Ball und Loch sollten immer sichtbar sein
3. **Fairness**: Es sollte immer einen möglichen Weg geben
4. **Abwechslung**: Verschiedene Formen und Hindernisse nutzen
5. **Testen**: Jede Bahn mehrfach durchspielen!

## 📄 Lizenz

MIT License - Frei verwendbar und erweiterbar!
