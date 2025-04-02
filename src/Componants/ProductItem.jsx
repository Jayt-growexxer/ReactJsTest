import { Card, Button, Space, Popconfirm, Tag, Typography } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/Slices/ProductSlices';
import EditProduct from './EditProduct';
import ViewProduct from './ViewProduct';

const { Text } = Typography;

function ProductItem({ product }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteProduct(product.id));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Card
            hoverable
            style={{ 
                height: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            actions={[
                <Button 
                    type="text"
                    icon={<EyeOutlined />} 
                    onClick={() => setIsViewModalOpen(true)}
                />,
                <Button 
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditModalOpen(true)}
                />,
                <Popconfirm
                    title="Delete Product"
                    description="Are you sure you want to delete this product?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button 
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            ]}
        >
            <Card.Meta
                title={
                    <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>{product.title}</Text>
                    </div>
                }
                description={
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <div style={{ 
                            fontSize: '20px', 
                            color: '#1890ff', 
                            marginBottom: '8px' 
                        }}>
                            ${Number(product.price).toFixed(2)}
                        </div>
                        <div>
                            <Tag color="blue">{product.category}</Tag>
                            <Tag color="purple">{product.brand}</Tag>
                        </div>
                        <div >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <div>
                                    <Text type="secondary">Stock: </Text>
                                    <Text strong>{product.stock}</Text>
                                </div>
                                <div>
                                    <Text type="secondary">Rating: </Text>
                                    <Text strong>{product.rating}/5</Text>
                                </div>
                                <div>
                                    <Tag color={product.isAvailable && product.stock>0? 'success' : 'error'}>
                                        {product.isAvailable && product.stock>0? 'In Stock' : 'Out of Stock'}
                                    </Tag>
                                </div>
                                <div>
                                    Last updated: {formatDate(product.updatedAt)}
                                </div>
                            </Space>
                        </div>
                    </Space>
                }
            />

            {/* Modals */}
            <EditProduct 
                product={product}
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
            />
            <ViewProduct 
                product={product}
                isModalOpen={isViewModalOpen}
                setIsModalOpen={setIsViewModalOpen}
            />
        </Card>
    );
}

export default ProductItem;