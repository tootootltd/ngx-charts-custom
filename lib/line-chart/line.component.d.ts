import { OnChanges, ElementRef, SimpleChanges, OnInit } from '@angular/core';
import { Series } from '../models/chart-data.model';
import * as i0 from "@angular/core";
export declare class LineComponent implements OnChanges, OnInit {
    private element;
    private platformId;
    path: string;
    stroke: string;
    data: Series;
    fill: string;
    animations: boolean;
    initialized: boolean;
    initialPath: string;
    isSSR: boolean;
    constructor(element: ElementRef, platformId: any);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updatePathEl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LineComponent, "g[ngx-charts-line]", never, { "path": "path"; "stroke": "stroke"; "data": "data"; "fill": "fill"; "animations": "animations"; }, {}, never, never, false>;
}
