import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game/:id', component: GameComponent }, // nach dem slash kommt eine ID - aus dem gespeicherten JSON
];
//soll zu allererst angezeigt werden, der path bliebt offen, weil es gleich am Anfang geladen werden sollen; dann folgt der Import der StartScreen Component
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
