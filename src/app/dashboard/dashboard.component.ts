import { Component, OnInit } from "@angular/core";

@Component({
  selector: "garden-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  situation: boolean;

  constructor() {}

  ngOnInit() {}

  onChange() {
    console.log("aaaaaaaaaaaa" + this.situation);
  }
}
