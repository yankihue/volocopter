import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment } from "react";
import toast from "react-hot-toast";
type DeleteMissionModalProps = {
  flightId: number;
  setUpdated: (value: boolean) => void;
  showDeleteMissionModal: boolean;
  setShowDeleteMissionModal: (value: boolean) => void;
};
export default function DeleteMissionModal({
  flightId,
  setUpdated,
  showDeleteMissionModal,
  setShowDeleteMissionModal,
}: DeleteMissionModalProps) {
  function deleteMission() {
    return axios
      .delete(`http://127.0.0.1:8000/flights/${flightId}`)
      .then(() => {
        setUpdated(true);
        closeModal();
        toast.success(
          <div className="flex flex-col text-center">
            <h3 className="font-bold text-lg">Successfully deleted mission</h3>
          </div>
        );
      });
  }
  function closeModal() {
    setShowDeleteMissionModal(false);
  }
  return (
    <Transition appear show={showDeleteMissionModal} as={Fragment}>
      <Dialog
        onClose={closeModal}
        className="bg-white rounded-lg p-4 absolute space-y-2 flex flex-col"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="divide-y space-y-2 flex-col flex max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <p>
                  <span className="text-blue-700 inline font-extrabold uppercase">
                    Delete
                  </span>{" "}
                  - Mission {flightId}
                </p>
                <p className="text-blue-900">
                  Are you sure? You can't undo this action afterwards.
                </p>
                <div className="ml-auto">
                  <button
                    onClick={closeModal}
                    className="bg-gray-400 uppercase text-black font-semibold rounded-l-lg p-2"
                  >
                    Cancel
                  </button>
                  <button
                    data-testid={`ConfirmDeleteButton${flightId}`}
                    onClick={() => deleteMission()}
                    className="bg-blue-900 uppercase text-white font-semibold rounded-r-lg m-1 p-2"
                  >
                    Delete
                  </button>
                </div>{" "}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
