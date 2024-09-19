import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AsansorBakimComponent } from './asansor-bakim/asansor-bakim.component';
import { YmBakimComponent } from './ym-bakim/ym-bakim.component';
import { GenelArizaComponent } from './genel-ariza/genel-ariza.component';
import { MenuComponent } from './menu/menu.component';
import { AdminAsansorBakimComponent } from './admin-asansor-bakim/admin-asansor-bakim.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminGenelArizaComponent } from './admin-genel-ariza/admin-genel-ariza.component';

const routes: Routes = [
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'elevator-maintenance', component: AsansorBakimComponent, canActivate: [AuthGuard] },
  { path: 'escalator-maintenance', component: YmBakimComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'general-failure', component: GenelArizaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin-elevator-maintenance', component: AdminAsansorBakimComponent, canActivate: [AuthGuard] },
  { path: 'admin-general-failure', component: AdminGenelArizaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
