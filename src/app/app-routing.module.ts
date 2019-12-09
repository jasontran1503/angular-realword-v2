import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './shared/login.guard';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleComponent } from './article/article.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'article/:slug', component: ArticleComponent },
  { path: 'profile/:name', component: ProfileComponent },
  // { path: 'editor/:slug', component: EditorComponent, canActivate: [LoginGuard] },
  // { path: 'editor', component: EditorComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
