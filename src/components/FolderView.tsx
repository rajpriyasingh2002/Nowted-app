import { useEffect, useState } from "react";
import { useApi } from "./APIContext";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const FolderView = () => {
  const {
    notesPreview,
    getNote,
    recentNote,
    searchText,
    addRecentNote,
    selectedFolder,
    setSelectedFolder,
    notesLoading,
  } = useApi();
  const [selectedNotesId, setSelectedNotesId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (recentNote) {
      setSelectedNotesId(recentNote.id);
      getNote(recentNote.id);
    }
  }, [recentNote]);

  const folderName = selectedFolder.name!;

  function handleNotesOnClick(id: string) {
    addRecentNote(null);
    getNote(id);
    setSelectedNotesId(id);

    const folderPath =
      selectedFolder.name === "Favorites"
        ? "favorite"
        : selectedFolder.name === "Trash"
        ? "trash"
        : selectedFolder.name === "Archived Notes"
        ? "archive"
        : `folders/${selectedFolder.id}`;

    navigate(`/${folderPath}/notes/${id}`);

    const isSpecialFolder = ["Favorites", "Trash", "Archived Notes"].includes(
      folderName
    );

    if (!isSpecialFolder && folderName !== null && notesPreview[0]) {
      setSelectedFolder({
        id: notesPreview[0].folderId,
        name: notesPreview[0].folder.name,
      });
    }
  }

  return (
    <div className="bg-[#1C1C1C] w-[20%] flex flex-col p-6 pt-10 gap-10 overflow-y-scroll h-screen">
      <h1 className="text-white text-2xl font-semibold">{folderName}</h1>
      <div className="flex flex-col gap-4">
        {notesLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ffffff" size={30} />
          </div>
        ) : (
          notesPreview.map((item) => {
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
          })
        )}
      </div>
      {/* <div className="flex items-center justify-center">
        <button className="bg-white text-black p-2 rounded-md cursor-pointer">
          Load More
        </button>
      </div> */}
    </div>
  );
};

export default FolderView;
