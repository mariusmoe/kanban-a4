import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanMainComponent } from './components/kanban/kanban-main/kanban-main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'kanban', component: KanbanMainComponent },
  { path: '', redirectTo: '/kanban', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
