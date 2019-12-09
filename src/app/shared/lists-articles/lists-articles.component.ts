import { Component, OnInit, Input } from '@angular/core';
import { Article, ResultMultipleArticles } from 'src/app/interface/interface.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-lists-articles',
  templateUrl: './lists-articles.component.html',
  styleUrls: ['./lists-articles.component.css']
})
export class ListsArticlesComponent implements OnInit {

  @Input() checkFeed: number;
  @Input() checkArticles: number;
  @Input() userNameClicked: string;
  @Input() tag: string;
  limit = 10;
  listArticles: Article[];
  numPage;
  numClicked = 0;
  article: Article;
  favorited: boolean;
  favoritesCount: number;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.getListArticles();
  }

  getListArticles(offset = 0) {
    if (this.checkFeed == 1) {
      this.sharedService.getArticles('feed', '', '', '', this.limit, offset).subscribe((result: ResultMultipleArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkFeed == 2) {
      this.sharedService.getArticles('', '', '', '', this.limit, offset).subscribe((result: ResultMultipleArticles) => {
        // console.log(result.articles);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkFeed == 3) {
      this.sharedService.getArticles('', this.tag, '', '', this.limit, offset).subscribe((result: ResultMultipleArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkArticles == 1) {
      this.sharedService.getArticles('', '', this.userNameClicked, '', this.limit, offset).subscribe((result: ResultMultipleArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkArticles == 2) {
      this.sharedService.getArticles('', '', '', this.userNameClicked, this.limit, offset).subscribe((result: ResultMultipleArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }
  }

  showList(result: ResultMultipleArticles) {
    this.listArticles = result.articles;
    // this.favorited = result.articles.
    // this.favoritesCount = result.articles
    // this.listArticles.forEach(element => {
    //   // this.favoritesCount = element.favoritesCount;
    //   // this.article = element;
    //   // console.log(element.favorited);
    // });
    this.numPage = Math.ceil(result.articlesCount / this.limit);
    this.numPage = Array(this.numPage).fill(0).map((x, i) => i);
  }

  clickPage(index: number) {
    this.numClicked = index;
    this.getListArticles(index * this.limit);
  }

  onFavorite(favorited: boolean, article: Article) {
    article.favorited = favorited;
    if (favorited) {
      article.favoritesCount++;
    } else {
      article.favoritesCount--;
    }
  }

}
