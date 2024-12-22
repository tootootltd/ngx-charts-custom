import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TreeMapCellComponent } from './tree-map-cell.component';
import { TreeMapCellSeriesComponent } from './tree-map-cell-series.component';
import { TreeMapComponent } from './tree-map.component';
import * as i0 from "@angular/core";
export class TreeMapModule {
}
TreeMapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TreeMapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TreeMapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: TreeMapModule, declarations: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent], imports: [ChartCommonModule], exports: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent] });
TreeMapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TreeMapModule, imports: [ChartCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TreeMapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent],
                    exports: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvdHJlZS1tYXAvdHJlZS1tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBT3hELE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBSFQsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCLGFBRHZFLGlCQUFpQixhQUVqQixvQkFBb0IsRUFBRSwwQkFBMEIsRUFBRSxnQkFBZ0I7MkdBRWpFLGFBQWEsWUFKZCxpQkFBaUI7MkZBSWhCLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzVCLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDO29CQUNsRixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDOUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmVlTWFwQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1tYXAtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU1hcENlbGxTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbWFwLWNlbGwtc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTWFwQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW1hcC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUcmVlTWFwQ2VsbENvbXBvbmVudCwgVHJlZU1hcENlbGxTZXJpZXNDb21wb25lbnQsIFRyZWVNYXBDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVHJlZU1hcENlbGxDb21wb25lbnQsIFRyZWVNYXBDZWxsU2VyaWVzQ29tcG9uZW50LCBUcmVlTWFwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTWFwTW9kdWxlIHt9XG4iXX0=