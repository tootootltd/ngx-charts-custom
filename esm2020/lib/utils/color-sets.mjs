import { ScaleType } from '../common/types/scale-type.enum';
export const colorSets = [
    {
        name: 'vivid',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: [
            '#647c8a',
            '#3f51b5',
            '#2196f3',
            '#00b862',
            '#afdf0a',
            '#a7b61a',
            '#f3e562',
            '#ff9800',
            '#ff5722',
            '#ff4514'
        ]
    },
    {
        name: 'natural',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: [
            '#bf9d76',
            '#e99450',
            '#d89f59',
            '#f2dfa7',
            '#a5d7c6',
            '#7794b1',
            '#afafaf',
            '#707160',
            '#ba9383',
            '#d9d5c3'
        ]
    },
    {
        name: 'cool',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: [
            '#a8385d',
            '#7aa3e5',
            '#a27ea8',
            '#aae3f5',
            '#adcded',
            '#a95963',
            '#8796c0',
            '#7ed3ed',
            '#50abcc',
            '#ad6886'
        ]
    },
    {
        name: 'fire',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00']
    },
    {
        name: 'solar',
        selectable: true,
        group: ScaleType.Linear,
        domain: [
            '#fff8e1',
            '#ffecb3',
            '#ffe082',
            '#ffd54f',
            '#ffca28',
            '#ffc107',
            '#ffb300',
            '#ffa000',
            '#ff8f00',
            '#ff6f00'
        ]
    },
    {
        name: 'air',
        selectable: true,
        group: ScaleType.Linear,
        domain: [
            '#e1f5fe',
            '#b3e5fc',
            '#81d4fa',
            '#4fc3f7',
            '#29b6f6',
            '#03a9f4',
            '#039be5',
            '#0288d1',
            '#0277bd',
            '#01579b'
        ]
    },
    {
        name: 'aqua',
        selectable: true,
        group: ScaleType.Linear,
        domain: [
            '#e0f7fa',
            '#b2ebf2',
            '#80deea',
            '#4dd0e1',
            '#26c6da',
            '#00bcd4',
            '#00acc1',
            '#0097a7',
            '#00838f',
            '#006064'
        ]
    },
    {
        name: 'flame',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#A10A28',
            '#D3342D',
            '#EF6D49',
            '#FAAD67',
            '#FDDE90',
            '#DBED91',
            '#A9D770',
            '#6CBA67',
            '#2C9653',
            '#146738'
        ]
    },
    {
        name: 'ocean',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#1D68FB',
            '#33C0FC',
            '#4AFFFE',
            '#AFFFFF',
            '#FFFC63',
            '#FDBD2D',
            '#FC8A25',
            '#FA4F1E',
            '#FA141B',
            '#BA38D1'
        ]
    },
    {
        name: 'forest',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#55C22D',
            '#C1F33D',
            '#3CC099',
            '#AFFFFF',
            '#8CFC9D',
            '#76CFFA',
            '#BA60FB',
            '#EE6490',
            '#C42A1C',
            '#FC9F32'
        ]
    },
    {
        name: 'horizon',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#2597FB',
            '#65EBFD',
            '#99FDD0',
            '#FCEE4B',
            '#FEFCFA',
            '#FDD6E3',
            '#FCB1A8',
            '#EF6F7B',
            '#CB96E8',
            '#EFDEE0'
        ]
    },
    {
        name: 'neons',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#FF3333',
            '#FF33FF',
            '#CC33FF',
            '#0000FF',
            '#33CCFF',
            '#33FFFF',
            '#33FF66',
            '#CCFF33',
            '#FFCC00',
            '#FF6600'
        ]
    },
    {
        name: 'picnic',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#FAC51D',
            '#66BD6D',
            '#FAA026',
            '#29BB9C',
            '#E96B56',
            '#55ACD2',
            '#B7332F',
            '#2C83C9',
            '#9166B8',
            '#92E7E8'
        ]
    },
    {
        name: 'night',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#2B1B5A',
            '#501356',
            '#183356',
            '#28203F',
            '#391B3C',
            '#1E2B3C',
            '#120634',
            '#2D0432',
            '#051932',
            '#453080',
            '#75267D',
            '#2C507D',
            '#4B3880',
            '#752F7D',
            '#35547D'
        ]
    },
    {
        name: 'nightLights',
        selectable: false,
        group: ScaleType.Ordinal,
        domain: [
            '#4e31a5',
            '#9c25a7',
            '#3065ab',
            '#57468b',
            '#904497',
            '#46648b',
            '#32118d',
            '#a00fb3',
            '#1052a2',
            '#6e51bd',
            '#b63cc3',
            '#6c97cb',
            '#8671c1',
            '#b455be',
            '#7496c3'
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL3V0aWxzL2NvbG9yLXNldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBUzVELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBWTtJQUNoQztRQUNFLElBQUksRUFBRSxPQUFPO1FBQ2IsVUFBVSxFQUFFLElBQUk7UUFDaEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPO1FBQ3hCLE1BQU0sRUFBRTtZQUNOLFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7U0FDVjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLEtBQUssRUFBRSxTQUFTLENBQUMsT0FBTztRQUN4QixNQUFNLEVBQUU7WUFDTixTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1NBQ1Y7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLE1BQU07UUFDWixVQUFVLEVBQUUsSUFBSTtRQUNoQixLQUFLLEVBQUUsU0FBUyxDQUFDLE9BQU87UUFDeEIsTUFBTSxFQUFFO1lBQ04sU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztTQUNWO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxNQUFNO1FBQ1osVUFBVSxFQUFFLElBQUk7UUFDaEIsS0FB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LEVBQUUsU0FBUyxDQUFDLE9BQU87UUFDeEIsTUFBTSxFQUFFO1lBQ04sU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztTQUNWO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxPQUFPO1FBQ2IsVUFBVSxFQUFFLEtBQUs7UUFDakIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPO1FBQ3hCLE1BQU0sRUFBRTtZQUNOLFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztTQUNWO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxhQUFhO1FBQ25CLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLEtBQUssRUFBRSxTQUFTLENBQUMsT0FBTztRQUN4QixNQUFNLEVBQUU7WUFDTixTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7U0FDVjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yIHtcbiAgbmFtZTogc3RyaW5nO1xuICBzZWxlY3RhYmxlOiBib29sZWFuO1xuICBncm91cDogU2NhbGVUeXBlO1xuICBkb21haW46IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY29uc3QgY29sb3JTZXRzOiBDb2xvcltdID0gW1xuICB7XG4gICAgbmFtZTogJ3ZpdmlkJyxcbiAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgIGdyb3VwOiBTY2FsZVR5cGUuT3JkaW5hbCxcbiAgICBkb21haW46IFtcbiAgICAgICcjNjQ3YzhhJyxcbiAgICAgICcjM2Y1MWI1JyxcbiAgICAgICcjMjE5NmYzJyxcbiAgICAgICcjMDBiODYyJyxcbiAgICAgICcjYWZkZjBhJyxcbiAgICAgICcjYTdiNjFhJyxcbiAgICAgICcjZjNlNTYyJyxcbiAgICAgICcjZmY5ODAwJyxcbiAgICAgICcjZmY1NzIyJyxcbiAgICAgICcjZmY0NTE0J1xuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICduYXR1cmFsJyxcbiAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgIGdyb3VwOiBTY2FsZVR5cGUuT3JkaW5hbCxcbiAgICBkb21haW46IFtcbiAgICAgICcjYmY5ZDc2JyxcbiAgICAgICcjZTk5NDUwJyxcbiAgICAgICcjZDg5ZjU5JyxcbiAgICAgICcjZjJkZmE3JyxcbiAgICAgICcjYTVkN2M2JyxcbiAgICAgICcjNzc5NGIxJyxcbiAgICAgICcjYWZhZmFmJyxcbiAgICAgICcjNzA3MTYwJyxcbiAgICAgICcjYmE5MzgzJyxcbiAgICAgICcjZDlkNWMzJ1xuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdjb29sJyxcbiAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgIGdyb3VwOiBTY2FsZVR5cGUuT3JkaW5hbCxcbiAgICBkb21haW46IFtcbiAgICAgICcjYTgzODVkJyxcbiAgICAgICcjN2FhM2U1JyxcbiAgICAgICcjYTI3ZWE4JyxcbiAgICAgICcjYWFlM2Y1JyxcbiAgICAgICcjYWRjZGVkJyxcbiAgICAgICcjYTk1OTYzJyxcbiAgICAgICcjODc5NmMwJyxcbiAgICAgICcjN2VkM2VkJyxcbiAgICAgICcjNTBhYmNjJyxcbiAgICAgICcjYWQ2ODg2J1xuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdmaXJlJyxcbiAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgIGdyb3VwOiBTY2FsZVR5cGUuT3JkaW5hbCxcbiAgICBkb21haW46IFsnI2ZmM2QwMCcsICcjYmYzNjBjJywgJyNmZjhmMDAnLCAnI2ZmNmYwMCcsICcjZmY1NzIyJywgJyNlNjUxMDAnLCAnI2ZmY2EyOCcsICcjZmZhYjAwJ11cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdzb2xhcicsXG4gICAgc2VsZWN0YWJsZTogdHJ1ZSxcbiAgICBncm91cDogU2NhbGVUeXBlLkxpbmVhcixcbiAgICBkb21haW46IFtcbiAgICAgICcjZmZmOGUxJyxcbiAgICAgICcjZmZlY2IzJyxcbiAgICAgICcjZmZlMDgyJyxcbiAgICAgICcjZmZkNTRmJyxcbiAgICAgICcjZmZjYTI4JyxcbiAgICAgICcjZmZjMTA3JyxcbiAgICAgICcjZmZiMzAwJyxcbiAgICAgICcjZmZhMDAwJyxcbiAgICAgICcjZmY4ZjAwJyxcbiAgICAgICcjZmY2ZjAwJ1xuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdhaXInLFxuICAgIHNlbGVjdGFibGU6IHRydWUsXG4gICAgZ3JvdXA6IFNjYWxlVHlwZS5MaW5lYXIsXG4gICAgZG9tYWluOiBbXG4gICAgICAnI2UxZjVmZScsXG4gICAgICAnI2IzZTVmYycsXG4gICAgICAnIzgxZDRmYScsXG4gICAgICAnIzRmYzNmNycsXG4gICAgICAnIzI5YjZmNicsXG4gICAgICAnIzAzYTlmNCcsXG4gICAgICAnIzAzOWJlNScsXG4gICAgICAnIzAyODhkMScsXG4gICAgICAnIzAyNzdiZCcsXG4gICAgICAnIzAxNTc5YidcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnYXF1YScsXG4gICAgc2VsZWN0YWJsZTogdHJ1ZSxcbiAgICBncm91cDogU2NhbGVUeXBlLkxpbmVhcixcbiAgICBkb21haW46IFtcbiAgICAgICcjZTBmN2ZhJyxcbiAgICAgICcjYjJlYmYyJyxcbiAgICAgICcjODBkZWVhJyxcbiAgICAgICcjNGRkMGUxJyxcbiAgICAgICcjMjZjNmRhJyxcbiAgICAgICcjMDBiY2Q0JyxcbiAgICAgICcjMDBhY2MxJyxcbiAgICAgICcjMDA5N2E3JyxcbiAgICAgICcjMDA4MzhmJyxcbiAgICAgICcjMDA2MDY0J1xuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdmbGFtZScsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZ3JvdXA6IFNjYWxlVHlwZS5PcmRpbmFsLFxuICAgIGRvbWFpbjogW1xuICAgICAgJyNBMTBBMjgnLFxuICAgICAgJyNEMzM0MkQnLFxuICAgICAgJyNFRjZENDknLFxuICAgICAgJyNGQUFENjcnLFxuICAgICAgJyNGRERFOTAnLFxuICAgICAgJyNEQkVEOTEnLFxuICAgICAgJyNBOUQ3NzAnLFxuICAgICAgJyM2Q0JBNjcnLFxuICAgICAgJyMyQzk2NTMnLFxuICAgICAgJyMxNDY3MzgnXG4gICAgXVxuICB9LFxuICB7XG4gICAgbmFtZTogJ29jZWFuJyxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBncm91cDogU2NhbGVUeXBlLk9yZGluYWwsXG4gICAgZG9tYWluOiBbXG4gICAgICAnIzFENjhGQicsXG4gICAgICAnIzMzQzBGQycsXG4gICAgICAnIzRBRkZGRScsXG4gICAgICAnI0FGRkZGRicsXG4gICAgICAnI0ZGRkM2MycsXG4gICAgICAnI0ZEQkQyRCcsXG4gICAgICAnI0ZDOEEyNScsXG4gICAgICAnI0ZBNEYxRScsXG4gICAgICAnI0ZBMTQxQicsXG4gICAgICAnI0JBMzhEMSdcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnZm9yZXN0JyxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBncm91cDogU2NhbGVUeXBlLk9yZGluYWwsXG4gICAgZG9tYWluOiBbXG4gICAgICAnIzU1QzIyRCcsXG4gICAgICAnI0MxRjMzRCcsXG4gICAgICAnIzNDQzA5OScsXG4gICAgICAnI0FGRkZGRicsXG4gICAgICAnIzhDRkM5RCcsXG4gICAgICAnIzc2Q0ZGQScsXG4gICAgICAnI0JBNjBGQicsXG4gICAgICAnI0VFNjQ5MCcsXG4gICAgICAnI0M0MkExQycsXG4gICAgICAnI0ZDOUYzMidcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnaG9yaXpvbicsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZ3JvdXA6IFNjYWxlVHlwZS5PcmRpbmFsLFxuICAgIGRvbWFpbjogW1xuICAgICAgJyMyNTk3RkInLFxuICAgICAgJyM2NUVCRkQnLFxuICAgICAgJyM5OUZERDAnLFxuICAgICAgJyNGQ0VFNEInLFxuICAgICAgJyNGRUZDRkEnLFxuICAgICAgJyNGREQ2RTMnLFxuICAgICAgJyNGQ0IxQTgnLFxuICAgICAgJyNFRjZGN0InLFxuICAgICAgJyNDQjk2RTgnLFxuICAgICAgJyNFRkRFRTAnXG4gICAgXVxuICB9LFxuICB7XG4gICAgbmFtZTogJ25lb25zJyxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBncm91cDogU2NhbGVUeXBlLk9yZGluYWwsXG4gICAgZG9tYWluOiBbXG4gICAgICAnI0ZGMzMzMycsXG4gICAgICAnI0ZGMzNGRicsXG4gICAgICAnI0NDMzNGRicsXG4gICAgICAnIzAwMDBGRicsXG4gICAgICAnIzMzQ0NGRicsXG4gICAgICAnIzMzRkZGRicsXG4gICAgICAnIzMzRkY2NicsXG4gICAgICAnI0NDRkYzMycsXG4gICAgICAnI0ZGQ0MwMCcsXG4gICAgICAnI0ZGNjYwMCdcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAncGljbmljJyxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBncm91cDogU2NhbGVUeXBlLk9yZGluYWwsXG4gICAgZG9tYWluOiBbXG4gICAgICAnI0ZBQzUxRCcsXG4gICAgICAnIzY2QkQ2RCcsXG4gICAgICAnI0ZBQTAyNicsXG4gICAgICAnIzI5QkI5QycsXG4gICAgICAnI0U5NkI1NicsXG4gICAgICAnIzU1QUNEMicsXG4gICAgICAnI0I3MzMyRicsXG4gICAgICAnIzJDODNDOScsXG4gICAgICAnIzkxNjZCOCcsXG4gICAgICAnIzkyRTdFOCdcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnbmlnaHQnLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGdyb3VwOiBTY2FsZVR5cGUuT3JkaW5hbCxcbiAgICBkb21haW46IFtcbiAgICAgICcjMkIxQjVBJyxcbiAgICAgICcjNTAxMzU2JyxcbiAgICAgICcjMTgzMzU2JyxcbiAgICAgICcjMjgyMDNGJyxcbiAgICAgICcjMzkxQjNDJyxcbiAgICAgICcjMUUyQjNDJyxcbiAgICAgICcjMTIwNjM0JyxcbiAgICAgICcjMkQwNDMyJyxcbiAgICAgICcjMDUxOTMyJyxcbiAgICAgICcjNDUzMDgwJyxcbiAgICAgICcjNzUyNjdEJyxcbiAgICAgICcjMkM1MDdEJyxcbiAgICAgICcjNEIzODgwJyxcbiAgICAgICcjNzUyRjdEJyxcbiAgICAgICcjMzU1NDdEJ1xuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICduaWdodExpZ2h0cycsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZ3JvdXA6IFNjYWxlVHlwZS5PcmRpbmFsLFxuICAgIGRvbWFpbjogW1xuICAgICAgJyM0ZTMxYTUnLFxuICAgICAgJyM5YzI1YTcnLFxuICAgICAgJyMzMDY1YWInLFxuICAgICAgJyM1NzQ2OGInLFxuICAgICAgJyM5MDQ0OTcnLFxuICAgICAgJyM0NjY0OGInLFxuICAgICAgJyMzMjExOGQnLFxuICAgICAgJyNhMDBmYjMnLFxuICAgICAgJyMxMDUyYTInLFxuICAgICAgJyM2ZTUxYmQnLFxuICAgICAgJyNiNjNjYzMnLFxuICAgICAgJyM2Yzk3Y2InLFxuICAgICAgJyM4NjcxYzEnLFxuICAgICAgJyNiNDU1YmUnLFxuICAgICAgJyM3NDk2YzMnXG4gICAgXVxuICB9XG5dO1xuIl19