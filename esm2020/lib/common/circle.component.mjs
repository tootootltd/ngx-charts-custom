import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
export class CircleComponent {
    constructor() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    onClick() {
        this.select.emit(this.data);
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    ngOnChanges(changes) {
        this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
        this.classNames += 'circle';
    }
}
CircleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CircleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CircleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: CircleComponent, selector: "g[ngx-charts-circle]", inputs: { cx: "cx", cy: "cy", r: "r", fill: "fill", stroke: "stroke", data: "data", classNames: "classNames", circleOpacity: "circleOpacity", pointerEvents: "pointerEvents" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, host: { listeners: { "click": "onClick()", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesOnChanges: true, ngImport: i0, template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CircleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-circle]',
                    template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { cx: [{
                type: Input
            }], cy: [{
                type: Input
            }], r: [{
                type: Input
            }], fill: [{
                type: Input
            }], stroke: [{
                type: Input
            }], data: [{
                type: Input
            }], classNames: [{
                type: Input
            }], circleOpacity: [{
                type: Input
            }], pointerEvents: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9jaXJjbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBQ3ZCLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQzs7QUFrQnZCLE1BQU0sT0FBTyxlQUFlO0lBaEI1QjtRQTJCWSxXQUFNLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0QsYUFBUSxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdELGVBQVUsR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQXFCMUU7SUFsQkMsT0FBTztRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEYsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7SUFDOUIsQ0FBQzs7NEdBakNVLGVBQWU7Z0dBQWYsZUFBZSwrYkFkaEI7Ozs7Ozs7Ozs7O0dBV1Q7MkZBR1UsZUFBZTtrQkFoQjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLENBQUM7c0JBQVQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUdQLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPO2dCQU1yQixZQUFZO3NCQURYLFlBQVk7dUJBQUMsWUFBWTtnQkFNMUIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSG9zdExpc3RlbmVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2lyY2xlXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpjaXJjbGVcbiAgICAgIFthdHRyLmN4XT1cImN4XCJcbiAgICAgIFthdHRyLmN5XT1cImN5XCJcbiAgICAgIFthdHRyLnJdPVwiclwiXG4gICAgICBbYXR0ci5maWxsXT1cImZpbGxcIlxuICAgICAgW2F0dHIuc3Ryb2tlXT1cInN0cm9rZVwiXG4gICAgICBbYXR0ci5vcGFjaXR5XT1cImNpcmNsZU9wYWNpdHlcIlxuICAgICAgW2F0dHIuY2xhc3NdPVwiY2xhc3NOYW1lc1wiXG4gICAgICBbYXR0ci5wb2ludGVyLWV2ZW50c109XCJwb2ludGVyRXZlbnRzXCJcbiAgICAvPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDaXJjbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjeDogbnVtYmVyO1xuICBASW5wdXQoKSBjeTogbnVtYmVyO1xuICBASW5wdXQoKSByOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZpbGw6IHN0cmluZztcbiAgQElucHV0KCkgc3Ryb2tlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRhdGE6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgY2xhc3NOYW1lczogc3RyaW5nW10gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGNpcmNsZU9wYWNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgcG9pbnRlckV2ZW50czogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxudW1iZXIgfCBzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxudW1iZXIgfCBzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPG51bWJlciB8IHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc05hbWVzID0gQXJyYXkuaXNBcnJheSh0aGlzLmNsYXNzTmFtZXMpID8gdGhpcy5jbGFzc05hbWVzLmpvaW4oJyAnKSA6ICcnO1xuICAgIHRoaXMuY2xhc3NOYW1lcyArPSAnY2lyY2xlJztcbiAgfVxufVxuIl19