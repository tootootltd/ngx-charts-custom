import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile } from 'd3-scale';
import { colorSets } from '../utils/color-sets';
import { ScaleType } from './types/scale-type.enum';
export class ColorHelper {
    constructor(scheme, type, domain, customColors) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(cs => {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    generateColorScheme(scheme, type, domain) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(cs => {
                return cs.name === scheme;
            });
        }
        let colorScale;
        switch (type) {
            case ScaleType.Quantile:
                colorScale = scaleQuantile()
                    .range(scheme.domain)
                    .domain(domain);
                break;
            case ScaleType.Ordinal:
                colorScale = scaleOrdinal()
                    .range(scheme.domain)
                    .domain(domain);
                break;
            case ScaleType.Linear:
                {
                    const colorDomain = [...scheme.domain];
                    if (colorDomain.length === 1) {
                        colorDomain.push(colorDomain[0]);
                        this.colorDomain = colorDomain;
                    }
                    const points = range(0, 1, 1.0 / colorDomain.length);
                    colorScale = scaleLinear()
                        .range(colorDomain)
                        .domain(points);
                }
                break;
            default:
                break;
        }
        return colorScale;
    }
    getColor(value) {
        if (value === undefined || value === null) {
            throw new Error('Value can not be null');
        }
        if (this.scaleType === ScaleType.Linear) {
            const valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return this.scale(valueScale(value));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            const formattedValue = value.toString();
            let found; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(mapping => {
                    return mapping.name.toLowerCase() === formattedValue.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    }
    getLinearGradientStops(value, start) {
        if (start === undefined) {
            start = this.domain[0];
        }
        const valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        const colorValueScale = scaleBand().domain(this.colorDomain).range([0, 1]);
        const endColor = this.getColor(value);
        // generate the stops
        const startVal = valueScale(start);
        const startColor = this.getColor(start);
        const endVal = valueScale(value);
        let i = 1;
        let currentVal = startVal;
        const stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            const color = this.colorDomain[i];
            const offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color,
                offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                for (const s of stops) {
                    s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                }
            }
        }
        return stops;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2NvbG9yLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sRUFDTCxTQUFTLEVBRVQsV0FBVyxFQUVYLFlBQVksRUFFWixhQUFhLEVBQ2QsTUFBTSxVQUFVLENBQUM7QUFFbEIsT0FBTyxFQUFTLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUdwRCxNQUFNLE9BQU8sV0FBVztJQU90QixZQUFZLE1BQXNCLEVBQUUsSUFBZSxFQUFFLE1BQTJCLEVBQUUsWUFBYTtRQUM3RixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBRWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxNQUFzQixFQUFFLElBQWUsRUFBRSxNQUEyQjtRQUN0RixJ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QUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ2hFO2FBQ0Y7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmFuZ2UgfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQge1xuICBzY2FsZUJhbmQsXG4gIFNjYWxlTGluZWFyLFxuICBzY2FsZUxpbmVhcixcbiAgU2NhbGVPcmRpbmFsLFxuICBzY2FsZU9yZGluYWwsXG4gIFNjYWxlUXVhbnRpbGUsXG4gIHNjYWxlUXVhbnRpbGVcbn0gZnJvbSAnZDMtc2NhbGUnO1xuXG5pbXBvcnQgeyBDb2xvciwgY29sb3JTZXRzIH0gZnJvbSAnLi4vdXRpbHMvY29sb3Itc2V0cyc7XG5pbXBvcnQgeyBTdHJpbmdPck51bWJlck9yRGF0ZSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcbmltcG9ydCB7IEdyYWRpZW50IH0gZnJvbSAnLi90eXBlcy9ncmFkaWVudC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JIZWxwZXIge1xuICBzY2FsZTogYW55O1xuICBzY2FsZVR5cGU6IFNjYWxlVHlwZTtcbiAgY29sb3JEb21haW46IHN0cmluZ1tdO1xuICBkb21haW46IG51bWJlcltdIHwgc3RyaW5nW107XG4gIGN1c3RvbUNvbG9yczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHNjaGVtZTogc3RyaW5nIHwgQ29sb3IsIHR5cGU6IFNjYWxlVHlwZSwgZG9tYWluOiBudW1iZXJbXSB8IHN0cmluZ1tdLCBjdXN0b21Db2xvcnM/KSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzY2hlbWUgPSBjb2xvclNldHMuZmluZChjcyA9PiB7XG4gICAgICAgIHJldHVybiBjcy5uYW1lID09PSBzY2hlbWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5jb2xvckRvbWFpbiA9IHNjaGVtZS5kb21haW47XG4gICAgdGhpcy5zY2FsZVR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgIHRoaXMuY3VzdG9tQ29sb3JzID0gY3VzdG9tQ29sb3JzO1xuXG4gICAgdGhpcy5zY2FsZSA9IHRoaXMuZ2VuZXJhdGVDb2xvclNjaGVtZShzY2hlbWUsIHR5cGUsIHRoaXMuZG9tYWluKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29sb3JTY2hlbWUoc2NoZW1lOiBzdHJpbmcgfCBDb2xvciwgdHlwZTogU2NhbGVUeXBlLCBkb21haW46IG51bWJlcltdIHwgc3RyaW5nW10pOiBhbnkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1lID09PSAnc3RyaW5nJykge1xuICAgICAgc2NoZW1lID0gY29sb3JTZXRzLmZpbmQoY3MgPT4ge1xuICAgICAgICByZXR1cm4gY3MubmFtZSA9PT0gc2NoZW1lO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGNvbG9yU2NhbGU6IFNjYWxlUXVhbnRpbGU8bnVtYmVyPiB8IFNjYWxlT3JkaW5hbDxzdHJpbmcsIHVua25vd24+IHwgU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBTY2FsZVR5cGUuUXVhbnRpbGU6XG4gICAgICAgIGNvbG9yU2NhbGUgPSBzY2FsZVF1YW50aWxlKClcbiAgICAgICAgICAucmFuZ2Uoc2NoZW1lLmRvbWFpbiBhcyBhbnkpXG4gICAgICAgICAgLmRvbWFpbihkb21haW4gYXMgbnVtYmVyW10pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2NhbGVUeXBlLk9yZGluYWw6XG4gICAgICAgIGNvbG9yU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuICAgICAgICAgIC5yYW5nZShzY2hlbWUuZG9tYWluKVxuICAgICAgICAgIC5kb21haW4oZG9tYWluIGFzIHN0cmluZ1tdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNjYWxlVHlwZS5MaW5lYXI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBjb2xvckRvbWFpbiA9IFsuLi5zY2hlbWUuZG9tYWluXTtcbiAgICAgICAgICBpZiAoY29sb3JEb21haW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb2xvckRvbWFpbi5wdXNoKGNvbG9yRG9tYWluWzBdKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JEb21haW4gPSBjb2xvckRvbWFpbjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwb2ludHMgPSByYW5nZSgwLCAxLCAxLjAgLyBjb2xvckRvbWFpbi5sZW5ndGgpO1xuICAgICAgICAgIGNvbG9yU2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAucmFuZ2UoY29sb3JEb21haW4gYXMgYW55KVxuICAgICAgICAgICAgLmRvbWFpbihwb2ludHMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbG9yU2NhbGU7XG4gIH1cblxuICBnZXRDb2xvcih2YWx1ZTogU3RyaW5nT3JOdW1iZXJPckRhdGUpOiBzdHJpbmcge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIGNhbiBub3QgYmUgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICAgIGNvbnN0IHZhbHVlU2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4odGhpcy5kb21haW4gYXMgbnVtYmVyW10pXG4gICAgICAgIC5yYW5nZShbMCwgMV0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5zY2FsZSh2YWx1ZVNjYWxlKHZhbHVlIGFzIG51bWJlcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY3VzdG9tQ29sb3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUNvbG9ycyh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgIGxldCBmb3VuZDogYW55OyAvLyB0b2RvIHR5cGUgY3VzdG9tQ29sb3JzXG4gICAgICBpZiAodGhpcy5jdXN0b21Db2xvcnMgJiYgdGhpcy5jdXN0b21Db2xvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3VuZCA9IHRoaXMuY3VzdG9tQ29sb3JzLmZpbmQobWFwcGluZyA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1hcHBpbmcubmFtZS50b0xvd2VyQ2FzZSgpID09PSBmb3JtYXR0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIHJldHVybiBmb3VuZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRMaW5lYXJHcmFkaWVudFN0b3BzKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsIHN0YXJ0PzogbnVtYmVyIHwgc3RyaW5nKTogR3JhZGllbnRbXSB7XG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0YXJ0ID0gdGhpcy5kb21haW5bMF07XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlU2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKHRoaXMuZG9tYWluIGFzIG51bWJlcltdKVxuICAgICAgLnJhbmdlKFswLCAxXSk7XG5cbiAgICBjb25zdCBjb2xvclZhbHVlU2NhbGUgPSBzY2FsZUJhbmQoKS5kb21haW4odGhpcy5jb2xvckRvbWFpbikucmFuZ2UoWzAsIDFdKTtcblxuICAgIGNvbnN0IGVuZENvbG9yID0gdGhpcy5nZXRDb2xvcih2YWx1ZSk7XG5cbiAgICAvLyBnZW5lcmF0ZSB0aGUgc3RvcHNcbiAgICBjb25zdCBzdGFydFZhbCA9IHZhbHVlU2NhbGUoc3RhcnQgYXMgbnVtYmVyKTtcbiAgICBjb25zdCBzdGFydENvbG9yID0gdGhpcy5nZXRDb2xvcihzdGFydCk7XG5cbiAgICBjb25zdCBlbmRWYWwgPSB2YWx1ZVNjYWxlKHZhbHVlIGFzIG51bWJlcik7XG4gICAgbGV0IGkgPSAxO1xuICAgIGxldCBjdXJyZW50VmFsID0gc3RhcnRWYWw7XG4gICAgY29uc3Qgc3RvcHM6IEdyYWRpZW50W10gPSBbXTtcblxuICAgIHN0b3BzLnB1c2goe1xuICAgICAgY29sb3I6IHN0YXJ0Q29sb3IsXG4gICAgICBvZmZzZXQ6IHN0YXJ0VmFsLFxuICAgICAgb3JpZ2luYWxPZmZzZXQ6IHN0YXJ0VmFsLFxuICAgICAgb3BhY2l0eTogMVxuICAgIH0pO1xuXG4gICAgd2hpbGUgKGN1cnJlbnRWYWwgPCBlbmRWYWwgJiYgaSA8IHRoaXMuY29sb3JEb21haW4ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JEb21haW5baV07XG4gICAgICBjb25zdCBvZmZzZXQgPSBjb2xvclZhbHVlU2NhbGUoY29sb3IpO1xuICAgICAgaWYgKG9mZnNldCA8PSBzdGFydFZhbCkge1xuICAgICAgICBpKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAob2Zmc2V0LnRvRml4ZWQoNCkgPj0gKGVuZFZhbCAtIGNvbG9yVmFsdWVTY2FsZS5iYW5kd2lkdGgoKSkudG9GaXhlZCg0KSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3RvcHMucHVzaCh7XG4gICAgICAgIGNvbG9yLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH0pO1xuICAgICAgY3VycmVudFZhbCA9IG9mZnNldDtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoc3RvcHNbc3RvcHMubGVuZ3RoIC0gMV0ub2Zmc2V0IDwgMTAwKSB7XG4gICAgICBzdG9wcy5wdXNoKHtcbiAgICAgICAgY29sb3I6IGVuZENvbG9yLFxuICAgICAgICBvZmZzZXQ6IGVuZFZhbCxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGVuZFZhbCA9PT0gc3RhcnRWYWwpIHtcbiAgICAgIHN0b3BzWzBdLm9mZnNldCA9IDA7XG4gICAgICBzdG9wc1sxXS5vZmZzZXQgPSAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vcm1hbGl6ZSB0aGUgb2Zmc2V0cyBpbnRvIHBlcmNlbnRhZ2VzXG4gICAgICBpZiAoc3RvcHNbc3RvcHMubGVuZ3RoIC0gMV0ub2Zmc2V0ICE9PSAxMDApIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHN0b3BzKSB7XG4gICAgICAgICAgcy5vZmZzZXQgPSAoKHMub2Zmc2V0IC0gc3RhcnRWYWwpIC8gKGVuZFZhbCAtIHN0YXJ0VmFsKSkgKiAxMDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RvcHM7XG4gIH1cbn1cbiJdfQ==