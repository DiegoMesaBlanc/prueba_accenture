import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'credit', loadChildren: './components/credit/credit/credit.module#CreditPageModule' },
  { path: 'registry', loadChildren: './components/registry/registry/registry.module#RegistryPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
