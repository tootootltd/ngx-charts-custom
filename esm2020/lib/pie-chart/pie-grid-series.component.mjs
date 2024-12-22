import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { pie } from 'd3-shape';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./pie-arc.component";
export class PieGridSeriesComponent {
    constructor(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.layout = pie()
            .value(d => d.data.value)
            .sort(null);
        this.arcs = this.getArcs();
    }
    getArcs() {
        return this.layout(this.data).map((arc, index) => {
            const label = arc.data.data.name;
            const other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            const color = this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: this.animations && !other,
                pointerEvents: !other
            };
        });
    }
    onClick(data) {
        this.select.emit(this.data[0].data);
    }
    trackBy(index, item) {
        return item.data.name;
    }
    label(arc) {
        return arc.data.name;
    }
    color(arc) {
        return this.colors(this.label(arc));
    }
}
PieGridSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieGridSeriesComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
PieGridSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: PieGridSeriesComponent, selector: "g[ngx-charts-pie-grid-series]", inputs: { colors: "colors", data: "data", innerRadius: "innerRadius", outerRadius: "outerRadius", animations: "animations" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.PieArcComponent, selector: "g[ngx-charts-pie-arc]", inputs: ["fill", "startAngle", "endAngle", "innerRadius", "outerRadius", "cornerRadius", "value", "max", "data", "explodeSlices", "gradient", "animate", "pointerEvents", "isActive"], outputs: ["select", "activate", "deactivate", "dblclick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieGridSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-pie-grid-series]',
                    template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { colors: [{
                type: Input
            }], data: [{
                type: Input
            }], innerRadius: [{
                type: Input
            }], outerRadius: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL3BpZS1jaGFydC9waWUtZ3JpZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBSVosdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUF1Qy9CLE1BQU0sT0FBTyxzQkFBc0I7SUFlakMsWUFBWSxPQUFtQjtRQVp0QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFZO2FBQzFCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2pDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVsQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7YUFDcEI7WUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSztnQkFDN0IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVTtnQkFDdEMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2dCQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2xDLGFBQWEsRUFBRSxDQUFDLEtBQUs7YUFDdEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O21IQW5FVSxzQkFBc0I7dUdBQXRCLHNCQUFzQix1U0F4QnZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7MkZBR1Usc0JBQXNCO2tCQTFCbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7aUdBRVUsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwaWUgfSBmcm9tICdkMy1zaGFwZSc7XG5pbXBvcnQgeyBQaWVHcmlkRGF0YSwgUGllR3JpZERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpZUFyYyB7XG4gIGFuaW1hdGU6IGJvb2xlYW47XG4gIGNsYXNzOiBzdHJpbmc7XG4gIGRhdGE6IFBpZUdyaWREYXRhSXRlbTtcbiAgZW5kQW5nbGU6IG51bWJlcjtcbiAgZmlsbDogc3RyaW5nO1xuICBwb2ludGVyRXZlbnRzOiBib29sZWFuO1xuICBzdGFydEFuZ2xlOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1waWUtZ3JpZC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgY2xhc3M9XCJwaWUtZ3JpZC1hcmNzXCI+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1waWUtYXJjXG4gICAgICAgICpuZ0Zvcj1cImxldCBhcmMgb2YgYXJjczsgdHJhY2tCeTogdHJhY2tCeVwiXG4gICAgICAgIFthdHRyLmNsYXNzXT1cImFyYy5jbGFzc1wiXG4gICAgICAgIFtzdGFydEFuZ2xlXT1cImFyYy5zdGFydEFuZ2xlXCJcbiAgICAgICAgW2VuZEFuZ2xlXT1cImFyYy5lbmRBbmdsZVwiXG4gICAgICAgIFtpbm5lclJhZGl1c109XCJpbm5lclJhZGl1c1wiXG4gICAgICAgIFtvdXRlclJhZGl1c109XCJvdXRlclJhZGl1c1wiXG4gICAgICAgIFtmaWxsXT1cImNvbG9yKGFyYylcIlxuICAgICAgICBbdmFsdWVdPVwiYXJjLmRhdGEudmFsdWVcIlxuICAgICAgICBbZGF0YV09XCJhcmMuZGF0YVwiXG4gICAgICAgIFtncmFkaWVudF09XCJmYWxzZVwiXG4gICAgICAgIFtwb2ludGVyRXZlbnRzXT1cImFyYy5wb2ludGVyRXZlbnRzXCJcbiAgICAgICAgW2FuaW1hdGVdPVwiYXJjLmFuaW1hdGVcIlxuICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICA+PC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQaWVHcmlkU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBkYXRhOiBQaWVHcmlkRGF0YVtdO1xuICBASW5wdXQoKSBpbm5lclJhZGl1cyA9IDcwO1xuICBASW5wdXQoKSBvdXRlclJhZGl1cyA9IDgwO1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBsYXlvdXQ6IGFueTtcbiAgYXJjczogUGllQXJjW107XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMubGF5b3V0ID0gcGllPGFueSwgYW55PigpXG4gICAgICAudmFsdWUoZCA9PiBkLmRhdGEudmFsdWUpXG4gICAgICAuc29ydChudWxsKTtcblxuICAgIHRoaXMuYXJjcyA9IHRoaXMuZ2V0QXJjcygpO1xuICB9XG5cbiAgZ2V0QXJjcygpOiBQaWVBcmNbXSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0KHRoaXMuZGF0YSkubWFwKChhcmMsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGFyYy5kYXRhLmRhdGEubmFtZTtcbiAgICAgIGNvbnN0IG90aGVyID0gYXJjLmRhdGEuZGF0YS5vdGhlcjtcblxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGFyYy5zdGFydEFuZ2xlID0gMDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9ycyhsYWJlbCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBhcmMuZGF0YS5kYXRhLFxuICAgICAgICBjbGFzczogJ2FyYyAnICsgJ2FyYycgKyBpbmRleCxcbiAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgIHN0YXJ0QW5nbGU6IG90aGVyID8gMCA6IGFyYy5zdGFydEFuZ2xlLFxuICAgICAgICBlbmRBbmdsZTogYXJjLmVuZEFuZ2xlLFxuICAgICAgICBhbmltYXRlOiB0aGlzLmFuaW1hdGlvbnMgJiYgIW90aGVyLFxuICAgICAgICBwb2ludGVyRXZlbnRzOiAhb3RoZXJcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0YVswXS5kYXRhKTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLmRhdGEubmFtZTtcbiAgfVxuXG4gIGxhYmVsKGFyYyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGFyYy5kYXRhLm5hbWU7XG4gIH1cblxuICBjb2xvcihhcmMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbG9ycyh0aGlzLmxhYmVsKGFyYykpO1xuICB9XG59XG4iXX0=