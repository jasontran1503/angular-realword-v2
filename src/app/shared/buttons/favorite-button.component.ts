import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ResultSingleArticle } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() favorited: boolean;
  @Input() favoritesCount: number;
  @Input() slug: string;
  @Output() toggleFavorite = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
  }

  favoriteArticle() {
    if (this.favorited == false) {
      this.sharedService.favoriteArticle(this.slug).subscribe((result: ResultSingleArticle) => {
        console.log(this.slug);
        this.favoritesCount = result.article.favoritesCount;
        this.toggleFavorite.emit(true);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    } else {
      this.sharedService.unfavoriteArticle(this.slug).subscribe((result: ResultSingleArticle) => {
        console.log(this.slug);
        this.favoritesCount = result.article.favoritesCount;
        this.toggleFavorite.emit(false);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    }
  }

}
