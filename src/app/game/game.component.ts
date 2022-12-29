import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore'; //ok
import { ActivatedRoute } from '@angular/router'; // letzten Stand aus der gespeicherten ID abrufen

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameOver = false;
  gameId: string;

  constructor( private router: ActivatedRoute, private firestore: AngularFirestore , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.router.params.subscribe((params) => { // aktuelles Spiel aus der Datenbank laden
      console.log(params); // ID auslesen, wir brauchen erst die ID, dann soll das ganze erst im Firestore aboniert werden
      this.gameId = params['id'];
      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => { //collection = angelegte Sammlung "games" von "https://console.firebase.google.com" für das Projekt; subsrice = abonieren
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer; // aktuelles Spiel aus der Datenbank laden
        this.game.playedCard = game.playedCard; // aktuelles Spiel aus der Datenbank laden
        this.game.players = game.players; // aktuelles Spiel aus der Datenbank laden
        this.game.stack = game.stack; // aktuelles Spiel aus der Datenbank laden
        this.game.pickCardAnimation = game.pickCardAnimation; // aktuelles Spiel aus der Datenbank laden
        this.game.currentCard = game.currentCard; // aktuelles Spiel aus der Datenbank laden

      });
    });

  }

  newGame() {
    this.game = new Game(); // Variable oben bekommt ein neues Objekt erstellt, mit einem leeren JSON von game.ts, quasi JSON mit Logik
    // console.log(this.game);
  }

  takeCard() {

    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else {


      if (this.game.players.length <= 1) {
        this.showHint();
      }
      if (!this.game.pickCardAnimation && this.game.players.length > 1) { // wird können nur alle 1500ms auf den Kartenstapel drücken, sonst ist die If-Bedingung = false
        this.game.currentCard = this.game.stack.pop(); // wir greifen auf das Array zu, mit pop() nehmen wir den letzten Wert aus unserem Array, gleichzeitig wird es aus dem Array entfernt
        // console.log(this.currentCard);

        this.game.pickCardAnimation = true;
        this.game.currentPlayer++; // nächster Spieler wird ausgewählt
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // Modulu = Restoperator: z.B. 3 / 3 = 1 ; REST = 0
        // console.log('New card:' + this.currentCard);
        // console.log(this.game);
        this.saveGame();
        setTimeout(() => { // Animation soll sich wiederholen und die Karte soll entfernt werden (landet wieder im Stapel)
          this.game.playedCard.push(this.game.currentCard); // erst wenn die Animation fertig ist, wird das Array mit playedCard erweitert
          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => { //name is a string
      if (name && this.game.players.length > 4) {
        this.showMaxPlayerInfo();
        // console.log('The max. number of player must not be exceeded:', this.game.players.length);
      } else if (name && name.length > 0) { // 1. existiert die Variable 2. Name bzw. Variable muss länder als 0 sein, sonst wird es nicht eingefügt
        this.game.players.push(name); // pushed the name to the Array of players
        // console.log('The name of the new player is:', name);
      }
    });
  }

  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJSON());
  }


  showMaxPlayerInfo() {
    document.getElementById(`confirm-max-player`).classList.remove(`d-none`);
  }

  backToGameScreen() {
    document.getElementById(`confirm-max-player`).classList.add(`d-none`);
  }

  showHint() {
    document.getElementById(`mat-card`).classList.add(`mat-card-border`); // roten Rahmen hinzufügen
    setTimeout(() => {
      document.getElementById(`mat-card`).classList.remove(`mat-card-border`); // roten Rahmen nach einer 1s wieder entfernen
    }, 1000);
  }

  restartGame() {
    window.location.reload();
  }
}

// Achtung: strict mode im tsconfig.json auf false stellen, sonst kommt eine Fehlermeldung.
