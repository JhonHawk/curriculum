import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemingService } from '../../services/theming/theming.service';

enum DarkTheme {
  true = 'dark-theme',
  false = 'light-theme'
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  darkTheme: boolean = false;
  iconsSrc = '/assets/language/';
  defaultLang = 'es';
  selectedLang;
  languages = [{
    name: 'es',
    title: 'Español',
    imgSrc: 'MX.ico'
  }, {
    name: 'en',
    title: 'English',
    imgSrc: 'US.ico'
  }, {
    name: 'pt',
    title: 'Portugues',
    imgSrc: 'BR.ico'
  }];
  themes: string[];

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    private theming: ThemingService
  ) { }

  ngOnInit(): void {
    this.loadLang();
    this.themes = this.theming.themes;
  }

  downloadPdf(){
    console.log('descargar pdf')
    let link = document.createElement("a");
    link.download = "cv_juan_manuel_martinez.pdf";
    link.href = "/assets/file/cv.pdf";
    link.click()
  }

  handleSelect(lang: any) {
    this.selectedLang = lang;
    this.translate.use(lang.name);
    this.cookieService.set('lang', lang.name);
  }

  selectionOptions() {
    return this.languages.filter(lang => lang.name !== this.selectedLang.name);
  }

  loadLang() {
    const currentLang = this.translate.currentLang;
    this.selectedLang = this.languages.find(lang => lang.name === currentLang);
  }

  darkThemeToggle(){
    this.darkTheme = !this.darkTheme;
    this.changeTheme();
  }

  changeTheme() {
    (this.darkTheme) ? this.theming.theme.next(DarkTheme.true) : this.theming.theme.next(DarkTheme.false)
  }

}
