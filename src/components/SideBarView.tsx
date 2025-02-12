import { useEffect, useState } from "react";
import axios from "axios";

type Folders = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

const SideBarView = () => {
  const [foldersList, setFoldersList] = useState<Folders[]>([]);
  useEffect(() => {
    axios
      .get("/api/folders")
      .then((response) => {
        const data = response.data.folders;
        console.log(data);
        setFoldersList([...foldersList, ...data]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <nav className="w-[20%] bg-transparent flex flex-col pt-6 gap-10">
      <div className="flex justify-between pl-4 pr-4">
        <img
          className="cursor-pointer"
          src="./public/assets/Nowted-Logo.svg"
          alt="Nowted.svg"
        />
        <img
          className="cursor-pointer"
          src="./public/assets/Search-Icon.svg"
          alt="search"
        />
      </div>
      <div className="text-white flex items-center justify-center">
        <button className="flex items-center gap-2 justify-center bg-[#FFFFFF0D] w-[90%] h-10 rounded-sm">
          <img src="./public/assets/Plus-Icon.svg" alt="add" />
          New Note
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[#FFFFFF99] inline pl-4">Recents</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2 bg-[#312EB5]">
            <img src="./public/assets/Selected-Page-Icon.svg" alt="file" />
            <h1 className="text-white">Refelection on the Month of June</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Page-Icon.svg" alt="file" />
            <h1 className="text-[#FFFFFF99]">Project Proposal</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Page-Icon.svg" alt="file" />
            <h1 className="text-[#FFFFFF99]">Travel itinerary</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex pl-4 pr-4 justify-between items-center">
          <h1 className="text-[#FFFFFF99]">Folders</h1>
          <img src="./public/assets/Add-Folder-Icon.svg" alt="" />
        </div>
        <div className="flex flex-col gap-1">
          {foldersList.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2 bg-[#FFFFFF08]"
              >
                <img src="./public/assets/Open-Folder-Icon.svg" alt="folder" />
                <h1 className="text-white">{item.name}</h1>
              </div>
            );
          })}
          {/* <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2 bg-[#FFFFFF08]">
            <img src="./public/assets/Open-Folder-Icon.svg" alt="folder" />
            <h1 className="text-white">Personal</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Folder-Icon.svg" alt="folder" />
            <h1 className="text-[#FFFFFF99]">Work</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Folder-Icon.svg" alt="folder" />
            <h1 className="text-[#FFFFFF99]">Travel</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Folder-Icon.svg" alt="folder" />
            <h1 className="text-[#FFFFFF99]">Events</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Folder-Icon.svg" alt="folder" />
            <h1 className="text-[#FFFFFF99]">Finances</h1>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#FFFFFF99] inline pl-4">More</h1>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Favourites-Icon.svg" alt="favourites" />
            <h1 className="text-[#FFFFFF99]">Favorites</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Trash-Icon.svg" alt="trash" />
            <h1 className="text-[#FFFFFF99]">Trash</h1>
          </div>
          <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
            <img src="./public/assets/Archive-Icon.svg" alt="archive" />
            <h1 className="text-[#FFFFFF99]">Archived Notes</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBarView;
