import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../admin/shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
