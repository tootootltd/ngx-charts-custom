import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SvgRadialGradientComponent {
    constructor() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    get stops() {
        return this.stopsInput || this.stopsDefault;
    }
    set stops(value) {
        this.stopsInput = value;
    }
    ngOnChanges(changes) {
        this.r = '30%';
        if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
            this.stopsDefault = [
                {
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                },
                {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }
            ];
        }
    }
}
SvgRadialGradientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: SvgRadialGradientComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SvgRadialGradientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: SvgRadialGradientComponent, selector: "g[ngx-charts-svg-radial-gradient]", inputs: { color: "color", name: "name", startOpacity: "startOpacity", endOpacity: "endOpacity", cx: "cx", cy: "cy", stops: "stops" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:radialGradient [id]="name" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" gradientUnits="userSpaceOnUse">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: SvgRadialGradientComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-svg-radial-gradient]',
                    template: `
    <svg:radialGradient [id]="name" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" gradientUnits="userSpaceOnUse">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { color: [{
                type: Input
            }], name: [{
                type: Input
            }], startOpacity: [{
                type: Input
            }], endOpacity: [{
                type: Input
            }], cx: [{
                type: Input
            }], cy: [{
                type: Input
            }], stops: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vc3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFpQnBHLE1BQU0sT0FBTywwQkFBMEI7SUFkdkM7UUFrQlcsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLE9BQUUsR0FBVyxDQUFDLENBQUM7UUFDZixPQUFFLEdBQVcsQ0FBQyxDQUFDO0tBaUN6QjtJQS9CQyxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBaUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQU9ELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxjQUFjLElBQUksT0FBTyxJQUFJLFlBQVksSUFBSSxPQUFPLEVBQUU7WUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEI7b0JBQ0UsTUFBTSxFQUFFLENBQUM7b0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQzNCO2dCQUNEO29CQUNFLE1BQU0sRUFBRSxHQUFHO29CQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN6QjthQUNGLENBQUM7U0FDSDtJQUNILENBQUM7O3VIQXRDVSwwQkFBMEI7MkdBQTFCLDBCQUEwQixvT0FaM0I7Ozs7Ozs7OztHQVNUOzJGQUdVLDBCQUEwQjtrQkFkdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUdGLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyYWRpZW50IH0gZnJvbSAnLi90eXBlcy9ncmFkaWVudC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtc3ZnLXJhZGlhbC1ncmFkaWVudF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6cmFkaWFsR3JhZGllbnQgW2lkXT1cIm5hbWVcIiBbYXR0ci5jeF09XCJjeFwiIFthdHRyLmN5XT1cImN5XCIgW2F0dHIucl09XCJyXCIgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICA8c3ZnOnN0b3BcbiAgICAgICAgKm5nRm9yPVwibGV0IHN0b3Agb2Ygc3RvcHNcIlxuICAgICAgICBbYXR0ci5vZmZzZXRdPVwic3RvcC5vZmZzZXQgKyAnJSdcIlxuICAgICAgICBbc3R5bGUuc3RvcC1jb2xvcl09XCJzdG9wLmNvbG9yXCJcbiAgICAgICAgW3N0eWxlLnN0b3Atb3BhY2l0eV09XCJzdG9wLm9wYWNpdHlcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpyYWRpYWxHcmFkaWVudD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU3ZnUmFkaWFsR3JhZGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0YXJ0T3BhY2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSBlbmRPcGFjaXR5ID0gMTtcbiAgQElucHV0KCkgY3g6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGN5OiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBzdG9wcygpOiBHcmFkaWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wc0lucHV0IHx8IHRoaXMuc3RvcHNEZWZhdWx0O1xuICB9XG5cbiAgc2V0IHN0b3BzKHZhbHVlOiBHcmFkaWVudFtdKSB7XG4gICAgdGhpcy5zdG9wc0lucHV0ID0gdmFsdWU7XG4gIH1cblxuICByOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBzdG9wc0lucHV0OiBHcmFkaWVudFtdO1xuICBwcml2YXRlIHN0b3BzRGVmYXVsdDogR3JhZGllbnRbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5yID0gJzMwJSc7XG4gICAgaWYgKCdjb2xvcicgaW4gY2hhbmdlcyB8fCAnc3RhcnRPcGFjaXR5JyBpbiBjaGFuZ2VzIHx8ICdlbmRPcGFjaXR5JyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLnN0b3BzRGVmYXVsdCA9IFtcbiAgICAgICAge1xuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLnN0YXJ0T3BhY2l0eVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgb3BhY2l0eTogdGhpcy5lbmRPcGFjaXR5XG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfVxuICB9XG59XG4iXX0=