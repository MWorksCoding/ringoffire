import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  title: string = '';
  description: string = '';
  @Input() card: string; //muss zuerst importiert werden, um es in .html einzubinden
  // @Input() players: string; //muss zuerst importiert werden, um es in .html einzubinden
  playerCount: number;
  game: Game;

  constructor() { }

  ngOnInit(): void {
    this.game = new Game();
    this.playerCount = this.game.players.length;
    // debugger;
    console.log(this.game.players.length)
  }

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  ngOnChanges(): void { //void gibt nur etwas aus und gibt nichts zurück
    if (this.card) { // das ganze erst ausführen, wenn die Karte existiert
      console.log('Current card is:', this.card);
      let cardNumber = +this.card.split('_')[1]; // splitten an der stelle mit dem "_"; string lässt sich in eine Number umwandelt, wenn man ein "+" davor setzt.
      this.title = this.cardAction[cardNumber - 1].title; //titel wird aus dem Array oben geholt, Array fängt immer bei 0 a - die Karten jedoch bei 1, deswegen wird eine Zahl abgezogen
      this.description = this.cardAction[cardNumber - 1].description; // wie oben
    }

    // if(this.playerCount == 0)
    // console.log(this.game.players.length)
    // this.title = 'Please add a another player';
  }
}