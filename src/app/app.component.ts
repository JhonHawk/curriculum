import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cv-jmmo';

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: any
  ){
    this.loadLang();
    translate.onLangChange
      .pipe(
        map(x => x.lang)
      )
      .subscribe(lang => this.document.documentElement.lang = lang);
  }

  loadLang() {
    let lang = this.cookieService.get('lang');
    const userLang = navigator.language.split('-')[0] || 'es';

    if (!lang) {
      lang = userLang;
      this.cookieService.set('lang', lang);
    }

    this.translate.use(lang);
  }
}
