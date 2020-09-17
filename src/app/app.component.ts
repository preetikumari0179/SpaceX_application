import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spacex-application-app';
  version = 'Angular version 10.0.14';

  dataList: any;

  currentSucc = '';
  current = 1;
  features = [
    2006, 2007,2008,2009, 2010,2011,2012,2013,2014
  ];

  link = 'https://api.spacexdata.com/v3/launches?limit=100';


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getListing(this.link);
  }

  getListing(link) {
    this.http.get(link).subscribe(a => {
      this.dataList = a
    })
  }

  changeItem(item: any) {

    this.current = item;
  
    if(this.link.indexOf('launch_year') <= -1) {
      this.link = this.link+'&launch_year='+item
    } else {
      this.link = this.link.split('&').map(a => {
        const l = a.split('=');
        if(l[0] === 'launch_year') {
          l[1] = item;
        }
        return l.join('=');
      }).join('&');
    }

    this.getListing(this.link);
  }

  changeSuccess(item: any) {

    this.currentSucc = item;

    if(this.link.indexOf('launch_success') <= -1) {
      this.link = this.link+'&launch_success='+item
    } else {
      this.link = this.link.split('&').map(a => {
        const l = a.split('=');
        if(l[0] === 'launch_success') {
          l[1] = item;
        }
        return l.join('=');
      }).join('&');
    }

    this.getListing(this.link);
  }
}
