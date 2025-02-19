import { useNavigate } from "react-router-dom";
import { useApi } from "./APIContext";

export const TrashComponent = () => {
  const { moreNotes, setSelectedFolder } = useApi();
  const navigate = useNavigate();

  function trashButtonHandler(type: string) {
    setSelectedFolder({ name: type });
    const moreDetails = {
      favorite: true,
      archived: true,
      deleted: true,
    };
    moreNotes(moreDetails);
    navigate("/trash/notes");
  }
  return (
    <button
      onClick={() => trashButtonHandler("Trash")}
      className="cursor-pointer hover:bg-[#FFFFFF08]"
    >
      <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
        <img src="/public/assets/Trash-Icon.svg" alt="trash" />
        <h1 className="text-[#FFFFFF99]">Trash</h1>
      </div>
    </button>
  );
};
