import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/components/post.service";
import {switchMap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  private uSub!: Subscription;
  private post!: Post;
  public form!: FormGroup;
  public submited: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postServise: PostService,
    private alert: AlertService
  ) { }

  ngOnDestroy(): void {
    this.uSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postServise.getById(params['id']);
      }))
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      });
  }

  public submit() {
    if (this.form.invalid) return;

    this.submited = true;

    this.uSub = this.postServise.update({
      id: this.post.id,
      text: this.form.value.text,
      title: this.form.value.title,
      author: this.post.author,
      date: new Date()
    }).subscribe(() => {
      this.submited = false;
      this.alert.warning('Post updated!');
    });
  }
}
