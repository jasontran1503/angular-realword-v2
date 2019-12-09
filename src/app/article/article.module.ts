import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterTestingModule,
    ReactiveFormsModule
  ],
  exports: [ArticleComponent],
})
export class ArticleModule { }
