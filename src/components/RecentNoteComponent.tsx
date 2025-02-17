import { RecentNoteCoponentView } from "./TypesConfigration";

const RecentNoteComponent: React.FC<RecentNoteCoponentView> = ({
  recentNotes,
  selectedRecentNotes,
  handleRecentNotesButton,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[#FFFFFF99] inline pl-4">Recents</h3>
      <div className="flex flex-col gap-1">
        {recentNotes.map((item) => {
          return (
            <button
              key={item.id}
              className={`cursor-auto" ${
                selectedRecentNotes === item.id
                  ? "bg-[#312EB5]"
                  : "hover:bg-[#312EB5]"
              } `}
              onClick={() => handleRecentNotesButton(item)}
            >
              <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
                <img src="./public/assets/Selected-Page-Icon.svg" alt="file" />
                <h1 className="text-white">{item.title}</h1>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecentNoteComponent;
