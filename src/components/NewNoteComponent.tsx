import { useApi } from "./APIContext";
import { toast } from "react-toastify";

const NewNoteComponent = () => {
  const { newNote, selectedFolder, setNewNote } = useApi();
  function newNoteButtonHandler() {
    if (newNote) return;

    if (!selectedFolder.id) {
      toast.info("Please select a folder to continue.");
      setNewNote(null);
      return;
    }
    setNewNote(selectedFolder.id);
  }
  return (
    <div className="text-white flex items-center justify-center">
      <button
        className="flex items-center gap-2 justify-center bg-[#FFFFFF0D] w-[90%] h-10 rounded-sm cursor-pointer"
        onClick={() => newNoteButtonHandler()}
      >
        <img src="/public/assets/Plus-Icon.svg" alt="add" />
        New Note
      </button>
    </div>
  );
};

export default NewNoteComponent;
