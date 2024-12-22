import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { ScaleType } from '../common/types/scale-type.enum';
export function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    let domain = [];
    if (scaleType === ScaleType.Linear) {
        values = values.map(v => Number(v));
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === ScaleType.Time || scaleType === ScaleType.Linear) {
        const min = minVal || minVal === 0 ? minVal : Math.min(...values);
        const max = maxVal ? maxVal : Math.max(...values);
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
export function getScale(domain, range, scaleType, roundDomains) {
    switch (scaleType) {
        case ScaleType.Time:
            return scaleTime().range(range).domain(domain);
        case ScaleType.Linear: {
            const scale = scaleLinear().range(range).domain(domain);
            if (roundDomains) {
                return scale.nice();
            }
            return scale;
        }
        case ScaleType.Ordinal:
            return scalePoint()
                .range([range[0], range[1]])
                .domain(domain.map(r => r.toString()));
        default:
            return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvYnViYmxlLWNoYXJ0L2J1YmJsZS1jaGFydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWUsV0FBVyxFQUFjLFVBQVUsRUFBYSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELE1BQU0sVUFBVSxTQUFTLENBQ3ZCLE1BQWEsRUFDYixTQUFvQixFQUNwQixTQUFrQixFQUNsQixNQUFlLEVBQ2YsTUFBZTtJQUVmLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7S0FDRjtJQUVELElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7UUFDbEUsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFFbEQsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCO1NBQU07UUFDTCxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQ3RCLE1BQWdCLEVBQ2hCLEtBQWUsRUFDZixTQUFvQixFQUNwQixZQUFxQjtJQUVyQixRQUFRLFNBQVMsRUFBRTtRQUNqQixLQUFLLFNBQVMsQ0FBQyxJQUFJO1lBQ2pCLE9BQU8sU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixNQUFNLEtBQUssR0FBRyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELElBQUksWUFBWSxFQUFFO2dCQUNoQixPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNyQjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxLQUFLLFNBQVMsQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sVUFBVSxFQUFFO2lCQUNoQixLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQztZQUNFLE9BQU8sU0FBUyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjYWxlTGluZWFyLCBzY2FsZUxpbmVhciwgU2NhbGVQb2ludCwgc2NhbGVQb2ludCwgU2NhbGVUaW1lLCBzY2FsZVRpbWUgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBTY2FsZVR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERvbWFpbihcbiAgdmFsdWVzOiBhbnlbXSxcbiAgc2NhbGVUeXBlOiBTY2FsZVR5cGUsXG4gIGF1dG9TY2FsZTogYm9vbGVhbixcbiAgbWluVmFsPzogbnVtYmVyLFxuICBtYXhWYWw/OiBudW1iZXJcbik6IG51bWJlcltdIHtcbiAgbGV0IGRvbWFpbjogbnVtYmVyW10gPSBbXTtcbiAgaWYgKHNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhcikge1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xuICAgIGlmICghYXV0b1NjYWxlKSB7XG4gICAgICB2YWx1ZXMucHVzaCgwKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSB8fCBzY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICBjb25zdCBtaW4gPSBtaW5WYWwgfHwgbWluVmFsID09PSAwID8gbWluVmFsIDogTWF0aC5taW4oLi4udmFsdWVzKTtcbiAgICBjb25zdCBtYXggPSBtYXhWYWwgPyBtYXhWYWwgOiBNYXRoLm1heCguLi52YWx1ZXMpO1xuXG4gICAgZG9tYWluID0gW21pbiwgbWF4XTtcbiAgfSBlbHNlIHtcbiAgICBkb21haW4gPSB2YWx1ZXM7XG4gIH1cblxuICByZXR1cm4gZG9tYWluO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGUoXG4gIGRvbWFpbjogbnVtYmVyW10sXG4gIHJhbmdlOiBudW1iZXJbXSxcbiAgc2NhbGVUeXBlOiBTY2FsZVR5cGUsXG4gIHJvdW5kRG9tYWluczogYm9vbGVhblxuKTogU2NhbGVUaW1lPG51bWJlciwgbnVtYmVyPiB8IFNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPiB8IFNjYWxlUG9pbnQ8c3RyaW5nPiB7XG4gIHN3aXRjaCAoc2NhbGVUeXBlKSB7XG4gICAgY2FzZSBTY2FsZVR5cGUuVGltZTpcbiAgICAgIHJldHVybiBzY2FsZVRpbWUoKS5yYW5nZShyYW5nZSkuZG9tYWluKGRvbWFpbik7XG4gICAgY2FzZSBTY2FsZVR5cGUuTGluZWFyOiB7XG4gICAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKCkucmFuZ2UocmFuZ2UpLmRvbWFpbihkb21haW4pO1xuICAgICAgaWYgKHJvdW5kRG9tYWlucykge1xuICAgICAgICByZXR1cm4gc2NhbGUubmljZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH1cbiAgICBjYXNlIFNjYWxlVHlwZS5PcmRpbmFsOlxuICAgICAgcmV0dXJuIHNjYWxlUG9pbnQoKVxuICAgICAgICAucmFuZ2UoW3JhbmdlWzBdLCByYW5nZVsxXV0pXG4gICAgICAgIC5kb21haW4oZG9tYWluLm1hcChyID0+IHIudG9TdHJpbmcoKSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=