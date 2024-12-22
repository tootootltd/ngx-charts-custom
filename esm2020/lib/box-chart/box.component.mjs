import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { easeSinInOut } from 'd3-ease';
import rfdc from 'rfdc';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/svg-linear-gradient.component";
const cloneDeep = rfdc();
export class BoxComponent {
    constructor(element, cd) {
        this.cd = cd;
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.BarOrientation = BarOrientation;
        this.initialized = false;
        this.hasGradient = false;
        this.hideBar = false;
        this.nativeElm = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    }
    update() {
        this.boxStrokeWidth = Math.max(this.strokeWidth, 1);
        this.whiskerStrokeWidth = Math.max(this.strokeWidth / 2, 1);
        this.medianLineWidth = 1.5 * this.strokeWidth;
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (this.gradient) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updateLineEl();
        this.updatePathEl();
        this.checkToHideBar();
        this.maskLineId = 'mask' + id().toString();
        this.maskLine = `url(#${this.maskLineId})`;
        if (this.cd) {
            this.cd.markForCheck();
        }
    }
    loadAnimation() {
        this.boxPath = this.oldPath = this.getStartingPath();
        this.oldLineCoordinates = this.getStartingLineCoordinates();
        setTimeout(this.update.bind(this), 100);
    }
    updatePathEl() {
        const nodeBar = select(this.nativeElm).selectAll('.bar');
        const path = this.getPath();
        if (this.animations) {
            nodeBar
                .attr('d', this.oldPath)
                .transition()
                .ease(easeSinInOut)
                .duration(500)
                .attrTween('d', this.pathTween(path, 4));
        }
        else {
            nodeBar.attr('d', path);
        }
        this.oldPath = path;
    }
    updateLineEl() {
        const lineEl = select(this.nativeElm).selectAll('.bar-line');
        const lineCoordinates = this.lineCoordinates;
        const oldLineCoordinates = this.oldLineCoordinates;
        if (this.animations) {
            lineEl
                .attr('x1', (_, index) => oldLineCoordinates[index].v1.x)
                .attr('y1', (_, index) => oldLineCoordinates[index].v1.y)
                .attr('x2', (_, index) => oldLineCoordinates[index].v2.x)
                .attr('y2', (_, index) => oldLineCoordinates[index].v2.y)
                .transition()
                .ease(easeSinInOut)
                .duration(500)
                .attr('x1', (_, index) => lineCoordinates[index].v1.x)
                .attr('y1', (_, index) => lineCoordinates[index].v1.y)
                .attr('x2', (_, index) => lineCoordinates[index].v2.x)
                .attr('y2', (_, index) => lineCoordinates[index].v2.y);
        }
        else {
            lineEl
                .attr('x1', (_, index) => lineCoordinates[index].v1.x)
                .attr('y1', (_, index) => lineCoordinates[index].v1.y)
                .attr('x2', (_, index) => lineCoordinates[index].v2.x)
                .attr('y2', (_, index) => lineCoordinates[index].v2.y);
        }
        this.oldLineCoordinates = [...lineCoordinates];
    }
    /**
     * See [D3 Selections](https://www.d3indepth.com/selections/)
     * @param d The joined data.
     * @param index The index of the element within the selection
     * @param node The node element (Line).
     */
    lineTween(attr, d, index, node) {
        const nodeLineEl = node[index];
        return nodeLineEl[attr].baseVal.value;
    }
    // TODO: Refactor into another .ts file if https://github.com/swimlane/ngx-charts/pull/1179 gets merged.
    pathTween(d1, precision) {
        return function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const path0 = this;
            const path1 = this.cloneNode();
            path1.setAttribute('d', d1);
            const n0 = path0?.getTotalLength();
            const n1 = path1?.getTotalLength();
            // Uniform sampling of distance based on specified precision.
            const distances = [0];
            let i = 0;
            const dt = precision / Math.max(n0, n1);
            while (i < 1) {
                distances.push(i);
                i += dt;
            }
            distances.push(1);
            // Compute point-interpolators at each distance.
            const points = distances.map((t) => {
                const p0 = path0.getPointAtLength(t * n0);
                const p1 = path1.getPointAtLength(t * n1);
                return interpolate([p0.x, p0.y], [p1.x, p1.y]);
            });
            // 't': T is the fraction of time (between 0 and 1) since the transition began.
            return (t) => {
                return t < 1 ? 'M' + points.map((p) => p(t)).join('L') : d1;
            };
        };
    }
    getStartingPath() {
        if (!this.animations) {
            return this.getPath();
        }
        const radius = this.roundEdges ? 1 : 0;
        const { x, y } = this.lineCoordinates[2].v1;
        return roundedRect(x - this.width, y - 1, this.width, 2, radius, this.edges);
    }
    getPath() {
        const radius = this.getRadius();
        let path = '';
        path = roundedRect(this.x, this.y, this.width, this.height, Math.min(this.height, radius), this.edges);
        return path;
    }
    getStartingLineCoordinates() {
        if (!this.animations) {
            return [...this.lineCoordinates];
        }
        const lineCoordinates = cloneDeep(this.lineCoordinates);
        lineCoordinates[1].v1.y = lineCoordinates[1].v2.y = lineCoordinates[3].v1.y = lineCoordinates[3].v2.y = lineCoordinates[0].v1.y = lineCoordinates[0].v2.y =
            lineCoordinates[2].v1.y;
        return lineCoordinates;
    }
    getRadius() {
        let radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    }
    getGradient() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    getStartOpacity() {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    }
    get edges() {
        let edges = [false, false, false, false];
        if (this.roundEdges) {
            edges = [true, true, true, true];
        }
        return edges;
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    checkToHideBar() {
        this.hideBar = this.noBarWhenZero && this.height === 0;
    }
}
BoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: BoxComponent, selector: "g[ngx-charts-box]", inputs: { strokeColor: "strokeColor", strokeWidth: "strokeWidth", fill: "fill", data: "data", width: "width", height: "height", x: "x", y: "y", lineCoordinates: "lineCoordinates", roundEdges: "roundEdges", gradient: "gradient", gradientStops: "gradientStops", offset: "offset", isActive: "isActive", animations: "animations", ariaLabel: "ariaLabel", noBarWhenZero: "noBarWhenZero" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesOnChanges: true, ngImport: i0, template: `
    <svg:defs>
      <svg:g
        *ngIf="hasGradient"
        ngx-charts-svg-linear-gradient
        [orientation]="BarOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
      <svg:mask [attr.id]="maskLineId">
        <svg:g>
          <rect height="100%" width="100%" fill="white" fill-opacity="1" />
          <path class="bar" [attr.d]="boxPath" fill="black" fill-opacity="1" />
        </svg:g>
      </svg:mask>
    </svg:defs>
    <svg:g>
      <svg:path
        class="bar"
        role="img"
        tabIndex="-1"
        [class.active]="isActive"
        [class.hidden]="hideBar"
        [attr.d]="boxPath"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="boxStrokeWidth"
        [attr.aria-label]="ariaLabel"
        [attr.fill]="hasGradient ? gradientFill : fill"
        (click)="select.emit(data)"
      />
      <svg:line
        *ngFor="let line of lineCoordinates; let i = index"
        class="bar-line"
        [class.hidden]="hideBar"
        [attr.x1]="line.v1.x"
        [attr.y1]="line.v1.y"
        [attr.x2]="line.v2.x"
        [attr.y2]="line.v2.y"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="i === 2 ? medianLineWidth : whiskerStrokeWidth"
        [attr.mask]="i ? undefined : maskLine"
        fill="none"
      />
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-box]',
                    template: `
    <svg:defs>
      <svg:g
        *ngIf="hasGradient"
        ngx-charts-svg-linear-gradient
        [orientation]="BarOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
      <svg:mask [attr.id]="maskLineId">
        <svg:g>
          <rect height="100%" width="100%" fill="white" fill-opacity="1" />
          <path class="bar" [attr.d]="boxPath" fill="black" fill-opacity="1" />
        </svg:g>
      </svg:mask>
    </svg:defs>
    <svg:g>
      <svg:path
        class="bar"
        role="img"
        tabIndex="-1"
        [class.active]="isActive"
        [class.hidden]="hideBar"
        [attr.d]="boxPath"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="boxStrokeWidth"
        [attr.aria-label]="ariaLabel"
        [attr.fill]="hasGradient ? gradientFill : fill"
        (click)="select.emit(data)"
      />
      <svg:line
        *ngFor="let line of lineCoordinates; let i = index"
        class="bar-line"
        [class.hidden]="hideBar"
        [attr.x1]="line.v1.x"
        [attr.y1]="line.v1.y"
        [attr.x2]="line.v2.x"
        [attr.y2]="line.v2.y"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="i === 2 ? medianLineWidth : whiskerStrokeWidth"
        [attr.mask]="i ? undefined : maskLine"
        fill="none"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { strokeColor: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], fill: [{
                type: Input
            }], data: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], x: [{
                type: Input
            }], y: [{
                type: Input
            }], lineCoordinates: [{
                type: Input
            }], roundEdges: [{
                type: Input
            }], gradient: [{
                type: Input
            }], gradientStops: [{
                type: Input
            }], offset: [{
                type: Input
            }], isActive: [{
                type: Input
            }], animations: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], noBarWhenZero: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2JveC1jaGFydC9ib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUlaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFZLE1BQU0sY0FBYyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXZDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdqQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFHdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFxRHpCLE1BQU0sT0FBTyxZQUFZO0lBZ0R2QixZQUFZLE9BQW1CLEVBQVksRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF0Q3ZELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU3QixXQUFNLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsYUFBUSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFD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QUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsTUFBTTtpQkFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVE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bXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBCYXNlVHlwZSB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgeyBpbnRlcnBvbGF0ZSB9IGZyb20gJ2QzLWludGVycG9sYXRlJztcbmltcG9ydCB7IGVhc2VTaW5Jbk91dCB9IGZyb20gJ2QzLWVhc2UnO1xuXG5pbXBvcnQgcmZkYyBmcm9tICdyZmRjJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcbmltcG9ydCB7IElCb3hNb2RlbCB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IElWZWN0b3IyRCB9IGZyb20gJy4uL21vZGVscy9jb29yZGluYXRlcy5tb2RlbCc7XG5pbXBvcnQgeyBCYXJPcmllbnRhdGlvbiB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9iYXItb3JpZW50YXRpb24uZW51bSc7XG5pbXBvcnQgeyBHcmFkaWVudCB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9ncmFkaWVudC5pbnRlcmZhY2UnO1xuXG5jb25zdCBjbG9uZURlZXAgPSByZmRjKCk7XG5cbnR5cGUgTGluZUNvb3JkaW5hdGVzID0gW0lWZWN0b3IyRCwgSVZlY3RvcjJELCBJVmVjdG9yMkQsIElWZWN0b3IyRF07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1ib3hdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmRlZnM+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgKm5nSWY9XCJoYXNHcmFkaWVudFwiXG4gICAgICAgIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudFxuICAgICAgICBbb3JpZW50YXRpb25dPVwiQmFyT3JpZW50YXRpb24uVmVydGljYWxcIlxuICAgICAgICBbbmFtZV09XCJncmFkaWVudElkXCJcbiAgICAgICAgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIlxuICAgICAgLz5cbiAgICAgIDxzdmc6bWFzayBbYXR0ci5pZF09XCJtYXNrTGluZUlkXCI+XG4gICAgICAgIDxzdmc6Zz5cbiAgICAgICAgICA8cmVjdCBoZWlnaHQ9XCIxMDAlXCIgd2lkdGg9XCIxMDAlXCIgZmlsbD1cIndoaXRlXCIgZmlsbC1vcGFjaXR5PVwiMVwiIC8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJiYXJcIiBbYXR0ci5kXT1cImJveFBhdGhcIiBmaWxsPVwiYmxhY2tcIiBmaWxsLW9wYWNpdHk9XCIxXCIgLz5cbiAgICAgICAgPC9zdmc6Zz5cbiAgICAgIDwvc3ZnOm1hc2s+XG4gICAgPC9zdmc6ZGVmcz5cbiAgICA8c3ZnOmc+XG4gICAgICA8c3ZnOnBhdGhcbiAgICAgICAgY2xhc3M9XCJiYXJcIlxuICAgICAgICByb2xlPVwiaW1nXCJcbiAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIlxuICAgICAgICBbY2xhc3MuaGlkZGVuXT1cImhpZGVCYXJcIlxuICAgICAgICBbYXR0ci5kXT1cImJveFBhdGhcIlxuICAgICAgICBbYXR0ci5zdHJva2VdPVwic3Ryb2tlQ29sb3JcIlxuICAgICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwiYm94U3Ryb2tlV2lkdGhcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgIFthdHRyLmZpbGxdPVwiaGFzR3JhZGllbnQgPyBncmFkaWVudEZpbGwgOiBmaWxsXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdC5lbWl0KGRhdGEpXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmxpbmVcbiAgICAgICAgKm5nRm9yPVwibGV0IGxpbmUgb2YgbGluZUNvb3JkaW5hdGVzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgY2xhc3M9XCJiYXItbGluZVwiXG4gICAgICAgIFtjbGFzcy5oaWRkZW5dPVwiaGlkZUJhclwiXG4gICAgICAgIFthdHRyLngxXT1cImxpbmUudjEueFwiXG4gICAgICAgIFthdHRyLnkxXT1cImxpbmUudjEueVwiXG4gICAgICAgIFthdHRyLngyXT1cImxpbmUudjIueFwiXG4gICAgICAgIFthdHRyLnkyXT1cImxpbmUudjIueVwiXG4gICAgICAgIFthdHRyLnN0cm9rZV09XCJzdHJva2VDb2xvclwiXG4gICAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJpID09PSAyID8gbWVkaWFuTGluZVdpZHRoIDogd2hpc2tlclN0cm9rZVdpZHRoXCJcbiAgICAgICAgW2F0dHIubWFza109XCJpID8gdW5kZWZpbmVkIDogbWFza0xpbmVcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cm9rZVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZpbGw6IHN0cmluZztcbiAgQElucHV0KCkgZGF0YTogSUJveE1vZGVsO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgeDogbnVtYmVyO1xuICBASW5wdXQoKSB5OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVDb29yZGluYXRlczogTGluZUNvb3JkaW5hdGVzO1xuICBASW5wdXQoKSByb3VuZEVkZ2VzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JhZGllbnRTdG9wczogR3JhZGllbnRbXTtcbiAgQElucHV0KCkgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5vQmFyV2hlblplcm86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxJQm94TW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxJQm94TW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPElCb3hNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQmFyT3JpZW50YXRpb24gPSBCYXJPcmllbnRhdGlvbjtcblxuICBuYXRpdmVFbG06IGFueTtcblxuICAvLyBQYXRoIHJlbGF0ZWQgcHJvcGVydGllcy5cbiAgb2xkUGF0aDogc3RyaW5nO1xuICBib3hQYXRoOiBzdHJpbmc7XG4gIG9sZExpbmVDb29yZGluYXRlczogTGluZUNvb3JkaW5hdGVzO1xuXG4gIC8vIENvbG9yIHJlbGF0ZWQgcHJvcGVydGllcy5cbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xuICBncmFkaWVudEZpbGw6IHN0cmluZztcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaGFzR3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaGlkZUJhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBNYXNrIFBhdGggdG8gY3V0IHRoZSBsaW5lIG9uIHRoZSBib3ggcGFydC4gKi9cbiAgbWFza0xpbmU6IHN0cmluZztcbiAgLyoqIE1hc2sgUGF0aCBJZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBtYXNrIGVsZW1lbnQgKi9cbiAgbWFza0xpbmVJZDogc3RyaW5nO1xuXG4gIGJveFN0cm9rZVdpZHRoOiBudW1iZXI7XG4gIHdoaXNrZXJTdHJva2VXaWR0aDogbnVtYmVyO1xuICBtZWRpYW5MaW5lV2lkdGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5uYXRpdmVFbG0gPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLmxvYWRBbmltYXRpb24oKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmJveFN0cm9rZVdpZHRoID0gTWF0aC5tYXgodGhpcy5zdHJva2VXaWR0aCwgMSk7XG4gICAgdGhpcy53aGlza2VyU3Ryb2tlV2lkdGggPSBNYXRoLm1heCh0aGlzLnN0cm9rZVdpZHRoIC8gMiwgMSk7XG4gICAgdGhpcy5tZWRpYW5MaW5lV2lkdGggPSAxLjUgKiB0aGlzLnN0cm9rZVdpZHRoO1xuXG4gICAgdGhpcy5ncmFkaWVudElkID0gJ2dyYWQnICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XG5cbiAgICBpZiAodGhpcy5ncmFkaWVudCkge1xuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxpbmVFbCgpO1xuICAgIHRoaXMudXBkYXRlUGF0aEVsKCk7XG4gICAgdGhpcy5jaGVja1RvSGlkZUJhcigpO1xuICAgIHRoaXMubWFza0xpbmVJZCA9ICdtYXNrJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1hc2tMaW5lID0gYHVybCgjJHt0aGlzLm1hc2tMaW5lSWR9KWA7XG5cbiAgICBpZiAodGhpcy5jZCkge1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBsb2FkQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuYm94UGF0aCA9IHRoaXMub2xkUGF0aCA9IHRoaXMuZ2V0U3RhcnRpbmdQYXRoKCk7XG4gICAgdGhpcy5vbGRMaW5lQ29vcmRpbmF0ZXMgPSB0aGlzLmdldFN0YXJ0aW5nTGluZUNvb3JkaW5hdGVzKCk7XG4gICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpLCAxMDApO1xuICB9XG5cbiAgdXBkYXRlUGF0aEVsKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVCYXIgPSBzZWxlY3QodGhpcy5uYXRpdmVFbG0pLnNlbGVjdEFsbCgnLmJhcicpO1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKTtcbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XG4gICAgICBub2RlQmFyXG4gICAgICAgIC5hdHRyKCdkJywgdGhpcy5vbGRQYXRoKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5lYXNlKGVhc2VTaW5Jbk91dClcbiAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLmF0dHJUd2VlbignZCcsIHRoaXMucGF0aFR3ZWVuKHBhdGgsIDQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZUJhci5hdHRyKCdkJywgcGF0aCk7XG4gICAgfVxuICAgIHRoaXMub2xkUGF0aCA9IHBhdGg7XG4gIH1cblxuICB1cGRhdGVMaW5lRWwoKTogdm9pZCB7XG4gICAgY29uc3QgbGluZUVsID0gc2VsZWN0KHRoaXMubmF0aXZlRWxtKS5zZWxlY3RBbGwoJy5iYXItbGluZScpO1xuICAgIGNvbnN0IGxpbmVDb29yZGluYXRlcyA9IHRoaXMubGluZUNvb3JkaW5hdGVzO1xuICAgIGNvbnN0IG9sZExpbmVDb29yZGluYXRlcyA9IHRoaXMub2xkTGluZUNvb3JkaW5hdGVzO1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIGxpbmVFbFxuICAgICAgICAuYXR0cigneDEnLCAoXywgaW5kZXgpID0+IG9sZExpbmVDb29yZGluYXRlc1tpbmRleF0udjEueClcbiAgICAgICAgLmF0dHIoJ3kxJywgKF8sIGluZGV4KSA9PiBvbGRMaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYxLnkpXG4gICAgICAgIC5hdHRyKCd4MicsIChfLCBpbmRleCkgPT4gb2xkTGluZUNvb3JkaW5hdGVzW2luZGV4XS52Mi54KVxuICAgICAgICAuYXR0cigneTInLCAoXywgaW5kZXgpID0+IG9sZExpbmVDb29yZGluYXRlc1tpbmRleF0udjIueSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShlYXNlU2luSW5PdXQpXG4gICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgIC5hdHRyKCd4MScsIChfLCBpbmRleCkgPT4gbGluZUNvb3JkaW5hdGVzW2luZGV4XS52MS54KVxuICAgICAgICAuYXR0cigneTEnLCAoXywgaW5kZXgpID0+IGxpbmVDb29yZGluYXRlc1tpbmRleF0udjEueSlcbiAgICAgICAgLmF0dHIoJ3gyJywgKF8sIGluZGV4KSA9PiBsaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYyLngpXG4gICAgICAgIC5hdHRyKCd5MicsIChfLCBpbmRleCkgPT4gbGluZUNvb3JkaW5hdGVzW2luZGV4XS52Mi55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZUVsXG4gICAgICAgIC5hdHRyKCd4MScsIChfLCBpbmRleCkgPT4gbGluZUNvb3JkaW5hdGVzW2luZGV4XS52MS54KVxuICAgICAgICAuYXR0cigneTEnLCAoXywgaW5kZXgpID0+IGxpbmVDb29yZGluYXRlc1tpbmRleF0udjEueSlcbiAgICAgICAgLmF0dHIoJ3gyJywgKF8sIGluZGV4KSA9PiBsaW5lQ29vcmRpbmF0ZXNbaW5kZXhdLnYyLngpXG4gICAgICAgIC5hdHRyKCd5MicsIChfLCBpbmRleCkgPT4gbGluZUNvb3JkaW5hdGVzW2luZGV4XS52Mi55KTtcbiAgICB9XG4gICAgdGhpcy5vbGRMaW5lQ29vcmRpbmF0ZXMgPSBbLi4ubGluZUNvb3JkaW5hdGVzXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWUgW0QzIFNlbGVjdGlvbnNdKGh0dHBzOi8vd3d3LmQzaW5kZXB0aC5jb20vc2VsZWN0aW9ucy8pXG4gICAqIEBwYXJhbSBkIFRoZSBqb2luZWQgZGF0YS5cbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIHNlbGVjdGlvblxuICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSBlbGVtZW50IChMaW5lKS5cbiAgICovXG4gIGxpbmVUd2VlbihhdHRyOiBzdHJpbmcsIGQ6IGFueSwgaW5kZXg6IG51bWJlciwgbm9kZTogQmFzZVR5cGVbXSB8IEFycmF5TGlrZTxCYXNlVHlwZT4pIHtcbiAgICBjb25zdCBub2RlTGluZUVsID0gbm9kZVtpbmRleF0gYXMgU1ZHTGluZUVsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGVMaW5lRWxbYXR0cl0uYmFzZVZhbC52YWx1ZTtcbiAgfVxuXG4gIC8vIFRPRE86IFJlZmFjdG9yIGludG8gYW5vdGhlciAudHMgZmlsZSBpZiBodHRwczovL2dpdGh1Yi5jb20vc3dpbWxhbmUvbmd4LWNoYXJ0cy9wdWxsLzExNzkgZ2V0cyBtZXJnZWQuXG4gIHBhdGhUd2VlbihkMTogc3RyaW5nLCBwcmVjaXNpb246IG51bWJlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcbiAgICAgIGNvbnN0IHBhdGgwID0gdGhpcztcbiAgICAgIGNvbnN0IHBhdGgxID0gdGhpcy5jbG9uZU5vZGUoKTtcbiAgICAgIHBhdGgxLnNldEF0dHJpYnV0ZSgnZCcsIGQxKTtcbiAgICAgIGNvbnN0IG4wID0gcGF0aDA/LmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICBjb25zdCBuMSA9IHBhdGgxPy5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgLy8gVW5pZm9ybSBzYW1wbGluZyBvZiBkaXN0YW5jZSBiYXNlZCBvbiBzcGVjaWZpZWQgcHJlY2lzaW9uLlxuICAgICAgY29uc3QgZGlzdGFuY2VzID0gWzBdO1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgY29uc3QgZHQgPSBwcmVjaXNpb24gLyBNYXRoLm1heChuMCwgbjEpO1xuICAgICAgd2hpbGUgKGkgPCAxKSB7XG4gICAgICAgIGRpc3RhbmNlcy5wdXNoKGkpO1xuICAgICAgICBpICs9IGR0O1xuICAgICAgfVxuICAgICAgZGlzdGFuY2VzLnB1c2goMSk7XG5cbiAgICAgIC8vIENvbXB1dGUgcG9pbnQtaW50ZXJwb2xhdG9ycyBhdCBlYWNoIGRpc3RhbmNlLlxuICAgICAgY29uc3QgcG9pbnRzID0gZGlzdGFuY2VzLm1hcCgodDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHAwID0gcGF0aDAuZ2V0UG9pbnRBdExlbmd0aCh0ICogbjApO1xuICAgICAgICBjb25zdCBwMSA9IHBhdGgxLmdldFBvaW50QXRMZW5ndGgodCAqIG4xKTtcbiAgICAgICAgcmV0dXJuIGludGVycG9sYXRlKFtwMC54LCBwMC55XSwgW3AxLngsIHAxLnldKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyAndCc6IFQgaXMgdGhlIGZyYWN0aW9uIG9mIHRpbWUgKGJldHdlZW4gMCBhbmQgMSkgc2luY2UgdGhlIHRyYW5zaXRpb24gYmVnYW4uXG4gICAgICByZXR1cm4gKHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gdCA8IDEgPyAnTScgKyBwb2ludHMubWFwKChwOiAodDogbnVtYmVyKSA9PiBhbnlbXSkgPT4gcCh0KSkuam9pbignTCcpIDogZDE7XG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICBnZXRTdGFydGluZ1BhdGgoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF0aCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMucm91bmRFZGdlcyA/IDEgOiAwO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5saW5lQ29vcmRpbmF0ZXNbMl0udjE7XG5cbiAgICByZXR1cm4gcm91bmRlZFJlY3QoeCAtIHRoaXMud2lkdGgsIHkgLSAxLCB0aGlzLndpZHRoLCAyLCByYWRpdXMsIHRoaXMuZWRnZXMpO1xuICB9XG5cbiAgZ2V0UGF0aCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKCk7XG4gICAgbGV0IHBhdGggPSAnJztcblxuICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIE1hdGgubWluKHRoaXMuaGVpZ2h0LCByYWRpdXMpLCB0aGlzLmVkZ2VzKTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0U3RhcnRpbmdMaW5lQ29vcmRpbmF0ZXMoKTogTGluZUNvb3JkaW5hdGVzIHtcbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9ucykge1xuICAgICAgcmV0dXJuIFsuLi50aGlzLmxpbmVDb29yZGluYXRlc107XG4gICAgfVxuXG4gICAgY29uc3QgbGluZUNvb3JkaW5hdGVzOiBMaW5lQ29vcmRpbmF0ZXMgPSBjbG9uZURlZXAodGhpcy5saW5lQ29vcmRpbmF0ZXMpO1xuXG4gICAgbGluZUNvb3JkaW5hdGVzWzFdLnYxLnkgPSBsaW5lQ29vcmRpbmF0ZXNbMV0udjIueSA9IGxpbmVDb29yZGluYXRlc1szXS52MS55ID0gbGluZUNvb3JkaW5hdGVzWzNdLnYyLnkgPSBsaW5lQ29vcmRpbmF0ZXNbMF0udjEueSA9IGxpbmVDb29yZGluYXRlc1swXS52Mi55ID1cbiAgICAgIGxpbmVDb29yZGluYXRlc1syXS52MS55O1xuXG4gICAgcmV0dXJuIGxpbmVDb29yZGluYXRlcztcbiAgfVxuXG4gIGdldFJhZGl1cygpOiBudW1iZXIge1xuICAgIGxldCByYWRpdXMgPSAwO1xuXG4gICAgaWYgKHRoaXMucm91bmRFZGdlcyAmJiB0aGlzLmhlaWdodCA+IDUgJiYgdGhpcy53aWR0aCA+IDUpIHtcbiAgICAgIHJhZGl1cyA9IE1hdGguZmxvb3IoTWF0aC5taW4oNSwgdGhpcy5oZWlnaHQgLyAyLCB0aGlzLndpZHRoIC8gMikpO1xuICAgIH1cblxuICAgIHJldHVybiByYWRpdXM7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpOiBHcmFkaWVudFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuZ2V0U3RhcnRPcGFjaXR5KClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG9mZnNldDogMTAwLFxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGdldFN0YXJ0T3BhY2l0eSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMpIHtcbiAgICAgIHJldHVybiAwLjI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVkZ2VzKCk6IGJvb2xlYW5bXSB7XG4gICAgbGV0IGVkZ2VzOiBbYm9vbGVhbiwgYm9vbGVhbiwgYm9vbGVhbiwgYm9vbGVhbl0gPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMpIHtcbiAgICAgIGVkZ2VzID0gW3RydWUsIHRydWUsIHRydWUsIHRydWVdO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1RvSGlkZUJhcigpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVCYXIgPSB0aGlzLm5vQmFyV2hlblplcm8gJiYgdGhpcy5oZWlnaHQgPT09IDA7XG4gIH1cbn1cbiJdfQ==