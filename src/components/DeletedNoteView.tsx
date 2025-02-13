const DeletedNoteView = () => {
  return (
    <div className="flex flex-col h-[50%] items-center justify-center w-[50%]">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src="./public/assets/Restore-Icon.svg" alt="restore" />
        <h2 className="text-white text-3xl text-center font-semibold">
          Restore “Reflection on the Month of June”
        </h2>
        <p className="text-[#FFFFFF99] text-center">
          Don't want to lose this note? It's not too late! Just click the
          'Restore' button and it will be added back to your list. It's that
          simple.
        </p>
        <button className="bg-[#312EB5] p-2 pr-5 pl-5 rounded-sm text-white cursor-pointer">
          Restore
        </button>
      </div>
    </div>
  );
};
export default DeletedNoteView;
