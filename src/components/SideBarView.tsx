import { useState } from "react";
import { useApi } from "./APIContext";
import { Folder } from "./TypesConfigration";

const SideBarView = () => {
  const { folders, recentNotes, error, addFolder, getNotes } = useApi();
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  function handleFoldersButton(folder: Folder) {
    getNotes(folder);
    setSelectedFolderId(folder.id);
  }

  return (
    <nav className="w-[20%] bg-transparent flex flex-col pt-6 gap-10 h-full">
      <div className="flex justify-between pl-4 pr-4">
        <img
          className="cursor-auto"
          src="./public/assets/Nowted-Logo.svg"
          alt="Nowted.svg"
        />
        <img
          className="cursor-auto"
          src="./public/assets/Search-Icon.svg"
          alt="search"
        />
      </div>
      <div className="text-white flex items-center justify-center">
        <button className="flex items-center gap-2 justify-center bg-[#FFFFFF0D] w-[90%] h-10 rounded-sm cursor-pointer">
          <img src="./public/assets/Plus-Icon.svg" alt="add" />
          New Note
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[#FFFFFF99] inline pl-4">Recents</h3>
        <div className="flex flex-col gap-1">
          {recentNotes.map((item) => {
            return (
              <button key={item.id} className="cursor-auto hover:bg-[#312EB5]">
                <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
                  <img
                    src="./public/assets/Selected-Page-Icon.svg"
                    alt="file"
                  />
                  <h1 className="text-white">{item.title}</h1>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex pl-4 pr-4 justify-between items-center">
          <h1 className="text-[#FFFFFF99]">Folders</h1>
          <img src="./public/assets/Add-Folder-Icon.svg" alt="" />
        </div>
        <div className="flex flex-col gap-1">
          {folders.map((item) => {
            return (
              <button
                key={item.id}
                className={`cursor-auto" ${
                  selectedFolderId === item.id
                    ? "bg-[#FFFFFF08]"
                    : "hover:bg-[#FFFFFF08]"
                } `}
                onClick={() => handleFoldersButton(item)}
              >
                <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
                  <img src="./public/assets/Folder-Icon.svg" alt="folder" />
                  <h1 className="text-[#FFFFFF99]">{item.name}</h1>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#FFFFFF99] inline pl-4">More</h1>
        <div className="flex flex-col gap-1">
          <button className="cursor-auto hover:bg-[#FFFFFF08]">
            <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
              <img src="./public/assets/Favourites-Icon.svg" alt="favourites" />
              <h1 className="text-[#FFFFFF99]">Favorites</h1>
            </div>
          </button>
          <button className="cursor-auto hover:bg-[#FFFFFF08]">
            <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
              <img src="./public/assets/Trash-Icon.svg" alt="trash" />
              <h1 className="text-[#FFFFFF99]">Trash</h1>
            </div>
          </button>
          <button className="cursor-auto hover:bg-[#FFFFFF08]">
            <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
              <img src="./public/assets/Archive-Icon.svg" alt="archive" />
              <h1 className="text-[#FFFFFF99]">Archived Notes</h1>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SideBarView;
