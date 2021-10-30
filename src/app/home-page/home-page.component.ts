import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/components/post.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public posts$!: Observable<Post[]>;

  constructor(
    private postSerivce: PostService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postSerivce.getAll();
  }
}
