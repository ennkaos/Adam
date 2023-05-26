import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-btn-sticky-back',
  templateUrl: './btn-sticky-back.component.html',
  styleUrls: ['./btn-sticky-back.component.css'],
})
export class BtnStickyBackComponent {
  route!: string | undefined;
  userId: string;
  constructor(private snapshot: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route = this.snapshot.parent?.snapshot.routeConfig?.path;
  }

  back() {
    this.snapshot.url.subscribe((e) => (this.userId = e[0].path));
    if (this.userId === localStorage.getItem('id')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate([this.route]);
    }
  }
}
