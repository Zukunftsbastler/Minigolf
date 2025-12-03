/**
 * ui.js - UI-Manager für Overlays und Spielinfo
 * 
 * Verwaltet alle UI-Elemente und Overlay-Anzeigen.
 */

const UI = {
    elements: {},
    
    /**
     * Initialisiert alle UI-Referenzen
     */
    init() {
        this.elements = {
            holeNumber: document.getElementById('holeNumber'),
            strokeCount: document.getElementById('strokeCount'),
            welcomeOverlay: document.getElementById('welcomeOverlay'),
            holeCompleteOverlay: document.getElementById('holeCompleteOverlay'),
            holeCompleteText: document.getElementById('holeCompleteText'),
            parDisplay: document.getElementById('parDisplay'),
            nextHoleBtn: document.getElementById('nextHoleBtn'),
            gameEndOverlay: document.getElementById('gameEndOverlay'),
            scoreTable: document.getElementById('scoreTable'),
            startBtn: document.getElementById('startBtn'),
            resetBtn: document.getElementById('resetBtn'),
            newGameBtn: document.getElementById('newGameBtn'),
            playAgainBtn: document.getElementById('playAgainBtn')
        };
    },
    
    /**
     * Aktualisiert die Spielstatistiken im Header
     * @param {number} currentHole - Aktuelle Bahn (0-basiert)
     * @param {number} totalHoles - Gesamtzahl der Bahnen
     * @param {number} strokes - Anzahl der Schläge
     */
    updateStats(currentHole, totalHoles, strokes) {
        this.elements.holeNumber.textContent = `${currentHole + 1}/${totalHoles}`;
        this.elements.strokeCount.textContent = strokes;
    },
    
    /**
     * Zeigt das Willkommen-Overlay
     */
    showWelcome() {
        this.elements.welcomeOverlay.classList.add('active');
    },
    
    /**
     * Versteckt das Willkommen-Overlay
     */
    hideWelcome() {
        this.elements.welcomeOverlay.classList.remove('active');
    },
    
    /**
     * Zeigt das Bahn-geschafft-Overlay
     * @param {number} holeNumber - Bahnnummer (1-basiert)
     * @param {number} strokes - Anzahl der Schläge
     * @param {number} par - Par der Bahn
     * @param {boolean} isLastHole - Ist es die letzte Bahn?
     */
    showHoleComplete(holeNumber, strokes, par, isLastHole) {
        // Text aktualisieren
        this.elements.holeCompleteText.textContent = 
            `Du hast Bahn ${holeNumber} in ${strokes} ${strokes === 1 ? 'Schlag' : 'Schlägen'} geschafft!`;
        
        // Par-Anzeige
        const diff = strokes - par;
        let parText = '';
        let parClass = '';
        
        if (diff < 0) {
            parText = diff === -1 ? 'Birdie! 🐦' : `${Math.abs(diff)} unter Par! 🔥`;
            parClass = 'par-under';
        } else if (diff === 0) {
            parText = 'Par! ✓';
            parClass = 'par-even';
        } else {
            parText = `${diff} über Par`;
            parClass = 'par-over';
        }
        
        this.elements.parDisplay.innerHTML = `<span class="par-display ${parClass}">${parText}</span>`;
        
        // Button-Text anpassen
        if (isLastHole) {
            this.elements.nextHoleBtn.innerHTML = '<span aria-hidden="true">🏆</span> Ergebnis ansehen';
        } else {
            this.elements.nextHoleBtn.innerHTML = '<span aria-hidden="true">→</span> Nächste Bahn';
        }
        
        this.elements.holeCompleteOverlay.classList.add('active');
    },
    
    /**
     * Versteckt das Bahn-geschafft-Overlay
     */
    hideHoleComplete() {
        this.elements.holeCompleteOverlay.classList.remove('active');
    },
    
    /**
     * Zeigt das Spielende-Overlay mit Ergebnissen
     * @param {Array} strokesPerHole - Array mit Schlägen pro Bahn
     * @param {Array} courses - Array mit Bahndefinitionen
     */
    showGameEnd(strokesPerHole, courses) {
        const totalStrokes = strokesPerHole.reduce((a, b) => a + b, 0);
        const totalPar = courses.reduce((a, c) => a + c.par, 0);
        
        // Score-Tabelle aufbauen
        let tableHTML = '';
        courses.forEach((course, i) => {
            tableHTML += `
                <div class="score-row">
                    <span class="score-label">Bahn ${i + 1} (Par ${course.par})</span>
                    <span class="score-value">${strokesPerHole[i]} Schläge</span>
                </div>
            `;
        });
        tableHTML += `
            <div class="score-row">
                <span class="score-label">Gesamt (Par ${totalPar})</span>
                <span class="score-value">${totalStrokes} Schläge</span>
            </div>
        `;
        
        this.elements.scoreTable.innerHTML = tableHTML;
        this.elements.gameEndOverlay.classList.add('active');
    },
    
    /**
     * Versteckt das Spielende-Overlay
     */
    hideGameEnd() {
        this.elements.gameEndOverlay.classList.remove('active');
    },
    
    /**
     * Versteckt alle Overlays
     */
    hideAllOverlays() {
        this.hideWelcome();
        this.hideHoleComplete();
        this.hideGameEnd();
    },
    
    /**
     * Setzt den Next-Hole-Button zurück
     */
    resetNextHoleButton() {
        this.elements.nextHoleBtn.innerHTML = '<span aria-hidden="true">→</span> Nächste Bahn';
    }
};
