import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';
import { escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/count/count.directive";
import * as i3 from "../common/svg-linear-gradient.component";
export class TreeMapCellComponent {
    constructor(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.orientation = BarOrientation;
        this.element = element.nativeElement;
    }
    ngOnChanges() {
        this.update();
        this.valueFormatting = this.valueFormatting || (value => value.toLocaleString());
        const labelFormatting = this.labelFormatting || (cell => escapeLabel(trimLabel(cell.label, 55)));
        const cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedValue = this.valueFormatting(cellData.value);
        this.formattedLabel = labelFormatting(cellData);
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradientStops();
    }
    update() {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            if (this.animations) {
                this.loadAnimation();
            }
            this.initialized = true;
        }
    }
    loadAnimation() {
        const node = select(this.element).select('.cell');
        node.attr('opacity', 0).attr('x', this.x).attr('y', this.y);
        this.animateToCurrentForm();
    }
    getTextColor() {
        return invertColor(this.fill);
    }
    animateToCurrentForm() {
        const node = select(this.element).select('.cell');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
        else {
            node.attr('opacity', 1).attr('x', this.x).attr('y', this.y).attr('width', this.width).attr('height', this.height);
        }
    }
    onClick() {
        this.select.emit(this.data);
    }
    getGradientStops() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
}
TreeMapCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TreeMapCellComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TreeMapCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: TreeMapCellComponent, selector: "g[ngx-charts-tree-map-cell]", inputs: { data: "data", fill: "fill", x: "x", y: "y", width: "width", height: "height", label: "label", value: "value", valueFormatting: "valueFormatting", labelFormatting: "labelFormatting", gradient: "gradient", animations: "animations" }, outputs: { select: "select" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g>
      <defs *ngIf="gradient">
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="orientation.Vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        [attr.width]="width"
        [attr.height]="height"
        [attr.x]="x"
        [attr.y]="y"
        class="cell"
        (click)="onClick()"
      />
      <svg:foreignObject
        *ngIf="width >= 70 && height >= 35"
        [attr.x]="x"
        [attr.y]="y"
        [attr.width]="width"
        [attr.height]="height"
        class="treemap-label"
        [style.pointer-events]="'none'"
      >
        <xhtml:p [style.color]="getTextColor()" [style.height]="height + 'px'" [style.width]="width + 'px'">
          <xhtml:span class="treemap-label" [innerHTML]="formattedLabel"> </xhtml:span>
          <xhtml:br />
          <xhtml:span
            *ngIf="animations"
            class="treemap-val"
            ngx-charts-count-up
            [countTo]="value"
            [valueFormatting]="valueFormatting"
          >
          </xhtml:span>
          <xhtml:span *ngIf="!animations" class="treemap-val">
            {{ formattedValue }}
          </xhtml:span>
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.CountUpDirective, selector: "[ngx-charts-count-up]", inputs: ["countDuration", "countPrefix", "countSuffix", "valueFormatting", "countDecimals", "countTo", "countFrom"], outputs: ["countChange", "countFinish"] }, { kind: "component", type: i3.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TreeMapCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-tree-map-cell]',
                    template: `
    <svg:g>
      <defs *ngIf="gradient">
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="orientation.Vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        [attr.width]="width"
        [attr.height]="height"
        [attr.x]="x"
        [attr.y]="y"
        class="cell"
        (click)="onClick()"
      />
      <svg:foreignObject
        *ngIf="width >= 70 && height >= 35"
        [attr.x]="x"
        [attr.y]="y"
        [attr.width]="width"
        [attr.height]="height"
        class="treemap-label"
        [style.pointer-events]="'none'"
      >
        <xhtml:p [style.color]="getTextColor()" [style.height]="height + 'px'" [style.width]="width + 'px'">
          <xhtml:span class="treemap-label" [innerHTML]="formattedLabel"> </xhtml:span>
          <xhtml:br />
          <xhtml:span
            *ngIf="animations"
            class="treemap-val"
            ngx-charts-count-up
            [countTo]="value"
            [valueFormatting]="valueFormatting"
          >
          </xhtml:span>
          <xhtml:span *ngIf="!animations" class="treemap-val">
            {{ formattedValue }}
          </xhtml:span>
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { data: [{
                type: Input
            }], fill: [{
                type: Input
            }], x: [{
                type: Input
            }], y: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], label: [{
                type: Input
            }], value: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], labelFormatting: [{
                type: Input
            }], gradient: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi90cmVlLW1hcC90cmVlLW1hcC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUF5Qix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHakMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7OztBQW9EdEUsTUFBTSxPQUFPLG9CQUFvQjtJQTZCL0IsWUFBWSxPQUFtQjtRQWpCdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBVXRDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLGdCQUFXLEdBQUcsY0FBYyxDQUFDO1FBRzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNB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LElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTztZQUNMO2dCQUNFLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLEdBQUc7YUFDYjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLENBQUM7YUFDWDtTQUNGLENBQUM7SUFDSixDQUFDOztpSEE5R1Usb0JBQW9CO3FHQUFwQixvQkFBb0IseVdBaERyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNUOzJGQUdVLG9CQUFvQjtrQkFsRGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2lHQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csQ0FBQztzQkFBVCxLQUFLO2dCQUNHLENBQUM7c0JBQVQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7IGludmVydENvbG9yIH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgR3JhZGllbnQgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvZ3JhZGllbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2Jhci1vcmllbnRhdGlvbi5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXRyZWUtbWFwLWNlbGxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmc+XG4gICAgICA8ZGVmcyAqbmdJZj1cImdyYWRpZW50XCI+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudFxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvbi5WZXJ0aWNhbFwiXG4gICAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXG4gICAgICAgICAgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIlxuICAgICAgICAvPlxuICAgICAgPC9kZWZzPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnQgPyBncmFkaWVudFVybCA6IGZpbGxcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICBbYXR0ci54XT1cInhcIlxuICAgICAgICBbYXR0ci55XT1cInlcIlxuICAgICAgICBjbGFzcz1cImNlbGxcIlxuICAgICAgICAoY2xpY2spPVwib25DbGljaygpXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmZvcmVpZ25PYmplY3RcbiAgICAgICAgKm5nSWY9XCJ3aWR0aCA+PSA3MCAmJiBoZWlnaHQgPj0gMzVcIlxuICAgICAgICBbYXR0ci54XT1cInhcIlxuICAgICAgICBbYXR0ci55XT1cInlcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICBjbGFzcz1cInRyZWVtYXAtbGFiZWxcIlxuICAgICAgICBbc3R5bGUucG9pbnRlci1ldmVudHNdPVwiJ25vbmUnXCJcbiAgICAgID5cbiAgICAgICAgPHhodG1sOnAgW3N0eWxlLmNvbG9yXT1cImdldFRleHRDb2xvcigpXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHQgKyAncHgnXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoICsgJ3B4J1wiPlxuICAgICAgICAgIDx4aHRtbDpzcGFuIGNsYXNzPVwidHJlZW1hcC1sYWJlbFwiIFtpbm5lckhUTUxdPVwiZm9ybWF0dGVkTGFiZWxcIj4gPC94aHRtbDpzcGFuPlxuICAgICAgICAgIDx4aHRtbDpiciAvPlxuICAgICAgICAgIDx4aHRtbDpzcGFuXG4gICAgICAgICAgICAqbmdJZj1cImFuaW1hdGlvbnNcIlxuICAgICAgICAgICAgY2xhc3M9XCJ0cmVlbWFwLXZhbFwiXG4gICAgICAgICAgICBuZ3gtY2hhcnRzLWNvdW50LXVwXG4gICAgICAgICAgICBbY291bnRUb109XCJ2YWx1ZVwiXG4gICAgICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwveGh0bWw6c3Bhbj5cbiAgICAgICAgICA8eGh0bWw6c3BhbiAqbmdJZj1cIiFhbmltYXRpb25zXCIgY2xhc3M9XCJ0cmVlbWFwLXZhbFwiPlxuICAgICAgICAgICAge3sgZm9ybWF0dGVkVmFsdWUgfX1cbiAgICAgICAgICA8L3hodG1sOnNwYW4+XG4gICAgICAgIDwveGh0bWw6cD5cbiAgICAgIDwvc3ZnOmZvcmVpZ25PYmplY3Q+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU1hcENlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBEYXRhSXRlbTtcbiAgQElucHV0KCkgZmlsbDogc3RyaW5nO1xuICBASW5wdXQoKSB4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHk6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIC8vIEBJbnB1dCgpIHZhbHVlVHlwZTtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdyYWRpZW50U3RvcHM6IEdyYWRpZW50W107XG4gIGdyYWRpZW50SWQ6IHN0cmluZztcbiAgZ3JhZGllbnRVcmw6IHN0cmluZztcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XG4gIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmc7XG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgb3JpZW50YXRpb24gPSBCYXJPcmllbnRhdGlvbjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIHRoaXMudmFsdWVGb3JtYXR0aW5nID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKHZhbHVlID0+IHZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xuICAgIGNvbnN0IGxhYmVsRm9ybWF0dGluZyA9IHRoaXMubGFiZWxGb3JtYXR0aW5nIHx8IChjZWxsID0+IGVzY2FwZUxhYmVsKHRyaW1MYWJlbChjZWxsLmxhYmVsLCA1NSkpKTtcblxuICAgIGNvbnN0IGNlbGxEYXRhID0ge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgIH07XG5cbiAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcoY2VsbERhdGEudmFsdWUpO1xuICAgIHRoaXMuZm9ybWF0dGVkTGFiZWwgPSBsYWJlbEZvcm1hdHRpbmcoY2VsbERhdGEpO1xuXG4gICAgdGhpcy5ncmFkaWVudElkID0gJ2dyYWQnICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuZ3JhZGllbnRVcmwgPSBgdXJsKCMke3RoaXMuZ3JhZGllbnRJZH0pYDtcbiAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmdldEdyYWRpZW50U3RvcHMoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5hbmltYXRlVG9DdXJyZW50Rm9ybSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XG4gICAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gc2VsZWN0KHRoaXMuZWxlbWVudCkuc2VsZWN0KCcuY2VsbCcpO1xuXG4gICAgbm9kZS5hdHRyKCdvcGFjaXR5JywgMCkuYXR0cigneCcsIHRoaXMueCkuYXR0cigneScsIHRoaXMueSk7XG5cbiAgICB0aGlzLmFuaW1hdGVUb0N1cnJlbnRGb3JtKCk7XG4gIH1cblxuICBnZXRUZXh0Q29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaW52ZXJ0Q29sb3IodGhpcy5maWxsKTtcbiAgfVxuXG4gIGFuaW1hdGVUb0N1cnJlbnRGb3JtKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5jZWxsJyk7XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XG4gICAgICBub2RlXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAuYXR0cigneCcsIHRoaXMueClcbiAgICAgICAgLmF0dHIoJ3knLCB0aGlzLnkpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuYXR0cignb3BhY2l0eScsIDEpLmF0dHIoJ3gnLCB0aGlzLngpLmF0dHIoJ3knLCB0aGlzLnkpLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgZ2V0R3JhZGllbnRTdG9wcygpOiBHcmFkaWVudFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXG4gICAgICAgIG9wYWNpdHk6IDAuM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iXX0=