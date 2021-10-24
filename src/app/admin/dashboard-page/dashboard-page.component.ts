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
  public searchStr: string = '';
  private pSub: Subscription | undefined;
  private dSub: Subscription | undefined;

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
    if (this.dSub) this.dSub.unsubscribe();
  }

  removePost(id: any) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    })
  }
}
