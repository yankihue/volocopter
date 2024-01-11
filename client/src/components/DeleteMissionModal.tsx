export default function DeleteMissionModal({ flightId }: { flightId: number }) {
  return (
    <div className="bg-white rounded-lg p-4 absolute space-y-2 flex flex-col">
      {" "}
      <p>
        {" "}
        <h1 className="text-blue-700 inline font-extrabold uppercase">
          Delete
        </h1>{" "}
        - Mission {flightId}
      </p>
      <p>-</p>
      <p className="text-blue-900">
        Are you sure? You can't undo this action afterwards.
      </p>
      <div className="ml-auto">
        <button className="bg-gray-400 uppercase text-black font-semibold rounded-l-lg p-2">
          Cancel
        </button>
        <button className="bg-blue-900 uppercase text-white font-semibold rounded-r-lg m-1 p-2">
          Delete
        </button>
      </div>
    </div>
  );
}
