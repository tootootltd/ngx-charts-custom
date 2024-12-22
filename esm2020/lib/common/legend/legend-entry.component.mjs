import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export class LegendEntryComponent {
    constructor() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    get trimmedLabel() {
        return this.formattedLabel || '(empty)';
    }
    onMouseEnter() {
        this.activate.emit({ name: this.label });
    }
    onMouseLeave() {
        this.deactivate.emit({ name: this.label });
    }
}
LegendEntryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LegendEntryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LegendEntryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: LegendEntryComponent, selector: "ngx-charts-legend-entry", inputs: { color: "color", label: "label", formattedLabel: "formattedLabel", isActive: "isActive" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate", toggle: "toggle" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, ngImport: i0, template: `
    <span [title]="formattedLabel" tabindex="-1" [class.active]="isActive" (click)="select.emit(formattedLabel)">
      <span class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"> </span>
      <span class="legend-label-text">
        {{ trimmedLabel }}
      </span>
    </span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LegendEntryComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-charts-legend-entry',
                    template: `
    <span [title]="formattedLabel" tabindex="-1" [class.active]="isActive" (click)="select.emit(formattedLabel)">
      <span class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"> </span>
      <span class="legend-label-text">
        {{ trimmedLabel }}
      </span>
    </span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { color: [{
                type: Input
            }], label: [{
                type: Input
            }], formattedLabel: [{
                type: Input
            }], isActive: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], toggle: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFjOUcsTUFBTSxPQUFPLG9CQUFvQjtJQVpqQztRQWdCVyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsRCxhQUFRLEdBQW1DLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUQsZUFBVSxHQUFtQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hFLFdBQU0sR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQWU3RDtJQWJDLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUM7SUFDMUMsQ0FBQztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7O2lIQXZCVSxvQkFBb0I7cUdBQXBCLG9CQUFvQiw2VkFWckI7Ozs7Ozs7R0FPVDsyRkFHVSxvQkFBb0I7a0JBWmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUVVLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQU9QLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxZQUFZO2dCQU0xQixZQUFZO3NCQURYLFlBQVk7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1jaGFydHMtbGVnZW5kLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBbdGl0bGVdPVwiZm9ybWF0dGVkTGFiZWxcIiB0YWJpbmRleD1cIi0xXCIgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZVwiIChjbGljayk9XCJzZWxlY3QuZW1pdChmb3JtYXR0ZWRMYWJlbClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsLWNvbG9yXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwiY29sb3JcIiAoY2xpY2spPVwidG9nZ2xlLmVtaXQoZm9ybWF0dGVkTGFiZWwpXCI+IDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsLXRleHRcIj5cbiAgICAgICAge3sgdHJpbW1lZExhYmVsIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMZWdlbmRFbnRyeUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPHsgbmFtZTogc3RyaW5nIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPHsgbmFtZTogc3RyaW5nIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgdHJpbW1lZExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVkTGFiZWwgfHwgJyhlbXB0eSknO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmxhYmVsIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMubGFiZWwgfSk7XG4gIH1cbn1cbiJdfQ==