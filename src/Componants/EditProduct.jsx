import FormWithModal from "./FormWithModal";
import { useDispatch } from "react-redux";
import { updateProduct } from "../store/Slices/ProductSlices";

function EditProduct({ product, isModalOpen, setIsModalOpen }) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        await dispatch(updateProduct({ id: product.id, productData: values }));
    };

    return (
        <FormWithModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            mode="edit"
            initialValues={product}
            onSubmit={handleSubmit}
        />
    );
}

export default EditProduct;