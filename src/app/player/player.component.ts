import { Component, OnInit, Input } from '@angular/core';
// WICHTIG: HIER OBEN MUSS INPUT IMPORTIERT WERDEN, SONST FUNKTIONIERT ES NICHT!

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name;
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

}
