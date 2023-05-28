import { Pie } from '@ant-design/plots';
import { usePersonStore } from '../store/ZustandStore';

export function Chart() {
    const { data } = usePersonStore();

    console.log(data)

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
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

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100dvh',
                width: '100%',
                overflow: 'hidden'
            }}>
            <Pie {...config} />
        </div>
    )
};

