import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { PerfilPage } from './perfil/perfil.page';
import { AjustesPage } from './ajustes/ajustes.page';
import { ContactoPage } from './contacto/contacto.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'perfil', component: PerfilPage },
  { path: 'ajustes', component: AjustesPage },
  { path: 'contacto', component: ContactoPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
