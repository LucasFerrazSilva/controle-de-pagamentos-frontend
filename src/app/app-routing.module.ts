import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HorasExtrasComponent } from './horas-extras/horas-extras.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { NovoParametroComponent } from './parametros/novo-parametro/novo-parametro.component';
import { PrestadoresComponent } from './prestadores/prestadores.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'horas-extras', component: HorasExtrasComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'parametros', component: ParametrosComponent, canActivate: [authGuard], data: { role: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FINANCEIRO'] } , 
    children: [{ path: 'novoParametro', component: NovoParametroComponent}]
  },
  { path: 'prestadores', component: PrestadoresComponent, canActivate: [authGuard], data: { role: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FINANCEIRO'] } },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
