import { HttpClient } from "@angular/common/http";
import { NONE_TYPE } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticatedUserService } from "src/app/services/authenticated-user/authenticated-user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  user!: any;
  constructor(
    private authentication: AuthenticatedUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authentication.getUser().subscribe((response) => {
      if (response.id) {
        this.user = response;
      }
    });
  }
  logOut() {
    this.authentication.logOut().subscribe((response) => {
      console.log(response);
      this.user = null;
      this.router.navigate([""]);
    });
  }
}
