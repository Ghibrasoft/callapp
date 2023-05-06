import { Modal, Input, Button, Form, Spin, Select } from 'antd';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';
import { IoMdPersonAdd } from 'react-icons/io';
import axios from 'axios';
import { IPerson, fetchData } from '../store/ZustandStore';


const { Option } = Select;

export function AntModalForm() {
    const [form] = Form.useForm();
    const {
        modalProps,
        formProps,
        show,
        formLoading,
    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: true,
        autoResetForm: true,
        async submit(values) { 
            const { name, email, gender, address, phone } = values;

            console.log('beforeSubmitFromModalForm');
            await axios.post<IPerson>('http://localhost:3001/persons', {
                name, email, gender, address, phone
            })
            fetchData();
            console.log('afterSubmitFromModalForm', name, email, gender, address, phone);
            return 'ok';
        },
        form,
    });

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="995">+995</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>
            <Modal {...modalProps} title="Add Person" okText="submit" width={400}>
                <Spin spinning={formLoading}>
                    <p>
                        Please fill all fields
                    </p>
                    <Form
                        layout="vertical"
                        {...formProps}
                    >
                        <Form.Item
                            // label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input name' }]}
                        >
                            <Input placeholder="*Name..." />
                        </Form.Item>

                        <Form.Item
                            // label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input email', type: 'email', },]}
                        >
                            <Input placeholder="*Email..." />
                        </Form.Item>

                        <Form.Item
                            // label="Gender"
                            name="gender"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select placeholder="*Select your gender...">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            // label="Street" 
                            name={['address', 'street']}
                            rules={[{ required: true }]}>
                            <Input placeholder='*Street...' />
                        </Form.Item>

                        <Form.Item
                            // label="City"
                            name={['address', 'city']}
                            rules={[{ required: true }]}>
                            <Input placeholder='*City...' />
                        </Form.Item>

                        <Form.Item
                            // label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                                placeholder='*Phone number...'
                            />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
            <Button
                type="primary"
                onClick={show}
                className='ant-btn-lg'
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <IoMdPersonAdd size={20} />Add
            </Button>
        </div>
    );
};