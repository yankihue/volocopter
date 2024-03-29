import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

type AddMissionModalProps = {
  showAddMissionModal: boolean;
  setShowAddMissionModal: (value: boolean) => void;
  setUpdated: (value: boolean) => void;
};
type FlightForm = {
  title: string;
  description: string;
};
export default function AddMissionModal({
  showAddMissionModal,
  setShowAddMissionModal,
  setUpdated,
}: AddMissionModalProps) {
  const [missionData, setMissionData] = useState<FlightForm>({
    title: "",
    description: "",
  });
  function addMission() {
    return axios
      .post("http://127.0.0.1:8000/flights/", {
        title: missionData.title,
        description: missionData.description,
      })
      .then(() => {
        setUpdated(true);
        closeModal();
        toast.success(
          <div className="flex flex-col text-center">
            <h3 className="font-bold text-lg">Successfully created mission</h3>
            <p>New mission is added to Pre-flight</p>
          </div>
        );
      });
  }
  function closeModal() {
    setShowAddMissionModal(false);
  }
  const onChange = (e: { target: { name: any; value: any } }) => {
    setMissionData({ ...missionData, [e.target.name]: e.target.value });
  };
  return (
    <Transition appear show={showAddMissionModal} as={Fragment}>
      <Dialog
        onClose={closeModal}
        className="bg-white rounded-lg p-4 space-y-2 flex flex-col"
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
        <div
          className="fixed inset-0 overflow-y-auto"
          data-testid="CreateMissionContainer"
        >
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
              <Dialog.Panel className="space-y-2 flex-col flex max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <span className="text-blue-700 inline font-extrabold uppercase">
                  Add{" "}
                  <div className="inline font-normal normal-case text-black">
                    {" "}
                    - Mission
                  </div>
                </span>
                <>
                  <label className="text-blue-900">Title*</label>
                  <input
                    onChange={onChange}
                    name="title"
                    className="border border-gray-400 rounded-t-lg p-2"
                    placeholder="Enter title..."
                  />
                  <label className="text-blue-900">Description</label>
                  <input
                    onChange={onChange}
                    name="description"
                    className="border border-gray-400 rounded-t-lg p-2"
                    placeholder="Enter description..."
                  />

                  <div className="ml-auto">
                    <button
                      data-testid="CancelCreateButton"
                      onClick={closeModal}
                      className="bg-gray-400 uppercase text-black font-semibold rounded-l-lg p-2"
                    >
                      Cancel
                    </button>
                    <button
                      data-testid="ConfirmCreateButton"
                      onClick={() => addMission()}
                      className="bg-blue-900 uppercase text-white font-semibold rounded-r-lg m-1 p-2"
                    >
                      Create
                    </button>
                  </div>
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
