import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderRoutingModule } from './layout/header/header-routing.module';
import { ListsArticlesComponent } from './lists-articles/lists-articles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FollowButtonComponent } from './buttons/follow-button.component';
import { FavoriteButtonComponent } from './buttons/favorite-button.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ListsArticlesComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    RouterTestingModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ListsArticlesComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
  ]
})
export class SharedModule { }
