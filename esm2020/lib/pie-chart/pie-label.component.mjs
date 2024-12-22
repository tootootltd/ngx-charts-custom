import { isPlatformServer } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
import { TextAnchor } from '../common/types/text-anchor.enum';
import * as i0 from "@angular/core";
export class PieLabelComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.trimLabel = trimLabel;
    }
    ngOnChanges(changes) {
        this.setTransforms();
        this.update();
    }
    setTransforms() {
        if (isPlatformServer(this.platformId)) {
            this.styleTransform = `translate3d(${this.textX}px,${this.textY}px, 0)`;
            this.attrTransform = `translate(${this.textX},${this.textY})`;
            this.textTransition = !this.animations ? null : 'transform 0.75s';
        }
        else {
            const isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
            this.styleTransform = isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
            this.attrTransform = !isIE ? null : `translate(${this.textX},${this.textY})`;
            this.textTransition = isIE || !this.animations ? null : 'transform 0.75s';
        }
    }
    update() {
        let startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = (this.radius * this.value) / this.max;
        }
        const innerArc = arc().innerRadius(startRadius).outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        const innerPos = innerArc.centroid(this.data);
        let scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        const outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
    }
    get textX() {
        return this.data.pos[0];
    }
    get textY() {
        return this.data.pos[1];
    }
    textAnchor() {
        return this.midAngle(this.data) < Math.PI ? TextAnchor.Start : TextAnchor.End;
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
}
PieLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieLabelComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
PieLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: PieLabelComponent, selector: "g[ngx-charts-pie-label]", inputs: { data: "data", radius: "radius", label: "label", color: "color", max: "max", value: "value", explodeSlices: "explodeSlices", animations: "animations", labelTrim: "labelTrim", labelTrimSize: "labelTrimSize" }, usesOnChanges: true, ngImport: i0, template: `
    <title>{{ label }}</title>
    <svg:g [attr.transform]="attrTransform" [style.transform]="styleTransform" [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'"
      >
        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations"
    ></svg:path>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-pie-label]',
                    template: `
    <title>{{ label }}</title>
    <svg:g [attr.transform]="attrTransform" [style.transform]="styleTransform" [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'"
      >
        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations"
    ></svg:path>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { data: [{
                type: Input
            }], radius: [{
                type: Input
            }], label: [{
                type: Input
            }], color: [{
                type: Input
            }], max: [{
                type: Input
            }], value: [{
                type: Input
            }], explodeSlices: [{
                type: Input
            }], animations: [{
                type: Input
            }], labelTrim: [{
                type: Input
            }], labelTrimSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL3BpZS1jaGFydC9waWUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQW9CLE1BQU0sVUFBVSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBbUM5RCxNQUFNLE9BQU8saUJBQWlCO0lBa0I1QixZQUF3QyxVQUFlO1FBQWYsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQVY5QyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFTbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLElBQUksQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDO1lBQ3hFLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxJQUFJ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QkFBaUIsOFNBdkJsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7MkZBR1UsaUJBQWlCO2tCQXpCN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBbUJjLE1BQU07MkJBQUMsV0FBVzs0Q0FqQnRCLElBQUk7c0JBQVosS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhcmMsIERlZmF1bHRBcmNPYmplY3QgfSBmcm9tICdkMy1zaGFwZSc7XG5cbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBUZXh0QW5jaG9yIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3RleHQtYW5jaG9yLmVudW0nO1xuaW1wb3J0IHsgRGF0YUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGllRGF0YSBleHRlbmRzIERlZmF1bHRBcmNPYmplY3Qge1xuICBkYXRhOiBEYXRhSXRlbTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgcG9zOiBbbnVtYmVyLCBudW1iZXJdO1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtcGllLWxhYmVsXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRpdGxlPnt7IGxhYmVsIH19PC90aXRsZT5cbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cImF0dHJUcmFuc2Zvcm1cIiBbc3R5bGUudHJhbnNmb3JtXT1cInN0eWxlVHJhbnNmb3JtXCIgW3N0eWxlLnRyYW5zaXRpb25dPVwidGV4dFRyYW5zaXRpb25cIj5cbiAgICAgIDxzdmc6dGV4dFxuICAgICAgICBjbGFzcz1cInBpZS1sYWJlbFwiXG4gICAgICAgIFtjbGFzcy5hbmltYXRpb25dPVwiYW5pbWF0aW9uc1wiXG4gICAgICAgIGR5PVwiLjM1ZW1cIlxuICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCJ0ZXh0QW5jaG9yKClcIlxuICAgICAgICBbc3R5bGUuc2hhcGVSZW5kZXJpbmddPVwiJ2NyaXNwRWRnZXMnXCJcbiAgICAgID5cbiAgICAgICAge3sgbGFiZWxUcmltID8gdHJpbUxhYmVsKGxhYmVsLCBsYWJlbFRyaW1TaXplKSA6IGxhYmVsIH19XG4gICAgICA8L3N2Zzp0ZXh0PlxuICAgIDwvc3ZnOmc+XG4gICAgPHN2ZzpwYXRoXG4gICAgICBbYXR0ci5kXT1cImxpbmVcIlxuICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9yXCJcbiAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgIGNsYXNzPVwicGllLWxhYmVsLWxpbmUgbGluZVwiXG4gICAgICBbY2xhc3MuYW5pbWF0aW9uXT1cImFuaW1hdGlvbnNcIlxuICAgID48L3N2ZzpwYXRoPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQaWVMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IFBpZURhdGE7XG4gIEBJbnB1dCgpIHJhZGl1czogbnVtYmVyO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcbiAgQElucHV0KCkgZXhwbG9kZVNsaWNlczogYm9vbGVhbjtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsVHJpbTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsVHJpbVNpemU6IG51bWJlciA9IDEwO1xuXG4gIHRyaW1MYWJlbDogKGxhYmVsOiBzdHJpbmcsIG1heD86IG51bWJlcikgPT4gc3RyaW5nO1xuICBsaW5lOiBzdHJpbmc7XG4gIHN0eWxlVHJhbnNmb3JtOiBzdHJpbmc7XG4gIGF0dHJUcmFuc2Zvcm06IHN0cmluZztcbiAgdGV4dFRyYW5zaXRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogYW55KSB7XG4gICAgdGhpcy50cmltTGFiZWwgPSB0cmltTGFiZWw7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUcmFuc2Zvcm1zKCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHNldFRyYW5zZm9ybXMoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5zdHlsZVRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3RoaXMudGV4dFh9cHgsJHt0aGlzLnRleHRZfXB4LCAwKWA7XG4gICAgICB0aGlzLmF0dHJUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy50ZXh0WH0sJHt0aGlzLnRleHRZfSlgO1xuICAgICAgdGhpcy50ZXh0VHJhbnNpdGlvbiA9ICF0aGlzLmFuaW1hdGlvbnMgPyBudWxsIDogJ3RyYW5zZm9ybSAwLjc1cyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlzSUUgPSAvKGVkZ2V8bXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB0aGlzLnN0eWxlVHJhbnNmb3JtID0gaXNJRSA/IG51bGwgOiBgdHJhbnNsYXRlM2QoJHt0aGlzLnRleHRYfXB4LCR7dGhpcy50ZXh0WX1weCwgMClgO1xuICAgICAgdGhpcy5hdHRyVHJhbnNmb3JtID0gIWlzSUUgPyBudWxsIDogYHRyYW5zbGF0ZSgke3RoaXMudGV4dFh9LCR7dGhpcy50ZXh0WX0pYDtcbiAgICAgIHRoaXMudGV4dFRyYW5zaXRpb24gPSBpc0lFIHx8ICF0aGlzLmFuaW1hdGlvbnMgPyBudWxsIDogJ3RyYW5zZm9ybSAwLjc1cyc7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzdGFydFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgIGlmICh0aGlzLmV4cGxvZGVTbGljZXMpIHtcbiAgICAgIHN0YXJ0UmFkaXVzID0gKHRoaXMucmFkaXVzICogdGhpcy52YWx1ZSkgLyB0aGlzLm1heDtcbiAgICB9XG5cbiAgICBjb25zdCBpbm5lckFyYyA9IGFyYygpLmlubmVyUmFkaXVzKHN0YXJ0UmFkaXVzKS5vdXRlclJhZGl1cyhzdGFydFJhZGl1cyk7XG5cbiAgICAvLyBDYWxjdWxhdGUgaW5uZXJQb3MgdGhlbiBzY2FsZSBvdXRlciBwb3NpdGlvbiB0byBtYXRjaCBsYWJlbCBwb3NpdGlvblxuICAgIGNvbnN0IGlubmVyUG9zID0gaW5uZXJBcmMuY2VudHJvaWQodGhpcy5kYXRhKTtcblxuICAgIGxldCBzY2FsZSA9IHRoaXMuZGF0YS5wb3NbMV0gLyBpbm5lclBvc1sxXTtcbiAgICBpZiAodGhpcy5kYXRhLnBvc1sxXSA9PT0gMCB8fCBpbm5lclBvc1sxXSA9PT0gMCkge1xuICAgICAgc2NhbGUgPSAxO1xuICAgIH1cbiAgICBjb25zdCBvdXRlclBvcyA9IFtzY2FsZSAqIGlubmVyUG9zWzBdLCBzY2FsZSAqIGlubmVyUG9zWzFdXTtcblxuICAgIHRoaXMubGluZSA9IGBNJHtpbm5lclBvc31MJHtvdXRlclBvc31MJHt0aGlzLmRhdGEucG9zfWA7XG4gIH1cblxuICBnZXQgdGV4dFgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnBvc1swXTtcbiAgfVxuXG4gIGdldCB0ZXh0WSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGEucG9zWzFdO1xuICB9XG5cbiAgdGV4dEFuY2hvcigpOiBUZXh0QW5jaG9yIHtcbiAgICByZXR1cm4gdGhpcy5taWRBbmdsZSh0aGlzLmRhdGEpIDwgTWF0aC5QSSA/IFRleHRBbmNob3IuU3RhcnQgOiBUZXh0QW5jaG9yLkVuZDtcbiAgfVxuXG4gIG1pZEFuZ2xlKGQpOiBudW1iZXIge1xuICAgIHJldHVybiBkLnN0YXJ0QW5nbGUgKyAoZC5lbmRBbmdsZSAtIGQuc3RhcnRBbmdsZSkgLyAyO1xuICB9XG59XG4iXX0=