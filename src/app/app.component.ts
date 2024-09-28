import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { loadMessages, locale } from 'devextreme/localization';
import * as trMessages from 'devextreme/localization/messages/tr.json';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  isLoggedIn = false;
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = !!localStorage.getItem('userData');
      }
    });

    loadMessages(trMessages);
    locale('tr');
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  logout() {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Çıkış yapacaksınız.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, çıkış yap',
      cancelButtonText: 'Hayır, iptal et',
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      }
    });
  }
}
