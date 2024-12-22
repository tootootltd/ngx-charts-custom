import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./axis-label.component";
import * as i3 from "./y-axis-ticks.component";
export class YAxisComponent {
    constructor() {
        this.showGridLines = false;
        this.yOrient = Orientation.Left;
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === Orientation.Right) {
            this.labelOffset = 65;
            this.transform = `translate(${this.offset + this.dims.width} , 0)`;
        }
        else {
            this.transform = `translate(${this.offset} , 0)`;
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    }
    emitTicksWidth({ width }) {
        if (width !== this.labelOffset && this.yOrient === Orientation.Right) {
            this.labelOffset = width + this.labelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
    }
}
YAxisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: YAxisComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
YAxisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: YAxisComponent, selector: "g[ngx-charts-y-axis]", inputs: { yScale: "yScale", dims: "dims", trimTicks: "trimTicks", maxTickLength: "maxTickLength", tickFormatting: "tickFormatting", ticks: "ticks", showGridLines: "showGridLines", showLabel: "showLabel", labelText: "labelText", yAxisTickCount: "yAxisTickCount", yOrient: "yOrient", referenceLines: "referenceLines", showRefLines: "showRefLines", showRefLabels: "showRefLabels", yAxisOffset: "yAxisOffset" }, outputs: { dimensionsChanged: "dimensionsChanged" }, viewQueries: [{ propertyName: "ticksComponent", first: true, predicate: YAxisTicksComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.AxisLabelComponent, selector: "g[ngx-charts-axis-label]", inputs: ["orient", "label", "offset", "width", "height"] }, { kind: "component", type: i3.YAxisTicksComponent, selector: "g[ngx-charts-y-axis-ticks]", inputs: ["scale", "orient", "tickArguments", "tickValues", "tickStroke", "trimTicks", "maxTickLength", "tickFormatting", "showGridLines", "gridLineWidth", "height", "referenceLines", "showRefLabels", "showRefLines"], outputs: ["dimensionsChanged"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: YAxisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-y-axis]',
                    template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { yScale: [{
                type: Input
            }], dims: [{
                type: Input
            }], trimTicks: [{
                type: Input
            }], maxTickLength: [{
                type: Input
            }], tickFormatting: [{
                type: Input
            }], ticks: [{
                type: Input
            }], showGridLines: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], labelText: [{
                type: Input
            }], yAxisTickCount: [{
                type: Input
            }], yOrient: [{
                type: Input
            }], referenceLines: [{
                type: Input
            }], showRefLines: [{
                type: Input
            }], showRefLabels: [{
                type: Input
            }], yAxisOffset: [{
                type: Input
            }], dimensionsChanged: [{
                type: Output
            }], ticksComponent: [{
                type: ViewChild,
                args: [YAxisTicksComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9heGVzL3ktYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBRVQsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUF3Q3hELE1BQU0sT0FBTyxjQUFjO0lBckMzQjtRQTRDVyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUkvQixZQUFPLEdBQWdCLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFJeEMsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFDeEIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0tBbUNyQjtJQS9CQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLE9BQU8sQ0FBQztTQUNwRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLElBQUksQ0FBQyxNQUFNLE9BQU8sQ0FBQztTQUNsRDtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUU7UUFDdEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO2FBQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0gsQ0FBQzs7MkdBN0RVLGNBQWM7K0ZBQWQsY0FBYyx5akJBNkJkLG1CQUFtQixxRUFoRXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDVDsyRkFHVSxjQUFjO2tCQXJDMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFheUIsY0FBYztzQkFBN0MsU0FBUzt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWUF4aXNUaWNrc0NvbXBvbmVudCB9IGZyb20gJy4veS1heGlzLXRpY2tzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmllbnRhdGlvbiB9IGZyb20gJy4uL3R5cGVzL29yaWVudGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi90eXBlcy92aWV3LWRpbWVuc2lvbi5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMteS1heGlzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIFthdHRyLmNsYXNzXT1cInlBeGlzQ2xhc3NOYW1lXCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMteS1heGlzLXRpY2tzXG4gICAgICAgICpuZ0lmPVwieVNjYWxlXCJcbiAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltVGlja3NcIlxuICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhUaWNrTGVuZ3RoXCJcbiAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInRpY2tGb3JtYXR0aW5nXCJcbiAgICAgICAgW3RpY2tBcmd1bWVudHNdPVwidGlja0FyZ3VtZW50c1wiXG4gICAgICAgIFt0aWNrVmFsdWVzXT1cInRpY2tzXCJcbiAgICAgICAgW3RpY2tTdHJva2VdPVwidGlja1N0cm9rZVwiXG4gICAgICAgIFtzY2FsZV09XCJ5U2NhbGVcIlxuICAgICAgICBbb3JpZW50XT1cInlPcmllbnRcIlxuICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgW2dyaWRMaW5lV2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICAgIFtyZWZlcmVuY2VMaW5lc109XCJyZWZlcmVuY2VMaW5lc1wiXG4gICAgICAgIFtzaG93UmVmTGluZXNdPVwic2hvd1JlZkxpbmVzXCJcbiAgICAgICAgW3Nob3dSZWZMYWJlbHNdPVwic2hvd1JlZkxhYmVsc1wiXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwiZW1pdFRpY2tzV2lkdGgoJGV2ZW50KVwiXG4gICAgICAvPlxuXG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXG4gICAgICAgICpuZ0lmPVwic2hvd0xhYmVsXCJcbiAgICAgICAgW2xhYmVsXT1cImxhYmVsVGV4dFwiXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxuICAgICAgICBbb3JpZW50XT1cInlPcmllbnRcIlxuICAgICAgICBbaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgPjwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICBASW5wdXQoKSB0cmltVGlja3M6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1heFRpY2tMZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc7XG4gIEBJbnB1dCgpIHRpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lczogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93TGFiZWw6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxhYmVsVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSB5QXhpc1RpY2tDb3VudDogYW55O1xuICBASW5wdXQoKSB5T3JpZW50OiBPcmllbnRhdGlvbiA9IE9yaWVudGF0aW9uLkxlZnQ7XG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xuICBASW5wdXQoKSBzaG93UmVmTGluZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dSZWZMYWJlbHM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHlBeGlzT2Zmc2V0OiBudW1iZXIgPSAwO1xuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgeUF4aXNDbGFzc05hbWU6IHN0cmluZyA9ICd5IGF4aXMnO1xuICB0aWNrQXJndW1lbnRzOiBudW1iZXJbXTtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBsYWJlbE9mZnNldDogbnVtYmVyID0gMTU7XG4gIGZpbGw6IHN0cmluZyA9ICdub25lJztcbiAgc3Ryb2tlOiBzdHJpbmcgPSAnI0NDQyc7XG4gIHRpY2tTdHJva2U6IHN0cmluZyA9ICcjQ0NDJztcbiAgc3Ryb2tlV2lkdGg6IG51bWJlciA9IDE7XG4gIHBhZGRpbmc6IG51bWJlciA9IDU7XG5cbiAgQFZpZXdDaGlsZChZQXhpc1RpY2tzQ29tcG9uZW50KSB0aWNrc0NvbXBvbmVudDogWUF4aXNUaWNrc0NvbXBvbmVudDtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9mZnNldCA9IC0odGhpcy55QXhpc09mZnNldCArIHRoaXMucGFkZGluZyk7XG4gICAgaWYgKHRoaXMueU9yaWVudCA9PT0gT3JpZW50YXRpb24uUmlnaHQpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSA2NTtcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0ICsgdGhpcy5kaW1zLndpZHRofSAsIDApYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5vZmZzZXR9ICwgMClgO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnlBeGlzVGlja0NvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnlBeGlzVGlja0NvdW50XTtcbiAgICB9XG4gIH1cblxuICBlbWl0VGlja3NXaWR0aCh7IHdpZHRoIH0pOiB2b2lkIHtcbiAgICBpZiAod2lkdGggIT09IHRoaXMubGFiZWxPZmZzZXQgJiYgdGhpcy55T3JpZW50ID09PSBPcmllbnRhdGlvbi5SaWdodCkge1xuICAgICAgdGhpcy5sYWJlbE9mZnNldCA9IHdpZHRoICsgdGhpcy5sYWJlbE9mZnNldDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSBpZiAod2lkdGggIT09IHRoaXMubGFiZWxPZmZzZXQpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSB3aWR0aDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxufVxuIl19