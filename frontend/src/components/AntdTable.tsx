import { Form, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IPerson, fetchData, usePersonStore } from '../store/ZustandStore';
import { useState } from 'react';
import AntdUpdateForm from './AntdUpdateForm';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';
import axios from 'axios';

// interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
//     tags: string[];
// }

// const columns: ColumnsType<DataType> = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         render: (text) => <a>{text}</a>,
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => {
//                     let color = tag.length > 5 ? 'geekblue' : 'green';
//                     if (tag === 'loser') {
//                         color = 'volcano';
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag.toUpperCase()}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Action',
//         key: 'action',
//         render: (_, record) => (
//             <Space size="middle">
//                 <a>Invite {record.name}</a>
//                 <a>Delete</a>
//             </Space>
//         ),
//     },
// ];


const columns: ColumnsType<IPerson> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Street',
        dataIndex: ['address', 'street'],
        key: 'street',
    },
    {
        title: 'City',
        dataIndex: ['address', 'city'],
        key: 'city',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
        ),
    },
];

// delete person 
async function handleDelete(id: any) {
    try {
        await axios.delete(`http://localhost:3001/persons/${id}`)
        fetchData();
    } catch (error) {
        console.log(error);
    }
}

export function AntdTable() {
    
    const { personData } = usePersonStore();

    const [form] = Form.useForm();
    const {
        modalProps,
    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: true,
        autoResetForm: true,
        async submit(values) { 
            const { name, email, gender, address, phone } = values;
            
            console.log('beforeSubmit');
            await axios.post<IPerson>('http://localhost:3001/persons', {
                name, email, gender, address, phone
            })
            await new Promise(r => setTimeout(r, 1000));
            console.log('afterSubmit', name, email, gender, address, phone);
            return 'ok';
        },
        form,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeRecord, setActiveRecord] = useState<any>(null);

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const [formVal, setFormVal] = useState<IPerson>();
    return (
        <>
            <Table
                columns={columns}
                dataSource={personData.map((person) => ({ ...person, key: person.id }))}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            setIsModalVisible(true);
                            setFormVal(record);
                            console.log(formVal)
                        }
                    }
                }}
                footer={() => personData.length}  // this must be removed
            />

            {/* onDoubleClick modal/form */}
            <Modal {...modalProps} title="Update Person" okText="submit" width={400}
                open={isModalVisible}
                onCancel={closeModal}
            >
                <AntdUpdateForm />
            </Modal>
        </>
    )
}
