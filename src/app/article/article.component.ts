import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from './article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, ResultSingleArticle, Comment, ResultComment, ResultUser } from '../interface/interface.component';
import { SharedService } from '../shared/shared.service';
import { HeaderService } from '../shared/layout/header/header.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  formArticle: FormGroup;
  articleClicked: string;
  articleContent: Article;
  userClicked: string;
  tagList: string[];
  comments: Comment[];
  token: string;
  currentUserName: string;
  currentUserImg: string;
  following: boolean;
  favorited: boolean;
  favoritesCount: number;
  slug: string;

  constructor(private fb: FormBuilder, private articleService: ArticleService,
    private activatedRoute: ActivatedRoute, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.formArticle = this.fb.group({
      comment: ['', [Validators.required]],
    });

    this.token = localStorage.getItem('api_token');
    this.getCurrentUser();

    this.activatedRoute.params.subscribe(params => {
      this.articleClicked = params.slug;
      this.getArticle();
      this.getComments();
    });
    // console.log(this.favoritesCount)
  }

  onFollow(following: boolean) {
    this.following = following;
  }

  onFavorite(favorited: boolean) {
    this.favorited = favorited;
    if (favorited) {
      this.favoritesCount++;
    } else {
      this.favoritesCount--;
    }
  }

  getCurrentUser() {
    this.sharedService.getCurrentUser().subscribe((result: ResultUser) => {
      // console.log(result);
      this.currentUserName = result.user.username;
      this.currentUserImg = result.user.image;
    })
  }

  getArticle() {
    this.articleService.getArticle(this.articleClicked).subscribe((result: ResultSingleArticle) => {
      // console.log(result);
      this.tagList = result.article.tagList;
      this.userClicked = result.article.author.username;
      this.following = result.article.author.following;
      this.favorited = result.article.favorited;
      this.favoritesCount = result.article.favoritesCount;
      this.slug = result.article.slug;
      this.articleContent = result.article;
    })
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.articleClicked).subscribe(result => {
      // console.log(result);
      this.router.navigate(['home']);
    }, err => {
      console.log(err);
    });
  }

  getComments() {
    return this.articleService.getComments(this.articleClicked).subscribe((result: ResultComment) => {
      // console.log(result);
      this.comments = result.comments;
      // this.idComment = res
    }, err => {
      console.log(err);
    });
  }

  addComments() {
    let body = this.formArticle.value.comment;
    this.articleService.addComments(this.articleClicked, body).subscribe((result: Comment) => {
      this.getComments();
      // console.log(result);
      // this.comments.unshift(result);
      // console.log(this.comments);
      this.formArticle.reset();
    }, err => {
      console.log(err);
    });
  }

  deleteComment(index) {
    let slug = this.articleClicked;
    let idComment = this.comments[index]['id'];
    this.articleService.deleteComment(slug, idComment).subscribe(result => {
      // console.log(result);
      this.getComments();
    }, err => {
      console.log(err);
    });
  }

}
