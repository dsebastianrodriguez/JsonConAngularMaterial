import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isExpanded = false;

  progressbar = false;
  // tslint:disable-next-line: typedef
  loadData() {
    this.progressbar = true;
    setTimeout(() => {
      this.progressbar = false;
    }, 920);
  }
  title = 'jsonAngularMaterial';
}
