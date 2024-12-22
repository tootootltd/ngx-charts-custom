import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { BarChartModule } from './bar-chart/bar-chart.module';
import { BoxChartModule } from './box-chart/box-chart.module';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { HeatMapModule } from './heat-map/heat-map.module';
import { LineChartModule } from './line-chart/line-chart.module';
import { PolarChartModule } from './polar-chart/polar-chart.module';
import { NumberCardModule } from './number-card/number-card.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
import { TreeMapModule } from './tree-map/tree-map.module';
import { GaugeModule } from './gauge/gauge.module';
import { ngxChartsPolyfills } from './polyfills';
import * as i0 from "@angular/core";
export class NgxChartsModule {
    constructor() {
        ngxChartsPolyfills();
    }
}
NgxChartsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: NgxChartsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxChartsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: NgxChartsModule, exports: [ChartCommonModule,
        AreaChartModule,
        BarChartModule,
        BoxChartModule,
        BubbleChartModule,
        HeatMapModule,
        LineChartModule,
        PolarChartModule,
        NumberCardModule,
        PieChartModule,
        TreeMapModule,
        GaugeModule] });
NgxChartsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: NgxChartsModule, imports: [ChartCommonModule,
        AreaChartModule,
        BarChartModule,
        BoxChartModule,
        BubbleChartModule,
        HeatMapModule,
        LineChartModule,
        PolarChartModule,
        NumberCardModule,
        PieChartModule,
        TreeMapModule,
        GaugeModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: NgxChartsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        ChartCommonModule,
                        AreaChartModule,
                        BarChartModule,
                        BoxChartModule,
                        BubbleChartModule,
                        HeatMapModule,
                        LineChartModule,
                        PolarChartModule,
                        NumberCardModule,
                        PieChartModule,
                        TreeMapModule,
                        GaugeModule
                    ]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9uZ3gtY2hhcnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQWtCakQsTUFBTSxPQUFPLGVBQWU7SUFDMUI7UUFDRSxrQkFBa0IsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OzRHQUhVLGVBQWU7NkdBQWYsZUFBZSxZQWR4QixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGNBQWM7UUFDZCxjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGFBQWE7UUFDYixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsYUFBYTtRQUNiLFdBQVc7NkdBR0YsZUFBZSxZQWR4QixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGNBQWM7UUFDZCxjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGFBQWE7UUFDYixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsYUFBYTtRQUNiLFdBQVc7MkZBR0YsZUFBZTtrQkFoQjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixXQUFXO3FCQUNaO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBBcmVhQ2hhcnRNb2R1bGUgfSBmcm9tICcuL2FyZWEtY2hhcnQvYXJlYS1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgQmFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IEJveENoYXJ0TW9kdWxlIH0gZnJvbSAnLi9ib3gtY2hhcnQvYm94LWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBCdWJibGVDaGFydE1vZHVsZSB9IGZyb20gJy4vYnViYmxlLWNoYXJ0L2J1YmJsZS1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgSGVhdE1hcE1vZHVsZSB9IGZyb20gJy4vaGVhdC1tYXAvaGVhdC1tYXAubW9kdWxlJztcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4vbGluZS1jaGFydC9saW5lLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBQb2xhckNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9wb2xhci1jaGFydC9wb2xhci1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgTnVtYmVyQ2FyZE1vZHVsZSB9IGZyb20gJy4vbnVtYmVyLWNhcmQvbnVtYmVyLWNhcmQubW9kdWxlJztcbmltcG9ydCB7IFBpZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBUcmVlTWFwTW9kdWxlIH0gZnJvbSAnLi90cmVlLW1hcC90cmVlLW1hcC5tb2R1bGUnO1xuaW1wb3J0IHsgR2F1Z2VNb2R1bGUgfSBmcm9tICcuL2dhdWdlL2dhdWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBuZ3hDaGFydHNQb2x5ZmlsbHMgfSBmcm9tICcuL3BvbHlmaWxscyc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICBDaGFydENvbW1vbk1vZHVsZSxcbiAgICBBcmVhQ2hhcnRNb2R1bGUsXG4gICAgQmFyQ2hhcnRNb2R1bGUsXG4gICAgQm94Q2hhcnRNb2R1bGUsXG4gICAgQnViYmxlQ2hhcnRNb2R1bGUsXG4gICAgSGVhdE1hcE1vZHVsZSxcbiAgICBMaW5lQ2hhcnRNb2R1bGUsXG4gICAgUG9sYXJDaGFydE1vZHVsZSxcbiAgICBOdW1iZXJDYXJkTW9kdWxlLFxuICAgIFBpZUNoYXJ0TW9kdWxlLFxuICAgIFRyZWVNYXBNb2R1bGUsXG4gICAgR2F1Z2VNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDaGFydHNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBuZ3hDaGFydHNQb2x5ZmlsbHMoKTtcbiAgfVxufVxuIl19