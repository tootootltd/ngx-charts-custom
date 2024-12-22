import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';
import { isPlatformBrowser } from '@angular/common';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { ScaleType } from './types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./tooltip/tooltip.directive";
export class TooltipArea {
    constructor(platformId) {
        this.platformId = platformId;
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    getValues(xVal) {
        const results = [];
        for (const group of this.results) {
            const item = group.series.find(d => d.name.toString() === xVal.toString());
            let groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                const label = item.name;
                let val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                let color;
                if (this.colors.scaleType === ScaleType.Linear) {
                    let v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                const data = Object.assign({}, item, {
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color
                });
                results.push(data);
            }
        }
        return results;
    }
    mouseMove(event) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const xPos = event.pageX - event.target.getBoundingClientRect().left;
        const closestIndex = this.findClosestPointIndex(xPos);
        const closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            const ev = createMouseEvent('mouseleave');
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    }
    findClosestPointIndex(xPos) {
        let minIndex = 0;
        let maxIndex = this.xSet.length - 1;
        let minDiff = Number.MAX_VALUE;
        let closestIndex = 0;
        while (minIndex <= maxIndex) {
            const currentIndex = ((minIndex + maxIndex) / 2) | 0;
            const currentElement = this.xScale(this.xSet[currentIndex]);
            const curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    }
    showTooltip() {
        const event = createMouseEvent('mouseenter');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    }
    hideTooltip() {
        const event = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    }
    getToolTipText(tooltipItem) {
        let result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    }
}
TooltipArea.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipArea, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
TooltipArea.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: TooltipArea, selector: "g[ngx-charts-tooltip-area]", inputs: { dims: "dims", xSet: "xSet", xScale: "xScale", yScale: "yScale", results: "results", colors: "colors", showPercentage: "showPercentage", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { hover: "hover" }, viewQueries: [{ propertyName: "tooltipAnchor", first: true, predicate: ["tooltipAnchor"], descendants: true }], ngImport: i0, template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }], animations: [
        trigger('animationState', [
            transition('inactive => active', [
                style({
                    opacity: 0
                }),
                animate(250, style({ opacity: 0.7 }))
            ]),
            transition('active => inactive', [
                style({
                    opacity: 0.7
                }),
                animate(250, style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-tooltip-area]',
                    template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition('inactive => active', [
                                style({
                                    opacity: 0
                                }),
                                animate(250, style({ opacity: 0.7 }))
                            ]),
                            transition('active => inactive', [
                                style({
                                    opacity: 0.7
                                }),
                                animate(250, style({ opacity: 0 }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { dims: [{
                type: Input
            }], xSet: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], results: [{
                type: Input
            }], colors: [{
                type: Input
            }], showPercentage: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], hover: [{
                type: Output
            }], tooltipAnchor: [{
                type: ViewChild,
                args: ['tooltipAnchor', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi90b29sdGlwLWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULHVCQUF1QixFQUV2QixXQUFXLEVBQ1gsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUEwRXBELE1BQU0sT0FBTyxXQUFXO0lBdUJ0QixZQUF5QyxVQUFlO1FBQWYsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQXRCeEQsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLGlCQUFZLEdBQWMsRUFBRSxDQUFDO1FBRzdCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFRZixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdoQyxVQUFLLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUFJUixDQUFD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QixLQUFLO2dCQUVJLEtBQUs7c0JBQWQsTUFBTTtnQkFFd0MsYUFBYTtzQkFBM0QsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGNyZWF0ZU1vdXNlRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi90b29sdGlwL3Bvc2l0aW9uJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuL3Rvb2x0aXAvc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcblxuZXhwb3J0IGludGVyZmFjZSBUb29sdGlwIHtcbiAgY29sb3I6IHN0cmluZztcbiAgZDA6IG51bWJlcjtcbiAgZDE6IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1pbjogbnVtYmVyO1xuICBuYW1lOiBhbnk7XG4gIHNlcmllczogYW55O1xuICB2YWx1ZTogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtdG9vbHRpcC1hcmVhXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1hcmVhXCJcbiAgICAgICAgW2F0dHIueF09XCIwXCJcbiAgICAgICAgeT1cIjBcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJkaW1zLndpZHRoXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgc3R5bGU9XCJvcGFjaXR5OiAwOyBjdXJzb3I6ICdhdXRvJztcIlxuICAgICAgICAobW91c2Vtb3ZlKT1cIm1vdXNlTW92ZSgkZXZlbnQpXCJcbiAgICAgICAgKG1vdXNlbGVhdmUpPVwiaGlkZVRvb2x0aXAoKVwiXG4gICAgICAvPlxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VG9vbHRpcFRlbXBsYXRlIGxldC1tb2RlbD1cIm1vZGVsXCI+XG4gICAgICAgIDx4aHRtbDpkaXYgY2xhc3M9XCJhcmVhLXRvb2x0aXAtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHhodG1sOmRpdiAqbmdGb3I9XCJsZXQgdG9vbHRpcEl0ZW0gb2YgbW9kZWxcIiBjbGFzcz1cInRvb2x0aXAtaXRlbVwiPlxuICAgICAgICAgICAgPHhodG1sOnNwYW4gY2xhc3M9XCJ0b29sdGlwLWl0ZW0tY29sb3JcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJ0b29sdGlwSXRlbS5jb2xvclwiPjwveGh0bWw6c3Bhbj5cbiAgICAgICAgICAgIHt7IGdldFRvb2xUaXBUZXh0KHRvb2x0aXBJdGVtKSB9fVxuICAgICAgICAgIDwveGh0bWw6ZGl2PlxuICAgICAgICA8L3hodG1sOmRpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgI3Rvb2x0aXBBbmNob3JcbiAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCJhbmNob3JPcGFjaXR5ICE9PSAwID8gJ2FjdGl2ZScgOiAnaW5hY3RpdmUnXCJcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwLWFuY2hvclwiXG4gICAgICAgIFthdHRyLnhdPVwiYW5jaG9yUG9zXCJcbiAgICAgICAgeT1cIjBcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCIxXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3N0eWxlLm9wYWNpdHldPVwiYW5jaG9yT3BhY2l0eVwiXG4gICAgICAgIFtzdHlsZS5wb2ludGVyLWV2ZW50c109XCInbm9uZSdcIlxuICAgICAgICBuZ3gtdG9vbHRpcFxuICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInBsYWNlbWVudFR5cGVzLlJpZ2h0XCJcbiAgICAgICAgW3Rvb2x0aXBUeXBlXT1cInN0eWxlVHlwZXMudG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwU3BhY2luZ109XCIxNVwiXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdG9vbHRpcFRlbXBsYXRlIDogZGVmYXVsdFRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJhbmNob3JWYWx1ZXNcIlxuICAgICAgICBbdG9vbHRpcEltbWVkaWF0ZUV4aXRdPVwidHJ1ZVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAwLjcgfSkpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJ2FjdGl2ZSA9PiBpbmFjdGl2ZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDAuN1xuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwQXJlYSB7XG4gIGFuY2hvck9wYWNpdHk6IG51bWJlciA9IDA7XG4gIGFuY2hvclBvczogbnVtYmVyID0gLTE7XG4gIGFuY2hvclZhbHVlczogVG9vbHRpcFtdID0gW107XG4gIGxhc3RBbmNob3JQb3M6IG51bWJlcjtcblxuICBwbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzO1xuICBzdHlsZVR5cGVzID0gU3R5bGVUeXBlcztcblxuICBASW5wdXQoKSBkaW1zOiBWaWV3RGltZW5zaW9ucztcbiAgQElucHV0KCkgeFNldDogYW55W107XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSByZXN1bHRzOiBhbnlbXTtcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgc2hvd1BlcmNlbnRhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgaG92ZXI6IEV2ZW50RW1pdHRlcjx7IHZhbHVlOiBhbnkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgndG9vbHRpcEFuY2hvcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0b29sdGlwQW5jaG9yO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7fVxuXG4gIGdldFZhbHVlcyh4VmFsKTogVG9vbHRpcFtdIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgY29uc3QgaXRlbSA9IGdyb3VwLnNlcmllcy5maW5kKGQgPT4gZC5uYW1lLnRvU3RyaW5nKCkgPT09IHhWYWwudG9TdHJpbmcoKSk7XG4gICAgICBsZXQgZ3JvdXBOYW1lID0gZ3JvdXAubmFtZTtcbiAgICAgIGlmIChncm91cE5hbWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIGdyb3VwTmFtZSA9IGdyb3VwTmFtZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBpdGVtLm5hbWU7XG4gICAgICAgIGxldCB2YWwgPSBpdGVtLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5zaG93UGVyY2VudGFnZSkge1xuICAgICAgICAgIHZhbCA9IChpdGVtLmQxIC0gaXRlbS5kMCkudG9GaXhlZCgyKSArICclJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sb3I7XG4gICAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICAgICAgICBsZXQgdiA9IHZhbDtcbiAgICAgICAgICBpZiAoaXRlbS5kMSkge1xuICAgICAgICAgICAgdiA9IGl0ZW0uZDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3Iodik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihncm91cC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCB7XG4gICAgICAgICAgdmFsdWU6IHZhbCxcbiAgICAgICAgICBuYW1lOiBsYWJlbCxcbiAgICAgICAgICBzZXJpZXM6IGdyb3VwTmFtZSxcbiAgICAgICAgICBtaW46IGl0ZW0ubWluLFxuICAgICAgICAgIG1heDogaXRlbS5tYXgsXG4gICAgICAgICAgY29sb3JcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKGRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgbW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeFBvcyA9IGV2ZW50LnBhZ2VYIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cbiAgICBjb25zdCBjbG9zZXN0SW5kZXggPSB0aGlzLmZpbmRDbG9zZXN0UG9pbnRJbmRleCh4UG9zKTtcbiAgICBjb25zdCBjbG9zZXN0UG9pbnQgPSB0aGlzLnhTZXRbY2xvc2VzdEluZGV4XTtcbiAgICB0aGlzLmFuY2hvclBvcyA9IHRoaXMueFNjYWxlKGNsb3Nlc3RQb2ludCk7XG4gICAgdGhpcy5hbmNob3JQb3MgPSBNYXRoLm1heCgwLCB0aGlzLmFuY2hvclBvcyk7XG4gICAgdGhpcy5hbmNob3JQb3MgPSBNYXRoLm1pbih0aGlzLmRpbXMud2lkdGgsIHRoaXMuYW5jaG9yUG9zKTtcblxuICAgIHRoaXMuYW5jaG9yVmFsdWVzID0gdGhpcy5nZXRWYWx1ZXMoY2xvc2VzdFBvaW50KTtcbiAgICBpZiAodGhpcy5hbmNob3JQb3MgIT09IHRoaXMubGFzdEFuY2hvclBvcykge1xuICAgICAgY29uc3QgZXYgPSBjcmVhdGVNb3VzZUV2ZW50KCdtb3VzZWxlYXZlJyk7XG4gICAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDAuNztcbiAgICAgIHRoaXMuaG92ZXIuZW1pdCh7XG4gICAgICAgIHZhbHVlOiBjbG9zZXN0UG9pbnRcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zaG93VG9vbHRpcCgpO1xuXG4gICAgICB0aGlzLmxhc3RBbmNob3JQb3MgPSB0aGlzLmFuY2hvclBvcztcbiAgICB9XG4gIH1cblxuICBmaW5kQ2xvc2VzdFBvaW50SW5kZXgoeFBvczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgbWluSW5kZXggPSAwO1xuICAgIGxldCBtYXhJbmRleCA9IHRoaXMueFNldC5sZW5ndGggLSAxO1xuICAgIGxldCBtaW5EaWZmID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBsZXQgY2xvc2VzdEluZGV4ID0gMDtcblxuICAgIHdoaWxlIChtaW5JbmRleCA8PSBtYXhJbmRleCkge1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpIHwgMDtcbiAgICAgIGNvbnN0IGN1cnJlbnRFbGVtZW50ID0gdGhpcy54U2NhbGUodGhpcy54U2V0W2N1cnJlbnRJbmRleF0pO1xuXG4gICAgICBjb25zdCBjdXJEaWZmID0gTWF0aC5hYnMoY3VycmVudEVsZW1lbnQgLSB4UG9zKTtcblxuICAgICAgaWYgKGN1ckRpZmYgPCBtaW5EaWZmKSB7XG4gICAgICAgIG1pbkRpZmYgPSBjdXJEaWZmO1xuICAgICAgICBjbG9zZXN0SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50RWxlbWVudCA8IHhQb3MpIHtcbiAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudCA+IHhQb3MpIHtcbiAgICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWluRGlmZiA9IDA7XG4gICAgICAgIGNsb3Nlc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb3Nlc3RJbmRleDtcbiAgfVxuXG4gIHNob3dUb29sdGlwKCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlTW91c2VFdmVudCgnbW91c2VlbnRlcicpO1xuICAgIHRoaXMudG9vbHRpcEFuY2hvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgaGlkZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnQgPSBjcmVhdGVNb3VzZUV2ZW50KCdtb3VzZWxlYXZlJyk7XG4gICAgdGhpcy50b29sdGlwQW5jaG9yLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgdGhpcy5hbmNob3JPcGFjaXR5ID0gMDtcbiAgICB0aGlzLmxhc3RBbmNob3JQb3MgPSAtMTtcbiAgfVxuXG4gIGdldFRvb2xUaXBUZXh0KHRvb2x0aXBJdGVtOiBUb29sdGlwKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnJztcbiAgICBpZiAodG9vbHRpcEl0ZW0uc2VyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS5zZXJpZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSAnPz8/JztcbiAgICB9XG4gICAgcmVzdWx0ICs9ICc6ICc7XG4gICAgaWYgKHRvb2x0aXBJdGVtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS52YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICAgIH1cbiAgICBpZiAodG9vbHRpcEl0ZW0ubWluICE9PSB1bmRlZmluZWQgfHwgdG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSAnICgnO1xuICAgICAgaWYgKHRvb2x0aXBJdGVtLm1pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdCArPSAn4omlJztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0ubWluLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdCArPSAnIC0gJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gJ+KJpCc7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLm1heC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9ICcpJztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19