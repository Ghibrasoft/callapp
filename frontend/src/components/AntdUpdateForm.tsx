import { Input, Form, Spin, Select } from 'antd';
import { useModalForm } from 'sunflower-antd/lib/useModalForm';
import axios from 'axios';
import { IPerson, fetchData } from '../store/ZustandStore';
import { useEffect } from 'react';


const { Option } = Select;

interface AntdUpdateFormProps {
    initialValues?: IPerson;
    form: any;
}


export function AntdUpdateForm({ initialValues }: AntdUpdateFormProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);


    const {
        formProps,
        formLoading,
    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: true,
        autoResetForm: true,
        async submit(values) {
            const { name, email, gender, address, phone } = values;

            console.log('beforeUpdate');
            await axios.put<IPerson>('http://localhost:3001/persons', {
                name, email, gender, address, phone
            })
            fetchData();
            console.log('afterUpdate', name, email, gender, address, phone);
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
                    form={form}
                    initialValues={initialValues}
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
        </>
    );
};