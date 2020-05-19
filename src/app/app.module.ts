import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import localeEs from '@angular/common/locales/es-MX';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { CustomTranslateService } from './core/translate/custom-translate.service';
import { registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { CvPageComponent } from './page/cv-page/cv-page.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CvPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateService
      }
    }),
    MatCardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localeEs, 'es');
    registerLocaleData(localePt, 'pt');
  }
}
