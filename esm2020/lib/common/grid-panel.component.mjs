import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class GridPanelComponent {
}
GridPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GridPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: GridPanelComponent, selector: "g[ngx-charts-grid-panel]", inputs: { width: "width", height: "height", x: "x", y: "y" }, ngImport: i0, template: `
    <svg:rect [attr.height]="height" [attr.width]="width" [attr.x]="x" [attr.y]="y" stroke="none" class="gridpanel" />
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GridPanelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-grid-panel]',
                    template: `
    <svg:rect [attr.height]="height" [attr.width]="width" [attr.x]="x" [attr.y]="y" stroke="none" class="gridpanel" />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { width: [{
                type: Input
            }], height: [{
                type: Input
            }], x: [{
                type: Input
            }], y: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vZ3JpZC1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUzFFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7bUdBQWxCLGtCQUFrQiw4SEFMbkI7O0dBRVQ7MkZBR1Usa0JBQWtCO2tCQVA5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRTs7R0FFVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxDQUFDO3NCQUFULEtBQUs7Z0JBQ0csQ0FBQztzQkFBVCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWdyaWQtcGFuZWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnJlY3QgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiIFthdHRyLndpZHRoXT1cIndpZHRoXCIgW2F0dHIueF09XCJ4XCIgW2F0dHIueV09XCJ5XCIgc3Ryb2tlPVwibm9uZVwiIGNsYXNzPVwiZ3JpZHBhbmVsXCIgLz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR3JpZFBhbmVsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHg6IG51bWJlcjtcbiAgQElucHV0KCkgeTogbnVtYmVyO1xufVxuIl19