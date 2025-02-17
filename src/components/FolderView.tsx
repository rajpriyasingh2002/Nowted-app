import { useEffect, useState } from "react";
import { useApi } from "./APIContext";

const FolderView = () => {
  const {
    notesPreview,
    getNote,
    recentNote,
    searchText,
    addRecentNote,
    setSelectedFolderId,
  } = useApi();
  const [selectedNotesId, setSelectedNotesId] = useState<string | null>(null);

  useEffect(() => {
    if (recentNote) {
      setSelectedNotesId(recentNote.id);
      getNote(recentNote.id);
    }
  }, [recentNote]);

  const folderName =
    notesPreview && Object.keys(notesPreview).length > 0
      ? Object.keys(notesPreview)[0]
      : null;

  if (!folderName) {
    return (
      <div className="text-white p-4">No notes available. Select a folder.</div>
    );
  }

  function handleNotesOnClick(id: string) {
    addRecentNote(null);
    getNote(id);
    setSelectedNotesId(id);

    if (folderName !== null && notesPreview[folderName]) {
      setSelectedFolderId(notesPreview[folderName][0].folderId);
    }
  }

  return (
    <div className="bg-[#1C1C1C] w-[20%] flex flex-col p-6 pt-10 gap-10 overflow-y-scroll h-screen">
      <h1 className="text-white text-2xl font-semibold">{folderName}</h1>
      <div className="flex flex-col gap-4">
        {notesPreview[folderName].map((item) => {
          if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
            const isHighlighted =
              selectedNotesId === item.id ||
              (recentNote?.id === item.id && !selectedNotesId);

            const date = new Date(Date.parse(item.createdAt));
            return (
              <div
                onClick={() => handleNotesOnClick(item.id)}
                key={item.id}
                className={`${
                  isHighlighted
                    ? "bg-[#FFFFFF1A]"
                    : "bg-[#FFFFFF08] hover:bg-[#FFFFFF1A]"
                } pt-5 p-4 flex flex-col gap-3 cursor-pointer`}
              >
                <h1 className="text-white text-lg font-semibold">
                  {item.title}
                </h1>
                <div className="flex gap-2 justify-between">
                  <p className="text-[#FFFFFF66]">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
                  <p className="text-[#FFFFFF99]">
                    {item.preview.slice(0, 20) + "....."}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FolderView;
