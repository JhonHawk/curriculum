import { Component, Inject, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { ThemingService } from './core/services/theming/theming.service';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cv-jmmo';
  themingSubscription: Subscription;
  @HostBinding('class') public cssClass: string;
  
  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    private themingService: ThemingService,
    @Inject(DOCUMENT) private document: any,
    private overlayContainer: OverlayContainer,
  ){
    this.loadLang();
    translate.onLangChange
      .pipe(
        map(x => x.lang)
      )
      .subscribe(lang => this.document.documentElement.lang = lang);
  }

  ngOnInit(){
    this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
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

   /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}
