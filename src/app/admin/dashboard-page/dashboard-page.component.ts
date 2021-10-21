import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/components/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private pSub: Subscription | undefined;

  constructor(
    private postsService: PostService
  ) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.pSub) this.pSub.unsubscribe();
  }

  removePost(id: any) {

  }
}
