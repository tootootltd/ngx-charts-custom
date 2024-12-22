import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { LineChartModule } from '../line-chart/line-chart.module';
import * as i0 from "@angular/core";
export class PolarChartModule {
}
PolarChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PolarChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PolarChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: PolarChartModule, declarations: [PolarChartComponent, PolarSeriesComponent], imports: [ChartCommonModule, PieChartModule, LineChartModule], exports: [PolarChartComponent, PolarSeriesComponent] });
PolarChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PolarChartModule, imports: [ChartCommonModule, PieChartModule, LineChartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PolarChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule, PieChartModule, LineChartModule],
                    declarations: [PolarChartComponent, PolarSeriesComponent],
                    exports: [PolarChartComponent, PolarSeriesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFPbEUsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQUhaLG1CQUFtQixFQUFFLG9CQUFvQixhQUQ5QyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxhQUVsRCxtQkFBbUIsRUFBRSxvQkFBb0I7OEdBRXhDLGdCQUFnQixZQUpqQixpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZTsyRkFJakQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7b0JBQzdELFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztpQkFDckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQb2xhckNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9wb2xhci1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9sYXJTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL3BvbGFyLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBMaW5lQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlLCBQaWVDaGFydE1vZHVsZSwgTGluZUNoYXJ0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUG9sYXJDaGFydENvbXBvbmVudCwgUG9sYXJTZXJpZXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUG9sYXJDaGFydENvbXBvbmVudCwgUG9sYXJTZXJpZXNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFBvbGFyQ2hhcnRNb2R1bGUge31cbiJdfQ==