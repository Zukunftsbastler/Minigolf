/**
 * course-loader.js - Lädt und verwaltet Golfbahnen
 * 
 * Dieses Modul lädt Bahndefinitionen aus dem courses/ Ordner
 * und stellt sie dem Spiel zur Verfügung.
 */

const CourseLoader = {
    courses: [],
    
    /**
     * Registriert eine Bahn im Spiel
     * @param {Object} course - Bahndefinition
     */
    register(course) {
        // Validierung
        if (!course.name || !course.par || !course.ballStart || !course.hole || !course.walls) {
            console.error('Ungültige Bahndefinition:', course);
            return false;
        }
        
        // Standard-Werte setzen
        course.obstacles = course.obstacles || [];
        course.decorations = course.decorations || [];
        course.bgColor = course.bgColor || '#22c55e';
        course.accentColor = course.accentColor || '#16a34a';
        
        this.courses.push(course);
        console.log(`Bahn "${course.name}" geladen (Par ${course.par})`);
        return true;
    },
    
    /**
     * Gibt alle geladenen Bahnen zurück
     * @returns {Array} Array mit allen Bahndefinitionen
     */
    getAll() {
        return this.courses;
    },
    
    /**
     * Gibt eine spezifische Bahn zurück
     * @param {number} index - Index der Bahn
     * @returns {Object|null} Bahndefinition oder null
     */
    get(index) {
        if (index < 0 || index >= this.courses.length) {
            return null;
        }
        return this.courses[index];
    },
    
    /**
     * Gibt die Anzahl der Bahnen zurück
     * @returns {number}
     */
    count() {
        return this.courses.length;
    },
    
    /**
     * Berechnet das Gesamt-Par aller Bahnen
     * @returns {number}
     */
    getTotalPar() {
        return this.courses.reduce((sum, course) => sum + course.par, 0);
    },
    
    /**
     * Sortiert Bahnen nach Schwierigkeit (Par)
     */
    sortByDifficulty() {
        this.courses.sort((a, b) => a.par - b.par);
    },
    
    /**
     * Mischt die Reihenfolge der Bahnen
     */
    shuffle() {
        for (let i = this.courses.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.courses[i], this.courses[j]] = [this.courses[j], this.courses[i]];
        }
    },
    
    /**
     * Setzt alle Bahnen zurück
     */
    clear() {
        this.courses = [];
    }
};

// Globale Referenz für Kompatibilität
let COURSES = [];

// Nach dem Laden aller Bahnen COURSES aktualisieren
function finalizeCourses() {
    COURSES = CourseLoader.getAll();
    console.log(`${COURSES.length} Bahnen bereit.`);
}
