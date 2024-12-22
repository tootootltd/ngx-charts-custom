import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { line } from 'd3-shape';
import { TextAnchor } from '../common/types/text-anchor.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class GaugeAxisComponent {
    constructor() {
        this.rotate = '';
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = `rotate(${this.rotationAngle})`;
        this.ticks = this.getTicks();
    }
    getTicks() {
        const bigTickSegment = this.angleSpan / this.bigSegments;
        const smallTickSegment = bigTickSegment / this.smallSegments;
        const tickLength = 20;
        const ticks = {
            big: [],
            small: []
        };
        const startDistance = this.radius + 10;
        const textDist = startDistance + tickLength + 10;
        for (let i = 0; i <= this.bigSegments; i++) {
            const angleDeg = i * bigTickSegment;
            const angle = (angleDeg * Math.PI) / 180;
            const textAnchor = this.getTextAnchor(angleDeg);
            let skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                let text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor,
                    text,
                    textTransform: `
            translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(${-this.rotationAngle})
          `
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (let j = 1; j <= this.smallSegments; j++) {
                const smallAngleDeg = angleDeg + j * smallTickSegment;
                const smallAngle = (smallAngleDeg * Math.PI) / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    }
    getTextAnchor(angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        let textAnchor = TextAnchor.Middle;
        if (angle > 45 && angle <= 135) {
            textAnchor = TextAnchor.Start;
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = TextAnchor.End;
        }
        return textAnchor;
    }
    getTickPath(startDistance, tickLength, angle) {
        const y1 = startDistance * Math.sin(angle);
        const y2 = (startDistance + tickLength) * Math.sin(angle);
        const x1 = startDistance * Math.cos(angle);
        const x2 = (startDistance + tickLength) * Math.cos(angle);
        const points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 }
        ];
        const lineGenerator = line()
            .x(d => d.x)
            .y(d => d.y);
        return lineGenerator(points);
    }
}
GaugeAxisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GaugeAxisComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GaugeAxisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: GaugeAxisComponent, selector: "g[ngx-charts-gauge-axis]", inputs: { bigSegments: "bigSegments", smallSegments: "smallSegments", min: "min", max: "max", angleSpan: "angleSpan", startAngle: "startAngle", radius: "radius", valueScale: "valueScale", tickFormatting: "tickFormatting" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g [attr.transform]="rotate">
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:text
          [style.textAnchor]="tick.textAnchor"
          [attr.transform]="tick.textTransform"
          alignment-baseline="central"
        >
          {{ tick.text }}
        </svg:text>
      </svg:g>
      <svg:g *ngFor="let tick of ticks.small" class="gauge-tick gauge-tick-small">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: GaugeAxisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-gauge-axis]',
                    template: `
    <svg:g [attr.transform]="rotate">
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:text
          [style.textAnchor]="tick.textAnchor"
          [attr.transform]="tick.textTransform"
          alignment-baseline="central"
        >
          {{ tick.text }}
        </svg:text>
      </svg:g>
      <svg:g *ngFor="let tick of ticks.small" class="gauge-tick gauge-tick-small">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { bigSegments: [{
                type: Input
            }], smallSegments: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], angleSpan: [{
                type: Input
            }], startAngle: [{
                type: Input
            }], radius: [{
                type: Input
            }], valueScale: [{
                type: Input
            }], tickFormatting: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXhpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9nYXVnZS9nYXVnZS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQXFDOUQsTUFBTSxPQUFPLGtCQUFrQjtJQXZCL0I7UUFvQ0UsV0FBTSxHQUFXLEVBQUUsQ0FBQztLQWtHckI7SUFoR0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0QsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sS0FBSyxHQUFHO1lBQ1osR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxJQUFJ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QkFBckIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbGluZSB9IGZyb20gJ2QzLXNoYXBlJztcbmltcG9ydCB7IFRleHRBbmNob3IgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvdGV4dC1hbmNob3IuZW51bSc7XG5cbmludGVyZmFjZSBCaWcge1xuICBsaW5lOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdGV4dEFuY2hvcjogc3RyaW5nO1xuICB0ZXh0VHJhbnNmb3JtOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBUaWNrcyB7XG4gIGJpZzogQmlnW107XG4gIHNtYWxsOiBBcnJheTx7IGxpbmU6IHN0cmluZyB9Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWdhdWdlLWF4aXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInJvdGF0ZVwiPlxuICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLmJpZ1wiIGNsYXNzPVwiZ2F1Z2UtdGljayBnYXVnZS10aWNrLWxhcmdlXCI+XG4gICAgICAgIDxzdmc6cGF0aCBbYXR0ci5kXT1cInRpY2subGluZVwiIC8+XG4gICAgICA8L3N2ZzpnPlxuICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLmJpZ1wiIGNsYXNzPVwiZ2F1Z2UtdGljayBnYXVnZS10aWNrLWxhcmdlXCI+XG4gICAgICAgIDxzdmc6dGV4dFxuICAgICAgICAgIFtzdHlsZS50ZXh0QW5jaG9yXT1cInRpY2sudGV4dEFuY2hvclwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRpY2sudGV4dFRyYW5zZm9ybVwiXG4gICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiY2VudHJhbFwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyB0aWNrLnRleHQgfX1cbiAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgIDwvc3ZnOmc+XG4gICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3Muc21hbGxcIiBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1zbWFsbFwiPlxuICAgICAgICA8c3ZnOnBhdGggW2F0dHIuZF09XCJ0aWNrLmxpbmVcIiAvPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHYXVnZUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBiaWdTZWdtZW50czogbnVtYmVyO1xuICBASW5wdXQoKSBzbWFsbFNlZ21lbnRzOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgYW5nbGVTcGFuOiBudW1iZXI7XG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGU6IG51bWJlcjtcbiAgQElucHV0KCkgcmFkaXVzOiBudW1iZXI7XG4gIEBJbnB1dCgpIHZhbHVlU2NhbGU6IGFueTtcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc6IGFueTtcblxuICB0aWNrczogVGlja3M7XG4gIHJvdGF0aW9uQW5nbGU6IG51bWJlcjtcbiAgcm90YXRlOiBzdHJpbmcgPSAnJztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdGF0aW9uQW5nbGUgPSAtOTAgKyB0aGlzLnN0YXJ0QW5nbGU7XG4gICAgdGhpcy5yb3RhdGUgPSBgcm90YXRlKCR7dGhpcy5yb3RhdGlvbkFuZ2xlfSlgO1xuICAgIHRoaXMudGlja3MgPSB0aGlzLmdldFRpY2tzKCk7XG4gIH1cblxuICBnZXRUaWNrcygpOiBUaWNrcyB7XG4gICAgY29uc3QgYmlnVGlja1NlZ21lbnQgPSB0aGlzLmFuZ2xlU3BhbiAvIHRoaXMuYmlnU2VnbWVudHM7XG4gICAgY29uc3Qgc21hbGxUaWNrU2VnbWVudCA9IGJpZ1RpY2tTZWdtZW50IC8gdGhpcy5zbWFsbFNlZ21lbnRzO1xuICAgIGNvbnN0IHRpY2tMZW5ndGggPSAyMDtcbiAgICBjb25zdCB0aWNrcyA9IHtcbiAgICAgIGJpZzogW10sXG4gICAgICBzbWFsbDogW11cbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnREaXN0YW5jZSA9IHRoaXMucmFkaXVzICsgMTA7XG4gICAgY29uc3QgdGV4dERpc3QgPSBzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCArIDEwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5iaWdTZWdtZW50czsgaSsrKSB7XG4gICAgICBjb25zdCBhbmdsZURlZyA9IGkgKiBiaWdUaWNrU2VnbWVudDtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKGFuZ2xlRGVnICogTWF0aC5QSSkgLyAxODA7XG5cbiAgICAgIGNvbnN0IHRleHRBbmNob3IgPSB0aGlzLmdldFRleHRBbmNob3IoYW5nbGVEZWcpO1xuXG4gICAgICBsZXQgc2tpcCA9IGZhbHNlO1xuICAgICAgaWYgKGkgPT09IDAgJiYgdGhpcy5hbmdsZVNwYW4gPT09IDM2MCkge1xuICAgICAgICBza2lwID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFza2lwKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gTnVtYmVyLnBhcnNlRmxvYXQodGhpcy52YWx1ZVNjYWxlLmludmVydChhbmdsZURlZykudG9TdHJpbmcoKSkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKHRoaXMudGlja0Zvcm1hdHRpbmcpIHtcbiAgICAgICAgICB0ZXh0ID0gdGhpcy50aWNrRm9ybWF0dGluZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB0aWNrcy5iaWcucHVzaCh7XG4gICAgICAgICAgbGluZTogdGhpcy5nZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoLCBhbmdsZSksXG4gICAgICAgICAgdGV4dEFuY2hvcixcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIHRleHRUcmFuc2Zvcm06IGBcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgke3RleHREaXN0ICogTWF0aC5jb3MoYW5nbGUpfSwgJHt0ZXh0RGlzdCAqIE1hdGguc2luKGFuZ2xlKX0pIHJvdGF0ZSgkey10aGlzLnJvdGF0aW9uQW5nbGV9KVxuICAgICAgICAgIGBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSB0aGlzLmJpZ1NlZ21lbnRzKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnNtYWxsU2VnbWVudHM7IGorKykge1xuICAgICAgICBjb25zdCBzbWFsbEFuZ2xlRGVnID0gYW5nbGVEZWcgKyBqICogc21hbGxUaWNrU2VnbWVudDtcbiAgICAgICAgY29uc3Qgc21hbGxBbmdsZSA9IChzbWFsbEFuZ2xlRGVnICogTWF0aC5QSSkgLyAxODA7XG5cbiAgICAgICAgdGlja3Muc21hbGwucHVzaCh7XG4gICAgICAgICAgbGluZTogdGhpcy5nZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoIC8gMiwgc21hbGxBbmdsZSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpY2tzO1xuICB9XG5cbiAgZ2V0VGV4dEFuY2hvcihhbmdsZTogbnVtYmVyKTogVGV4dEFuY2hvciB7XG4gICAgLy8gWzAsIDQ1XSA9ICdtaWRkbGUnO1xuICAgIC8vIFs0NiwgMTM1XSA9ICdzdGFydCc7XG4gICAgLy8gWzEzNiwgMjI1XSA9ICdtaWRkbGUnO1xuICAgIC8vIFsyMjYsIDMxNV0gPSAnZW5kJztcblxuICAgIGFuZ2xlID0gKHRoaXMuc3RhcnRBbmdsZSArIGFuZ2xlKSAlIDM2MDtcbiAgICBsZXQgdGV4dEFuY2hvciA9IFRleHRBbmNob3IuTWlkZGxlO1xuICAgIGlmIChhbmdsZSA+IDQ1ICYmIGFuZ2xlIDw9IDEzNSkge1xuICAgICAgdGV4dEFuY2hvciA9IFRleHRBbmNob3IuU3RhcnQ7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA+IDIyNSAmJiBhbmdsZSA8PSAzMTUpIHtcbiAgICAgIHRleHRBbmNob3IgPSBUZXh0QW5jaG9yLkVuZDtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRBbmNob3I7XG4gIH1cblxuICBnZXRUaWNrUGF0aChzdGFydERpc3RhbmNlOiBudW1iZXIsIHRpY2tMZW5ndGg6IG51bWJlciwgYW5nbGU6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3QgeTEgPSBzdGFydERpc3RhbmNlICogTWF0aC5zaW4oYW5nbGUpO1xuICAgIGNvbnN0IHkyID0gKHN0YXJ0RGlzdGFuY2UgKyB0aWNrTGVuZ3RoKSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICBjb25zdCB4MSA9IHN0YXJ0RGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgY29uc3QgeDIgPSAoc3RhcnREaXN0YW5jZSArIHRpY2tMZW5ndGgpICogTWF0aC5jb3MoYW5nbGUpO1xuXG4gICAgY29uc3QgcG9pbnRzID0gW1xuICAgICAgeyB4OiB4MSwgeTogeTEgfSxcbiAgICAgIHsgeDogeDIsIHk6IHkyIH1cbiAgICBdO1xuICAgIGNvbnN0IGxpbmVHZW5lcmF0b3IgPSBsaW5lPGFueT4oKVxuICAgICAgLngoZCA9PiBkLngpXG4gICAgICAueShkID0+IGQueSk7XG4gICAgcmV0dXJuIGxpbmVHZW5lcmF0b3IocG9pbnRzKTtcbiAgfVxufVxuIl19