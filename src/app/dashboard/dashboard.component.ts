import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  requestedYear: String;
  requestedMonth: String;
  requestedDay: String;

  constructor(private route: ActivatedRoute) {
     this.loadingData = false;
     let dateObj = new Date();
     let month = parseInt( (dateObj.getUTCMonth() + 1).toString().padStart(2, '0') );
     let day = parseInt( (dateObj.getUTCDate().toString().padStart(2, '0')) );
     let year = dateObj.getUTCFullYear();

     this.requestedYear = year.toString();
     this.requestedMonth = month.toString().padStart(2, '0');
     this.requestedDay = day.toString().padStart(2, '0');

     let date = this.requestedYear + "-" + this.requestedMonth + "-" + this.requestedDay + "T00:00:00.000";
     console.log("Constructor Date: " + date);

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

   ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        let changes = false;
        console.log(params); // { orderby: "price" } 

        if(params['year']) {
          this.requestedYear = params['year'];
          changes = true;
        }

        if(params['month']) {
          this.requestedMonth = params['month'].padStart(2, '0');
          changes = true;
        }

        if(params['day']) {
          this.requestedDay = params['day'].padStart(2, '0');
          changes = true;
        }

        if(changes) {
          let date = this.requestedYear + "-" + this.requestedMonth + "-" + this.requestedDay + "T00:00:00.000";
          console.log("Init Date: " + date);

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

          this.fetchData();
        }
      }
    );
  }

  onGo(requestedYear: String, requestedMonth: String, requestedDay: String ): void {
    window.location.href='/?' + "year=" + requestedYear + "&month=" + requestedMonth + "&day=" + requestedDay;
  }


  fetchData(): void {
    let date = this.requestedYear + "-" + this.requestedMonth + "-" + this.requestedDay + "T00:00:00.000";

    let newDate = new Date(date);
    this.loadingData = true;

    this.todayStats.date_of_interest = newDate;
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
