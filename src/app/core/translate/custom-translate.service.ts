import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  constructor(private injector: Injector) { }

  getTranslation(lang: string): Observable<any> {
    const http = this.injector.get(HttpClient);
    return http.get(`./assets/i18n/${lang}.json`);
  }
}
