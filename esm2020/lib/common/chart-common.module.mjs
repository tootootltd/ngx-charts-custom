import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './charts/chart.component';
import { BaseChartComponent } from './base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { CircleSeriesComponent } from './circle-series.component';
import { CircleComponent } from './circle.component';
import { GridPanelComponent } from './grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient.component';
import { AreaComponent } from './area.component';
import { CountUpDirective } from './count/count.directive';
import { TooltipArea } from './tooltip-area.component';
import { Timeline } from './timeline/timeline.component';
import { VisibilityObserver } from '../utils/visibility-observer';
import { LegendComponent } from './legend/legend.component';
import { LegendEntryComponent } from './legend/legend-entry.component';
import { ScaleLegendComponent } from './legend/scale-legend.component';
import { AdvancedLegendComponent } from './legend/advanced-legend.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipArea,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    Timeline,
    AdvancedLegendComponent
];
export class ChartCommonModule {
}
ChartCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ChartCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChartCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: ChartCommonModule, declarations: [AreaComponent,
        BaseChartComponent,
        CountUpDirective,
        TooltipArea,
        ChartComponent,
        LegendComponent,
        LegendEntryComponent,
        ScaleLegendComponent,
        CircleComponent,
        CircleSeriesComponent,
        GridPanelComponent,
        GridPanelSeriesComponent,
        SvgLinearGradientComponent,
        SvgRadialGradientComponent,
        Timeline,
        AdvancedLegendComponent, VisibilityObserver], imports: [CommonModule, AxesModule, TooltipModule], exports: [CommonModule, AxesModule, TooltipModule, AreaComponent,
        BaseChartComponent,
        CountUpDirective,
        TooltipArea,
        ChartComponent,
        LegendComponent,
        LegendEntryComponent,
        ScaleLegendComponent,
        CircleComponent,
        CircleSeriesComponent,
        GridPanelComponent,
        GridPanelSeriesComponent,
        SvgLinearGradientComponent,
        SvgRadialGradientComponent,
        Timeline,
        AdvancedLegendComponent, VisibilityObserver] });
ChartCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ChartCommonModule, imports: [CommonModule, AxesModule, TooltipModule, CommonModule, AxesModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ChartCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AxesModule, TooltipModule],
                    declarations: [...COMPONENTS, VisibilityObserver],
                    exports: [CommonModule, AxesModule, TooltipModule, ...COMPONENTS, VisibilityObserver]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBRTdFLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxjQUFjO0lBQ2QsZUFBZTtJQUNmLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsUUFBUTtJQUNSLHVCQUF1QjtDQUN4QixDQUFDO0FBT0YsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQXZCNUIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQix3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQixRQUFRO1FBQ1IsdUJBQXVCLEVBS08sa0JBQWtCLGFBRHRDLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxhQUV2QyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFyQmpELGFBQWE7UUFDYixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxjQUFjO1FBQ2QsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsUUFBUTtRQUNSLHVCQUF1QixFQU0yQyxrQkFBa0I7K0dBRXpFLGlCQUFpQixZQUpsQixZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFFdkMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhOzJGQUV0QyxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7b0JBQ2xELFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLGtCQUFrQixDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxHQUFHLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQztpQkFDdEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NoYXJ0cy9jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBeGVzTW9kdWxlIH0gZnJvbSAnLi9heGVzL2F4ZXMubW9kdWxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2lyY2xlU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9jaXJjbGUtc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaXJjbGVDb21wb25lbnQgfSBmcm9tICcuL2NpcmNsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZFBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUGFuZWxTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdmdMaW5lYXJHcmFkaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3ZnLWxpbmVhci1ncmFkaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ZnUmFkaWFsR3JhZGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N2Zy1yYWRpYWwtZ3JhZGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFyZWFDb21wb25lbnQgfSBmcm9tICcuL2FyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IENvdW50VXBEaXJlY3RpdmUgfSBmcm9tICcuL2NvdW50L2NvdW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sdGlwQXJlYSB9IGZyb20gJy4vdG9vbHRpcC1hcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lbGluZSB9IGZyb20gJy4vdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IFZpc2liaWxpdHlPYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL3Zpc2liaWxpdHktb2JzZXJ2ZXInO1xuaW1wb3J0IHsgTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMZWdlbmRFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4vbGVnZW5kL2xlZ2VuZC1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NhbGVMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xlZ2VuZC9zY2FsZS1sZWdlbmQuY29tcG9uZW50JztcbmltcG9ydCB7IEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIEFyZWFDb21wb25lbnQsXG4gIEJhc2VDaGFydENvbXBvbmVudCxcbiAgQ291bnRVcERpcmVjdGl2ZSxcbiAgVG9vbHRpcEFyZWEsXG4gIENoYXJ0Q29tcG9uZW50LFxuICBMZWdlbmRDb21wb25lbnQsXG4gIExlZ2VuZEVudHJ5Q29tcG9uZW50LFxuICBTY2FsZUxlZ2VuZENvbXBvbmVudCxcbiAgQ2lyY2xlQ29tcG9uZW50LFxuICBDaXJjbGVTZXJpZXNDb21wb25lbnQsXG4gIEdyaWRQYW5lbENvbXBvbmVudCxcbiAgR3JpZFBhbmVsU2VyaWVzQ29tcG9uZW50LFxuICBTdmdMaW5lYXJHcmFkaWVudENvbXBvbmVudCxcbiAgU3ZnUmFkaWFsR3JhZGllbnRDb21wb25lbnQsXG4gIFRpbWVsaW5lLFxuICBBZHZhbmNlZExlZ2VuZENvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXhlc01vZHVsZSwgVG9vbHRpcE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFMsIFZpc2liaWxpdHlPYnNlcnZlcl0sXG4gIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIEF4ZXNNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIC4uLkNPTVBPTkVOVFMsIFZpc2liaWxpdHlPYnNlcnZlcl1cbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRDb21tb25Nb2R1bGUge31cbiJdfQ==