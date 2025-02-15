import React, { useEffect, useState } from "react";
import { useApi } from "./APIContext";
import { Folder, RecentNotesPreview } from "./TypesConfigration";
import FoldersComponent from "./FoldersComponent";

const SideBarView = () => {
  const {
    folders,
    recentNotes,
    recentNote,
    selectedFolderId,
    addRecentNote,
    addFolder,
    getNotes,
    setSelectedFolderId,
  } = useApi();
  const [folderButton, setFolderButton] = useState(false);
  const [newFolder, setNewFolder] = useState("New Folder");
  const [selectedRecentNotes, setSelecetdRecentNotes] = useState<string | null>(
    null
  );

  function handleRecentNotesButton(recentNote: RecentNotesPreview) {
    setSelecetdRecentNotes(recentNote.id);
    setSelectedFolderId(recentNote.folderId);
    addRecentNote(recentNote);
    getNotes(recentNote.folder);
  }

  function handleFoldersButton(folder: Folder) {
    getNotes(folder);
    setSelectedFolderId(folder.id);
    setSelecetdRecentNotes(null);
    addRecentNote(null);
  }

  const handleFolderClickButton = () => {
    setFolderButton((prev) => !prev);
  };

  function handleNewFolder(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setNewFolder(e.target.value);
    console.log(newFolder);
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addFolder(newFolder);

    setNewFolder("New Folder");
    setFolderButton(false);
  }

  //this should also go with recent note component later
  useEffect(() => {
    if (!recentNote) {
      setSelecetdRecentNotes(null);
    }
  }, [recentNote]);

  return (
    <nav className="w-[20%] bg-transparent flex flex-col pt-6 gap-10 h-screen">
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
      <FoldersComponent
        handleFolderClickButton={handleFolderClickButton}
        folderButton={folderButton}
        handleOnSubmit={handleOnSubmit}
        newFolder={newFolder}
        handleNewFolder={handleNewFolder}
        folders={folders}
        selectedFolderId={selectedFolderId}
        handleFoldersButton={handleFoldersButton}
        recentNote={recentNote}
        addRecentNote={addRecentNote}
      />
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
