import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./axis-label.component";
import * as i3 from "./x-axis-ticks.component";
export class XAxisComponent {
    constructor() {
        this.rotateTicks = true;
        this.showGridLines = false;
        this.xOrient = Orientation.Bottom;
        this.xAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
        this.orientation = Orientation;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    }
    emitTicksHeight({ height }) {
        const newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ height });
            }, 0);
        }
    }
}
XAxisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: XAxisComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
XAxisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: XAxisComponent, selector: "g[ngx-charts-x-axis]", inputs: { xScale: "xScale", dims: "dims", trimTicks: "trimTicks", rotateTicks: "rotateTicks", maxTickLength: "maxTickLength", tickFormatting: "tickFormatting", showGridLines: "showGridLines", showLabel: "showLabel", labelText: "labelText", ticks: "ticks", xAxisTickCount: "xAxisTickCount", xOrient: "xOrient", xAxisOffset: "xAxisOffset" }, outputs: { dimensionsChanged: "dimensionsChanged" }, viewQueries: [{ propertyName: "ticksComponent", first: true, predicate: XAxisTicksComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="orientation.Bottom"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.AxisLabelComponent, selector: "g[ngx-charts-axis-label]", inputs: ["orient", "label", "offset", "width", "height"] }, { kind: "component", type: i3.XAxisTicksComponent, selector: "g[ngx-charts-x-axis-ticks]", inputs: ["scale", "orient", "tickArguments", "tickValues", "tickStroke", "trimTicks", "maxTickLength", "tickFormatting", "showGridLines", "gridLineHeight", "width", "rotateTicks"], outputs: ["dimensionsChanged"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: XAxisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-x-axis]',
                    template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="orientation.Bottom"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { xScale: [{
                type: Input
            }], dims: [{
                type: Input
            }], trimTicks: [{
                type: Input
            }], rotateTicks: [{
                type: Input
            }], maxTickLength: [{
                type: Input
            }], tickFormatting: [{
                type: Input
            }], showGridLines: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], labelText: [{
                type: Input
            }], ticks: [{
                type: Input
            }], xAxisTickCount: [{
                type: Input
            }], xOrient: [{
                type: Input
            }], xAxisOffset: [{
                type: Input
            }], dimensionsChanged: [{
                type: Output
            }], ticksComponent: [{
                type: ViewChild,
                args: [XAxisTicksComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9heGVzL3gtYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFxQ3hELE1BQU0sT0FBTyxjQUFjO0lBbEMzQjtRQXNDVyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUt0QixZQUFPLEdBQWdCLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDMUMsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLE1BQU0sQ0FBQztRQUM3QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRVgsZ0JBQVcsR0FBRyxXQUFXLENBQUM7S0F5QnBDO0lBckJDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7UUFFdEYsSUFBSSxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssV0FBVyxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFO1FBQ3hCLE1BQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7WUFDbEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDtJQUNILENBQUM7OzJHQXBEVSxjQUFjOytGQUFkLGNBQWMscWZBOEJkLG1CQUFtQixxRUE5RHBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDsyRkFHVSxjQUFjO2tCQWxDMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksaUJBQWlCO3NCQUExQixNQUFNO2dCQWV5QixjQUFjO3NCQUE3QyxTQUFTO3VCQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFhBeGlzVGlja3NDb21wb25lbnQgfSBmcm9tICcuL3gtYXhpcy10aWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JpZW50YXRpb24gfSBmcm9tICcuLi90eXBlcy9vcmllbnRhdGlvbi5lbnVtJztcbmltcG9ydCB7IFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXgtYXhpc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyBbYXR0ci5jbGFzc109XCJ4QXhpc0NsYXNzTmFtZVwiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cbiAgICAgIDxzdmc6Z1xuICAgICAgICBuZ3gtY2hhcnRzLXgtYXhpcy10aWNrc1xuICAgICAgICAqbmdJZj1cInhTY2FsZVwiXG4gICAgICAgIFt0cmltVGlja3NdPVwidHJpbVRpY2tzXCJcbiAgICAgICAgW3JvdGF0ZVRpY2tzXT1cInJvdGF0ZVRpY2tzXCJcbiAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4VGlja0xlbmd0aFwiXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXG4gICAgICAgIFt0aWNrQXJndW1lbnRzXT1cInRpY2tBcmd1bWVudHNcIlxuICAgICAgICBbdGlja1N0cm9rZV09XCJ0aWNrU3Ryb2tlXCJcbiAgICAgICAgW3NjYWxlXT1cInhTY2FsZVwiXG4gICAgICAgIFtvcmllbnRdPVwieE9yaWVudFwiXG4gICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxuICAgICAgICBbZ3JpZExpbmVIZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBbd2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICAgIFt0aWNrVmFsdWVzXT1cInRpY2tzXCJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc0hlaWdodCgkZXZlbnQpXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXG4gICAgICAgICpuZ0lmPVwic2hvd0xhYmVsXCJcbiAgICAgICAgW2xhYmVsXT1cImxhYmVsVGV4dFwiXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxuICAgICAgICBbb3JpZW50XT1cIm9yaWVudGF0aW9uLkJvdHRvbVwiXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBbd2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICA+PC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBYQXhpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbjtcbiAgQElucHV0KCkgcm90YXRlVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRpY2tGb3JtYXR0aW5nO1xuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dMYWJlbDogYm9vbGVhbjtcbiAgQElucHV0KCkgbGFiZWxUZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgeEF4aXNUaWNrQ291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgeE9yaWVudDogT3JpZW50YXRpb24gPSBPcmllbnRhdGlvbi5Cb3R0b207XG4gIEBJbnB1dCgpIHhBeGlzT2Zmc2V0OiBudW1iZXIgPSAwO1xuXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB4QXhpc0NsYXNzTmFtZTogc3RyaW5nID0gJ3ggYXhpcyc7XG5cbiAgdGlja0FyZ3VtZW50czogbnVtYmVyW107XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBsYWJlbE9mZnNldDogbnVtYmVyID0gMDtcbiAgZmlsbDogc3RyaW5nID0gJ25vbmUnO1xuICBzdHJva2U6IHN0cmluZyA9ICdzdHJva2UnO1xuICB0aWNrU3Ryb2tlOiBzdHJpbmcgPSAnI2NjYyc7XG4gIHN0cm9rZVdpZHRoOiBzdHJpbmcgPSAnbm9uZSc7XG4gIHBhZGRpbmc6IG51bWJlciA9IDU7XG5cbiAgcmVhZG9ubHkgb3JpZW50YXRpb24gPSBPcmllbnRhdGlvbjtcblxuICBAVmlld0NoaWxkKFhBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBYQXhpc1RpY2tzQ29tcG9uZW50O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgwLCR7dGhpcy54QXhpc09mZnNldCArIHRoaXMucGFkZGluZyArIHRoaXMuZGltcy5oZWlnaHR9KWA7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMueEF4aXNUaWNrQ291bnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnRpY2tBcmd1bWVudHMgPSBbdGhpcy54QXhpc1RpY2tDb3VudF07XG4gICAgfVxuICB9XG5cbiAgZW1pdFRpY2tzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcbiAgICBjb25zdCBuZXdMYWJlbE9mZnNldCA9IGhlaWdodCArIDI1ICsgNTtcbiAgICBpZiAobmV3TGFiZWxPZmZzZXQgIT09IHRoaXMubGFiZWxPZmZzZXQpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSBuZXdMYWJlbE9mZnNldDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyBoZWlnaHQgfSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==