import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import * as i0 from "@angular/core";
export class GaugeModule {
}
GaugeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GaugeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GaugeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: GaugeModule, declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent], imports: [ChartCommonModule, PieChartModule, BarChartModule], exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent] });
GaugeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GaugeModule, imports: [ChartCommonModule, PieChartModule, BarChartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GaugeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule, PieChartModule, BarChartModule],
                    declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent],
                    exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvZ2F1Z2UvZ2F1Z2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBTy9ELE1BQU0sT0FBTyxXQUFXOzt3R0FBWCxXQUFXO3lHQUFYLFdBQVcsaUJBSFAsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixhQURoRixpQkFBaUIsRUFBRSxjQUFjLEVBQUUsY0FBYyxhQUVqRCxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCO3lHQUUxRSxXQUFXLFlBSlosaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGNBQWM7MkZBSWhELFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztvQkFDNUQsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO29CQUMzRixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUM7aUJBQ3ZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgTGluZWFyR2F1Z2VDb21wb25lbnQgfSBmcm9tICcuL2xpbmVhci1nYXVnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2F1Z2VDb21wb25lbnQgfSBmcm9tICcuL2dhdWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYXVnZUFyY0NvbXBvbmVudCB9IGZyb20gJy4vZ2F1Z2UtYXJjLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYXVnZUF4aXNDb21wb25lbnQgfSBmcm9tICcuL2dhdWdlLWF4aXMuY29tcG9uZW50JztcbmltcG9ydCB7IFBpZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi4vcGllLWNoYXJ0L3BpZS1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgQmFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9iYXItY2hhcnQvYmFyLWNoYXJ0Lm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZSwgUGllQ2hhcnRNb2R1bGUsIEJhckNoYXJ0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTGluZWFyR2F1Z2VDb21wb25lbnQsIEdhdWdlQ29tcG9uZW50LCBHYXVnZUFyY0NvbXBvbmVudCwgR2F1Z2VBeGlzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0xpbmVhckdhdWdlQ29tcG9uZW50LCBHYXVnZUNvbXBvbmVudCwgR2F1Z2VBcmNDb21wb25lbnQsIEdhdWdlQXhpc0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgR2F1Z2VNb2R1bGUge31cbiJdfQ==