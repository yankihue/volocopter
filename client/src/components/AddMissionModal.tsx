export default function AddMissionModal() {
  return (
    <div className="bg-white rounded-lg p-4 absolute space-y-2 flex flex-col">
      {" "}
      <p>
        {" "}
        <h1 className="text-blue-700 inline font-extrabold">ADD</h1> - Mission
      </p>
      <p>-</p>
      <p className="text-blue-900">Title*</p>
      <input
        className="border border-gray-400 rounded-t-lg p-2"
        placeholder="Enter title..."
      />
      <p className="text-blue-900">Description</p>{" "}
      <input
        className="border border-gray-400 rounded-t-lg p-2"
        placeholder="Enter description..."
      />
      <div className="ml-auto">
        <button className="bg-gray-400 uppercase text-black font-semibold rounded-l-lg p-2">
          Cancel
        </button>
        <button className="bg-blue-900 uppercase text-white font-semibold rounded-r-lg m-1 p-2">
          Create
        </button>
      </div>
    </div>
  );
}
