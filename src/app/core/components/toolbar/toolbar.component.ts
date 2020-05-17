import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(
    private translate: TranslateService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loadLang();
  }

  downloadPdf(){
    console.log('se descargo el pdf')
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
    console.log('current', currentLang)
    this.selectedLang = this.languages.find(lang => lang.name === currentLang);
  }


}
