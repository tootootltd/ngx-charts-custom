import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { min, max, quantile } from 'd3-array';
import { trigger, transition, style, animate } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { StyleTypes } from '../common/tooltip/style.type';
import { PlacementTypes } from '../common/tooltip/position';
import { ScaleType } from '../common/types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "../common/tooltip/tooltip.directive";
import * as i2 from "./box.component";
export class BoxSeriesComponent {
    constructor() {
        this.animations = true;
        this.tooltipDisabled = false;
        this.gradient = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    onClick(data) {
        this.select.emit(data);
    }
    update() {
        this.updateTooltipSettings();
        const width = this.series && this.series.series.length ? Math.round(this.xScale.bandwidth()) : null;
        const seriesName = this.series.name;
        // Calculate Quantile and Whiskers for each box serie.
        this.counts = this.series.series;
        const mappedCounts = this.counts.map(serie => Number(serie.value));
        this.whiskers = [min(mappedCounts), max(mappedCounts)];
        // We get the group count and must sort it in order to retrieve quantiles.
        const groupCounts = this.counts.map(item => item.value).sort((a, b) => Number(a) - Number(b));
        this.quartiles = this.getBoxQuantiles(groupCounts);
        this.lineCoordinates = this.getLinesCoordinates(seriesName.toString(), this.whiskers, this.quartiles, width);
        const value = this.quartiles[1];
        const formattedLabel = formatLabel(seriesName);
        const box = {
            value,
            data: this.counts,
            label: seriesName,
            formattedLabel,
            width,
            height: 0,
            x: 0,
            y: 0,
            roundEdges: this.roundEdges,
            quartiles: this.quartiles,
            lineCoordinates: this.lineCoordinates
        };
        box.height = Math.abs(this.yScale(this.quartiles[0]) - this.yScale(this.quartiles[2]));
        box.x = this.xScale(seriesName.toString());
        box.y = this.yScale(this.quartiles[2]);
        box.ariaLabel = formattedLabel + ' - Median: ' + value.toLocaleString();
        if (this.colors.scaleType === ScaleType.Ordinal) {
            box.color = this.colors.getColor(seriesName);
        }
        else {
            box.color = this.colors.getColor(this.quartiles[1]);
            box.gradientStops = this.colors.getLinearGradientStops(this.quartiles[0], this.quartiles[2]);
        }
        const tooltipLabel = formattedLabel;
        const formattedTooltipLabel = `
    <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
    <span class="tooltip-val">
      • Q1: ${this.quartiles[0]} • Q2: ${this.quartiles[1]} • Q3: ${this.quartiles[2]}<br>
      • Min: ${this.whiskers[0]} • Max: ${this.whiskers[1]}
    </span>`;
        box.tooltipText = this.tooltipDisabled ? undefined : formattedTooltipLabel;
        this.tooltipTitle = this.tooltipDisabled ? undefined : box.tooltipText;
        this.box = box;
    }
    getBoxQuantiles(inputData) {
        return [quantile(inputData, 0.25), quantile(inputData, 0.5), quantile(inputData, 0.75)];
    }
    getLinesCoordinates(seriesName, whiskers, quartiles, barWidth) {
        // The X value is not being centered, so had to sum half the width to align it.
        const commonX = this.xScale(seriesName);
        const offsetX = commonX + barWidth / 2;
        const medianLineWidth = Math.max(barWidth + 4 * this.strokeWidth, 1);
        const whiskerLineWidth = Math.max(barWidth / 3, 1);
        const whiskerZero = this.yScale(whiskers[0]);
        const whiskerOne = this.yScale(whiskers[1]);
        const median = this.yScale(quartiles[1]);
        const topLine = {
            v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerZero },
            v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerZero }
        };
        const medianLine = {
            v1: { x: offsetX + medianLineWidth / 2, y: median },
            v2: { x: offsetX - medianLineWidth / 2, y: median }
        };
        const bottomLine = {
            v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerOne },
            v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerOne }
        };
        const verticalLine = {
            v1: { x: offsetX, y: whiskerZero },
            v2: { x: offsetX, y: whiskerOne }
        };
        return [verticalLine, topLine, medianLine, bottomLine];
    }
    updateTooltipSettings() {
        if (this.tooltipDisabled) {
            this.tooltipPlacement = undefined;
            this.tooltipType = undefined;
        }
        else {
            if (!this.tooltipPlacement) {
                this.tooltipPlacement = PlacementTypes.Top;
            }
            if (!this.tooltipType) {
                this.tooltipType = StyleTypes.tooltip;
            }
        }
    }
}
BoxSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BoxSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BoxSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: BoxSeriesComponent, selector: "g[ngx-charts-box-series]", inputs: { dims: "dims", series: "series", xScale: "xScale", yScale: "yScale", colors: "colors", animations: "animations", strokeColor: "strokeColor", strokeWidth: "strokeWidth", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate", tooltipPlacement: "tooltipPlacement", tooltipType: "tooltipType", roundEdges: "roundEdges", gradient: "gradient" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g
      ngx-charts-box
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="box.width"
      [height]="box.height"
      [x]="box.x"
      [y]="box.y"
      [roundEdges]="box.roundEdges"
      [fill]="box.color"
      [gradientStops]="box.gradientStops"
      [strokeColor]="strokeColor"
      [strokeWidth]="strokeWidth"
      [data]="box.data"
      [lineCoordinates]="box.lineCoordinates"
      [gradient]="gradient"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTitle"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="box.data"
      [animations]="animations"
    ></svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }, { kind: "component", type: i2.BoxComponent, selector: "g[ngx-charts-box]", inputs: ["strokeColor", "strokeWidth", "fill", "data", "width", "height", "x", "y", "lineCoordinates", "roundEdges", "gradient", "gradientStops", "offset", "isActive", "animations", "ariaLabel", "noBarWhenZero"], outputs: ["select", "activate", "deactivate"] }], animations: [
        trigger('animationState', [
            transition(':leave', [
                style({
                    opacity: 1
                }),
                animate(500, style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BoxSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-box-series]',
                    template: `
    <svg:g
      ngx-charts-box
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="box.width"
      [height]="box.height"
      [x]="box.x"
      [y]="box.y"
      [roundEdges]="box.roundEdges"
      [fill]="box.color"
      [gradientStops]="box.gradientStops"
      [strokeColor]="strokeColor"
      [strokeWidth]="strokeWidth"
      [data]="box.data"
      [lineCoordinates]="box.lineCoordinates"
      [gradient]="gradient"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTitle"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="box.data"
      [animations]="animations"
    ></svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':leave', [
                                style({
                                    opacity: 1
                                }),
                                animate(500, style({ opacity: 0 }))
                            ])
                        ])
                    ]
                }]
        }], propDecorators: { dims: [{
                type: Input
            }], series: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], colors: [{
                type: Input
            }], animations: [{
                type: Input
            }], strokeColor: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipType: [{
                type: Input
            }], roundEdges: [{
                type: Input
            }], gradient: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9ib3gtY2hhcnQvYm94LXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBSTlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBZ0Q1RCxNQUFNLE9BQU8sa0JBQWtCO0lBN0MvQjtRQW1EVyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBS2pDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFekIsV0FBTSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxlQUFVLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7S0FnSXBFO0lBdkhDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJ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Q0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1pbiwgbWF4LCBxdWFudGlsZSB9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7IFNjYWxlTGluZWFyLCBTY2FsZUJhbmQgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBJQm94TW9kZWwsIEJveENoYXJ0U2VyaWVzLCBEYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IElWZWN0b3IyRCB9IGZyb20gJy4uL21vZGVscy9jb29yZGluYXRlcy5tb2RlbCc7XG5pbXBvcnQgeyB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4uL2NvbW1vbi90b29sdGlwL3N0eWxlLnR5cGUnO1xuaW1wb3J0IHsgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuLi9jb21tb24vdG9vbHRpcC9wb3NpdGlvbic7XG5pbXBvcnQgeyBTY2FsZVR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcbmltcG9ydCB7IFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZpZXctZGltZW5zaW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1ib3gtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnXG4gICAgICBuZ3gtY2hhcnRzLWJveFxuICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uc1wiXG4gICAgICBbd2lkdGhdPVwiYm94LndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYm94LmhlaWdodFwiXG4gICAgICBbeF09XCJib3gueFwiXG4gICAgICBbeV09XCJib3gueVwiXG4gICAgICBbcm91bmRFZGdlc109XCJib3gucm91bmRFZGdlc1wiXG4gICAgICBbZmlsbF09XCJib3guY29sb3JcIlxuICAgICAgW2dyYWRpZW50U3RvcHNdPVwiYm94LmdyYWRpZW50U3RvcHNcIlxuICAgICAgW3N0cm9rZUNvbG9yXT1cInN0cm9rZUNvbG9yXCJcbiAgICAgIFtzdHJva2VXaWR0aF09XCJzdHJva2VXaWR0aFwiXG4gICAgICBbZGF0YV09XCJib3guZGF0YVwiXG4gICAgICBbbGluZUNvb3JkaW5hdGVzXT1cImJveC5saW5lQ29vcmRpbmF0ZXNcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFthcmlhTGFiZWxdPVwiYm94LmFyaWFMYWJlbFwiXG4gICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIG5neC10b29sdGlwXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCJ0b29sdGlwVHlwZVwiXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUaXRsZVwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwiYm94LmRhdGFcIlxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgPjwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJveFNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICBASW5wdXQoKSBzZXJpZXM6IEJveENoYXJ0U2VyaWVzO1xuICBASW5wdXQoKSB4U2NhbGU6IFNjYWxlQmFuZDxzdHJpbmc+O1xuICBASW5wdXQoKSB5U2NhbGU6IFNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjtcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cm9rZVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzO1xuICBASW5wdXQoKSB0b29sdGlwVHlwZTogU3R5bGVUeXBlcztcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbjtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxJQm94TW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGJveDogSUJveE1vZGVsO1xuICBjb3VudHM6IERhdGFJdGVtW107XG4gIHF1YXJ0aWxlczogW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICB3aGlza2VyczogW251bWJlciwgbnVtYmVyXTtcbiAgbGluZUNvb3JkaW5hdGVzOiBbSVZlY3RvcjJELCBJVmVjdG9yMkQsIElWZWN0b3IyRCwgSVZlY3RvcjJEXTtcbiAgdG9vbHRpcFRpdGxlOiBzdHJpbmc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBvbkNsaWNrKGRhdGE6IElCb3hNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVUb29sdGlwU2V0dGluZ3MoKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2VyaWVzICYmIHRoaXMuc2VyaWVzLnNlcmllcy5sZW5ndGggPyBNYXRoLnJvdW5kKHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpKSA6IG51bGw7XG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuc2VyaWVzLm5hbWU7XG5cbiAgICAvLyBDYWxjdWxhdGUgUXVhbnRpbGUgYW5kIFdoaXNrZXJzIGZvciBlYWNoIGJveCBzZXJpZS5cbiAgICB0aGlzLmNvdW50cyA9IHRoaXMuc2VyaWVzLnNlcmllcztcblxuICAgIGNvbnN0IG1hcHBlZENvdW50cyA9IHRoaXMuY291bnRzLm1hcChzZXJpZSA9PiBOdW1iZXIoc2VyaWUudmFsdWUpKTtcbiAgICB0aGlzLndoaXNrZXJzID0gW21pbihtYXBwZWRDb3VudHMpLCBtYXgobWFwcGVkQ291bnRzKV07XG5cbiAgICAvLyBXZSBnZXQgdGhlIGdyb3VwIGNvdW50IGFuZCBtdXN0IHNvcnQgaXQgaW4gb3JkZXIgdG8gcmV0cmlldmUgcXVhbnRpbGVzLlxuICAgIGNvbnN0IGdyb3VwQ291bnRzID0gdGhpcy5jb3VudHMubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSkuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKTtcbiAgICB0aGlzLnF1YXJ0aWxlcyA9IHRoaXMuZ2V0Qm94UXVhbnRpbGVzKGdyb3VwQ291bnRzKTtcbiAgICB0aGlzLmxpbmVDb29yZGluYXRlcyA9IHRoaXMuZ2V0TGluZXNDb29yZGluYXRlcyhzZXJpZXNOYW1lLnRvU3RyaW5nKCksIHRoaXMud2hpc2tlcnMsIHRoaXMucXVhcnRpbGVzLCB3aWR0aCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucXVhcnRpbGVzWzFdO1xuICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gZm9ybWF0TGFiZWwoc2VyaWVzTmFtZSk7XG4gICAgY29uc3QgYm94OiBJQm94TW9kZWwgPSB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRhdGE6IHRoaXMuY291bnRzLFxuICAgICAgbGFiZWw6IHNlcmllc05hbWUsXG4gICAgICBmb3JtYXR0ZWRMYWJlbCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICByb3VuZEVkZ2VzOiB0aGlzLnJvdW5kRWRnZXMsXG4gICAgICBxdWFydGlsZXM6IHRoaXMucXVhcnRpbGVzLFxuICAgICAgbGluZUNvb3JkaW5hdGVzOiB0aGlzLmxpbmVDb29yZGluYXRlc1xuICAgIH07XG5cbiAgICBib3guaGVpZ2h0ID0gTWF0aC5hYnModGhpcy55U2NhbGUodGhpcy5xdWFydGlsZXNbMF0pIC0gdGhpcy55U2NhbGUodGhpcy5xdWFydGlsZXNbMl0pKTtcbiAgICBib3gueCA9IHRoaXMueFNjYWxlKHNlcmllc05hbWUudG9TdHJpbmcoKSk7XG4gICAgYm94LnkgPSB0aGlzLnlTY2FsZSh0aGlzLnF1YXJ0aWxlc1syXSk7XG4gICAgYm94LmFyaWFMYWJlbCA9IGZvcm1hdHRlZExhYmVsICsgJyAtIE1lZGlhbjogJyArIHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuT3JkaW5hbCkge1xuICAgICAgYm94LmNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJveC5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHRoaXMucXVhcnRpbGVzWzFdKTtcbiAgICAgIGJveC5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyh0aGlzLnF1YXJ0aWxlc1swXSwgdGhpcy5xdWFydGlsZXNbMl0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdHRlZExhYmVsO1xuICAgIGNvbnN0IGZvcm1hdHRlZFRvb2x0aXBMYWJlbCA9IGBcbiAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHRvb2x0aXBMYWJlbCl9PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj5cbiAgICAgIOKAoiBRMTogJHt0aGlzLnF1YXJ0aWxlc1swXX0g4oCiIFEyOiAke3RoaXMucXVhcnRpbGVzWzFdfSDigKIgUTM6ICR7dGhpcy5xdWFydGlsZXNbMl19PGJyPlxuICAgICAg4oCiIE1pbjogJHt0aGlzLndoaXNrZXJzWzBdfSDigKIgTWF4OiAke3RoaXMud2hpc2tlcnNbMV19XG4gICAgPC9zcGFuPmA7XG5cbiAgICBib3gudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6IGZvcm1hdHRlZFRvb2x0aXBMYWJlbDtcbiAgICB0aGlzLnRvb2x0aXBUaXRsZSA9IHRoaXMudG9vbHRpcERpc2FibGVkID8gdW5kZWZpbmVkIDogYm94LnRvb2x0aXBUZXh0O1xuXG4gICAgdGhpcy5ib3ggPSBib3g7XG4gIH1cblxuICBnZXRCb3hRdWFudGlsZXMoaW5wdXREYXRhOiBBcnJheTxudW1iZXIgfCBEYXRlPik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFtxdWFudGlsZShpbnB1dERhdGEsIDAuMjUpLCBxdWFudGlsZShpbnB1dERhdGEsIDAuNSksIHF1YW50aWxlKGlucHV0RGF0YSwgMC43NSldO1xuICB9XG5cbiAgZ2V0TGluZXNDb29yZGluYXRlcyhcbiAgICBzZXJpZXNOYW1lOiBzdHJpbmcsXG4gICAgd2hpc2tlcnM6IFtudW1iZXIsIG51bWJlcl0sXG4gICAgcXVhcnRpbGVzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgYmFyV2lkdGg6IG51bWJlclxuICApOiBbSVZlY3RvcjJELCBJVmVjdG9yMkQsIElWZWN0b3IyRCwgSVZlY3RvcjJEXSB7XG4gICAgLy8gVGhlIFggdmFsdWUgaXMgbm90IGJlaW5nIGNlbnRlcmVkLCBzbyBoYWQgdG8gc3VtIGhhbGYgdGhlIHdpZHRoIHRvIGFsaWduIGl0LlxuICAgIGNvbnN0IGNvbW1vblggPSB0aGlzLnhTY2FsZShzZXJpZXNOYW1lKTtcbiAgICBjb25zdCBvZmZzZXRYID0gY29tbW9uWCArIGJhcldpZHRoIC8gMjtcblxuICAgIGNvbnN0IG1lZGlhbkxpbmVXaWR0aCA9IE1hdGgubWF4KGJhcldpZHRoICsgNCAqIHRoaXMuc3Ryb2tlV2lkdGgsIDEpO1xuICAgIGNvbnN0IHdoaXNrZXJMaW5lV2lkdGggPSBNYXRoLm1heChiYXJXaWR0aCAvIDMsIDEpO1xuXG4gICAgY29uc3Qgd2hpc2tlclplcm8gPSB0aGlzLnlTY2FsZSh3aGlza2Vyc1swXSk7XG4gICAgY29uc3Qgd2hpc2tlck9uZSA9IHRoaXMueVNjYWxlKHdoaXNrZXJzWzFdKTtcbiAgICBjb25zdCBtZWRpYW4gPSB0aGlzLnlTY2FsZShxdWFydGlsZXNbMV0pO1xuXG4gICAgY29uc3QgdG9wTGluZTogSVZlY3RvcjJEID0ge1xuICAgICAgdjE6IHsgeDogb2Zmc2V0WCArIHdoaXNrZXJMaW5lV2lkdGggLyAyLCB5OiB3aGlza2VyWmVybyB9LFxuICAgICAgdjI6IHsgeDogb2Zmc2V0WCAtIHdoaXNrZXJMaW5lV2lkdGggLyAyLCB5OiB3aGlza2VyWmVybyB9XG4gICAgfTtcbiAgICBjb25zdCBtZWRpYW5MaW5lOiBJVmVjdG9yMkQgPSB7XG4gICAgICB2MTogeyB4OiBvZmZzZXRYICsgbWVkaWFuTGluZVdpZHRoIC8gMiwgeTogbWVkaWFuIH0sXG4gICAgICB2MjogeyB4OiBvZmZzZXRYIC0gbWVkaWFuTGluZVdpZHRoIC8gMiwgeTogbWVkaWFuIH1cbiAgICB9O1xuICAgIGNvbnN0IGJvdHRvbUxpbmU6IElWZWN0b3IyRCA9IHtcbiAgICAgIHYxOiB7IHg6IG9mZnNldFggKyB3aGlza2VyTGluZVdpZHRoIC8gMiwgeTogd2hpc2tlck9uZSB9LFxuICAgICAgdjI6IHsgeDogb2Zmc2V0WCAtIHdoaXNrZXJMaW5lV2lkdGggLyAyLCB5OiB3aGlza2VyT25lIH1cbiAgICB9O1xuICAgIGNvbnN0IHZlcnRpY2FsTGluZTogSVZlY3RvcjJEID0ge1xuICAgICAgdjE6IHsgeDogb2Zmc2V0WCwgeTogd2hpc2tlclplcm8gfSxcbiAgICAgIHYyOiB7IHg6IG9mZnNldFgsIHk6IHdoaXNrZXJPbmUgfVxuICAgIH07XG4gICAgcmV0dXJuIFt2ZXJ0aWNhbExpbmUsIHRvcExpbmUsIG1lZGlhbkxpbmUsIGJvdHRvbUxpbmVdO1xuICB9XG5cbiAgdXBkYXRlVG9vbHRpcFNldHRpbmdzKCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXBEaXNhYmxlZCkge1xuICAgICAgdGhpcy50b29sdGlwUGxhY2VtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50b29sdGlwVHlwZSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnRvb2x0aXBQbGFjZW1lbnQpIHtcbiAgICAgICAgdGhpcy50b29sdGlwUGxhY2VtZW50ID0gUGxhY2VtZW50VHlwZXMuVG9wO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnRvb2x0aXBUeXBlKSB7XG4gICAgICAgIHRoaXMudG9vbHRpcFR5cGUgPSBTdHlsZVR5cGVzLnRvb2x0aXA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=