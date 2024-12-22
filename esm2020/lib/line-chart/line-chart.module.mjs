import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineSeriesComponent } from './line-series.component';
import * as i0 from "@angular/core";
export class LineChartModule {
}
LineChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LineChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LineChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: LineChartModule, declarations: [LineComponent, LineChartComponent, LineSeriesComponent], imports: [ChartCommonModule], exports: [LineComponent, LineChartComponent, LineSeriesComponent] });
LineChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LineChartModule, imports: [ChartCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LineChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [LineComponent, LineChartComponent, LineSeriesComponent],
                    exports: [LineComponent, LineChartComponent, LineSeriesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQU85RCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUhYLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsYUFEM0QsaUJBQWlCLGFBRWpCLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUI7NkdBRXJELGVBQWUsWUFKaEIsaUJBQWlCOzJGQUloQixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM1QixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3RFLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMaW5lQ29tcG9uZW50IH0gZnJvbSAnLi9saW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5lQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2xpbmUtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2xpbmUtc2VyaWVzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0xpbmVDb21wb25lbnQsIExpbmVDaGFydENvbXBvbmVudCwgTGluZVNlcmllc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtMaW5lQ29tcG9uZW50LCBMaW5lQ2hhcnRDb21wb25lbnQsIExpbmVTZXJpZXNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIExpbmVDaGFydE1vZHVsZSB7fVxuIl19