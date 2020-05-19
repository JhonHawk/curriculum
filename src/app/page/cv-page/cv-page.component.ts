import { Component, OnInit } from '@angular/core';
import { ThemingService } from 'src/app/core/services/theming/theming.service';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.scss']
})
export class CvPageComponent implements OnInit {
  theming: boolean;
  constructor(
    private themingService : ThemingService
  ) { }

  ngOnInit(): void {
    this.themingService.theme.subscribe( theme => {
      (theme === 'dark-theme') ? this.theming = true : this.theming = false;
    })
  }

}
