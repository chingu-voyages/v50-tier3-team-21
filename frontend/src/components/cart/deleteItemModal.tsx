import PrimaryButton from "../ui/button";

interface DeleteItemModalTypes {
    setShowDeleteModal: (status: boolean) => void;
    handleDelete: () => void;
}
export const DeleteItemModal = ({setShowDeleteModal, handleDelete }: DeleteItemModalTypes) => {
  return (
    <div className="fixed inset-0 bg-[#291E43] bg-opacity-30 flex items-center justify-center z-20">
      <div className="bg-white p-5 rounded-2xl min-w-[350px]">
        <div id="container" className="flex flex-col gap-5 relative">
         Are you sure you want to remove this item from your cart?
          <div className="flex gap-3 items-center justify-center">
              <PrimaryButton onClick={() => setShowDeleteModal(false)}>CANCEL</PrimaryButton>
              <PrimaryButton onClick={handleDelete}>REMOVE</PrimaryButton>
          </div>

        </div>
      </div>
    </div>
  );
};
