import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { id } from '../utils/id';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/svg-radial-gradient.component";
export class PieArcComponent {
    constructor(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.barOrientation = BarOrientation;
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getGradient() {
        return this.gradient ? this.gradientFill : this.fill;
    }
    getPointerEvents() {
        return this.pointerEvents ? 'auto' : 'none';
    }
    update() {
        const calc = this.calculateArc();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = `url(#${this.radialGradientId})`;
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
        else {
            this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        }
    }
    calculateArc() {
        let outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = (this.outerRadius * this.value) / this.max;
        }
        return arc().innerRadius(this.innerRadius).outerRadius(outerRadius).cornerRadius(this.cornerRadius);
    }
    loadAnimation() {
        const node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        const calc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            const interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        })
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    }
    updateAnimation() {
        const node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        const calc = this.calculateArc();
        node
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    }
    onClick() {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => this.select.emit(this.data), 200);
    }
    onDblClick(event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event
        });
    }
}
PieArcComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieArcComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
PieArcComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: PieArcComponent, selector: "g[ngx-charts-pie-arc]", inputs: { fill: "fill", startAngle: "startAngle", endAngle: "endAngle", innerRadius: "innerRadius", outerRadius: "outerRadius", cornerRadius: "cornerRadius", value: "value", max: "max", data: "data", explodeSlices: "explodeSlices", gradient: "gradient", animate: "animate", pointerEvents: "pointerEvents", isActive: "isActive" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate", dblclick: "dblclick" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g class="arc-group">
      <svg:defs *ngIf="gradient">
        <svg:g ngx-charts-svg-radial-gradient [color]="fill" [name]="radialGradientId" [startOpacity]="startOpacity" />
      </svg:defs>
      <svg:path
        [attr.d]="path"
        class="arc"
        [class.active]="isActive"
        [attr.fill]="getGradient()"
        (click)="onClick()"
        (dblclick)="onDblClick($event)"
        (mouseenter)="activate.emit(data)"
        (mouseleave)="deactivate.emit(data)"
        [style.pointer-events]="getPointerEvents()"
      />
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.SvgRadialGradientComponent, selector: "g[ngx-charts-svg-radial-gradient]", inputs: ["color", "name", "startOpacity", "endOpacity", "cx", "cy", "stops"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieArcComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-pie-arc]',
                    template: `
    <svg:g class="arc-group">
      <svg:defs *ngIf="gradient">
        <svg:g ngx-charts-svg-radial-gradient [color]="fill" [name]="radialGradientId" [startOpacity]="startOpacity" />
      </svg:defs>
      <svg:path
        [attr.d]="path"
        class="arc"
        [class.active]="isActive"
        [attr.fill]="getGradient()"
        (click)="onClick()"
        (dblclick)="onDblClick($event)"
        (mouseenter)="activate.emit(data)"
        (mouseleave)="deactivate.emit(data)"
        [style.pointer-events]="getPointerEvents()"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { fill: [{
                type: Input
            }], startAngle: [{
                type: Input
            }], endAngle: [{
                type: Input
            }], innerRadius: [{
                type: Input
            }], outerRadius: [{
                type: Input
            }], cornerRadius: [{
                type: Input
            }], value: [{
                type: Input
            }], max: [{
                type: Input
            }], data: [{
                type: Input
            }], explodeSlices: [{
                type: Input
            }], gradient: [{
                type: Input
            }], animate: [{
                type: Input
            }], pointerEvents: [{
                type: Input
            }], isActive: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], dblclick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWFyYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFJWix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7OztBQXdCdEUsTUFBTSxPQUFPLGVBQWU7SUFnQzFCLFlBQVksT0FBbUI7UUE5QnRCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsYUFBUSxHQUFXLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRy9CLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBSXpCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhD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QkFBbkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGUgfSBmcm9tICdkMy1pbnRlcnBvbGF0ZSc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHsgYXJjIH0gZnJvbSAnZDMtc2hhcGUnO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2Jhci1vcmllbnRhdGlvbi5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXBpZS1hcmNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgY2xhc3M9XCJhcmMtZ3JvdXBcIj5cbiAgICAgIDxzdmc6ZGVmcyAqbmdJZj1cImdyYWRpZW50XCI+XG4gICAgICAgIDxzdmc6ZyBuZ3gtY2hhcnRzLXN2Zy1yYWRpYWwtZ3JhZGllbnQgW2NvbG9yXT1cImZpbGxcIiBbbmFtZV09XCJyYWRpYWxHcmFkaWVudElkXCIgW3N0YXJ0T3BhY2l0eV09XCJzdGFydE9wYWNpdHlcIiAvPlxuICAgICAgPC9zdmc6ZGVmcz5cbiAgICAgIDxzdmc6cGF0aFxuICAgICAgICBbYXR0ci5kXT1cInBhdGhcIlxuICAgICAgICBjbGFzcz1cImFyY1wiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImdldEdyYWRpZW50KClcIlxuICAgICAgICAoY2xpY2spPVwib25DbGljaygpXCJcbiAgICAgICAgKGRibGNsaWNrKT1cIm9uRGJsQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cImFjdGl2YXRlLmVtaXQoZGF0YSlcIlxuICAgICAgICAobW91c2VsZWF2ZSk9XCJkZWFjdGl2YXRlLmVtaXQoZGF0YSlcIlxuICAgICAgICBbc3R5bGUucG9pbnRlci1ldmVudHNdPVwiZ2V0UG9pbnRlckV2ZW50cygpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllQXJjQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZmlsbDogc3RyaW5nO1xuICBASW5wdXQoKSBzdGFydEFuZ2xlOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBlbmRBbmdsZTogbnVtYmVyID0gTWF0aC5QSSAqIDI7XG4gIEBJbnB1dCgpIGlubmVyUmFkaXVzOiBudW1iZXI7XG4gIEBJbnB1dCgpIG91dGVyUmFkaXVzOiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1czogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gIEBJbnB1dCgpIGRhdGE6IERhdGFJdGVtO1xuICBASW5wdXQoKSBleHBsb2RlU2xpY2VzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwb2ludGVyRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYmFyT3JpZW50YXRpb24gPSBCYXJPcmllbnRhdGlvbjtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcGF0aDogYW55O1xuICBzdGFydE9wYWNpdHk6IG51bWJlcjtcbiAgcmFkaWFsR3JhZGllbnRJZDogc3RyaW5nO1xuICBncmFkaWVudEZpbGw6IHN0cmluZztcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF90aW1lb3V0O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ3JhZGllbnQgPyB0aGlzLmdyYWRpZW50RmlsbCA6IHRoaXMuZmlsbDtcbiAgfVxuXG4gIGdldFBvaW50ZXJFdmVudHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wb2ludGVyRXZlbnRzID8gJ2F1dG8nIDogJ25vbmUnO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGMgPSB0aGlzLmNhbGN1bGF0ZUFyYygpO1xuICAgIHRoaXMuc3RhcnRPcGFjaXR5ID0gMC41O1xuICAgIHRoaXMucmFkaWFsR3JhZGllbnRJZCA9ICdsaW5lYXJHcmFkJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5yYWRpYWxHcmFkaWVudElkfSlgO1xuXG4gICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVBbmltYXRpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXRoID0gY2FsYy5zdGFydEFuZ2xlKHRoaXMuc3RhcnRBbmdsZSkuZW5kQW5nbGUodGhpcy5lbmRBbmdsZSkoKTtcbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVBcmMoKTogYW55IHtcbiAgICBsZXQgb3V0ZXJSYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzO1xuICAgIGlmICh0aGlzLmV4cGxvZGVTbGljZXMgJiYgdGhpcy5pbm5lclJhZGl1cyA9PT0gMCkge1xuICAgICAgb3V0ZXJSYWRpdXMgPSAodGhpcy5vdXRlclJhZGl1cyAqIHRoaXMudmFsdWUpIC8gdGhpcy5tYXg7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyYygpLmlubmVyUmFkaXVzKHRoaXMuaW5uZXJSYWRpdXMpLm91dGVyUmFkaXVzKG91dGVyUmFkaXVzKS5jb3JuZXJSYWRpdXModGhpcy5jb3JuZXJSYWRpdXMpO1xuICB9XG5cbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gc2VsZWN0KHRoaXMuZWxlbWVudClcbiAgICAgIC5zZWxlY3RBbGwoJy5hcmMnKVxuICAgICAgLmRhdGEoW3sgc3RhcnRBbmdsZTogdGhpcy5zdGFydEFuZ2xlLCBlbmRBbmdsZTogdGhpcy5lbmRBbmdsZSB9XSk7XG5cbiAgICBjb25zdCBjYWxjID0gdGhpcy5jYWxjdWxhdGVBcmMoKTtcblxuICAgIG5vZGVcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XG4gICAgICAgIGNvbnN0IGNvcHlPZkQgPSBPYmplY3QuYXNzaWduKHt9LCBkKTtcbiAgICAgICAgY29weU9mRC5lbmRBbmdsZSA9IGNvcHlPZkQuc3RhcnRBbmdsZTtcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoY29weU9mRCwgY29weU9mRCk7XG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAuYXR0clR3ZWVuKCdkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgKDxhbnk+dGhpcykuX2N1cnJlbnQgPSAoPGFueT50aGlzKS5fY3VycmVudCB8fCBkO1xuICAgICAgICBjb25zdCBpbnRlcnBvbGF0ZXIgPSBpbnRlcnBvbGF0ZSgoPGFueT50aGlzKS5fY3VycmVudCwgZCk7XG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICB1cGRhdGVBbmltYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpXG4gICAgICAuc2VsZWN0QWxsKCcuYXJjJylcbiAgICAgIC5kYXRhKFt7IHN0YXJ0QW5nbGU6IHRoaXMuc3RhcnRBbmdsZSwgZW5kQW5nbGU6IHRoaXMuZW5kQW5nbGUgfV0pO1xuXG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XG5cbiAgICBub2RlXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgLmF0dHJUd2VlbignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gKDxhbnk+dGhpcykuX2N1cnJlbnQgfHwgZDtcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoKDxhbnk+dGhpcykuX2N1cnJlbnQsIGQpO1xuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9IGludGVycG9sYXRlcigwKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGMoaW50ZXJwb2xhdGVyKHQpKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgdGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGEpLCAyMDApO1xuICB9XG5cbiAgb25EYmxDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuXG4gICAgdGhpcy5kYmxjbGljay5lbWl0KHtcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIG5hdGl2ZUV2ZW50OiBldmVudFxuICAgIH0pO1xuICB9XG59XG4iXX0=