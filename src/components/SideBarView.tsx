import React, { useState } from "react";
import { useApi } from "./APIContext";
import { Folder, RecentNotesPreview } from "./TypesConfigration";
import FoldersComponent from "./FoldersComponent";
import RecentNoteComponent from "./RecentNoteComponent";
import NewNoteComponent from "./NewNoteComponent";
import { FavoritesComponent } from "./FavoritesComponent";
import { TrashComponent } from "./TrashComponent";
import { ArchivedComponent } from "./ArchivedComponent";
import { useNavigate } from "react-router-dom";

const SideBarView = () => {
  const {
    folders,
    recentNotes,
    recentNote,
    selectedFolderId,
    searchText,
    search,
    addRecentNote,
    addFolder,
    getNotes,
    setSelectedFolderId,
    setSearchText,
    setSearch,
  } = useApi();
  const [folderButton, setFolderButton] = useState(false);
  const [newFolder, setNewFolder] = useState("New Folder");
  const [selectedRecentNotes, setSelecetdRecentNotes] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  function handleRecentNotesButton(recentNote: RecentNotesPreview) {
    setSelecetdRecentNotes(recentNote.id);
    setSelectedFolderId(recentNote.folderId);
    addRecentNote(recentNote);
    getNotes(recentNote.folder);
    // navigate(`/recents/${recentNote.id}`);
  }

  function handleFoldersButton(folder: Folder) {
    getNotes(folder);
    setSelectedFolderId(folder.id);
    setSelecetdRecentNotes(null);
    addRecentNote(null);
    // navigate(`/folders/${folder.id}`);
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
  function onSearchTextHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <nav className="w-[20%] bg-transparent flex flex-col pt-6 gap-10 h-screen">
      <div className="flex justify-between pl-4 pr-4">
        <img
          className="cursor-auto"
          src="./public/assets/Nowted-Logo.svg"
          alt="Nowted.svg"
        />
        <button
          className="cursor-pointer"
          onClick={() => setSearch((prev) => !prev)}
        >
          {search ? (
            <img src="./public/assets/Search-Highlighted.svg" alt="search" />
          ) : (
            <img src="./public/assets/Search-Icon.svg" alt="search" />
          )}
        </button>
      </div>
      {search ? (
        <div className="flex items-center justify-center pl-4 pr-4">
          <img
            className="p-3 bg-[#FFFFFF0D] h-full rounded-s-md"
            src="./public/assets/Search-Input.svg"
            alt="..."
          />
          <input
            className="w-[90%] h-full outline-none text-white rounded-e-md bg-[#FFFFFF0D] p-3"
            type="text"
            placeholder="SearchNote"
            value={searchText}
            onChange={(e) => onSearchTextHandler(e)}
          />
        </div>
      ) : (
        <NewNoteComponent />
      )}

      <RecentNoteComponent
        recentNotes={recentNotes}
        selectedRecentNotes={selectedRecentNotes}
        handleRecentNotesButton={handleRecentNotesButton}
        recentNote={recentNote}
        setSelecetdRecentNotes={setSelecetdRecentNotes}
      />
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
          <FavoritesComponent />
          <TrashComponent />
          <ArchivedComponent />
        </div>
      </div>
    </nav>
  );
};

export default SideBarView;
