import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game(); // Variable oben bekommt ein neues Objekt erstellt, mit einem leeren JSON von game.ts, quasi JSON mit Logik
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length >= 1) { // wird können nur alle 1500ms auf den Kartenstapel drücken, sonst ist die If-Bedingung = false
      this.currentCard = this.game.stack.pop(); // wir greifen auf das Array zu, mit pop() nehmen wir den letzten Wert aus unserem Array, gleichzeitig wird es aus dem Array entfernt
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      this.game.currentPlayer++; // nächster Spieler wird ausgewählt
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // Modulu = Restoperator: z.B. 3 / 3 = 1 ; REST = 0

      console.log('New card:' + this.currentCard);
      console.log(this.game);
      setTimeout(() => { // Animation soll sich wiederholen und die Karte soll entfernt werden (landet wieder im Stapel)
        this.game.playedCard.push(this.currentCard); // erst wenn die Animation fertig ist, wird das Array mit playedCard erweitert
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => { //name is a string
      if (name && name.length > 0) { // 1. existiert die Variable 2. Name bzw. Variable muss länder als 0 sein, sonst wird es nicht eingefügt
        this.game.players.push(name); // pushed the name to the Array of players
        console.log('The name of the new player is:', name);
      }
    });
  }
}

// Achtung: strict mode im tsconfig.json auf false stellen, sonst kommt eine Fehlermeldung.
