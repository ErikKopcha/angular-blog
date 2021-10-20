import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public form!: FormGroup;
  public submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required, Validators.minLength(6)
      ]),
      author: new FormControl('', [
        Validators.required, Validators.minLength(2)
      ]),
    })
  }

  public submit() {
    if (this.form.invalid) return;

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    };
  }
}
