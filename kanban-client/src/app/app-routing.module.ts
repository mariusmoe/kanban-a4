import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanMainComponent } from './components/kanban/kanban-main/kanban-main.component';

const routes: Routes = [
  { path: 'kanban', component: KanbanMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
