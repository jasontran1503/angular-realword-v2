import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorService } from './editor.service';
import { ResultSingleArticle, Article } from '../interface/interface.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  formEditor: FormGroup;
  slug: string;
  tagList: string[] = [];
  articleBySlug: Article;
  articleBySlugTags;

  constructor(private fb: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute, private editorService: EditorService) { }

  ngOnInit() {
    this.formEditor = this.fb.group({
      articleTitle: ['', [Validators.required]],
      articleAbout: ['', [Validators.required]],
      articleContent: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });

    this.activatedRoute.params.subscribe(params => {;
      this.slug = params.slug;
      if (this.slug == undefined) {
        this.slug = '';
      }
    });
    this.getArticle();
  }

  getArticle() {
    this.editorService.getArticle(this.slug).subscribe((result: ResultSingleArticle) => {
      // console.log(result);
      this.articleBySlug = result.article;
      if (this.slug) {
        this.articleBySlugTags = this.articleBySlug.tagList;
      }
      if (this.slug) {
        this.formEditor.setValue({
          articleTitle: this.articleBySlug.title,
          articleAbout: this.articleBySlug.description,
          articleContent: this.articleBySlug.body,
          tags: '',
        })
      }
    }, err => {
      console.log(err);
    })
  }

  enterTag(event) {
    let tag = event.target.value;
    if (!this.slug) {
      this.tagList.push(tag);
    }
    if (this.slug) {
      this.articleBySlugTags.push(tag);
    }
    event.target.value = '';
  }

  deleteTag(index) {
    if (!this.slug) {
      this.tagList.splice(index, 1);
    } else {
      this.articleBySlugTags.splice(index, 1);
    }
  }
  onEdit() {
    if(this.slug) {
      this.updateArticle();
    } else {
      this.createArticle();
    }
  }

  createArticle() {
    let articleTitle = this.formEditor.value.articleTitle;
    let articleAbout = this.formEditor.value.articleAbout;
    let articleContent = this.formEditor.value.articleContent;
    let tags = this.tagList;
    this.editorService.createArticle(articleTitle, articleAbout, articleContent, tags).subscribe((result: ResultSingleArticle) => {
      console.log(result);
    }, err => {
      console.log(err);
    });
    this.router.navigate(['home']);
  }

  updateArticle() {
    let articleTitle = this.formEditor.value.articleTitle;
    let articleAbout = this.formEditor.value.articleAbout;
    let articleContent = this.formEditor.value.articleContent;
    let articleTags = this.articleBySlugTags;
    this.editorService.updateArticle(articleTitle, articleAbout, articleContent, articleTags, this.slug).subscribe((result: Article) => {
      // console.log(result);
    }, err => {
      console.log(err);
    });
    this.router.navigate(['/', 'article', this.slug]);
  }

}
