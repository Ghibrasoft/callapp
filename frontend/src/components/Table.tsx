import { Button, Form, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IPerson, usePersonStore } from '../store/ZustandStore';
import { useEffect, useState } from 'react';
import { UpdatePerson } from './UpdatePerson';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';



export function AntdTable() {
    const [formVal, setFormVal] = useState<IPerson>();
    const [selectedRowId, setSelectedRowId] = useState("");
    const { getPersons, putPerson, delPerson, rows, currentPage, allPersonsLength } = usePersonStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => {
        setIsModalVisible(false);
    };
    const delConfirmModal = (record: IPerson) => {
        Modal.confirm({
            title: "Confirm deletion",
            content: `Are you sure you want to delete ${record.name}?`,
            onOk: () => { deletePerson(record) },
            okText: "Delete",
            okButtonProps: { danger: true },
            cancelText: "Cancel"
        })
    }
    const deletePerson = async (record: IPerson) => {
        await delPerson(record.id, rows)
            .then(() => getPersons(currentPage, 20))
            .catch((error) => {
                console.log("Error deleting person", error)
            })
    }
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
                    <Button type='text' danger={true} onClick={() => delConfirmModal(record)}>Delete</Button>
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
        async submit(formValues) {
            await putPerson(selectedRowId, rows, formValues)
            getPersons(currentPage, 20);
            closeModal();
            return 'ok';
        },
    });


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
                            setSelectedRowId(record.id);
                        }
                    }
                }}
                pagination={{
                    current: currentPage,
                    pageSize: 20,
                    // pageSizeOptions: [10, 20, 50],
                    showSizeChanger: false,
                    total: allPersonsLength,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} persons`,
                    onChange: (currPage) => getPersons(currPage, 20)
                }}
            />

            {/* onDoubleClick modal/form */}
            <Modal
                {...modalProps}
                title="Update Person"
                okText="Update"
                width={400}
                open={isModalVisible}
                onCancel={closeModal}
            >
                <UpdatePerson initialValues={formVal} form={form} />
            </Modal>
        </>
    )
}
