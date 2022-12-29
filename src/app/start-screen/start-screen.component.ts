import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; //ok
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    // Start game
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJSON()) // Datenbank updaten bzw. json hinzufügen beim Start
      .then((gameInfo: any) => { // then ist wie subscribe, allerdings kann es nur einmal ausgeführt (abgerufen) werden
        // console.log(gameInfo); // Erstellung von eines neuen JSON vom aktuellen Objekt (Erstellung einer einzigartigen ID); die URL daraus kann weitergesendet werden für den Multiplayer
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
    
  }

}
