export class Game {
  public players: string[] = []; // Datentyp kann angegeben werden durch , zur genaueren Validierung
  public stack: string[] = []; // ungespielte Karten
  public playedCard: string[] = []; // gespielte Karten
  public currentPlayer: number = 0; // public, damit überall verfügbar und nicht nur in diesem Objekt
  public pickCardAnimation = false;
  public currentCard: string = '';

  constructor() { // Construktur ist eine Funktion, die immer am Anfang aufgerufen wird
    for (let i = 1; i < 14; i++) {
      this.stack.push('ace_' + i) //ins Array stack hineinpushen
      this.stack.push('clubs_' + i) //ins Array stack hineinpushen
      this.stack.push('diamonds_' + i) //ins Array stack hineinpushen
      this.stack.push('hearts_' + i) //ins Array stack hineinpushen
    }
    shuffle(this.stack);
  }

  public toJSON() { //  / Game als JSON in der angelegte Sammlung "games" speichern
    return { // returnen eines JSON, das wie unten zusammengebaut wird;
      players: this.players, // Bezug auf oben public players: string[] = [];
      stack: this.stack,
      playedCard: this.playedCard,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    }
  }
}

// public, da wir in anderen dateien auch darauf zugreifen wollen

function shuffle(array) { // Funktion für das zufällige Mischen der Karten im Array
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}