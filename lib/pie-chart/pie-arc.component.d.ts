import { EventEmitter, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { DataItem } from '../models/chart-data.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
export declare class PieArcComponent implements OnChanges {
    fill: string;
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
    cornerRadius: number;
    value: number;
    max: number;
    data: DataItem;
    explodeSlices: boolean;
    gradient: boolean;
    animate: boolean;
    pointerEvents: boolean;
    isActive: boolean;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    dblclick: EventEmitter<any>;
    barOrientation: typeof BarOrientation;
    element: HTMLElement;
    path: any;
    startOpacity: number;
    radialGradientId: string;
    gradientFill: string;
    initialized: boolean;
    private _timeout;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    getGradient(): string;
    getPointerEvents(): string;
    update(): void;
    calculateArc(): any;
    loadAnimation(): void;
    updateAnimation(): void;
    onClick(): void;
    onDblClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PieArcComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PieArcComponent, "g[ngx-charts-pie-arc]", never, { "fill": "fill"; "startAngle": "startAngle"; "endAngle": "endAngle"; "innerRadius": "innerRadius"; "outerRadius": "outerRadius"; "cornerRadius": "cornerRadius"; "value": "value"; "max": "max"; "data": "data"; "explodeSlices": "explodeSlices"; "gradient": "gradient"; "animate": "animate"; "pointerEvents": "pointerEvents"; "isActive": "isActive"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; "dblclick": "dblclick"; }, never, never, false>;
}
