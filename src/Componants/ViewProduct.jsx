import FormWithModal from "./FormWithModal";

function ViewProduct({ product, isModalOpen, setIsModalOpen }) {
    return (
        <FormWithModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            mode="view"
            initialValues={product}
            isViewOnly={true}
        />
    );
}

export default ViewProduct;