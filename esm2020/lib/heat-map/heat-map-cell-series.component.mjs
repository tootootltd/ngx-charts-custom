import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/tooltip/tooltip.directive";
import * as i3 from "./heat-map-cell.component";
export class HeatCellSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
    }
    ngOnInit() {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cells = this.getCells();
    }
    getCells() {
        const cells = [];
        this.data.map(row => {
            row.series.map(cell => {
                const value = cell.value;
                cell.series = row.name;
                cells.push({
                    row,
                    cell,
                    x: this.xScale(row.name),
                    y: this.yScale(cell.name),
                    width: this.xScale.bandwidth(),
                    height: this.yScale.bandwidth(),
                    fill: this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    }
    getTooltipText({ label, data, series }) {
        return `
      <span class="tooltip-label">${escapeLabel(series)} • ${escapeLabel(label)}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
    }
    trackBy(index, item) {
        return item.label;
    }
    onClick(data) {
        this.select.emit(data);
    }
}
HeatCellSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: HeatCellSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
HeatCellSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: HeatCellSeriesComponent, selector: "g[ngx-charts-heat-map-cell-series]", inputs: { data: "data", colors: "colors", xScale: "xScale", yScale: "yScale", gradient: "gradient", tooltipDisabled: "tooltipDisabled", tooltipText: "tooltipText", tooltipTemplate: "tooltipTemplate", animations: "animations" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g
      ngx-charts-heat-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (select)="onClick(c.cell)"
      (activate)="activate.emit(c.cell)"
      (deactivate)="deactivate.emit(c.cell)"
      [gradient]="gradient"
      [animations]="animations"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="placementTypes.Top"
      [tooltipType]="styleTypes.tooltip"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="{ series: c.series, name: c.label, value: c.data }"
    ></svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }, { kind: "component", type: i3.HeatMapCellComponent, selector: "g[ngx-charts-heat-map-cell]", inputs: ["fill", "x", "y", "width", "height", "data", "gradient", "animations"], outputs: ["select", "activate", "deactivate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: HeatCellSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-heat-map-cell-series]',
                    template: `
    <svg:g
      ngx-charts-heat-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (select)="onClick(c.cell)"
      (activate)="activate.emit(c.cell)"
      (deactivate)="deactivate.emit(c.cell)"
      [gradient]="gradient"
      [animations]="animations"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="placementTypes.Top"
      [tooltipType]="styleTypes.tooltip"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="{ series: c.series, name: c.label, value: c.data }"
    ></svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { data: [{
                type: Input
            }], colors: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], gradient: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipText: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvaGVhdC1tYXAvaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7QUEwQzFELE1BQU0sT0FBTyx1QkFBdUI7SUE1QnBDO1FBa0NXLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUEyQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGFBQVEsR0FBMkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxlQUFVLEdBQTJCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJbEUsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFDaEMsZUFBVSxHQUFHLFVBQVUsQ0FBQztLQXdEekI7SUF0REMsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFdkIsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxHQUFHO29CQUNILElBQUk7b0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLElBQUksRUFBRSxLQUFLO29CQUNYLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDN0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQW1EO1FBQ3JGLE9BQU87b0NBQ3lCLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDO2tDQUM3QyxJQUFJLENBQUMsY0FBYyxFQUFFO0tBQ2xELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWEsRUFBRSxJQUFJO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDOztvSEF6RVUsdUJBQXVCO3dHQUF2Qix1QkFBdUIsa1pBMUJ4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7MkZBR1UsdUJBQXVCO2tCQTVCbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO29CQUM5QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgRGF0YUl0ZW0sIFNlcmllcyB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi4vY29tbW9uL3Rvb2x0aXAvcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4uL2NvbW1vbi90b29sdGlwL3N0eWxlLnR5cGUnO1xuXG5pbnRlcmZhY2UgQ2VsbCB7XG4gIGNlbGw6IERhdGFJdGVtO1xuICBkYXRhOiBudW1iZXI7XG4gIGZpbGw6IHN0cmluZztcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHJvdzogU2VyaWVzO1xuICBzZXJpZXM6IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtaGVhdC1tYXAtY2VsbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5neC1jaGFydHMtaGVhdC1tYXAtY2VsbFxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY2VsbHM7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgW3hdPVwiYy54XCJcbiAgICAgIFt5XT1cImMueVwiXG4gICAgICBbd2lkdGhdPVwiYy53aWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcbiAgICAgIFtmaWxsXT1cImMuZmlsbFwiXG4gICAgICBbZGF0YV09XCJjLmRhdGFcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGMuY2VsbClcIlxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoYy5jZWxsKVwiXG4gICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoYy5jZWxsKVwiXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgICBuZ3gtdG9vbHRpcFxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwicGxhY2VtZW50VHlwZXMuVG9wXCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCJzdHlsZVR5cGVzLnRvb2x0aXBcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiB0b29sdGlwVGV4dChjKVwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwieyBzZXJpZXM6IGMuc2VyaWVzLCBuYW1lOiBjLmxhYmVsLCB2YWx1ZTogYy5kYXRhIH1cIlxuICAgID48L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBIZWF0Q2VsbFNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGV4dDogYW55O1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxEYXRhSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPERhdGFJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxEYXRhSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2VsbHM6IENlbGxbXTtcblxuICBwbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzO1xuICBzdHlsZVR5cGVzID0gU3R5bGVUeXBlcztcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcFRleHQpIHtcbiAgICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLmdldFRvb2x0aXBUZXh0O1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XG4gIH1cblxuICBnZXRDZWxscygpOiBDZWxsW10ge1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICB0aGlzLmRhdGEubWFwKHJvdyA9PiB7XG4gICAgICByb3cuc2VyaWVzLm1hcChjZWxsID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjZWxsLnZhbHVlO1xuICAgICAgICBjZWxsLnNlcmllcyA9IHJvdy5uYW1lO1xuXG4gICAgICAgIGNlbGxzLnB1c2goe1xuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBjZWxsLFxuICAgICAgICAgIHg6IHRoaXMueFNjYWxlKHJvdy5uYW1lKSxcbiAgICAgICAgICB5OiB0aGlzLnlTY2FsZShjZWxsLm5hbWUpLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKSxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpLFxuICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmdldENvbG9yKHZhbHVlKSxcbiAgICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgICBsYWJlbDogZm9ybWF0TGFiZWwoY2VsbC5uYW1lKSxcbiAgICAgICAgICBzZXJpZXM6IHJvdy5uYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2VsbHM7XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dCh7IGxhYmVsLCBkYXRhLCBzZXJpZXMgfTogeyBsYWJlbDogc3RyaW5nOyBkYXRhOiBudW1iZXI7IHNlcmllczogc3RyaW5nIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHNlcmllcyl9IOKAoiAke2VzY2FwZUxhYmVsKGxhYmVsKX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHtkYXRhLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLmxhYmVsO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgfVxufVxuIl19