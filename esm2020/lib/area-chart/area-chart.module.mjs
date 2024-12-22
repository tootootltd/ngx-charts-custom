import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';
import * as i0 from "@angular/core";
export class AreaChartModule {
}
AreaChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AreaChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: AreaChartModule, declarations: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent], imports: [ChartCommonModule], exports: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent] });
AreaChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaChartModule, imports: [ChartCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ChartCommonModule],
                    declarations: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent],
                    exports: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9hcmVhLWNoYXJ0L2FyZWEtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBT2xFLE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBSFgsa0JBQWtCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1CLGFBRHJHLGlCQUFpQixhQUVqQixrQkFBa0IsRUFBRSw0QkFBNEIsRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUI7NkdBRS9GLGVBQWUsWUFKaEIsaUJBQWlCOzJGQUloQixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM1QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSw0QkFBNEIsRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUIsQ0FBQztvQkFDaEgsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1CLENBQUM7aUJBQzVHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFyZWFDaGFydENvbXBvbmVudCB9IGZyb20gJy4vYXJlYS1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJlYUNoYXJ0Tm9ybWFsaXplZENvbXBvbmVudCB9IGZyb20gJy4vYXJlYS1jaGFydC1ub3JtYWxpemVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcmVhQ2hhcnRTdGFja2VkQ29tcG9uZW50IH0gZnJvbSAnLi9hcmVhLWNoYXJ0LXN0YWNrZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFyZWFTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2FyZWEtc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQXJlYUNoYXJ0Q29tcG9uZW50LCBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50LCBBcmVhQ2hhcnRTdGFja2VkQ29tcG9uZW50LCBBcmVhU2VyaWVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FyZWFDaGFydENvbXBvbmVudCwgQXJlYUNoYXJ0Tm9ybWFsaXplZENvbXBvbmVudCwgQXJlYUNoYXJ0U3RhY2tlZENvbXBvbmVudCwgQXJlYVNlcmllc0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXJlYUNoYXJ0TW9kdWxlIHt9XG4iXX0=