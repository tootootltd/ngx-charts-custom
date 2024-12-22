import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Orientation } from '../types/orientation.enum';
import * as i0 from "@angular/core";
export class AxisLabelComponent {
    constructor(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case Orientation.Top:
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case Orientation.Bottom:
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case Orientation.Left:
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case Orientation.Right:
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    }
}
AxisLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AxisLabelComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AxisLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: AxisLabelComponent, selector: "g[ngx-charts-axis-label]", inputs: { orient: "orient", label: "label", offset: "offset", width: "width", height: "height" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AxisLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-axis-label]',
                    template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { orient: [{
                type: Input
            }], label: [{
                type: Input
            }], offset: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vYXhlcy9heGlzLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBd0MsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQWlCeEQsTUFBTSxPQUFPLGtCQUFrQjtJQWdCN0IsWUFBWSxPQUFtQjtRQUgvQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFHVCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVwQixRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkIsS0FBSyxXQUFXLENBQUMsR0FBRztnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsTUFBTTtnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFDbkIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztnQkFDL0IsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLEtBQUs7Z0JBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsUUFBUTtTQUNUO0lBQ0gsQ0FBQzs7K0dBbERVLGtCQUFrQjttR0FBbEIsa0JBQWtCLHVMQWJuQjs7Ozs7Ozs7OztHQVVUOzJGQUdVLGtCQUFrQjtrQkFmOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7aUdBRVUsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yaWVudGF0aW9uIH0gZnJvbSAnLi4vdHlwZXMvb3JpZW50YXRpb24uZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1heGlzLWxhYmVsXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2Zzp0ZXh0XG4gICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3Ryb2tlV2lkdGhcIlxuICAgICAgW2F0dHIueF09XCJ4XCJcbiAgICAgIFthdHRyLnldPVwieVwiXG4gICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxuICAgID5cbiAgICAgIHt7IGxhYmVsIH19XG4gICAgPC9zdmc6dGV4dD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQXhpc0xhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgb3JpZW50OiBPcmllbnRhdGlvbjtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgb2Zmc2V0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuXG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgc3Ryb2tlV2lkdGg6IHN0cmluZztcbiAgdGV4dEFuY2hvcjogc3RyaW5nO1xuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuICB0ZXh0SGVpZ2h0ID0gMjU7XG4gIG1hcmdpbiA9IDU7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3Ryb2tlV2lkdGggPSAnMC4wMSc7XG4gICAgdGhpcy50ZXh0QW5jaG9yID0gJ21pZGRsZSc7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSAnJztcblxuICAgIHN3aXRjaCAodGhpcy5vcmllbnQpIHtcbiAgICAgIGNhc2UgT3JpZW50YXRpb24uVG9wOlxuICAgICAgICB0aGlzLnkgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBPcmllbnRhdGlvbi5Cb3R0b206XG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0O1xuICAgICAgICB0aGlzLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLkxlZnQ6XG4gICAgICAgIHRoaXMueSA9IC0odGhpcy5vZmZzZXQgKyB0aGlzLnRleHRIZWlnaHQgKyB0aGlzLm1hcmdpbik7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gJ3JvdGF0ZSgyNzApJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLlJpZ2h0OlxuICAgICAgICB0aGlzLnkgPSB0aGlzLm9mZnNldCArIHRoaXMubWFyZ2luO1xuICAgICAgICB0aGlzLnggPSAtdGhpcy5oZWlnaHQgLyAyO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9ICdyb3RhdGUoMjcwKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cbn1cbiJdfQ==