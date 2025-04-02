import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import { nanoid } from 'nanoid';

function FormWithModal({ isModalOpen, setIsModalOpen, mode , initialValues , onSubmit, isViewOnly }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues && isModalOpen) {
            form.setFieldsValue(initialValues);
;
        }
    }, [initialValues, isModalOpen, form]);

    const handleSubmit = async (values) => {
        const now = new Date().toISOString();
        
        const submissionData = {
            ...values,
            ...(mode === "add" && { id: nanoid() }),
            ...(mode === "add" && { 
                createdAt: now,
                updatedAt: now 
            }),
            ...(mode === "edit" && { 
                updatedAt: now 
            })
        };

        await onSubmit(submissionData);
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <Modal 
            title={mode === "add" ? "Add Product" : mode === "edit" ? "Edit Product" : "View Product"}
            open={isModalOpen} 
            onCancel={() => {
                form.resetFields();
                setIsModalOpen(false);
            }}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                disabled={isViewOnly}
                initialValues={initialValues}
            >
                {/* Hidden fields for view mode */}
                {isViewOnly && (
                    <>
                        <Form.Item label="ID" name="id">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Created At" name="createdAt">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Updated At" name="updatedAt">
                            <Input disabled />
                        </Form.Item>
                    </>
                )}

                <Form.Item 
                    label="Title" 
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Description" 
                    name="description"
                    rules={[{ required: false, message: 'Please input the description! It is good ' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item 
                    label="Category" 
                    name="category"
                    rules={[{ required: true, message: 'Please input the category!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Price" 
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item 
                    label="Rating" 
                    name="rating"
                    rules={[{ required: true, message: 'Please input the rating!' }]}
                >
                    <Input type="number" min={0} max={5} step={0.1} />
                </Form.Item>    
                <Form.Item 
                    label="Stock" 
                    name="stock"
                    rules={[{ required: true, message: 'Please input the stock!' }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>
                <Form.Item 
                    label="Brand" 
                    name="brand"
                    rules={[{ required: true, message: 'Please input the brand!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Availability" 
                    name="isAvailable"
                    valuePropName="checked"
                    
                >
                    <Input type="checkbox"  />
                </Form.Item>
                {!isViewOnly && (
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {mode === "add" ? "Add Product" : "Update Product"}
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
}

export default FormWithModal;