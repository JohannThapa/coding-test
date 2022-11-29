import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateUpdateComponent } from './pages/users/create-update/create-update.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  { path: 'home', component: UsersComponent, data: { num: 1 } },
  { path: 'users', component: UsersComponent, data: { num: 2 } },
  { path: 'users/create', component: CreateUpdateComponent, data: { num: 1 } },
  { path: 'users/update/:id', component: CreateUpdateComponent, data: { num: 2 } },
  { path: 'users/:id', component: UsersComponent, data: { num: 1 } },
  { path: '', component: UsersComponent, data: { num: 2 } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'disabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
