import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem } from '../bars.service';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';
import {Day} from './dropdown';


declare const Highcharts: any;
declare const Highcharts2: any;
@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  day: string;
  barName:string;

  barDetails: Bar;
  menu: BarMenuItem[];

  dayOptions:SelectItem[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        }
      );

      barService.getBarPageQuery1(this.barName).subscribe(
        data => {
          console.log(data);
          const names = [];
          const quantity = [];

          data.forEach(Name=> {
            quantity.push(Name.finalQ);
            names.push(Name.DrinkerName);
          });

          this.renderChart(quantity, names);
        }
      );





      this.dayOptions=[
        {
          'label':'Monday',
          'value':'Monday'
        },
        {
          'label':'Tuesday',
          'value':'Tuesday'
        },
        {
          'label':'Wednesday',
          'value':'Wednesday'
        },
        {
          'label':'Thursday',
          'value':'Thursday'
        },
        {
          'label':'Friday',
          'value':'Friday'
        },
        {
          'label':'Saturday',
          'value':'Saturday'
        },
        {
          'label':'Sunday',
          'value':'Sunday'
        },
      ]

    });
  }

  ngOnInit() {
  }

  doSecondQuery(selectedOption:string){
    this.day=selectedOption;
    console.log(this.day);
    this.barService.getBarPageQuery2(this.barName,this.day).subscribe( data => {
      console.log(data);
      const names = [];
      const quantity = [];

      data.forEach(Name=> {
        quantity.push(Name.finalQ);
        names.push(Name.name);
      });

      this.renderChart2(quantity, names);
    })

    }




  renderChart(quantity: number[], name: string[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Spenders in this bar'
      },
      xAxis: {
        categories: name,
        title: {
          text: 'names of spenders'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount spent'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: quantity
      }]
    });
  }

  renderChart2(quantity: number[], name: string[]) {
    Highcharts.chart('bargraph2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top 10 Beer Brands'
      },
      xAxis: {
        categories: name,
        title: {
          text: 'names of spenders'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount bought'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: quantity
      }]
    });
  }

}
