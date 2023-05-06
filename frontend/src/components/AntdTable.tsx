import { Button, Form, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IPerson, fetchData, usePersonStore } from '../store/ZustandStore';
import { useState } from 'react';
import { AntdUpdateForm } from './AntdUpdateForm';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';
import axios from 'axios';


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
                <Button type='dashed' onClick={() => handleDelete(record.id)}>Delete</Button>
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
    const [formVal, setFormVal] = useState<IPerson>();
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

            console.log('beforeSubmitFromTable');
            await axios.post<IPerson>('http://localhost:3001/persons', {
                name, email, gender, address, phone
            })
            console.log('afterSubmitFromTable', name, email, gender, address, phone);
            return 'ok';
        },
        form,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => {
        setIsModalVisible(false);
    };


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
                        }
                    }
                }}
            />

            {/* onDoubleClick modal/form */}
            <Modal {...modalProps} title="Update Person" okText="submit" width={400}
                open={isModalVisible}
                onCancel={closeModal}
            >
                <AntdUpdateForm initialValues={formVal} form={form}/>
            </Modal>
        </>
    )
}
