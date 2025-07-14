import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { PerfilPage } from './perfil/perfil.page';
import { AjustesPage } from './ajustes/ajustes.page';
import { ContactoPage } from './contacto/contacto.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',  component: HomePage, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPage },
  { path: 'perfil', component: PerfilPage, canActivate: [AuthGuard] },
  { path: 'ajustes', component: AjustesPage, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoPage, canActivate: [AuthGuard] }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
