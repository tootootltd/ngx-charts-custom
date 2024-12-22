import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class ScaleLegendComponent {
    constructor() {
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = `linear-gradient(to ${direction}, ${gradientValues})`;
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
}
ScaleLegendComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ScaleLegendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ScaleLegendComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: ScaleLegendComponent, selector: "ngx-charts-scale-legend", inputs: { valueRange: "valueRange", colors: "colors", height: "height", width: "width", horizontal: "horizontal" }, usesOnChanges: true, ngImport: i0, template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `, isInline: true, styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: ScaleLegendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-charts-scale-legend', template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}\n"] }]
        }], propDecorators: { valueRange: [{
                type: Input
            }], colors: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], horizontal: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBaUIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBd0J2SCxNQUFNLE9BQU8sb0JBQW9CO0lBdEJqQztRQTJCVyxlQUFVLEdBQVksS0FBSyxDQUFDO0tBeUJ0QztJQXJCQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLHNCQUFzQixTQUFTLEtBQUssY0FBYyxHQUFHLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsTUFBZ0IsRUFBRSxNQUFnQjtRQUMvQyxlQUFlO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2lIQTdCVSxvQkFBb0I7cUdBQXBCLG9CQUFvQix3TUFwQnJCOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDsyRkFLVSxvQkFBb0I7a0JBdEJoQyxTQUFTOytCQUNFLHlCQUF5QixZQUN6Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQsaUJBRWMsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4QkFHdEMsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1zY2FsZS1sZWdlbmQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwic2NhbGUtbGVnZW5kXCJcbiAgICAgIFtjbGFzcy5ob3Jpem9udGFsLWxlZ2VuZF09XCJob3Jpem9udGFsXCJcbiAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG9yaXpvbnRhbCA/IHVuZGVmaW5lZCA6IGhlaWdodFwiXG4gICAgICBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgPHNwYW4+e3sgdmFsdWVSYW5nZVsxXS50b0xvY2FsZVN0cmluZygpIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLXdyYXBcIiBbc3R5bGUuYmFja2dyb3VuZF09XCJncmFkaWVudFwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzBdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vc2NhbGUtbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNjYWxlTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgdmFsdWVSYW5nZTogbnVtYmVyW107XG4gIEBJbnB1dCgpIGNvbG9yczogYW55O1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdyYWRpZW50OiBzdHJpbmc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IGdyYWRpZW50VmFsdWVzID0gdGhpcy5ncmFkaWVudFN0cmluZyh0aGlzLmNvbG9ycy5yYW5nZSgpLCB0aGlzLmNvbG9ycy5kb21haW4oKSk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5ob3Jpem9udGFsID8gJ3JpZ2h0JyA6ICdib3R0b20nO1xuICAgIHRoaXMuZ3JhZGllbnQgPSBgbGluZWFyLWdyYWRpZW50KHRvICR7ZGlyZWN0aW9ufSwgJHtncmFkaWVudFZhbHVlc30pYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIHN0cmluZyB1c2VkIGluIHRoZSBncmFkaWVudCBzdHlsZXNoZWV0IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIGNvbG9ycyBhcnJheSBvZiBjb2xvcnNcbiAgICogQHBhcmFtIHNwbGl0cyBhcnJheSBvZiBzcGxpdHMgb24gYSBzY2FsZSBvZiAoMCwgMSlcbiAgICovXG4gIGdyYWRpZW50U3RyaW5nKGNvbG9yczogc3RyaW5nW10sIHNwbGl0czogbnVtYmVyW10pOiBzdHJpbmcge1xuICAgIC8vIGFkZCB0aGUgMTAwJVxuICAgIHNwbGl0cy5wdXNoKDEpO1xuICAgIGNvbnN0IHBhaXJzID0gW107XG4gICAgY29sb3JzLnJldmVyc2UoKS5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICBwYWlycy5wdXNoKGAke2N9ICR7TWF0aC5yb3VuZChzcGxpdHNbaV0gKiAxMDApfSVgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYWlycy5qb2luKCcsICcpO1xuICB9XG59XG4iXX0=