import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todayStats: {
    date_of_interest: Date,
    case_count: Number,
    probable_case_count: Number,
    hospitalized_count: Number,
    death_count: Number,
    death_count_probable: Number,
    case_count_7day_avg: Number,
    all_case_count_7day_avg: Number,
    hosp_count_7day_avg: Number,
    death_count_7day_avg: Number,
    all_death_count_7day_avg: Number
  };

  loadingData: Boolean;

   constructor() {
     this.loadingData = false;

     let dateObj = new Date();
     let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); //months from 1-12
     let day = dateObj.getUTCDate().toString().padStart(2, '0');
     let year = dateObj.getUTCFullYear();
     let date = year + "-" + month + "-" + day + "T00:00:00.000";
     console.log("Date: " + date);

     this.todayStats = {
      date_of_interest: new Date(date),
      case_count: 0,
      probable_case_count: 0,
      hospitalized_count: 0,
      death_count: 0,
      death_count_probable: 0,
      case_count_7day_avg: 0,
      all_case_count_7day_avg: 0,
      hosp_count_7day_avg: 0,
      death_count_7day_avg: 0,
      all_death_count_7day_avg: 0
     };
   }

  ngOnInit(): void {
    
  }

  onNext(): void {
    let oldDate = this.todayStats.date_of_interest;
    let newDate = new Date();
    newDate.setDate(oldDate.getDate() + 1);
    newDate.setHours(0, 0, 0, 0);
    this.todayStats.date_of_interest = newDate;
    this.loadingData = true;

    let dateObj = new Date(newDate);
    let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); //months from 1-12
    let day = dateObj.getUTCDate().toString().padStart(2, '0');
    let year = dateObj.getUTCFullYear();
    let date = year + "-" + month + "-" + day + "T00:00:00.000";
    console.log("Date: " + date);

    fetch('/api/ny-health-data?date=' + date)
      .then(response => response.json())
      .then(data => {
        data.date_of_interest = null;
        this.todayStats = data;
        this.todayStats.date_of_interest = newDate;
        this.loadingData = false;
      })
      .catch((error) => {
        console.error('Error:', error);
        this.loadingData = false;
      });
  }
  
  onPrev(): void {
    let oldDate = this.todayStats.date_of_interest;
    let newDate = new Date();
    newDate.setDate(oldDate.getDate() - 1);
    newDate.setHours(0, 0, 0, 0);
    this.todayStats.date_of_interest = newDate;
    this.loadingData = true;

    let dateObj = new Date(newDate);
    let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); //months from 1-12
    let day = dateObj.getUTCDate().toString().padStart(2, '0');
    let year = dateObj.getUTCFullYear();
    let date = year + "-" + month + "-" + day + "T00:00:00.000";
    console.log("Date: " + date);

    fetch('/api/ny-health-data?date=' + date)
      .then(response => response.json())
      .then(data => { 
        data.date_of_interest = null;
        this.todayStats = data;
        this.todayStats.date_of_interest = newDate;
        this.loadingData = false;
      })
      .catch((error) => {
        console.error('Error:', error);
        this.loadingData = false;
      });

  }

}
