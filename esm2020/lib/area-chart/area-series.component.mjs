import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { area } from 'd3-shape';
import { ScaleType } from '../common/types/scale-type.enum';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
import * as i0 from "@angular/core";
import * as i1 from "../common/area.component";
export class AreaSeriesComponent {
    constructor() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradient();
        let currentArea;
        let startingArea;
        const xProperty = d => {
            const label = d.name;
            return this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0((d, i) => this.yScale(d.d0))
                .y1((d, i) => this.yScale(d.d1));
            startingArea = area()
                .x(xProperty)
                .y0(d => this.yScale.range()[0])
                .y1(d => this.yScale.range()[0]);
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(() => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)))
                .y1(d => this.yScale(d.value));
            startingArea = area()
                .x(xProperty)
                .y0(d => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)))
                .y1(d => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)));
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = 0.8;
        let data = this.data.series;
        if (this.scaleType === ScaleType.Linear) {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === ScaleType.Time) {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    }
    updateGradient() {
        if (this.colors.scaleType === ScaleType.Linear) {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                const d0values = this.data.series.map(d => d.d0);
                const d1values = this.data.series.map(d => d.d1);
                const max = Math.max(...d1values);
                const min = Math.min(...d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                const values = this.data.series.map(d => d.value);
                const max = Math.max(...values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isInactive(entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
}
AreaSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AreaSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: AreaSeriesComponent, selector: "g[ngx-charts-area-series]", inputs: { data: "data", xScale: "xScale", yScale: "yScale", baseValue: "baseValue", colors: "colors", scaleType: "scaleType", stacked: "stacked", normalized: "normalized", gradient: "gradient", curve: "curve", activeEntries: "activeEntries", animations: "animations" }, outputs: { select: "select" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g
      ngx-charts-area
      class="area-series"
      [data]="data"
      [path]="path"
      [fill]="colors.getColor(data.name)"
      [stops]="gradientStops"
      [startingPath]="startingPath"
      [opacity]="opacity"
      [gradient]="gradient || hasGradient"
      [animations]="animations"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
  `, isInline: true, dependencies: [{ kind: "component", type: i1.AreaComponent, selector: "g[ngx-charts-area]", inputs: ["data", "path", "startingPath", "fill", "opacity", "startOpacity", "endOpacity", "gradient", "stops", "animations"], outputs: ["select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-area-series]',
                    template: `
    <svg:g
      ngx-charts-area
      class="area-series"
      [data]="data"
      [path]="path"
      [fill]="colors.getColor(data.name)"
      [stops]="gradientStops"
      [startingPath]="startingPath"
      [opacity]="opacity"
      [gradient]="gradient || hasGradient"
      [animations]="animations"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { data: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], baseValue: [{
                type: Input
            }], colors: [{
                type: Input
            }], scaleType: [{
                type: Input
            }], stacked: [{
                type: Input
            }], normalized: [{
                type: Input
            }], gradient: [{
                type: Input
            }], curve: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvYXJlYS1jaGFydC9hcmVhLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFzQnJFLE1BQU0sT0FBTyxtQkFBbUI7SUFwQmhDO1FBd0JXLGNBQVMsR0FBUSxNQUFNLENBQUM7UUFHeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBSTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7S0FtR3ZDO0lBMUZDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxXQUFXLENBQUM7UUFDaEIsSUFBSSxZQUFZLENBQUM7UUFFakIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxJQUFJ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S0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYXJlYSB9IGZyb20gJ2QzLXNoYXBlJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBHcmFkaWVudCB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9ncmFkaWVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NjYWxlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBBcmVhQ2hhcnRTZXJpZXMgfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBzb3J0TGluZWFyLCBzb3J0QnlUaW1lLCBzb3J0QnlEb21haW4gfSBmcm9tICcuLi91dGlscy9zb3J0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWFyZWEtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnXG4gICAgICBuZ3gtY2hhcnRzLWFyZWFcbiAgICAgIGNsYXNzPVwiYXJlYS1zZXJpZXNcIlxuICAgICAgW2RhdGFdPVwiZGF0YVwiXG4gICAgICBbcGF0aF09XCJwYXRoXCJcbiAgICAgIFtmaWxsXT1cImNvbG9ycy5nZXRDb2xvcihkYXRhLm5hbWUpXCJcbiAgICAgIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCJcbiAgICAgIFtzdGFydGluZ1BhdGhdPVwic3RhcnRpbmdQYXRoXCJcbiAgICAgIFtvcGFjaXR5XT1cIm9wYWNpdHlcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50IHx8IGhhc0dyYWRpZW50XCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZShkYXRhKVwiXG4gICAgICBbY2xhc3MuaW5hY3RpdmVdPVwiaXNJbmFjdGl2ZShkYXRhKVwiXG4gICAgLz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQXJlYVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IEFyZWFDaGFydFNlcmllcztcbiAgQElucHV0KCkgeFNjYWxlOiBhbnk7XG4gIEBJbnB1dCgpIHlTY2FsZTogYW55O1xuICBASW5wdXQoKSBiYXNlVmFsdWU6IGFueSA9ICdhdXRvJztcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgc2NhbGVUeXBlOiBTY2FsZVR5cGU7XG4gIEBJbnB1dCgpIHN0YWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbm9ybWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcbiAgQElucHV0KCkgY3VydmU6IGFueTtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgb3BhY2l0eTogbnVtYmVyO1xuICBwYXRoOiBzdHJpbmc7XG4gIHN0YXJ0aW5nUGF0aDogc3RyaW5nO1xuXG4gIGhhc0dyYWRpZW50OiBib29sZWFuO1xuICBncmFkaWVudFN0b3BzOiBHcmFkaWVudFtdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlR3JhZGllbnQoKTtcblxuICAgIGxldCBjdXJyZW50QXJlYTtcbiAgICBsZXQgc3RhcnRpbmdBcmVhO1xuXG4gICAgY29uc3QgeFByb3BlcnR5ID0gZCA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcbiAgICAgIHJldHVybiB0aGlzLnhTY2FsZShsYWJlbCk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnN0YWNrZWQgfHwgdGhpcy5ub3JtYWxpemVkKSB7XG4gICAgICBjdXJyZW50QXJlYSA9IGFyZWE8YW55PigpXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcbiAgICAgICAgLnkwKChkLCBpKSA9PiB0aGlzLnlTY2FsZShkLmQwKSlcbiAgICAgICAgLnkxKChkLCBpKSA9PiB0aGlzLnlTY2FsZShkLmQxKSk7XG5cbiAgICAgIHN0YXJ0aW5nQXJlYSA9IGFyZWE8YW55PigpXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcbiAgICAgICAgLnkwKGQgPT4gdGhpcy55U2NhbGUucmFuZ2UoKVswXSlcbiAgICAgICAgLnkxKGQgPT4gdGhpcy55U2NhbGUucmFuZ2UoKVswXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRBcmVhID0gYXJlYTxhbnk+KClcbiAgICAgICAgLngoeFByb3BlcnR5KVxuICAgICAgICAueTAoKCkgPT4gKHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKSlcbiAgICAgICAgLnkxKGQgPT4gdGhpcy55U2NhbGUoZC52YWx1ZSkpO1xuXG4gICAgICBzdGFydGluZ0FyZWEgPSBhcmVhPGFueT4oKVxuICAgICAgICAueCh4UHJvcGVydHkpXG4gICAgICAgIC55MChkID0+ICh0aGlzLmJhc2VWYWx1ZSA9PT0gJ2F1dG8nID8gdGhpcy55U2NhbGUucmFuZ2UoKVswXSA6IHRoaXMueVNjYWxlKHRoaXMuYmFzZVZhbHVlKSkpXG4gICAgICAgIC55MShkID0+ICh0aGlzLmJhc2VWYWx1ZSA9PT0gJ2F1dG8nID8gdGhpcy55U2NhbGUucmFuZ2UoKVswXSA6IHRoaXMueVNjYWxlKHRoaXMuYmFzZVZhbHVlKSkpO1xuICAgIH1cblxuICAgIGN1cnJlbnRBcmVhLmN1cnZlKHRoaXMuY3VydmUpO1xuICAgIHN0YXJ0aW5nQXJlYS5jdXJ2ZSh0aGlzLmN1cnZlKTtcblxuICAgIHRoaXMub3BhY2l0eSA9IDAuODtcblxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNlcmllcztcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICAgIGRhdGEgPSBzb3J0TGluZWFyKGRhdGEsICduYW1lJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLlRpbWUpIHtcbiAgICAgIGRhdGEgPSBzb3J0QnlUaW1lKGRhdGEsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBzb3J0QnlEb21haW4oZGF0YSwgJ25hbWUnLCAnYXNjJywgdGhpcy54U2NhbGUuZG9tYWluKCkpO1xuICAgIH1cblxuICAgIHRoaXMucGF0aCA9IGN1cnJlbnRBcmVhKGRhdGEpO1xuICAgIHRoaXMuc3RhcnRpbmdQYXRoID0gc3RhcnRpbmdBcmVhKGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlR3JhZGllbnQoKSB7XG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhcikge1xuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5zdGFja2VkIHx8IHRoaXMubm9ybWFsaXplZCkge1xuICAgICAgICBjb25zdCBkMHZhbHVlcyA9IHRoaXMuZGF0YS5zZXJpZXMubWFwKGQgPT4gZC5kMCk7XG4gICAgICAgIGNvbnN0IGQxdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLmQxKTtcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZDF2YWx1ZXMpO1xuICAgICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kMHZhbHVlcyk7XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMobWF4LCBtaW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKTtcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhtYXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gZmFsc2U7XG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlzSW5hY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcyB8fCB0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=