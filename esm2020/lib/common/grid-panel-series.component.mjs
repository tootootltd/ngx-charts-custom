import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./grid-panel.component";
var ClassEnum;
(function (ClassEnum) {
    ClassEnum["Odd"] = "odd";
    ClassEnum["Even"] = "even";
})(ClassEnum || (ClassEnum = {}));
export class GridPanelSeriesComponent {
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.gridPanels = this.getGridPanels();
    }
    getGridPanels() {
        return this.data.map(d => {
            let offset;
            let width;
            let height;
            let x;
            let y;
            let className = ClassEnum.Odd;
            if (this.orient === BarOrientation.Vertical) {
                const position = this.xScale(d.name);
                const positionIndex = Number.parseInt((position / this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = ClassEnum.Even;
                }
                offset = this.xScale.bandwidth() * this.xScale.paddingInner();
                width = this.xScale.bandwidth() + offset;
                height = this.dims.height;
                x = this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (this.orient === BarOrientation.Horizontal) {
                const position = this.yScale(d.name);
                const positionIndex = Number.parseInt((position / this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = ClassEnum.Even;
                }
                offset = this.yScale.bandwidth() * this.yScale.paddingInner();
                width = this.dims.width;
                height = this.yScale.bandwidth() + offset;
                x = 0;
                y = this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height,
                width,
                x,
                y
            };
        });
    }
}
GridPanelSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GridPanelSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridPanelSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: GridPanelSeriesComponent, selector: "g[ngx-charts-grid-panel-series]", inputs: { data: "data", dims: "dims", xScale: "xScale", yScale: "yScale", orient: "orient" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g
      ngx-charts-grid-panel
      *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'"
    ></svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.GridPanelComponent, selector: "g[ngx-charts-grid-panel]", inputs: ["width", "height", "x", "y"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GridPanelSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-grid-panel-series]',
                    template: `
    <svg:g
      ngx-charts-grid-panel
      *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'"
    ></svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { data: [{
                type: Input
            }], dims: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], orient: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixLQUFLLEVBQWEsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBWTlELElBQUssU0FHSjtBQUhELFdBQUssU0FBUztJQUNaLHdCQUFXLENBQUE7SUFDWCwwQkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhJLFNBQVMsS0FBVCxTQUFTLFFBR2I7QUFtQkQsTUFBTSxPQUFPLHdCQUF3QjtJQWFuQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBRTlCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsUUFBUSxFQUFFO2dCQUMzQyxNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXRGLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNCLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2lCQUM1QjtnQkFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUM5RCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDUDtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLFVBQVUsRUFBRTtnQkFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztpQkFDNUI7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFFOUQsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQzFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDdEM7WUFFRCxPQUFPO2dCQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDWixLQUFLLEVBQUUsU0FBUztnQkFDaEIsTUFBTTtnQkFDTixLQUFLO2dCQUNMLENBQUM7Z0JBQ0QsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O3FIQWxFVSx3QkFBd0I7eUdBQXhCLHdCQUF3QiwwTEFmekI7Ozs7Ozs7Ozs7OztHQVlUOzJGQUdVLHdCQUF3QjtrQkFqQnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBSVUsSUFBSTtzQkFBWixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgU2ltcGxlQ2hhbmdlcywgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi90eXBlcy9iYXItb3JpZW50YXRpb24uZW51bSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcblxuaW50ZXJmYWNlIEdyaWRQYW5lbCB7XG4gIGNsYXNzOiBDbGFzc0VudW07XG4gIGhlaWdodDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5lbnVtIENsYXNzRW51bSB7XG4gIE9kZCA9ICdvZGQnLFxuICBFdmVuID0gJ2V2ZW4nXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1ncmlkLXBhbmVsLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Z1xuICAgICAgbmd4LWNoYXJ0cy1ncmlkLXBhbmVsXG4gICAgICAqbmdGb3I9XCJsZXQgZ3JpZFBhbmVsIG9mIGdyaWRQYW5lbHNcIlxuICAgICAgW2hlaWdodF09XCJncmlkUGFuZWwuaGVpZ2h0XCJcbiAgICAgIFt3aWR0aF09XCJncmlkUGFuZWwud2lkdGhcIlxuICAgICAgW3hdPVwiZ3JpZFBhbmVsLnhcIlxuICAgICAgW3ldPVwiZ3JpZFBhbmVsLnlcIlxuICAgICAgW2NsYXNzLmdyaWQtcGFuZWxdPVwidHJ1ZVwiXG4gICAgICBbY2xhc3Mub2RkXT1cImdyaWRQYW5lbC5jbGFzcyA9PT0gJ29kZCdcIlxuICAgICAgW2NsYXNzLmV2ZW5dPVwiZ3JpZFBhbmVsLmNsYXNzID09PSAnZXZlbidcIlxuICAgID48L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUGFuZWxTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBncmlkUGFuZWxzOiBHcmlkUGFuZWxbXTtcblxuICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcblxuICBASW5wdXQoKSBkaW1zOiBWaWV3RGltZW5zaW9ucztcblxuICBASW5wdXQoKSB4U2NhbGU6IGFueTtcblxuICBASW5wdXQoKSB5U2NhbGU6IGFueTtcblxuICBASW5wdXQoKSBvcmllbnQ6IEJhck9yaWVudGF0aW9uO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZFBhbmVscyA9IHRoaXMuZ2V0R3JpZFBhbmVscygpO1xuICB9XG5cbiAgZ2V0R3JpZFBhbmVscygpOiBHcmlkUGFuZWxbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZCA9PiB7XG4gICAgICBsZXQgb2Zmc2V0O1xuICAgICAgbGV0IHdpZHRoO1xuICAgICAgbGV0IGhlaWdodDtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBsZXQgY2xhc3NOYW1lID0gQ2xhc3NFbnVtLk9kZDtcblxuICAgICAgaWYgKHRoaXMub3JpZW50ID09PSBCYXJPcmllbnRhdGlvbi5WZXJ0aWNhbCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy54U2NhbGUoZC5uYW1lKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25JbmRleCA9IE51bWJlci5wYXJzZUludCgocG9zaXRpb24gLyB0aGlzLnhTY2FsZS5zdGVwKCkpLnRvU3RyaW5nKCksIDEwKTtcblxuICAgICAgICBpZiAocG9zaXRpb25JbmRleCAlIDIgPT09IDEpIHtcbiAgICAgICAgICBjbGFzc05hbWUgPSBDbGFzc0VudW0uRXZlbjtcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKSAqIHRoaXMueFNjYWxlLnBhZGRpbmdJbm5lcigpO1xuICAgICAgICB3aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xuICAgICAgICBoZWlnaHQgPSB0aGlzLmRpbXMuaGVpZ2h0O1xuICAgICAgICB4ID0gdGhpcy54U2NhbGUoZC5uYW1lKSAtIG9mZnNldCAvIDI7XG4gICAgICAgIHkgPSAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudCA9PT0gQmFyT3JpZW50YXRpb24uSG9yaXpvbnRhbCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMueVNjYWxlKGQubmFtZSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoKHBvc2l0aW9uIC8gdGhpcy55U2NhbGUuc3RlcCgpKS50b1N0cmluZygpLCAxMCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uSW5kZXggJSAyID09PSAxKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gQ2xhc3NFbnVtLkV2ZW47XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCkgKiB0aGlzLnlTY2FsZS5wYWRkaW5nSW5uZXIoKTtcblxuICAgICAgICB3aWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCkgKyBvZmZzZXQ7XG4gICAgICAgIHggPSAwO1xuICAgICAgICB5ID0gdGhpcy55U2NhbGUoZC5uYW1lKSAtIG9mZnNldCAvIDI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgICAgY2xhc3M6IGNsYXNzTmFtZSxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19