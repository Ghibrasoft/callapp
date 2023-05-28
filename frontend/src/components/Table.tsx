import { Button, Form, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IPerson, usePersonStore } from '../store/ZustandStore';
import { useEffect, useState } from 'react';
import { UpdatePerson } from './UpdatePerson';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';



export function AntdTable() {
    const [formVal, setFormVal] = useState<IPerson>();
    const { getPersons, delPerson, rows, currentPage, allPersonsLength } = usePersonStore();
    // table cols
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
                    <Button type='dashed' onClick={() => delPerson(record.id, rows).then(() => getPersons(currentPage, 20))}>Delete</Button>
                </Space>
            ),
        },
    ];
    const [form] = Form.useForm();
    const {
        modalProps,
    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: true,
        autoResetForm: true,
        form,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        getPersons(currentPage, 20);
    }, [currentPage, getPersons]);

    return (
        <>
            <Table
                columns={columns}
                dataSource={rows.map((person) => ({ ...person, key: person.id }))}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            setIsModalVisible(true);
                            setFormVal(record);
                        }
                    }
                }}
                pagination={{
                    current: currentPage,
                    pageSize: 20,
                    // pageSizeOptions: [10, 20, 50],
                    showSizeChanger: false,
                    total: allPersonsLength,
                    onChange: (currPage) => getPersons(currPage, 20)
                }}
            />

            {/* onDoubleClick modal/form */}
            <Modal {...modalProps} title="Update Person" okText="submit" width={400}
                open={isModalVisible}
                onCancel={closeModal}
            >
                <UpdatePerson initialValues={formVal} form={form} />
            </Modal>
        </>
    )
}
