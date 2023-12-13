import { Component } from '@angular/core';
import { LandingService } from '../landing.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private service: LandingService) {}

  bannerResult: any[] = [];
  trendingMovieResult: any[] = [];

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
  }

  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results; // Use 'results' instead of 'result'
    });
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
      // this.trendingMovieResult
    });
  }

  
}
