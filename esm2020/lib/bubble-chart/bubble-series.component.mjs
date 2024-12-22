import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { ScaleType } from '../common/types/scale-type.enum';
import { isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/tooltip/tooltip.directive";
import * as i3 from "../common/circle.component";
export class BubbleSeriesComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.isSSR = false;
    }
    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.isSSR = true;
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circles = this.getCircles();
    }
    getCircles() {
        const seriesName = this.data.name;
        return this.data.series
            .map((d, i) => {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                const y = d.y;
                const x = d.x;
                const r = d.r;
                const radius = this.rScale(r || 1);
                const tooltipLabel = formatLabel(d.name);
                const cx = this.xScaleType === ScaleType.Linear ? this.xScale(Number(x)) : this.xScale(x);
                const cy = this.yScaleType === ScaleType.Linear ? this.yScale(Number(y)) : this.yScale(y);
                const color = this.colors.scaleType === ScaleType.Linear ? this.colors.getColor(r) : this.colors.getColor(seriesName);
                const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
                const opacity = isActive ? 1 : 0.3;
                const data = Object.assign({}, d, {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                });
                return {
                    data,
                    x,
                    y,
                    r,
                    classNames: [`circle-data-${i}`],
                    value: y,
                    label: x,
                    cx,
                    cy,
                    radius,
                    tooltipLabel,
                    color,
                    opacity,
                    seriesName,
                    isActive,
                    transform: `translate(${cx},${cy})`
                };
            }
        })
            .filter(circle => circle !== undefined);
    }
    getTooltipText(circle) {
        const hasRadius = typeof circle.r !== 'undefined';
        const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        const hasSeriesName = circle.seriesName && circle.seriesName.length;
        const radiusValue = hasRadius ? formatLabel(circle.r) : '';
        const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
        const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
        const x = formatLabel(circle.x);
        const y = formatLabel(circle.y);
        const name = hasSeriesName && hasTooltipLabel
            ? `${circle.seriesName} • ${circle.tooltipLabel}`
            : circle.seriesName + circle.tooltipLabel;
        const tooltipTitle = hasSeriesName || hasTooltipLabel ? `<span class="tooltip-label">${escapeLabel(name)}</span>` : '';
        return `
      ${tooltipTitle}
      <span class="tooltip-label">
        <label>${escapeLabel(xAxisLabel)}</label> ${escapeLabel(x)}<br />
        <label>${escapeLabel(yAxisLabel)}</label> ${escapeLabel(y)}
      </span>
      <span class="tooltip-val">
        ${escapeLabel(radiusValue)}
      </span>
    `;
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
    isVisible(circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    }
    activateCircle(circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle(circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    }
    trackBy(index, circle) {
        return `${circle.data.series} ${circle.data.name}`;
    }
}
BubbleSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BubbleSeriesComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
BubbleSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: BubbleSeriesComponent, selector: "g[ngx-charts-bubble-series]", inputs: { data: "data", xScale: "xScale", yScale: "yScale", rScale: "rScale", xScaleType: "xScaleType", yScaleType: "yScaleType", colors: "colors", visibleValue: "visibleValue", activeEntries: "activeEntries", xAxisLabel: "xAxisLabel", yAxisLabel: "yAxisLabel", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          *ngIf="!isSSR"
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
        <svg:g
          *ngIf="isSSR"
          ngx-charts-circle
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }, { kind: "component", type: i3.CircleComponent, selector: "g[ngx-charts-circle]", inputs: ["cx", "cy", "r", "fill", "stroke", "data", "classNames", "circleOpacity", "pointerEvents"], outputs: ["select", "activate", "deactivate"] }], animations: [
        trigger('animationState', [
            transition(':enter', [
                style({
                    opacity: 0,
                    transform: 'scale(0)'
                }),
                animate(250, style({ opacity: 1, transform: 'scale(1)' }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BubbleSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-bubble-series]',
                    template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          *ngIf="!isSSR"
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
        <svg:g
          *ngIf="isSSR"
          ngx-charts-circle
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':enter', [
                                style({
                                    opacity: 0,
                                    transform: 'scale(0)'
                                }),
                                animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { data: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], rScale: [{
                type: Input
            }], xScaleType: [{
                type: Input
            }], yScaleType: [{
                type: Input
            }], colors: [{
                type: Input
            }], visibleValue: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], xAxisLabel: [{
                type: Input
            }], yAxisLabel: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9idWJibGUtY2hhcnQvYnViYmxlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFlBQVksRUFFWix1QkFBdUIsRUFFdkIsV0FBVyxFQUNYLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUF3RW5ELE1BQU0sT0FBTyxxQkFBcUI7SUEyQmhDLFlBQXlDLFVBQWU7UUFBZixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBZi9DLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2hDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSzFDLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFFeEIsVUFBSyxHQUFHLEtBQUssQ0FBQztJQUU2QyxDQUFDO0lB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QUFxQjtrQkF0RWpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRFQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7NEJBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQztvQ0FDSixPQUFPLEVBQUUsQ0FBQztvQ0FDVixTQUFTLEVBQUUsVUFBVTtpQ0FDdEIsQ0FBQztnQ0FDRixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7NkJBQzNELENBQUM7eUJBQ0gsQ0FBQztxQkFDSDtpQkFDRjs7MEJBNEJjLE1BQU07MkJBQUMsV0FBVzs0Q0ExQnRCLElBQUk7c0JBQVosS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWYsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3QsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBCdWJibGVDaGFydFNlcmllcyB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi4vY29tbW9uL3Rvb2x0aXAvcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4uL2NvbW1vbi90b29sdGlwL3N0eWxlLnR5cGUnO1xuaW1wb3J0IHsgU2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NjYWxlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWJ1YmJsZS1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IGNpcmNsZSBvZiBjaXJjbGVzOyB0cmFja0J5OiB0cmFja0J5XCI+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cImNpcmNsZS50cmFuc2Zvcm1cIj5cbiAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgKm5nSWY9XCIhaXNTU1JcIlxuICAgICAgICAgIG5neC1jaGFydHMtY2lyY2xlXG4gICAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICAgIFtjeF09XCIwXCJcbiAgICAgICAgICBbY3ldPVwiMFwiXG4gICAgICAgICAgW3JdPVwiY2lyY2xlLnJhZGl1c1wiXG4gICAgICAgICAgW2ZpbGxdPVwiY2lyY2xlLmNvbG9yXCJcbiAgICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJjaXJjbGUub3BhY2l0eVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJjaXJjbGUuaXNBY3RpdmVcIlxuICAgICAgICAgIFtwb2ludGVyRXZlbnRzXT1cIidhbGwnXCJcbiAgICAgICAgICBbZGF0YV09XCJjaXJjbGUudmFsdWVcIlxuICAgICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcbiAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soY2lyY2xlLmRhdGEpXCJcbiAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGVDaXJjbGUoY2lyY2xlKVwiXG4gICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpXCJcbiAgICAgICAgICBuZ3gtdG9vbHRpcFxuICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJwbGFjZW1lbnRUeXBlcy5Ub3BcIlxuICAgICAgICAgIFt0b29sdGlwVHlwZV09XCJzdHlsZVR5cGVzLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogZ2V0VG9vbHRpcFRleHQoY2lyY2xlKVwiXG4gICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgICpuZ0lmPVwiaXNTU1JcIlxuICAgICAgICAgIG5neC1jaGFydHMtY2lyY2xlXG4gICAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICAgIFtjeF09XCIwXCJcbiAgICAgICAgICBbY3ldPVwiMFwiXG4gICAgICAgICAgW3JdPVwiY2lyY2xlLnJhZGl1c1wiXG4gICAgICAgICAgW2ZpbGxdPVwiY2lyY2xlLmNvbG9yXCJcbiAgICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJjaXJjbGUub3BhY2l0eVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJjaXJjbGUuaXNBY3RpdmVcIlxuICAgICAgICAgIFtwb2ludGVyRXZlbnRzXT1cIidhbGwnXCJcbiAgICAgICAgICBbZGF0YV09XCJjaXJjbGUudmFsdWVcIlxuICAgICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcbiAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soY2lyY2xlLmRhdGEpXCJcbiAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGVDaXJjbGUoY2lyY2xlKVwiXG4gICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpXCJcbiAgICAgICAgICBuZ3gtdG9vbHRpcFxuICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJwbGFjZW1lbnRUeXBlcy5Ub3BcIlxuICAgICAgICAgIFt0b29sdGlwVHlwZV09XCJzdHlsZVR5cGVzLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogZ2V0VG9vbHRpcFRleHQoY2lyY2xlKVwiXG4gICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiXG4gICAgICAgIC8+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJ1xuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1YmJsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTogQnViYmxlQ2hhcnRTZXJpZXM7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSByU2NhbGU7XG4gIEBJbnB1dCgpIHhTY2FsZVR5cGU6IFNjYWxlVHlwZTtcbiAgQElucHV0KCkgeVNjYWxlVHlwZTogU2NhbGVUeXBlO1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSB2aXNpYmxlVmFsdWU7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSB4QXhpc0xhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGFyZWFQYXRoOiBhbnk7XG4gIGNpcmNsZXM6IGFueVtdOyAvLyBUT0RPIHR5cGUgdGhpc1xuXG4gIHBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXM7XG4gIHN0eWxlVHlwZXMgPSBTdHlsZVR5cGVzO1xuXG4gIGlzU1NSID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5pc1NTUiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaXJjbGVzID0gdGhpcy5nZXRDaXJjbGVzKCk7XG4gIH1cblxuICBnZXRDaXJjbGVzKCk6IGFueVtdIHtcbiAgICBjb25zdCBzZXJpZXNOYW1lID0gdGhpcy5kYXRhLm5hbWU7XG5cbiAgICByZXR1cm4gdGhpcy5kYXRhLnNlcmllc1xuICAgICAgLm1hcCgoZCwgaSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGQueSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCB5ID0gZC55O1xuICAgICAgICAgIGNvbnN0IHggPSBkLng7XG4gICAgICAgICAgY29uc3QgciA9IGQucjtcblxuICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuclNjYWxlKHIgfHwgMSk7XG4gICAgICAgICAgY29uc3QgdG9vbHRpcExhYmVsID0gZm9ybWF0TGFiZWwoZC5uYW1lKTtcblxuICAgICAgICAgIGNvbnN0IGN4ID0gdGhpcy54U2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyID8gdGhpcy54U2NhbGUoTnVtYmVyKHgpKSA6IHRoaXMueFNjYWxlKHgpO1xuICAgICAgICAgIGNvbnN0IGN5ID0gdGhpcy55U2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyID8gdGhpcy55U2NhbGUoTnVtYmVyKHkpKSA6IHRoaXMueVNjYWxlKHkpO1xuXG4gICAgICAgICAgY29uc3QgY29sb3IgPVxuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyID8gdGhpcy5jb2xvcnMuZ2V0Q29sb3IocikgOiB0aGlzLmNvbG9ycy5nZXRDb2xvcihzZXJpZXNOYW1lKTtcblxuICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gIXRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPyB0cnVlIDogdGhpcy5pc0FjdGl2ZSh7IG5hbWU6IHNlcmllc05hbWUgfSk7XG4gICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IGlzQWN0aXZlID8gMSA6IDAuMztcblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkLCB7XG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc05hbWUsXG4gICAgICAgICAgICBuYW1lOiBkLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogZC55LFxuICAgICAgICAgICAgeDogZC54LFxuICAgICAgICAgICAgcmFkaXVzOiBkLnJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICByLFxuICAgICAgICAgICAgY2xhc3NOYW1lczogW2BjaXJjbGUtZGF0YS0ke2l9YF0sXG4gICAgICAgICAgICB2YWx1ZTogeSxcbiAgICAgICAgICAgIGxhYmVsOiB4LFxuICAgICAgICAgICAgY3gsXG4gICAgICAgICAgICBjeSxcbiAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgIHRvb2x0aXBMYWJlbCxcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgb3BhY2l0eSxcbiAgICAgICAgICAgIHNlcmllc05hbWUsXG4gICAgICAgICAgICBpc0FjdGl2ZSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke2N4fSwke2N5fSlgXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoY2lyY2xlID0+IGNpcmNsZSAhPT0gdW5kZWZpbmVkKTtcbiAgfVxuXG4gIGdldFRvb2x0aXBUZXh0KGNpcmNsZSk6IHN0cmluZyB7XG4gICAgY29uc3QgaGFzUmFkaXVzID0gdHlwZW9mIGNpcmNsZS5yICE9PSAndW5kZWZpbmVkJztcbiAgICBjb25zdCBoYXNUb29sdGlwTGFiZWwgPSBjaXJjbGUudG9vbHRpcExhYmVsICYmIGNpcmNsZS50b29sdGlwTGFiZWwubGVuZ3RoO1xuICAgIGNvbnN0IGhhc1Nlcmllc05hbWUgPSBjaXJjbGUuc2VyaWVzTmFtZSAmJiBjaXJjbGUuc2VyaWVzTmFtZS5sZW5ndGg7XG5cbiAgICBjb25zdCByYWRpdXNWYWx1ZSA9IGhhc1JhZGl1cyA/IGZvcm1hdExhYmVsKGNpcmNsZS5yKSA6ICcnO1xuICAgIGNvbnN0IHhBeGlzTGFiZWwgPSB0aGlzLnhBeGlzTGFiZWwgJiYgdGhpcy54QXhpc0xhYmVsICE9PSAnJyA/IGAke3RoaXMueEF4aXNMYWJlbH06YCA6ICcnO1xuICAgIGNvbnN0IHlBeGlzTGFiZWwgPSB0aGlzLnlBeGlzTGFiZWwgJiYgdGhpcy55QXhpc0xhYmVsICE9PSAnJyA/IGAke3RoaXMueUF4aXNMYWJlbH06YCA6ICcnO1xuICAgIGNvbnN0IHggPSBmb3JtYXRMYWJlbChjaXJjbGUueCk7XG4gICAgY29uc3QgeSA9IGZvcm1hdExhYmVsKGNpcmNsZS55KTtcbiAgICBjb25zdCBuYW1lID1cbiAgICAgIGhhc1Nlcmllc05hbWUgJiYgaGFzVG9vbHRpcExhYmVsXG4gICAgICAgID8gYCR7Y2lyY2xlLnNlcmllc05hbWV9IOKAoiAke2NpcmNsZS50b29sdGlwTGFiZWx9YFxuICAgICAgICA6IGNpcmNsZS5zZXJpZXNOYW1lICsgY2lyY2xlLnRvb2x0aXBMYWJlbDtcbiAgICBjb25zdCB0b29sdGlwVGl0bGUgPVxuICAgICAgaGFzU2VyaWVzTmFtZSB8fCBoYXNUb29sdGlwTGFiZWwgPyBgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChuYW1lKX08L3NwYW4+YCA6ICcnO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICR7dG9vbHRpcFRpdGxlfVxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+XG4gICAgICAgIDxsYWJlbD4ke2VzY2FwZUxhYmVsKHhBeGlzTGFiZWwpfTwvbGFiZWw+ICR7ZXNjYXBlTGFiZWwoeCl9PGJyIC8+XG4gICAgICAgIDxsYWJlbD4ke2VzY2FwZUxhYmVsKHlBeGlzTGFiZWwpfTwvbGFiZWw+ICR7ZXNjYXBlTGFiZWwoeSl9XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+XG4gICAgICAgICR7ZXNjYXBlTGFiZWwocmFkaXVzVmFsdWUpfVxuICAgICAgPC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlzVmlzaWJsZShjaXJjbGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5hY3RpdmVFbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlKHsgbmFtZTogY2lyY2xlLnNlcmllc05hbWUgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNpcmNsZS5vcGFjaXR5ICE9PSAwO1xuICB9XG5cbiAgYWN0aXZhdGVDaXJjbGUoY2lyY2xlKTogdm9pZCB7XG4gICAgY2lyY2xlLmJhclZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMuZGF0YS5uYW1lIH0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpOiB2b2lkIHtcbiAgICBjaXJjbGUuYmFyVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgbmFtZTogdGhpcy5kYXRhLm5hbWUgfSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBjaXJjbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtjaXJjbGUuZGF0YS5zZXJpZXN9ICR7Y2lyY2xlLmRhdGEubmFtZX1gO1xuICB9XG59XG4iXX0=