import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './core/services/loading.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner.component';
import { NavbarComponent } from './shared/components/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoadingSpinnerComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
