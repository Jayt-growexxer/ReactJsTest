import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Pagination, Empty, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchProducts } from '../store/Slices/ProductSlices';
import AddProduct from './AddProduct';
import ProductItem from './ProductItem';

function ProductList() {
    const dispatch = useDispatch();
    const { data: products, loading, error } = useSelector(state => state.product);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

   

   

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h3>Error: {error}</h3>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            {/* Header with Add Button */}
            <div style={{ 
                marginBottom: '24px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                padding: '16px 24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ margin: 0, fontSize: '24px' }}>Products</h1>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddModalOpen(true)}
                    size="large"
                >
                    Add Product
                </Button>
            </div>

            {/* Products Grid */}
            <Spin spinning={loading}>
                {products.length === 0 ? (
                    <Empty 
                        description="No products found" 
                        style={{ 
                            margin: '40px 0',
                            padding: '40px',
                            background: '#fff',
                            borderRadius: '8px'
                        }}
                    />
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {currentProducts.map(product => (
                                <Col  key={product.id}>
                                    <ProductItem product={product} />
                                </Col>
                            ))}
                        </Row>

                        {/* Pagination */}
                        <div style={{ 
                            marginTop: '24px', 
                            textAlign: 'center',
                            background: '#fff',
                            padding: '16px',
                            borderRadius: '8px'
                        }}>
                            <Pagination
                                current={currentPage}
                                total={products.length}
                                pageSize={pageSize}
                                onChange={setCurrentPage}
                                showTotal={(total) => `Total ${total} products`}
                            />
                        </div>
                    </>
                )}
            </Spin>

            {/* Add Product Modal */}
            <AddProduct 
                isModalOpen={isAddModalOpen}
                setIsModalOpen={setIsAddModalOpen}
            />
        </div>
    );
}

export default ProductList;