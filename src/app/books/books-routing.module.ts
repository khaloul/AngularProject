import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  {path:'books',redirectTo:'books/index',pathMatch:'full'},
  { path: 'books/index', component: IndexComponent , canActivate: [authGuard] },
  { path: 'books/:MovieId/view', component: ViewComponent },
  { path: 'books/create', component: CreateComponent },
  { path: 'books/:MovieId/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { 
  
}
