import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { escapeLabel } from '../common/label.helper';
import { decimalChecker, count } from '../common/count/count.helper';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CardComponent {
    constructor(element, cd, zone, platformId) {
        this.cd = cd;
        this.zone = zone;
        this.platformId = platformId;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.scaleTextSSR();
        }
    }
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            cancelAnimationFrame(this.animationReq);
        }
    }
    update() {
        this.zone.run(() => {
            const hasValue = this.data && typeof this.data.value !== 'undefined';
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const labelFormatting = this.labelFormatting || (card => escapeLabel(trimLabel(card.label, 55)));
            this.transform = `translate(${this.x} , ${this.y})`;
            this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
            this.cardWidth = Math.max(0, this.width);
            this.cardHeight = Math.max(0, this.height);
            this.label = this.label ? this.label : this.data.name;
            const cardData = {
                label: this.label,
                data: this.data,
                value: this.data.value
            };
            this.formattedLabel = labelFormatting(cardData);
            this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;
            const value = hasValue ? valueFormatting(cardData) : '';
            this.value = this.paddedValue(value);
            this.setPadding();
            this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);
            setTimeout(() => {
                if (isPlatformBrowser(this.platformId)) {
                    this.scaleText();
                }
                this.value = value;
                if (hasValue && !this.initialized) {
                    setTimeout(() => this.startCount(), 20);
                }
            }, 8);
        });
    }
    paddedValue(value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    }
    startCount() {
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            const val = this.data.value;
            const decs = decimalChecker(val);
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const callback = ({ value, finished }) => {
                this.zone.run(() => {
                    value = finished ? val : value;
                    this.value = valueFormatting({ label: this.label, data: this.data, value });
                    if (!finished) {
                        this.value = this.paddedValue(this.value);
                    }
                    this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    }
    scaleText() {
        this.zone.run(() => {
            const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
            if (width === 0 || height === 0) {
                return;
            }
            const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
            const availableWidth = this.cardWidth - 2 * textPadding;
            const availableHeight = this.cardHeight / 3;
            const resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
            this.cd.markForCheck();
        });
    }
    scaleTextSSR() {
        const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, this.value, 10);
        const height = 18;
        const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
        const availableWidth = this.cardWidth - 2 * textPadding;
        const availableHeight = this.cardHeight / 3;
        const resizeScale = Math.min(availableWidth / width, availableHeight / height);
        this.textFontSize = Math.floor(this.textFontSize * resizeScale);
        this.labelFontSize = Math.min(this.textFontSize, 15);
        this.setPadding();
    }
    setPadding() {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        const padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    }
    onClick() {
        this.select.emit(this.data);
    }
}
CardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CardComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
CardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: CardComponent, selector: "g[ngx-charts-card]", inputs: { color: "color", bandColor: "bandColor", textColor: "textColor", x: "x", y: "y", width: "width", height: "height", label: "label", data: "data", medianSize: "medianSize", valueFormatting: "valueFormatting", labelFormatting: "labelFormatting", animations: "animations" }, outputs: { select: "select" }, viewQueries: [{ propertyName: "textEl", first: true, predicate: ["textEl"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <svg:g [attr.transform]="transform" class="cell" (click)="onClick()">
      <svg:rect class="card" [style.fill]="color" [attr.width]="cardWidth" [attr.height]="cardHeight" rx="3" ry="3" />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{ label }}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging"
      >
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel"
        >
        </xhtml:p>
      </svg:foreignObject>
      <svg:text
        #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize"
      >
        {{ value }}
      </svg:text>
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-card]',
                    template: `
    <svg:g [attr.transform]="transform" class="cell" (click)="onClick()">
      <svg:rect class="card" [style.fill]="color" [attr.width]="cardWidth" [attr.height]="cardHeight" rx="3" ry="3" />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{ label }}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging"
      >
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel"
        >
        </xhtml:p>
      </svg:foreignObject>
      <svg:text
        #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize"
      >
        {{ value }}
      </svg:text>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { color: [{
                type: Input
            }], bandColor: [{
                type: Input
            }], textColor: [{
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
            }], data: [{
                type: Input
            }], medianSize: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], labelFormatting: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }], textEl: [{
                type: ViewChild,
                args: ['textEl', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUlaLFNBQVMsRUFDVCx1QkFBdUIsRUFJdkIsV0FBVyxFQUNYLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFpRDVFLE1BQU0sT0FBTyxhQUFhO0lBc0N4QixZQUNFLE9BQW1CLEVBQ1gsRUFBcUIsRUFDckIsSUFBWSxFQUNTLFVBQWU7UUFGcEMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNTLGVBQVUsR0FBVixVQUFVLENBQUs7UUE3QnJDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLdEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQU1uQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixrQkFB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDVDsyRkFHVSxhQUFhO2tCQS9DekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQTJDSSxNQUFNOzJCQUFDLFdBQVc7NENBekNaLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csQ0FBQztzQkFBVCxLQUFLO2dCQUNHLENBQUM7c0JBQVQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBRWlDLE1BQU07c0JBQTdDLFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5pbXBvcnQgeyBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgZGVjaW1hbENoZWNrZXIsIGNvdW50IH0gZnJvbSAnLi4vY29tbW9uL2NvdW50L2NvdW50LmhlbHBlcic7XG5pbXBvcnQgeyBHcmlkRGF0YSB9IGZyb20gJy4uL2NvbW1vbi9ncmlkLWxheW91dC5oZWxwZXInO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgY2FsY3VsYXRlVGV4dFdpZHRoIH0gZnJvbSAnLi4vdXRpbHMvY2FsY3VsYXRlLXdpZHRoJztcbmltcG9ydCB7IFZFUkRBTkFfRk9OVF9XSURUSFNfMTZfUFggfSBmcm9tICcuLi9jb21tb24vY29uc3RhbnRzL2ZvbnQtd2lkdGhzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNhcmRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiY2VsbFwiIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxzdmc6cmVjdCBjbGFzcz1cImNhcmRcIiBbc3R5bGUuZmlsbF09XCJjb2xvclwiIFthdHRyLndpZHRoXT1cImNhcmRXaWR0aFwiIFthdHRyLmhlaWdodF09XCJjYXJkSGVpZ2h0XCIgcng9XCIzXCIgcnk9XCIzXCIgLz5cbiAgICAgIDxzdmc6cGF0aFxuICAgICAgICAqbmdJZj1cImJhbmRDb2xvciAmJiBiYW5kQ29sb3IgIT09IGNvbG9yXCJcbiAgICAgICAgY2xhc3M9XCJjYXJkLWJhbmRcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImJhbmRDb2xvclwiXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1CYW5kXCJcbiAgICAgICAgc3Ryb2tlPVwibm9uZVwiXG4gICAgICAgIFthdHRyLmRdPVwiYmFuZFBhdGhcIlxuICAgICAgLz5cbiAgICAgIDx0aXRsZT57eyBsYWJlbCB9fTwvdGl0bGU+XG4gICAgICA8c3ZnOmZvcmVpZ25PYmplY3RcbiAgICAgICAgY2xhc3M9XCJ0cmltbWVkLWxhYmVsXCJcbiAgICAgICAgeD1cIjVcIlxuICAgICAgICBbYXR0ci54XT1cInRleHRQYWRkaW5nWzNdXCJcbiAgICAgICAgW2F0dHIueV09XCJjYXJkSGVpZ2h0IC0gdGV4dFBhZGRpbmdbMl1cIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ0ZXh0V2lkdGhcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwibGFiZWxGb250U2l6ZSArIHRleHRQYWRkaW5nWzJdXCJcbiAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiXG4gICAgICA+XG4gICAgICAgIDx4aHRtbDpwXG4gICAgICAgICAgW3N0eWxlLmNvbG9yXT1cInRleHRDb2xvclwiXG4gICAgICAgICAgW3N0eWxlLmZvbnRTaXplLnB4XT1cImxhYmVsRm9udFNpemVcIlxuICAgICAgICAgIFtzdHlsZS5saW5lSGVpZ2h0LnB4XT1cImxhYmVsRm9udFNpemVcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwiZm9ybWF0dGVkTGFiZWxcIlxuICAgICAgICA+XG4gICAgICAgIDwveGh0bWw6cD5cbiAgICAgIDwvc3ZnOmZvcmVpZ25PYmplY3Q+XG4gICAgICA8c3ZnOnRleHRcbiAgICAgICAgI3RleHRFbFxuICAgICAgICBjbGFzcz1cInZhbHVlLXRleHRcIlxuICAgICAgICBbYXR0ci54XT1cInRleHRQYWRkaW5nWzNdXCJcbiAgICAgICAgW2F0dHIueV09XCJ0ZXh0UGFkZGluZ1swXVwiXG4gICAgICAgIFtzdHlsZS5maWxsXT1cInRleHRDb2xvclwiXG4gICAgICAgIHRleHQtYW5jaG9yPVwic3RhcnRcIlxuICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJoYW5naW5nXCJcbiAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZS5wdF09XCJ0ZXh0Rm9udFNpemVcIlxuICAgICAgPlxuICAgICAgICB7eyB2YWx1ZSB9fVxuICAgICAgPC9zdmc6dGV4dD5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhbmRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0ZXh0Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgeDogbnVtYmVyO1xuICBASW5wdXQoKSB5OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBkYXRhOiBHcmlkRGF0YTtcbiAgQElucHV0KCkgbWVkaWFuU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgndGV4dEVsJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHRFbDogRWxlbWVudFJlZjtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcbiAgY2FyZFdpZHRoOiBudW1iZXI7XG4gIGNhcmRIZWlnaHQ6IG51bWJlcjtcbiAgdGV4dFdpZHRoOiBudW1iZXI7XG4gIHRleHRGb250U2l6ZTogbnVtYmVyID0gMTI7XG4gIHRleHRUcmFuc2Zvcm06IHN0cmluZyA9ICcnO1xuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBhbmltYXRpb25SZXE6IG51bWJlcjtcblxuICBiYW5kSGVpZ2h0OiBudW1iZXIgPSAxMDtcbiAgdHJhbnNmb3JtQmFuZDogc3RyaW5nO1xuICB0ZXh0UGFkZGluZzogbnVtYmVyW10gPSBbMTAsIDIwLCA1LCAyMF07XG4gIGxhYmVsRm9udFNpemU6IG51bWJlciA9IDE1O1xuXG4gIGJhbmRQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueVxuICApIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuc2NhbGVUZXh0U1NSKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IHRoaXMuZGF0YSAmJiB0eXBlb2YgdGhpcy5kYXRhLnZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG4gICAgICBjb25zdCBsYWJlbEZvcm1hdHRpbmcgPSB0aGlzLmxhYmVsRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBlc2NhcGVMYWJlbCh0cmltTGFiZWwoY2FyZC5sYWJlbCwgNTUpKSk7XG5cbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMueH0gLCAke3RoaXMueX0pYDtcblxuICAgICAgdGhpcy50ZXh0V2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKSAtIHRoaXMudGV4dFBhZGRpbmdbMV0gLSB0aGlzLnRleHRQYWRkaW5nWzNdO1xuICAgICAgdGhpcy5jYXJkV2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKTtcbiAgICAgIHRoaXMuY2FyZEhlaWdodCA9IE1hdGgubWF4KDAsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsIDogKHRoaXMuZGF0YS5uYW1lIGFzIGFueSk7XG5cbiAgICAgIGNvbnN0IGNhcmREYXRhID0ge1xuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICB2YWx1ZTogdGhpcy5kYXRhLnZhbHVlXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmZvcm1hdHRlZExhYmVsID0gbGFiZWxGb3JtYXR0aW5nKGNhcmREYXRhKTtcbiAgICAgIHRoaXMudHJhbnNmb3JtQmFuZCA9IGB0cmFuc2xhdGUoMCAsICR7dGhpcy5jYXJkSGVpZ2h0IC0gdGhpcy5iYW5kSGVpZ2h0fSlgO1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IGhhc1ZhbHVlID8gdmFsdWVGb3JtYXR0aW5nKGNhcmREYXRhKSA6ICcnO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcblxuICAgICAgdGhpcy5iYW5kUGF0aCA9IHJvdW5kZWRSZWN0KDAsIDAsIHRoaXMuY2FyZFdpZHRoLCB0aGlzLmJhbmRIZWlnaHQsIDMsIFtmYWxzZSwgZmFsc2UsIHRydWUsIHRydWVdKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgdGhpcy5zY2FsZVRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChoYXNWYWx1ZSAmJiAhdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zdGFydENvdW50KCksIDIwKTtcbiAgICAgICAgfVxuICAgICAgfSwgOCk7XG4gICAgfSk7XG4gIH1cblxuICBwYWRkZWRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5tZWRpYW5TaXplICYmIHRoaXMubWVkaWFuU2l6ZSA+IHZhbHVlLmxlbmd0aCkge1xuICAgICAgdmFsdWUgKz0gJ1xcdTIwMDcnLnJlcGVhdCh0aGlzLm1lZGlhblNpemUgLSB2YWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzdGFydENvdW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcblxuICAgICAgY29uc3QgdmFsID0gdGhpcy5kYXRhLnZhbHVlO1xuICAgICAgY29uc3QgZGVjcyA9IGRlY2ltYWxDaGVja2VyKHZhbCk7XG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xuXG4gICAgICBjb25zdCBjYWxsYmFjayA9ICh7IHZhbHVlLCBmaW5pc2hlZCB9KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gZmluaXNoZWQgPyB2YWwgOiB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVGb3JtYXR0aW5nKHsgbGFiZWw6IHRoaXMubGFiZWwsIGRhdGE6IHRoaXMuZGF0YSwgdmFsdWUgfSk7XG4gICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFkZGVkVmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5hbmltYXRpb25SZXEgPSBjb3VudCgwLCB2YWwsIGRlY3MsIDEsIGNhbGxiYWNrKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHNjYWxlVGV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy50ZXh0RWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZXh0UGFkZGluZyA9ICh0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gOCk7XG4gICAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuY2FyZFdpZHRoIC0gMiAqIHRleHRQYWRkaW5nO1xuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gdGhpcy5jYXJkSGVpZ2h0IC8gMztcblxuICAgICAgY29uc3QgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihhdmFpbGFibGVXaWR0aCAvIHdpZHRoLCBhdmFpbGFibGVIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgdGhpcy50ZXh0Rm9udFNpemUgPSBNYXRoLmZsb29yKHRoaXMudGV4dEZvbnRTaXplICogcmVzaXplU2NhbGUpO1xuICAgICAgdGhpcy5sYWJlbEZvbnRTaXplID0gTWF0aC5taW4odGhpcy50ZXh0Rm9udFNpemUsIDE1KTtcblxuICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgc2NhbGVUZXh0U1NSKCkge1xuICAgIGNvbnN0IHdpZHRoID0gY2FsY3VsYXRlVGV4dFdpZHRoKFZFUkRBTkFfRk9OVF9XSURUSFNfMTZfUFgsIHRoaXMudmFsdWUsIDEwKTtcbiAgICBjb25zdCBoZWlnaHQgPSAxODtcbiAgICBjb25zdCB0ZXh0UGFkZGluZyA9ICh0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gOCk7XG4gICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmNhcmRXaWR0aCAtIDIgKiB0ZXh0UGFkZGluZztcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSB0aGlzLmNhcmRIZWlnaHQgLyAzO1xuXG4gICAgY29uc3QgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihhdmFpbGFibGVXaWR0aCAvIHdpZHRoLCBhdmFpbGFibGVIZWlnaHQgLyBoZWlnaHQpO1xuXG4gICAgdGhpcy50ZXh0Rm9udFNpemUgPSBNYXRoLmZsb29yKHRoaXMudGV4dEZvbnRTaXplICogcmVzaXplU2NhbGUpO1xuICAgIHRoaXMubGFiZWxGb250U2l6ZSA9IE1hdGgubWluKHRoaXMudGV4dEZvbnRTaXplLCAxNSk7XG5cbiAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgfVxuXG4gIHNldFBhZGRpbmcoKSB7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDg7XG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMuY2FyZEhlaWdodCAvIDI7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1swXSA9IHBhZGRpbmcgLSB0aGlzLnRleHRGb250U2l6ZSAtIHRoaXMubGFiZWxGb250U2l6ZSAvIDI7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1syXSA9IHBhZGRpbmcgLSB0aGlzLmxhYmVsRm9udFNpemU7XG4gIH1cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgfVxufVxuIl19