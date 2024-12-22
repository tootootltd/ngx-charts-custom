import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
import * as i0 from "@angular/core";
export class HeatMapModule {
}
HeatMapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: HeatMapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HeatMapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: HeatMapModule, declarations: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent], imports: [ChartCommonModule], exports: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent] });
HeatMapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: HeatMapModule, imports: [ChartCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: HeatMapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent],
                    exports: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvaGVhdC1tYXAvaGVhdC1tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBT3hELE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBSFQsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLGFBRHBFLGlCQUFpQixhQUVqQixvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0I7MkdBRTlELGFBQWEsWUFKZCxpQkFBaUI7MkZBSWhCLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzVCLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDO29CQUMvRSxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDM0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWF0TWFwQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vaGVhdC1tYXAtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVhdENlbGxTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2hlYXQtbWFwLWNlbGwtc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWF0TWFwQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtIZWF0TWFwQ2VsbENvbXBvbmVudCwgSGVhdENlbGxTZXJpZXNDb21wb25lbnQsIEhlYXRNYXBDb21wb25lbnRdLFxuICBleHBvcnRzOiBbSGVhdE1hcENlbGxDb21wb25lbnQsIEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50LCBIZWF0TWFwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBIZWF0TWFwTW9kdWxlIHt9XG4iXX0=