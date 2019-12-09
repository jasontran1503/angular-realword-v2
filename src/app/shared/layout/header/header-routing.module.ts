import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/authen/login/login.component';

import { SettingsComponent } from 'src/app/settings/settings.component';
import { LoginGuard } from '../../login.guard';
import { HomeComponent } from 'src/app/home/home.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { EditorComponent } from 'src/app/editor/editor.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [LoginGuard] },
  { path: 'profile/:name', component: ProfileComponent },
  { path: 'editor/:slug', component: EditorComponent, canActivate: [LoginGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [LoginGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
