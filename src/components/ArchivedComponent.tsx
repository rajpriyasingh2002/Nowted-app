import { useApi } from "./APIContext";

export const ArchivedComponent = () => {
  const { moreNotes, setSelectedFolder } = useApi();
  function archiveButtonHandler(type: string) {
    setSelectedFolder({ name: type });
    const moreDetails = {
      favorite: false,
      archived: true,
      deleted: false,
    };
    moreNotes(moreDetails);
  }
  return (
    <button
      onClick={() => archiveButtonHandler("Archived Notes")}
      className="cursor-pointer hover:bg-[#FFFFFF08]"
    >
      <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
        <img src="./public/assets/Archive-Icon.svg" alt="archive" />
        <h1 className="text-[#FFFFFF99]">Archived Notes</h1>
      </div>
    </button>
  );
};
