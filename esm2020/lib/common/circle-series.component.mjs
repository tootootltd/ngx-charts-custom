import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from './label.helper';
import { id } from '../utils/id';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { BarOrientation } from './types/bar-orientation.enum';
import { ScaleType } from './types/scale-type.enum';
import { isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./tooltip/tooltip.directive";
import * as i3 from "./circle.component";
import * as i4 from "./svg-linear-gradient.component";
export var SeriesType;
(function (SeriesType) {
    SeriesType["Standard"] = "standard";
    SeriesType["Stacked"] = "stacked";
})(SeriesType || (SeriesType = {}));
export class CircleSeriesComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.type = SeriesType.Standard;
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
        this.barOrientation = BarOrientation;
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.isSSR = false;
    }
    ngOnInit() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (isPlatformServer(this.platformId)) {
            this.isSSR = true;
        }
    }
    ngOnChanges() {
        this.update();
    }
    update() {
        this.circle = this.getActiveCircle();
    }
    getActiveCircle() {
        const indexActiveDataPoint = this.data.series.findIndex(d => {
            const label = d.name;
            return label && this.visibleValue && label.toString() === this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    }
    mapDataPointToCircle(d, i) {
        const seriesName = this.data.name;
        const value = d.value;
        const label = d.name;
        const tooltipLabel = formatLabel(label);
        let cx;
        if (this.scaleType === ScaleType.Time) {
            cx = this.xScale(label);
        }
        else if (this.scaleType === ScaleType.Linear) {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        const cy = this.yScale(this.type === SeriesType.Standard ? value : d.d1);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;
        const opacity = 1;
        let color;
        if (this.colors.scaleType === ScaleType.Linear) {
            if (this.type === SeriesType.Standard) {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        const data = Object.assign({}, d, {
            series: seriesName,
            value,
            name: label
        });
        return {
            classNames: [`circle-data-${i}`],
            value,
            label,
            data,
            cx,
            cy,
            radius,
            height,
            tooltipLabel,
            color,
            opacity,
            seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    }
    getTooltipText({ tooltipLabel, value, seriesName, min, max }) {
        return `
      <span class="tooltip-label">${escapeLabel(seriesName)} • ${escapeLabel(tooltipLabel)}</span>
      <span class="tooltip-val">${value.toLocaleString()}${this.getTooltipMinMaxText(min, max)}</span>
    `;
    }
    getTooltipMinMaxText(min, max) {
        if (min !== undefined || max !== undefined) {
            let result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    }
    getGradientStops(color) {
        return [
            {
                offset: 0,
                color,
                opacity: 0.2
            },
            {
                offset: 100,
                color,
                opacity: 1
            }
        ];
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    activateCircle() {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle() {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    }
}
CircleSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CircleSeriesComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
CircleSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: CircleSeriesComponent, selector: "g[ngx-charts-circle-series]", inputs: { data: "data", type: "type", xScale: "xScale", yScale: "yScale", colors: "colors", scaleType: "scaleType", visibleValue: "visibleValue", activeEntries: "activeEntries", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="!isSSR && barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:rect
        *ngIf="isSSR && barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }, { kind: "component", type: i3.CircleComponent, selector: "g[ngx-charts-circle]", inputs: ["cx", "cy", "r", "fill", "stroke", "data", "classNames", "circleOpacity", "pointerEvents"], outputs: ["select", "activate", "deactivate"] }, { kind: "component", type: i4.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }], animations: [
        trigger('animationState', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate(250, style({ opacity: 1 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CircleSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-circle-series]',
                    template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="!isSSR && barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:rect
        *ngIf="isSSR && barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':enter', [
                                style({
                                    opacity: 0
                                }),
                                animate(250, style({ opacity: 1 }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { data: [{
                type: Input
            }], type: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], colors: [{
                type: Input
            }], scaleType: [{
                type: Input
            }], visibleValue: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vY2lyY2xlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFFdkIsV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBRW5ELE1BQU0sQ0FBTixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsbUNBQXFCLENBQUE7SUFDckIsaUNBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUhXLFVBQVUsS0FBVixVQUFVLFFBR3JCO0FBdUZELE1BQU0sT0FBTyxxQkFBcUI7SUE0QmhDLFlBQXlDLFVBQWU7UUFBZixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBMUIvQyxTQUFJLEdBQWUsVUFBVSxDQUFDLFFBQVEsQ0FB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QU8sRUFBRSxDQUFDO2lCQUNYLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwQyxDQUFDO1NBQ0gsQ0FBQztLQUNIOzJGQUVVLHFCQUFxQjtrQkFuRWpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFOzRCQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUM7b0NBQ0osT0FBTyxFQUFFLENBQUM7aUNBQ1gsQ0FBQztnQ0FDRixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNwQyxDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7OzBCQTZCYyxNQUFNOzJCQUFDLFdBQVc7NENBM0J0QixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWYsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IERhdGFJdGVtLCBTZXJpZXMsIFN0cmluZ09yTnVtYmVyT3JEYXRlIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuL3Rvb2x0aXAvcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vdG9vbHRpcC9zdHlsZS50eXBlJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi90eXBlcy9iYXItb3JpZW50YXRpb24uZW51bSc7XG5pbXBvcnQgeyBHcmFkaWVudCB9IGZyb20gJy4vdHlwZXMvZ3JhZGllbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgZW51bSBTZXJpZXNUeXBlIHtcbiAgU3RhbmRhcmQgPSAnc3RhbmRhcmQnLFxuICBTdGFja2VkID0gJ3N0YWNrZWQnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2lyY2xlIHtcbiAgY2xhc3NOYW1lczogc3RyaW5nW107XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGRhdGE6IERhdGFJdGVtO1xuICBjeDogbnVtYmVyO1xuICBjeTogbnVtYmVyO1xuICByYWRpdXM6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHRvb2x0aXBMYWJlbDogc3RyaW5nO1xuICBjb2xvcjogc3RyaW5nO1xuICBvcGFjaXR5OiBudW1iZXI7XG4gIHNlcmllc05hbWU6IHN0cmluZztcbiAgZ3JhZGllbnRTdG9wczogR3JhZGllbnRbXTtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2lyY2xlLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyAqbmdJZj1cImNpcmNsZVwiPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudFxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5WZXJ0aWNhbFwiXG4gICAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXG4gICAgICAgICAgW3N0b3BzXT1cImNpcmNsZS5ncmFkaWVudFN0b3BzXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGVmcz5cbiAgICAgIDxzdmc6cmVjdFxuICAgICAgICAqbmdJZj1cIiFpc1NTUiAmJiBiYXJWaXNpYmxlICYmIHR5cGUgPT09ICdzdGFuZGFyZCdcIlxuICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgICAgW2F0dHIueF09XCJjaXJjbGUuY3ggLSBjaXJjbGUucmFkaXVzXCJcbiAgICAgICAgW2F0dHIueV09XCJjaXJjbGUuY3lcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJjaXJjbGUucmFkaXVzICogMlwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJjaXJjbGUuaGVpZ2h0XCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJncmFkaWVudEZpbGxcIlxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYmFyXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgKm5nSWY9XCJpc1NTUiAmJiBiYXJWaXNpYmxlICYmIHR5cGUgPT09ICdzdGFuZGFyZCdcIlxuICAgICAgICBbYXR0ci54XT1cImNpcmNsZS5jeCAtIGNpcmNsZS5yYWRpdXNcIlxuICAgICAgICBbYXR0ci55XT1cImNpcmNsZS5jeVwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cImNpcmNsZS5yYWRpdXMgKiAyXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImNpcmNsZS5oZWlnaHRcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImdyYWRpZW50RmlsbFwiXG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1iYXJcIlxuICAgICAgLz5cbiAgICAgIDxzdmc6Z1xuICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZVxuICAgICAgICBjbGFzcz1cImNpcmNsZVwiXG4gICAgICAgIFtjeF09XCJjaXJjbGUuY3hcIlxuICAgICAgICBbY3ldPVwiY2lyY2xlLmN5XCJcbiAgICAgICAgW3JdPVwiY2lyY2xlLnJhZGl1c1wiXG4gICAgICAgIFtmaWxsXT1cImNpcmNsZS5jb2xvclwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoeyBuYW1lOiBjaXJjbGUuc2VyaWVzTmFtZSB9KVwiXG4gICAgICAgIFtwb2ludGVyRXZlbnRzXT1cImNpcmNsZS52YWx1ZSA9PT0gMCA/ICdub25lJyA6ICdhbGwnXCJcbiAgICAgICAgW2RhdGFdPVwiY2lyY2xlLnZhbHVlXCJcbiAgICAgICAgW2NsYXNzTmFtZXNdPVwiY2lyY2xlLmNsYXNzTmFtZXNcIlxuICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soY2lyY2xlLmRhdGEpXCJcbiAgICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlQ2lyY2xlKClcIlxuICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlQ2lyY2xlKClcIlxuICAgICAgICBuZ3gtdG9vbHRpcFxuICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInBsYWNlbWVudFR5cGVzLlRvcFwiXG4gICAgICAgIFt0b29sdGlwVHlwZV09XCJzdHlsZVR5cGVzLnRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENpcmNsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTogU2VyaWVzO1xuICBASW5wdXQoKSB0eXBlOiBTZXJpZXNUeXBlID0gU2VyaWVzVHlwZS5TdGFuZGFyZDtcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIHNjYWxlVHlwZTogU2NhbGVUeXBlO1xuICBASW5wdXQoKSB2aXNpYmxlVmFsdWU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxEYXRhSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPHsgbmFtZTogU3RyaW5nT3JOdW1iZXJPckRhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8eyBuYW1lOiBTdHJpbmdPck51bWJlck9yRGF0ZSB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBhcmVhUGF0aDogYW55O1xuICBjaXJjbGU6IENpcmNsZTsgLy8gYWN0aXZlIGNpcmNsZVxuICBiYXJWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIGdyYWRpZW50SWQ6IHN0cmluZztcbiAgZ3JhZGllbnRGaWxsOiBzdHJpbmc7XG5cbiAgYmFyT3JpZW50YXRpb24gPSBCYXJPcmllbnRhdGlvbjtcbiAgcGxhY2VtZW50VHlwZXMgPSBQbGFjZW1lbnRUeXBlcztcbiAgc3R5bGVUeXBlcyA9IFN0eWxlVHlwZXM7XG5cbiAgaXNTU1IgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5ncmFkaWVudEZpbGwgPSBgdXJsKCMke3RoaXMuZ3JhZGllbnRJZH0pYDtcblxuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuaXNTU1IgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaXJjbGUgPSB0aGlzLmdldEFjdGl2ZUNpcmNsZSgpO1xuICB9XG5cbiAgZ2V0QWN0aXZlQ2lyY2xlKCk6IENpcmNsZSB7XG4gICAgY29uc3QgaW5kZXhBY3RpdmVEYXRhUG9pbnQgPSB0aGlzLmRhdGEuc2VyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xuICAgICAgcmV0dXJuIGxhYmVsICYmIHRoaXMudmlzaWJsZVZhbHVlICYmIGxhYmVsLnRvU3RyaW5nKCkgPT09IHRoaXMudmlzaWJsZVZhbHVlLnRvU3RyaW5nKCkgJiYgZC52YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIH0pO1xuXG4gICAgaWYgKGluZGV4QWN0aXZlRGF0YVBvaW50ID09PSAtMSkge1xuICAgICAgLy8gTm8gdmFsaWQgcG9pbnQgaXMgJ2FjdGl2ZS9ob3ZlcmVkIG92ZXInIGF0IHRoaXMgbW9tZW50LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXBEYXRhUG9pbnRUb0NpcmNsZSh0aGlzLmRhdGEuc2VyaWVzW2luZGV4QWN0aXZlRGF0YVBvaW50XSwgaW5kZXhBY3RpdmVEYXRhUG9pbnQpO1xuICB9XG5cbiAgbWFwRGF0YVBvaW50VG9DaXJjbGUoZDogYW55LCBpOiBudW1iZXIpOiBDaXJjbGUge1xuICAgIGNvbnN0IHNlcmllc05hbWUgPSB0aGlzLmRhdGEubmFtZSBhcyBzdHJpbmc7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XG4gICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgY29uc3QgdG9vbHRpcExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuXG4gICAgbGV0IGN4O1xuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLlRpbWUpIHtcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUobGFiZWwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUoTnVtYmVyKGxhYmVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUobGFiZWwpO1xuICAgIH1cblxuICAgIGNvbnN0IGN5ID0gdGhpcy55U2NhbGUodGhpcy50eXBlID09PSBTZXJpZXNUeXBlLlN0YW5kYXJkID8gdmFsdWUgOiBkLmQxKTtcbiAgICBjb25zdCByYWRpdXMgPSA1O1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gLSBjeTtcbiAgICBjb25zdCBvcGFjaXR5ID0gMTtcblxuICAgIGxldCBjb2xvcjtcbiAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICBpZiAodGhpcy50eXBlID09PSBTZXJpZXNUeXBlLlN0YW5kYXJkKSB7XG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihkLmQxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihzZXJpZXNOYW1lKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZCwge1xuICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxuICAgICAgdmFsdWUsXG4gICAgICBuYW1lOiBsYWJlbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxuICAgICAgdmFsdWUsXG4gICAgICBsYWJlbCxcbiAgICAgIGRhdGEsXG4gICAgICBjeCxcbiAgICAgIGN5LFxuICAgICAgcmFkaXVzLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdG9vbHRpcExhYmVsLFxuICAgICAgY29sb3IsXG4gICAgICBvcGFjaXR5LFxuICAgICAgc2VyaWVzTmFtZSxcbiAgICAgIGdyYWRpZW50U3RvcHM6IHRoaXMuZ2V0R3JhZGllbnRTdG9wcyhjb2xvciksXG4gICAgICBtaW46IGQubWluLFxuICAgICAgbWF4OiBkLm1heFxuICAgIH07XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dCh7XG4gICAgdG9vbHRpcExhYmVsLFxuICAgIHZhbHVlLFxuICAgIHNlcmllc05hbWUsXG4gICAgbWluLFxuICAgIG1heFxuICB9OiB7XG4gICAgdG9vbHRpcExhYmVsOiBzdHJpbmc7XG4gICAgdmFsdWU6IGFueTtcbiAgICBzZXJpZXNOYW1lOiBzdHJpbmc7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG4gIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHNlcmllc05hbWUpfSDigKIgJHtlc2NhcGVMYWJlbCh0b29sdGlwTGFiZWwpfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9JHt0aGlzLmdldFRvb2x0aXBNaW5NYXhUZXh0KG1pbiwgbWF4KX08L3NwYW4+XG4gICAgYDtcbiAgfVxuXG4gIGdldFRvb2x0aXBNaW5NYXhUZXh0KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkIHx8IG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gJyAoJztcbiAgICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHQgKz0gJ+KJpSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IG1pbi50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHQgKz0gJyAtICc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0ICs9ICfiiaQnO1xuICAgICAgfVxuICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSBtYXgudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSAnKSc7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0R3JhZGllbnRTdG9wcyhjb2xvcjogc3RyaW5nKTogR3JhZGllbnRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgb3BhY2l0eTogMC4yXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvZmZzZXQ6IDEwMCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgb25DbGljayhkYXRhOiBEYXRhSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jaXJjbGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcbiAgfVxufVxuIl19