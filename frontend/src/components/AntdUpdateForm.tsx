import { Modal, Input, Button, Form, Spin, Select } from 'antd';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';
import { IoMdPersonAdd } from 'react-icons/io';
import axios from 'axios';
import { IPerson } from '../store/ZustandStore';


const { Option } = Select;

export default (formVal: any) => {
    const [form] = Form.useForm();
    const {
        modalProps,
        formProps,
        show,
        formLoading,
        formValues,
        formResult,
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

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="995">+995</Option>
            </Select>
        </Form.Item>
    );



    return (
        <>
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
                        name={['street']}
                        rules={[{ required: true }]}>
                        <Input placeholder='*Street...' />
                    </Form.Item>

                    <Form.Item
                        // label="City"
                        name={['city']}
                        rules={[{ required: true }]}>
                        <Input placeholder='*City...' />
                    </Form.Item>

                    <Form.Item
                        // label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input
                            // pattern='^\+\d{1,2}\s\(\d{3}\)\s\d{3}\-\d{4}$'
                            addonBefore={prefixSelector}
                            style={{ width: '100%' }}
                            placeholder='*Phone number...'
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
};