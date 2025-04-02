import { Space, Button, Popconfirm, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/Slices/ProductSlices";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";

function ProductActions({ product }) {
    const dispatch = useDispatch();
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await dispatch(deleteProduct(product.id));
            message.success("Product deleted successfully");
        } catch (error) {
            message.error("Error deleting product");
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Space size="middle">
            {/* View Button */}
            <Button 
                type="primary"
                onClick={() => setViewModalOpen(true)}
            >
                View Details
            </Button>

            {/* Edit Button */}
            <EditProduct 
                product={product}
                trigger={(setModalOpen) => (
                    <Button 
                        type="default"
                        onClick={() => setModalOpen(true)}
                    >
                        Edit
                    </Button>
                )}
            />

         
            <Popconfirm
                title="Delete Product"
                description="Are you sure you want to delete this product?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ danger: true }}
            >
                <Button type="primary" danger>
                    Delete
                </Button>
            </Popconfirm>

            {/* View Modal */}
            <ViewProduct 
                product={product}
                isModalOpen={viewModalOpen}
                setIsModalOpen={setViewModalOpen}
            />
        </Space>
    );
}

export default ProductActions; 