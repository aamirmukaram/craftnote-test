import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)},
      {path: 'register', loadChildren: () => import('./register/register.module').then(mod => mod.RegisterModule)},
      {path: '', redirectTo: 'login'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
