import { useDispatch } from "react-redux";
import FormWithModal from "./FormWithModal";
import { addProduct } from "../store/Slices/ProductSlices";

function AddProduct({ isModalOpen, setIsModalOpen }) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        // The id, createdAt, and updatedAt are now handled inside FormWithModal
        await dispatch(addProduct(values));
    };

    return (
        <FormWithModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            mode="add"
            onSubmit={handleSubmit}
        />
    );
}

export default AddProduct;
