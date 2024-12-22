import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { max } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/tooltip/tooltip.directive";
import * as i3 from "./pie-label.component";
import * as i4 from "./pie-arc.component";
export class PieSeriesComponent {
    constructor() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        const pieGenerator = pie()
            .value(d => d.value)
            .sort(null);
        const arcData = pieGenerator(this.series);
        this.max = max(arcData, d => {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    outerArc() {
        const factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    }
    calculateLabelPositions(pieData) {
        const factor = 1.5;
        const minDistance = 10;
        const labelPositions = pieData;
        labelPositions.forEach(d => {
            d.pos = this.outerArc().centroid(d);
            d.pos[0] = factor * this.outerRadius * (this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (let i = 0; i < labelPositions.length - 1; i++) {
            const a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (let j = i + 1; j < labelPositions.length; j++) {
                const b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    }
    labelVisible(myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    }
    getTooltipTitle(a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    }
    labelText(myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    }
    label(myArc) {
        return formatLabel(myArc.data.name);
    }
    defaultTooltipText(myArc) {
        const label = this.label(myArc);
        const val = formatLabel(myArc.data.value);
        return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
    color(myArc) {
        return this.colors.getColor(this.label(myArc));
    }
    trackBy(index, item) {
        return item.data.name;
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
}
PieSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PieSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: PieSeriesComponent, selector: "g[ngx-charts-pie-series]", inputs: { colors: "colors", series: "series", dims: "dims", innerRadius: "innerRadius", outerRadius: "outerRadius", explodeSlices: "explodeSlices", showLabels: "showLabels", gradient: "gradient", activeEntries: "activeEntries", labelFormatting: "labelFormatting", trimLabels: "trimLabels", maxLabelLength: "maxLabelLength", tooltipText: "tooltipText", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate", animations: "animations" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate", dblclick: "dblclick" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g *ngFor="let arc of data; trackBy: trackBy">
      <svg:g
        ngx-charts-pie-label
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="labelText(arc)"
        [labelTrim]="trimLabels"
        [labelTrimSize]="maxLabelLength"
        [max]="max"
        [value]="arc.value"
        [explodeSlices]="explodeSlices"
        [animations]="animations"
      ></svg:g>
      <svg:g
        ngx-charts-pie-arc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [gradient]="gradient"
        [data]="arc.data"
        [max]="max"
        [explodeSlices]="explodeSlices"
        [isActive]="isActive(arc.data)"
        [animate]="animations"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
        (dblclick)="dblclick.emit($event)"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="getTooltipTitle(arc)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="arc.data"
      ></svg:g>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }, { kind: "component", type: i3.PieLabelComponent, selector: "g[ngx-charts-pie-label]", inputs: ["data", "radius", "label", "color", "max", "value", "explodeSlices", "animations", "labelTrim", "labelTrimSize"] }, { kind: "component", type: i4.PieArcComponent, selector: "g[ngx-charts-pie-arc]", inputs: ["fill", "startAngle", "endAngle", "innerRadius", "outerRadius", "cornerRadius", "value", "max", "data", "explodeSlices", "gradient", "animate", "pointerEvents", "isActive"], outputs: ["select", "activate", "deactivate", "dblclick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: PieSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-pie-series]',
                    template: `
    <svg:g *ngFor="let arc of data; trackBy: trackBy">
      <svg:g
        ngx-charts-pie-label
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="labelText(arc)"
        [labelTrim]="trimLabels"
        [labelTrimSize]="maxLabelLength"
        [max]="max"
        [value]="arc.value"
        [explodeSlices]="explodeSlices"
        [animations]="animations"
      ></svg:g>
      <svg:g
        ngx-charts-pie-arc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [gradient]="gradient"
        [data]="arc.data"
        [max]="max"
        [explodeSlices]="explodeSlices"
        [isActive]="isActive(arc.data)"
        [animate]="animations"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
        (dblclick)="dblclick.emit($event)"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="getTooltipTitle(arc)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="arc.data"
      ></svg:g>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { colors: [{
                type: Input
            }], series: [{
                type: Input
            }], dims: [{
                type: Input
            }], innerRadius: [{
                type: Input
            }], outerRadius: [{
                type: Input
            }], explodeSlices: [{
                type: Input
            }], showLabels: [{
                type: Input
            }], gradient: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], labelFormatting: [{
                type: Input
            }], trimLabels: [{
                type: Input
            }], maxLabelLength: [{
                type: Input
            }], tooltipText: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], animations: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7OztBQW1EMUQsTUFBTSxPQUFPLGtCQUFrQjtJQWhEL0I7UUFrRFcsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUV4QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQU16QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBRTVCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRWpDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLeEMsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFDaEMsZUFBVSxHQUFHLFVBQVUsQ0FBQztLQXFIekI7SUFuSEMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBWTthQUNqQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakUsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsT0FBTyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRW5CLE9BQU8sR0FBRyxFQUFFO2FBQ1QsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2FBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxPQUFPO1FBQzdCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNuQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBRS9CLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxNQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLFNBQVM7YUFDVjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEQsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDekIsU0FBUztpQkFDVjtnQkFDRCw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IseUJBQXlCO29CQUN6QixNQUFNLENBQUMsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNULDZCQUE2Qjt3QkFDN0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3JDO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFFRCxlQUFlLENBQUMsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFLO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUMsT0FBTztvQ0FDeUIsV0FBVyxDQUFDLEtBQUssQ0FBQztrQ0FDcEIsR0FBRztLQUNoQyxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDOzsrR0EvSVUsa0JBQWtCO21HQUFsQixrQkFBa0IsOG5CQTlDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ1Q7MkZBR1Usa0JBQWtCO2tCQWhEOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IHsgYXJjLCBwaWUgfSBmcm9tICdkMy1zaGFwZSc7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuXG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgUGllRGF0YSB9IGZyb20gJy4vcGllLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4uL2NvbW1vbi90b29sdGlwL3Bvc2l0aW9uJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuLi9jb21tb24vdG9vbHRpcC9zdHlsZS50eXBlJztcbmltcG9ydCB7IFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZpZXctZGltZW5zaW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1waWUtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBhcmMgb2YgZGF0YTsgdHJhY2tCeTogdHJhY2tCeVwiPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMtcGllLWxhYmVsXG4gICAgICAgICpuZ0lmPVwibGFiZWxWaXNpYmxlKGFyYylcIlxuICAgICAgICBbZGF0YV09XCJhcmNcIlxuICAgICAgICBbcmFkaXVzXT1cIm91dGVyUmFkaXVzXCJcbiAgICAgICAgW2NvbG9yXT1cImNvbG9yKGFyYylcIlxuICAgICAgICBbbGFiZWxdPVwibGFiZWxUZXh0KGFyYylcIlxuICAgICAgICBbbGFiZWxUcmltXT1cInRyaW1MYWJlbHNcIlxuICAgICAgICBbbGFiZWxUcmltU2l6ZV09XCJtYXhMYWJlbExlbmd0aFwiXG4gICAgICAgIFttYXhdPVwibWF4XCJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy52YWx1ZVwiXG4gICAgICAgIFtleHBsb2RlU2xpY2VzXT1cImV4cGxvZGVTbGljZXNcIlxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgID48L3N2ZzpnPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMtcGllLWFyY1xuICAgICAgICBbc3RhcnRBbmdsZV09XCJhcmMuc3RhcnRBbmdsZVwiXG4gICAgICAgIFtlbmRBbmdsZV09XCJhcmMuZW5kQW5nbGVcIlxuICAgICAgICBbaW5uZXJSYWRpdXNdPVwiaW5uZXJSYWRpdXNcIlxuICAgICAgICBbb3V0ZXJSYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxuICAgICAgICBbZmlsbF09XCJjb2xvcihhcmMpXCJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy5kYXRhLnZhbHVlXCJcbiAgICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgICAgW2RhdGFdPVwiYXJjLmRhdGFcIlxuICAgICAgICBbbWF4XT1cIm1heFwiXG4gICAgICAgIFtleHBsb2RlU2xpY2VzXT1cImV4cGxvZGVTbGljZXNcIlxuICAgICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoYXJjLmRhdGEpXCJcbiAgICAgICAgW2FuaW1hdGVdPVwiYW5pbWF0aW9uc1wiXG4gICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGRibGNsaWNrKT1cImRibGNsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIG5neC10b29sdGlwXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwicGxhY2VtZW50VHlwZXMuVG9wXCJcbiAgICAgICAgW3Rvb2x0aXBUeXBlXT1cInN0eWxlVHlwZXMudG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwVGl0bGVdPVwiZ2V0VG9vbHRpcFRpdGxlKGFyYylcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJhcmMuZGF0YVwiXG4gICAgICA+PC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQaWVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBzZXJpZXM6IERhdGFJdGVtW10gPSBbXTtcbiAgQElucHV0KCkgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIEBJbnB1dCgpIGlubmVyUmFkaXVzOiBudW1iZXIgPSA2MDtcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXM6IG51bWJlciA9IDgwO1xuICBASW5wdXQoKSBleHBsb2RlU2xpY2VzOiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93TGFiZWxzOiBib29sZWFuO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB0cmltTGFiZWxzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF4TGFiZWxMZW5ndGg6IG51bWJlciA9IDEwO1xuICBASW5wdXQoKSB0b29sdGlwVGV4dDogKG86IGFueSkgPT4gYW55O1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWF4OiBudW1iZXI7XG4gIGRhdGE6IFBpZURhdGFbXTtcblxuICBwbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzO1xuICBzdHlsZVR5cGVzID0gU3R5bGVUeXBlcztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBwaWVHZW5lcmF0b3IgPSBwaWU8YW55LCBhbnk+KClcbiAgICAgIC52YWx1ZShkID0+IGQudmFsdWUpXG4gICAgICAuc29ydChudWxsKTtcblxuICAgIGNvbnN0IGFyY0RhdGEgPSBwaWVHZW5lcmF0b3IodGhpcy5zZXJpZXMpO1xuXG4gICAgdGhpcy5tYXggPSBtYXgoYXJjRGF0YSwgZCA9PiB7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuY2FsY3VsYXRlTGFiZWxQb3NpdGlvbnMoYXJjRGF0YSk7XG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcFRleHQgfHwgdGhpcy5kZWZhdWx0VG9vbHRpcFRleHQ7XG4gIH1cblxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZC5zdGFydEFuZ2xlICsgKGQuZW5kQW5nbGUgLSBkLnN0YXJ0QW5nbGUpIC8gMjtcbiAgfVxuXG4gIG91dGVyQXJjKCk6IGFueSB7XG4gICAgY29uc3QgZmFjdG9yID0gMS41O1xuXG4gICAgcmV0dXJuIGFyYygpXG4gICAgICAuaW5uZXJSYWRpdXModGhpcy5vdXRlclJhZGl1cyAqIGZhY3RvcilcbiAgICAgIC5vdXRlclJhZGl1cyh0aGlzLm91dGVyUmFkaXVzICogZmFjdG9yKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxhYmVsUG9zaXRpb25zKHBpZURhdGEpOiBhbnkge1xuICAgIGNvbnN0IGZhY3RvciA9IDEuNTtcbiAgICBjb25zdCBtaW5EaXN0YW5jZSA9IDEwO1xuICAgIGNvbnN0IGxhYmVsUG9zaXRpb25zID0gcGllRGF0YTtcblxuICAgIGxhYmVsUG9zaXRpb25zLmZvckVhY2goZCA9PiB7XG4gICAgICBkLnBvcyA9IHRoaXMub3V0ZXJBcmMoKS5jZW50cm9pZChkKTtcbiAgICAgIGQucG9zWzBdID0gZmFjdG9yICogdGhpcy5vdXRlclJhZGl1cyAqICh0aGlzLm1pZEFuZ2xlKGQpIDwgTWF0aC5QSSA/IDEgOiAtMSk7XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYmVsUG9zaXRpb25zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY29uc3QgYSA9IGxhYmVsUG9zaXRpb25zW2ldO1xuICAgICAgaWYgKCF0aGlzLmxhYmVsVmlzaWJsZShhKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgbGFiZWxQb3NpdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYiA9IGxhYmVsUG9zaXRpb25zW2pdO1xuICAgICAgICBpZiAoIXRoaXMubGFiZWxWaXNpYmxlKGIpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhleSdyZSBvbiB0aGUgc2FtZSBzaWRlXG4gICAgICAgIGlmIChiLnBvc1swXSAqIGEucG9zWzBdID4gMCkge1xuICAgICAgICAgIC8vIGlmIHRoZXkncmUgb3ZlcmxhcHBpbmdcbiAgICAgICAgICBjb25zdCBvID0gbWluRGlzdGFuY2UgLSBNYXRoLmFicyhiLnBvc1sxXSAtIGEucG9zWzFdKTtcbiAgICAgICAgICBpZiAobyA+IDApIHtcbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlY29uZCB1cCBvciBkb3duXG4gICAgICAgICAgICBiLnBvc1sxXSArPSBNYXRoLnNpZ24oYi5wb3NbMF0pICogbztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWxQb3NpdGlvbnM7XG4gIH1cblxuICBsYWJlbFZpc2libGUobXlBcmMpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93TGFiZWxzICYmIG15QXJjLmVuZEFuZ2xlIC0gbXlBcmMuc3RhcnRBbmdsZSA+IE1hdGguUEkgLyAzMDtcbiAgfVxuXG4gIGdldFRvb2x0aXBUaXRsZShhKSB7XG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdGhpcy50b29sdGlwVGV4dChhKTtcbiAgfVxuXG4gIGxhYmVsVGV4dChteUFyYyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubGFiZWxGb3JtYXR0aW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYWJlbEZvcm1hdHRpbmcobXlBcmMuZGF0YS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGFiZWwobXlBcmMpO1xuICB9XG5cbiAgbGFiZWwobXlBcmMpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXRMYWJlbChteUFyYy5kYXRhLm5hbWUpO1xuICB9XG5cbiAgZGVmYXVsdFRvb2x0aXBUZXh0KG15QXJjKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWwobXlBcmMpO1xuICAgIGNvbnN0IHZhbCA9IGZvcm1hdExhYmVsKG15QXJjLmRhdGEudmFsdWUpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwobGFiZWwpfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbH08L3NwYW4+XG4gICAgYDtcbiAgfVxuXG4gIGNvbG9yKG15QXJjKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodGhpcy5sYWJlbChteUFyYykpO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0uZGF0YS5uYW1lO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19