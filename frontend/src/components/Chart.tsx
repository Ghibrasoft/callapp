import { Pie } from '@ant-design/plots';
import { usePersonStore } from '../store/ZustandStore';

export function Chart() {
    const { data, allPersonsLength } = usePersonStore();

    // two variants of chart config (choose one)
    const config1 = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    const config2 = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.5,
        label: {
            type: "inner",
            offset: "-50%",
            content: "{value}",
            style: {
                textAlign: "center",
                fontSize: 14
            }
        },
        interactions: [{ type: "element-selected" }, { type: "element-active" }],
        statistic: {
            title: false as const,
            content: {
                style: {
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                },
                formatter: function formatter() {
                    return `Total / ${allPersonsLength}`;
                }
            }
        }
    };

    return (
        <div
            className='chart'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px',
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <Pie {...config1} />
            <Pie {...config2} />
        </div>
    )
};

