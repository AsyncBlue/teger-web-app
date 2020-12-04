import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as Highcharts from "highcharts";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import HighchartsExporting from "highcharts/modules/exporting";
import { Usuario, Tejido, Evento } from '../../interfaces/interfaces';
import { TejidoService } from '../../services/tejido.service';
import { element } from 'protractor';

HighchartsNetworkgraph(Highcharts);
HighchartsExporting(Highcharts);


@Component({
  selector: 'app-networkgraph',
  templateUrl: './networkgraph.component.html',
  styleUrls: ['./networkgraph.component.css']
})
export class NetworkgraphComponent implements OnInit, OnDestroy {

  @Input() evento: Evento = {};
  @Input() tejido: Tejido = {};
  @Input() activo: boolean;

  destruido: boolean = false;

  graficoFinal = [];

  almacenaNodo: {nodo: string, votos: number}[] = [];

  /* ranking: {nodo: string, votos: number}[] = []; */
  nodoGanador = '';


  title = "app";
  chart;
  updateFlag = false;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions = {
    chart: {
      type: "networkgraph",
      marginTop: 80,
      spacingRight: 290,
    },
    exporting: {
      enabled: true,
      allowHTML: true,
      chartOptions: {
        // specific options for the exported image
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
      fallbackToExportServer: true,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          integration: "verlet",
          linkLength: 100,
        },
      },
    },
    navigation: {
      buttonOptions: {
        /*    verticalAlign: 'bottom',
          horizontalAlign: 'bottom',
          x: -270,
          y: 500, */
        x: -270,
        enabled: true,
      },
    },
    series: [
      {
        id: "language-tree",
        marker: {
          radius: 13,
        },
        dataLabels: {
          enabled: true,
          textPath: {
            enabled: true,
          },
          linkFormat: "",
          allowOverlap: true,
        },/* 
         nodes: [
          {
            id: this.nodoGanador,
            dataLabels: {
              enabled: true,
            },
            marker: {
              radius: 1,
              fillColor: "white",
            },
          },
        ], */
        data: [],
        color: "#E400FF",
      },
    ],
  };

  constructor( private tejidoService: TejidoService ) { 

    const self = this;

    this.chartCallback = (chart) => {
      // saving chart reference
      self.chart = chart;
    };
 
  }

  ngOnInit(): void {

    this.destruido = false;

    this.tejidoService.verTejido(this.evento._id).subscribe(resp => {

      this.graficoFinal = resp.tejido.votos;

      /* ///
      this.graficoFinal.forEach(element => {
        let z = { nodo: element.to, votos: 0 };
            this.almacenaNodo.push(z);  
      });




      this.graficoFinal.forEach(element => {
        this.almacenaNodo.forEach(result =>{
          if (element.to === result.nodo){
            result.votos += 1;
          }
        });
      });

      let guardaNodo = 0;
      this.almacenaNodo.forEach( element => {
        if ( guardaNodo < element.votos){
          this.nodoGanador = element.nodo;
          guardaNodo = element.votos;
          
        }
      });

      console.log(this.nodoGanador);
      
      ///   */

    });

    

   

      setInterval( () => {

        if ( this.activo === true && this.destruido === false) {

            this.tejidoService.verTejido(this.evento._id).subscribe(resp => {

              this.graficoFinal = resp.tejido.votos;

            });
      
            this.updateChart();

        }
  
  
      }, 5000);
    
   


  }

  updateChart() {
    const self = this,
      chart = this.chart;

    chart.showLoading();
    setTimeout(() => {
      chart.hideLoading();

      self.chartOptions.series = [
        {
          id: "language-tree",
          marker: {
            radius: 15,
          },
          dataLabels: {
            enabled: true,
            textPath: {
              enabled: true,
            },
            linkFormat: "",
            allowOverlap: true,
          },/* 
           nodes: [
            {
              id: this.nodoGanador,
              dataLabels: {
                enabled: true,
              },
              marker: {
                radius: 25,
                fillColor: "#00A2FF",
              },
            },
          ], */
          data: this.graficoFinal,
          color: "#7C00FF",
        },
      ];

      self.chartOptions.plotOptions = {
        networkgraph: {
          keys: ["from", "to"],
          layoutAlgorithm: {
            enableSimulation: true,
            integration: "verlet",
            linkLength: 100,
          },
        },
      };

      self.chartOptions.exporting = {
        enabled: true,
        allowHTML: true,
        chartOptions: {
          // specific options for the exported image
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
              },
            },
          },
        },
        fallbackToExportServer: true,
      };

      self.updateFlag = true;
    }, 400);
  }


  ngOnDestroy(): void {

    this.destruido = !this.destruido;

  }

  

} 
