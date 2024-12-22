import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { TooltipService } from '../tooltip/tooltip.service';
import { LegendType, LegendPosition } from '../types/legend.model';
import { ScaleType } from '../types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../legend/legend.component";
import * as i3 from "../legend/scale-legend.component";
export class ChartComponent {
    constructor() {
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        this.LegendPosition = LegendPosition;
        this.LegendType = LegendType;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === LegendPosition.Right) {
                if (this.legendType === LegendType.ScaleLegend) {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        const chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === LegendPosition.Right
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    }
    getLegendType() {
        return this.legendOptions.scaleType === ScaleType.Linear ? LegendType.ScaleLegend : LegendType.Legend;
    }
}
ChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ChartComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: ChartComponent, selector: "ngx-charts-chart", inputs: { view: "view", showLegend: "showLegend", legendOptions: "legendOptions", legendType: "legendType", activeEntries: "activeEntries", animations: "animations" }, outputs: { legendLabelClick: "legendLabelClick", legendLabelActivate: "legendLabelActivate", legendLabelDeactivate: "legendLabelDeactivate" }, providers: [TooltipService], usesOnChanges: true, ngImport: i0, template: `
    <div class="ngx-charts-outer" [style.width.px]="view[0]">
      <svg class="ngx-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === LegendType.ScaleLegend"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === LegendType.Legend"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </ngx-charts-legend>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.LegendComponent, selector: "ngx-charts-legend", inputs: ["data", "title", "colors", "height", "width", "activeEntries", "horizontal"], outputs: ["labelClick", "labelActivate", "labelDeactivate"] }, { kind: "component", type: i3.ScaleLegendComponent, selector: "ngx-charts-scale-legend", inputs: ["valueRange", "colors", "height", "width", "horizontal"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ChartComponent, decorators: [{
            type: Component,
            args: [{
                    providers: [TooltipService],
                    selector: 'ngx-charts-chart',
                    template: `
    <div class="ngx-charts-outer" [style.width.px]="view[0]">
      <svg class="ngx-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === LegendType.ScaleLegend"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === LegendType.Legend"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </ngx-charts-legend>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { view: [{
                type: Input
            }], showLegend: [{
                type: Input
            }], legendOptions: [{
                type: Input
            }], legendType: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], animations: [{
                type: Input
            }], legendLabelClick: [{
                type: Output
            }], legendLabelActivate: [{
                type: Output
            }], legendLabelDeactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBaUIsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7QUF1Q3JELE1BQU0sT0FBTyxjQUFjO0lBckMzQjtRQXVDVyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBSTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM5Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUMzRCwwQkFBcUIsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQU05RCxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxlQUFVLEdBQUcsVUFBVSxDQUFDO0tBZ0NsQztJQTlCQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUMvRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLFdBQVcsRUFBRTtvQkFDOUMsYUFBYSxHQUFHLENBQUMsQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsYUFBYSxHQUFHLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtTQUNGO1FBRUQsTUFBTSxZQUFZLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQztRQUV4QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXO1lBQ2QsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxLQUFLO2dCQUN6RSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QixDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUN4RyxDQUFDOzsyR0FoRFUsY0FBYzsrRkFBZCxjQUFjLGtXQXBDZCxDQUFDLGNBQWMsQ0FBQywrQ0FFakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQ7MkZBR1UsY0FBYztrQkFyQzFCLFNBQVM7bUJBQUM7b0JBQ1QsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUMzQixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLG1CQUFtQjtzQkFBNUIsTUFBTTtnQkFDRyxxQkFBcUI7c0JBQTlCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbHRpcC90b29sdGlwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGVnZW5kT3B0aW9ucywgTGVnZW5kVHlwZSwgTGVnZW5kUG9zaXRpb24gfSBmcm9tICcuLi90eXBlcy9sZWdlbmQubW9kZWwnO1xuaW1wb3J0IHsgU2NhbGVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHByb3ZpZGVyczogW1Rvb2x0aXBTZXJ2aWNlXSxcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWNoYXJ0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWNoYXJ0cy1vdXRlclwiIFtzdHlsZS53aWR0aC5weF09XCJ2aWV3WzBdXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwibmd4LWNoYXJ0c1wiIFthdHRyLndpZHRoXT1cImNoYXJ0V2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwidmlld1sxXVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxuZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZFxuICAgICAgICAqbmdJZj1cInNob3dMZWdlbmQgJiYgbGVnZW5kVHlwZSA9PT0gTGVnZW5kVHlwZS5TY2FsZUxlZ2VuZFwiXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSBMZWdlbmRQb3NpdGlvbi5CZWxvd1wiXG4gICAgICAgIFt2YWx1ZVJhbmdlXT1cImxlZ2VuZE9wdGlvbnMuZG9tYWluXCJcbiAgICAgICAgW2NvbG9yc109XCJsZWdlbmRPcHRpb25zLmNvbG9yc1wiXG4gICAgICAgIFtoZWlnaHRdPVwidmlld1sxXVwiXG4gICAgICAgIFt3aWR0aF09XCJsZWdlbmRXaWR0aFwiXG4gICAgICA+XG4gICAgICA8L25neC1jaGFydHMtc2NhbGUtbGVnZW5kPlxuICAgICAgPG5neC1jaGFydHMtbGVnZW5kXG4gICAgICAgICpuZ0lmPVwic2hvd0xlZ2VuZCAmJiBsZWdlbmRUeXBlID09PSBMZWdlbmRUeXBlLkxlZ2VuZFwiXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSBMZWdlbmRQb3NpdGlvbi5CZWxvd1wiXG4gICAgICAgIFtkYXRhXT1cImxlZ2VuZE9wdGlvbnMuZG9tYWluXCJcbiAgICAgICAgW3RpdGxlXT1cImxlZ2VuZE9wdGlvbnMudGl0bGVcIlxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcbiAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXG4gICAgICAgIChsYWJlbENsaWNrKT1cImxlZ2VuZExhYmVsQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGxhYmVsQWN0aXZhdGUpPVwibGVnZW5kTGFiZWxBY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgICAobGFiZWxEZWFjdGl2YXRlKT1cImxlZ2VuZExhYmVsRGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgPlxuICAgICAgPC9uZ3gtY2hhcnRzLWxlZ2VuZD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB2aWV3OiBbbnVtYmVyLCBudW1iZXJdO1xuICBASW5wdXQoKSBzaG93TGVnZW5kOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxlZ2VuZE9wdGlvbnM6IExlZ2VuZE9wdGlvbnM7XG4gIEBJbnB1dCgpIGxlZ2VuZFR5cGU6IExlZ2VuZFR5cGU7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxBY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBuYW1lOiBzdHJpbmcgfT4oKTtcbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsRGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBuYW1lOiBzdHJpbmcgfT4oKTtcblxuICBjaGFydFdpZHRoOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGxlZ2VuZFdpZHRoOiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgTGVnZW5kUG9zaXRpb24gPSBMZWdlbmRQb3NpdGlvbjtcbiAgcmVhZG9ubHkgTGVnZW5kVHlwZSA9IExlZ2VuZFR5cGU7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IGxlZ2VuZENvbHVtbnMgPSAwO1xuICAgIGlmICh0aGlzLnNob3dMZWdlbmQpIHtcbiAgICAgIHRoaXMubGVnZW5kVHlwZSA9IHRoaXMuZ2V0TGVnZW5kVHlwZSgpO1xuXG4gICAgICBpZiAoIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09IExlZ2VuZFBvc2l0aW9uLlJpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLmxlZ2VuZFR5cGUgPT09IExlZ2VuZFR5cGUuU2NhbGVMZWdlbmQpIHtcbiAgICAgICAgICBsZWdlbmRDb2x1bW5zID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZWdlbmRDb2x1bW5zID0gMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYXJ0Q29sdW1ucyA9IDEyIC0gbGVnZW5kQ29sdW1ucztcblxuICAgIHRoaXMuY2hhcnRXaWR0aCA9IE1hdGguZmxvb3IoKHRoaXMudmlld1swXSAqIGNoYXJ0Q29sdW1ucykgLyAxMi4wKTtcbiAgICB0aGlzLmxlZ2VuZFdpZHRoID1cbiAgICAgICF0aGlzLmxlZ2VuZE9wdGlvbnMgfHwgdGhpcy5sZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSBMZWdlbmRQb3NpdGlvbi5SaWdodFxuICAgICAgICA/IE1hdGguZmxvb3IoKHRoaXMudmlld1swXSAqIGxlZ2VuZENvbHVtbnMpIC8gMTIuMClcbiAgICAgICAgOiB0aGlzLmNoYXJ0V2lkdGg7XG4gIH1cblxuICBnZXRMZWdlbmRUeXBlKCk6IExlZ2VuZFR5cGUge1xuICAgIHJldHVybiB0aGlzLmxlZ2VuZE9wdGlvbnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyID8gTGVnZW5kVHlwZS5TY2FsZUxlZ2VuZCA6IExlZ2VuZFR5cGUuTGVnZW5kO1xuICB9XG59XG4iXX0=