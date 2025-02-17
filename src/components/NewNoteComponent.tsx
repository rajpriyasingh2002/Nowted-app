import { useApi } from "./APIContext";

const NewNoteComponent = () => {
  const { newNote, selectedFolderId, setNewNote } = useApi();
  function newNoteButtonHandler() {
    if (newNote) return;

    if (!selectedFolderId) {
      alert("Please select a folder to continue."); //use react - toastify instead of this
      setNewNote(null);
      return;
    }
    setNewNote(selectedFolderId);
  }
  return (
    <div className="text-white flex items-center justify-center">
      <button
        className="flex items-center gap-2 justify-center bg-[#FFFFFF0D] w-[90%] h-10 rounded-sm cursor-pointer"
        onClick={() => newNoteButtonHandler()}
      >
        <img src="./public/assets/Plus-Icon.svg" alt="add" />
        New Note
      </button>
    </div>
  );
};

export default NewNoteComponent;
