import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { invertColor } from '../utils/color-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./card.component";
export class CardSeriesComponent {
    constructor() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        if (this.data.length > 2) {
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const sortedLengths = this.data
                .map(d => {
                const hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue
                    ? valueFormatting({
                        data: d.data,
                        label: d ? d.data.name : '',
                        value: d && d.data ? d.data.value : ''
                    }).length
                    : 0;
            })
                .sort((a, b) => b - a);
            const idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        const cards = this.getCards();
        this.cards = cards.filter(d => d.data.value !== null);
        this.emptySlots = cards.filter(d => d.data.value === null);
    }
    getCards() {
        const yPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[0] + this.innerPadding[2];
        const xPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[1] + this.innerPadding[3];
        return this.data.map((d, index) => {
            let label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            const value = d.data.value;
            const valueColor = label ? this.colors.getColor(label) : this.emptyColor;
            const color = this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color,
                bandColor: this.bandColor || valueColor,
                textColor: this.textColor || invertColor(color),
                label,
                data: d.data,
                tooltipText: `${label}: ${value}`
            };
        });
    }
    trackBy(index, card) {
        return card.label;
    }
    onClick(data) {
        this.select.emit(data);
    }
}
CardSeriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CardSeriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardSeriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: CardSeriesComponent, selector: "g[ngx-charts-card-series]", inputs: { data: "data", dims: "dims", colors: "colors", innerPadding: "innerPadding", cardColor: "cardColor", bandColor: "bandColor", emptyColor: "emptyColor", textColor: "textColor", valueFormatting: "valueFormatting", labelFormatting: "labelFormatting", animations: "animations" }, outputs: { select: "select" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:rect
      *ngFor="let c of emptySlots; trackBy: trackBy"
      class="card-empty"
      [attr.x]="c.x"
      [attr.y]="c.y"
      [style.fill]="emptyColor"
      [attr.width]="c.width"
      [attr.height]="c.height"
      rx="3"
      ry="3"
    />
    <svg:g
      ngx-charts-card
      *ngFor="let c of cards; trackBy: trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [textColor]="c.textColor"
      [data]="c.data"
      [label]="c.label"
      [medianSize]="medianSize"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [animations]="animations"
      (select)="onClick($event)"
    />
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.CardComponent, selector: "g[ngx-charts-card]", inputs: ["color", "bandColor", "textColor", "x", "y", "width", "height", "label", "data", "medianSize", "valueFormatting", "labelFormatting", "animations"], outputs: ["select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CardSeriesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-card-series]',
                    template: `
    <svg:rect
      *ngFor="let c of emptySlots; trackBy: trackBy"
      class="card-empty"
      [attr.x]="c.x"
      [attr.y]="c.y"
      [style.fill]="emptyColor"
      [attr.width]="c.width"
      [attr.height]="c.height"
      rx="3"
      ry="3"
    />
    <svg:g
      ngx-charts-card
      *ngFor="let c of cards; trackBy: trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [textColor]="c.textColor"
      [data]="c.data"
      [label]="c.label"
      [medianSize]="medianSize"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [animations]="animations"
      (select)="onClick($event)"
    />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { data: [{
                type: Input
            }], dims: [{
                type: Input
            }], colors: [{
                type: Input
            }], innerPadding: [{
                type: Input
            }], cardColor: [{
                type: Input
            }], bandColor: [{
                type: Input
            }], emptyColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], labelFormatting: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvbnVtYmVyLWNhcmQvY2FyZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQWdEbkQsTUFBTSxPQUFPLG1CQUFtQjtJQW5DaEM7UUF1Q1csaUJBQVksR0FBVyxFQUFFLENBQUM7UUFJMUIsZUFBVSxHQUFHLGtCQUFrQixDQUFDO1FBSWhDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7S0EwRXZDO0lBcEVDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFFdEYsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUk7aUJBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDUCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FB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O3NCQUF2QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnZlcnRDb2xvciB9IGZyb20gJy4uL3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCB7IEdyaWRJdGVtLCBHcmlkRGF0YSB9IGZyb20gJy4uL2NvbW1vbi9ncmlkLWxheW91dC5oZWxwZXInO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZpZXctZGltZW5zaW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZE1vZGVsIGV4dGVuZHMgR3JpZEl0ZW0ge1xuICBjb2xvcjogc3RyaW5nO1xuICB0b29sdGlwVGV4dDogc3RyaW5nO1xuICB0ZXh0Q29sb3I6IHN0cmluZztcbiAgYmFuZENvbG9yOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1jYXJkLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6cmVjdFxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgZW1wdHlTbG90czsgdHJhY2tCeTogdHJhY2tCeVwiXG4gICAgICBjbGFzcz1cImNhcmQtZW1wdHlcIlxuICAgICAgW2F0dHIueF09XCJjLnhcIlxuICAgICAgW2F0dHIueV09XCJjLnlcIlxuICAgICAgW3N0eWxlLmZpbGxdPVwiZW1wdHlDb2xvclwiXG4gICAgICBbYXR0ci53aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFthdHRyLmhlaWdodF09XCJjLmhlaWdodFwiXG4gICAgICByeD1cIjNcIlxuICAgICAgcnk9XCIzXCJcbiAgICAvPlxuICAgIDxzdmc6Z1xuICAgICAgbmd4LWNoYXJ0cy1jYXJkXG4gICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjYXJkczsgdHJhY2tCeTogdHJhY2tCeVwiXG4gICAgICBbeF09XCJjLnhcIlxuICAgICAgW3ldPVwiYy55XCJcbiAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxuICAgICAgW2NvbG9yXT1cImMuY29sb3JcIlxuICAgICAgW2JhbmRDb2xvcl09XCJjLmJhbmRDb2xvclwiXG4gICAgICBbdGV4dENvbG9yXT1cImMudGV4dENvbG9yXCJcbiAgICAgIFtkYXRhXT1cImMuZGF0YVwiXG4gICAgICBbbGFiZWxdPVwiYy5sYWJlbFwiXG4gICAgICBbbWVkaWFuU2l6ZV09XCJtZWRpYW5TaXplXCJcbiAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcbiAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgIC8+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBDYXJkTW9kZWxbXTtcbiAgQElucHV0KCkgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIGlubmVyUGFkZGluZzogbnVtYmVyID0gMTU7XG5cbiAgQElucHV0KCkgY2FyZENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhbmRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBlbXB0eUNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknO1xuICBASW5wdXQoKSB0ZXh0Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNhcmRzOiBDYXJkTW9kZWxbXTtcbiAgZW1wdHlTbG90czogYW55W107XG4gIG1lZGlhblNpemU6IG51bWJlcjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG5cbiAgICAgIGNvbnN0IHNvcnRlZExlbmd0aHMgPSB0aGlzLmRhdGFcbiAgICAgICAgLm1hcChkID0+IHtcbiAgICAgICAgICBjb25zdCBoYXNWYWx1ZSA9IGQgJiYgZC5kYXRhICYmIHR5cGVvZiBkLmRhdGEudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIGQuZGF0YS52YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gaGFzVmFsdWVcbiAgICAgICAgICAgID8gdmFsdWVGb3JtYXR0aW5nKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBkLmRhdGEsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGQgPyBkLmRhdGEubmFtZSA6ICcnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkICYmIGQuZGF0YSA/IGQuZGF0YS52YWx1ZSA6ICcnXG4gICAgICAgICAgICAgIH0pLmxlbmd0aFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICB9KVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xuICAgICAgY29uc3QgaWR4ID0gTWF0aC5jZWlsKHRoaXMuZGF0YS5sZW5ndGggLyAyKTtcbiAgICAgIHRoaXMubWVkaWFuU2l6ZSA9IHNvcnRlZExlbmd0aHNbaWR4XTtcbiAgICB9XG5cbiAgICBjb25zdCBjYXJkcyA9IHRoaXMuZ2V0Q2FyZHMoKTtcbiAgICB0aGlzLmNhcmRzID0gY2FyZHMuZmlsdGVyKGQgPT4gZC5kYXRhLnZhbHVlICE9PSBudWxsKTtcbiAgICB0aGlzLmVtcHR5U2xvdHMgPSBjYXJkcy5maWx0ZXIoZCA9PiBkLmRhdGEudmFsdWUgPT09IG51bGwpO1xuICB9XG5cbiAgZ2V0Q2FyZHMoKTogQ2FyZE1vZGVsW10ge1xuICAgIGNvbnN0IHlQYWRkaW5nID1cbiAgICAgIHR5cGVvZiB0aGlzLmlubmVyUGFkZGluZyA9PT0gJ251bWJlcicgPyB0aGlzLmlubmVyUGFkZGluZyA6IHRoaXMuaW5uZXJQYWRkaW5nWzBdICsgdGhpcy5pbm5lclBhZGRpbmdbMl07XG4gICAgY29uc3QgeFBhZGRpbmcgPVxuICAgICAgdHlwZW9mIHRoaXMuaW5uZXJQYWRkaW5nID09PSAnbnVtYmVyJyA/IHRoaXMuaW5uZXJQYWRkaW5nIDogdGhpcy5pbm5lclBhZGRpbmdbMV0gKyB0aGlzLmlubmVyUGFkZGluZ1szXTtcblxuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGxhYmVsID0gZC5kYXRhLm5hbWUgYXMgYW55O1xuICAgICAgaWYgKGxhYmVsICYmIGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xuICAgICAgICBsYWJlbCA9IGxhYmVsLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFiZWwgPSBsYWJlbCA/IGxhYmVsLnRvTG9jYWxlU3RyaW5nKCkgOiBsYWJlbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSBkLmRhdGEudmFsdWU7XG4gICAgICBjb25zdCB2YWx1ZUNvbG9yID0gbGFiZWwgPyB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCkgOiB0aGlzLmVtcHR5Q29sb3I7XG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY2FyZENvbG9yIHx8IHZhbHVlQ29sb3IgfHwgJyMwMDAnO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogZC54LFxuICAgICAgICB5OiBkLnksXG4gICAgICAgIHdpZHRoOiBkLndpZHRoIC0geFBhZGRpbmcsXG4gICAgICAgIGhlaWdodDogZC5oZWlnaHQgLSB5UGFkZGluZyxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIGJhbmRDb2xvcjogdGhpcy5iYW5kQ29sb3IgfHwgdmFsdWVDb2xvcixcbiAgICAgICAgdGV4dENvbG9yOiB0aGlzLnRleHRDb2xvciB8fCBpbnZlcnRDb2xvcihjb2xvciksXG4gICAgICAgIGxhYmVsLFxuICAgICAgICBkYXRhOiBkLmRhdGEsXG4gICAgICAgIHRvb2x0aXBUZXh0OiBgJHtsYWJlbH06ICR7dmFsdWV9YFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGNhcmQpOiBzdHJpbmcge1xuICAgIHJldHVybiBjYXJkLmxhYmVsO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgfVxufVxuIl19