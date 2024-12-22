import { scaleBand } from 'd3-scale';
export function gridSize(dims, len, minWidth) {
    let rows = 1;
    let cols = len;
    const width = dims.width;
    if (width > minWidth) {
        while (width / cols < minWidth) {
            rows += 1;
            cols = Math.ceil(len / rows);
        }
    }
    return [cols, rows];
}
export function gridLayout(dims, data, minWidth, designatedTotal) {
    const xScale = scaleBand();
    const yScale = scaleBand();
    const width = dims.width;
    const height = dims.height;
    const [columns, rows] = gridSize(dims, data.length, minWidth);
    const xDomain = [];
    const yDomain = [];
    for (let i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (let i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    const res = [];
    const total = designatedTotal ? designatedTotal : getTotal(data);
    const cardWidth = xScale.bandwidth();
    const cardHeight = yScale.bandwidth();
    for (let i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i] ? data[i].name : '',
            value: data[i] ? data[i].value : undefined,
            extra: data[i] ? data[i].extra : undefined,
            label: data[i] ? data[i].label : ''
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = total > 0 ? res[i].data.value / total : 0;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results.map(d => (d ? d.value : 0)).reduce((sum, val) => sum + val, 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1sYXlvdXQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2dyaWQtbGF5b3V0LmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBcUJyQyxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQW9CLEVBQUUsR0FBVyxFQUFFLFFBQWdCO0lBQzFFLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFekIsSUFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxHQUFHLElBQUksR0FBRyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNWLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM5QjtLQUNGO0lBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FDeEIsSUFBb0IsRUFDcEIsSUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsZUFBdUI7SUFFdkIsTUFBTSxNQUFNLEdBQVEsU0FBUyxFQUFVLENBQUM7SUFDeEMsTUFBTSxNQUFNLEdBQVEsU0FBUyxFQUFVLENBQUM7SUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTlELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVwQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDMUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztZQUMxQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ3BDLENBQUM7UUFDRixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN6QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDM0I7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxPQUFZO0lBQzVCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjYWxlQmFuZCB9IGZyb20gJ2QzLXNjYWxlJztcbmltcG9ydCB7IFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi90eXBlcy92aWV3LWRpbWVuc2lvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3RyaW5nT3JOdW1iZXJPckRhdGUgfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZEl0ZW0ge1xuICBkYXRhOiBHcmlkRGF0YTtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWREYXRhIHtcbiAgZXh0cmE/OiBhbnk7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG5hbWU6IFN0cmluZ09yTnVtYmVyT3JEYXRlO1xuICBwZXJjZW50OiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkU2l6ZShkaW1zOiBWaWV3RGltZW5zaW9ucywgbGVuOiBudW1iZXIsIG1pbldpZHRoOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IHJvd3MgPSAxO1xuICBsZXQgY29scyA9IGxlbjtcbiAgY29uc3Qgd2lkdGggPSBkaW1zLndpZHRoO1xuXG4gIGlmICh3aWR0aCA+IG1pbldpZHRoKSB7XG4gICAgd2hpbGUgKHdpZHRoIC8gY29scyA8IG1pbldpZHRoKSB7XG4gICAgICByb3dzICs9IDE7XG4gICAgICBjb2xzID0gTWF0aC5jZWlsKGxlbiAvIHJvd3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbY29scywgcm93c107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkTGF5b3V0KFxuICBkaW1zOiBWaWV3RGltZW5zaW9ucyxcbiAgZGF0YTogR3JpZERhdGFbXSxcbiAgbWluV2lkdGg6IG51bWJlcixcbiAgZGVzaWduYXRlZFRvdGFsOiBudW1iZXJcbik6IEdyaWRJdGVtW10ge1xuICBjb25zdCB4U2NhbGU6IGFueSA9IHNjYWxlQmFuZDxudW1iZXI+KCk7XG4gIGNvbnN0IHlTY2FsZTogYW55ID0gc2NhbGVCYW5kPG51bWJlcj4oKTtcbiAgY29uc3Qgd2lkdGggPSBkaW1zLndpZHRoO1xuICBjb25zdCBoZWlnaHQgPSBkaW1zLmhlaWdodDtcblxuICBjb25zdCBbY29sdW1ucywgcm93c10gPSBncmlkU2l6ZShkaW1zLCBkYXRhLmxlbmd0aCwgbWluV2lkdGgpO1xuXG4gIGNvbnN0IHhEb21haW4gPSBbXTtcbiAgY29uc3QgeURvbWFpbiA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgIHlEb21haW4ucHVzaChpKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnM7IGkrKykge1xuICAgIHhEb21haW4ucHVzaChpKTtcbiAgfVxuICB4U2NhbGUuZG9tYWluKHhEb21haW4pO1xuICB5U2NhbGUuZG9tYWluKHlEb21haW4pO1xuXG4gIHhTY2FsZS5yYW5nZVJvdW5kKFswLCB3aWR0aF0sIDAuMSk7XG4gIHlTY2FsZS5yYW5nZVJvdW5kKFswLCBoZWlnaHRdLCAwLjEpO1xuXG4gIGNvbnN0IHJlcyA9IFtdO1xuICBjb25zdCB0b3RhbCA9IGRlc2lnbmF0ZWRUb3RhbCA/IGRlc2lnbmF0ZWRUb3RhbCA6IGdldFRvdGFsKGRhdGEpO1xuICBjb25zdCBjYXJkV2lkdGggPSB4U2NhbGUuYmFuZHdpZHRoKCk7XG4gIGNvbnN0IGNhcmRIZWlnaHQgPSB5U2NhbGUuYmFuZHdpZHRoKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzW2ldID0ge307XG4gICAgcmVzW2ldLmRhdGEgPSB7XG4gICAgICBuYW1lOiBkYXRhW2ldID8gZGF0YVtpXS5uYW1lIDogJycsXG4gICAgICB2YWx1ZTogZGF0YVtpXSA/IGRhdGFbaV0udmFsdWUgOiB1bmRlZmluZWQsXG4gICAgICBleHRyYTogZGF0YVtpXSA/IGRhdGFbaV0uZXh0cmEgOiB1bmRlZmluZWQsXG4gICAgICBsYWJlbDogZGF0YVtpXSA/IGRhdGFbaV0ubGFiZWwgOiAnJ1xuICAgIH07XG4gICAgcmVzW2ldLnggPSB4U2NhbGUoaSAlIGNvbHVtbnMpO1xuICAgIHJlc1tpXS55ID0geVNjYWxlKE1hdGguZmxvb3IoaSAvIGNvbHVtbnMpKTtcbiAgICByZXNbaV0ud2lkdGggPSBjYXJkV2lkdGg7XG4gICAgcmVzW2ldLmhlaWdodCA9IGNhcmRIZWlnaHQ7XG4gICAgcmVzW2ldLmRhdGEucGVyY2VudCA9IHRvdGFsID4gMCA/IHJlc1tpXS5kYXRhLnZhbHVlIC8gdG90YWwgOiAwO1xuICAgIHJlc1tpXS5kYXRhLnRvdGFsID0gdG90YWw7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gZ2V0VG90YWwocmVzdWx0czogYW55KTogbnVtYmVyIHtcbiAgcmV0dXJuIHJlc3VsdHMubWFwKGQgPT4gKGQgPyBkLnZhbHVlIDogMCkpLnJlZHVjZSgoc3VtLCB2YWwpID0+IHN1bSArIHZhbCwgMCk7XG59XG4iXX0=