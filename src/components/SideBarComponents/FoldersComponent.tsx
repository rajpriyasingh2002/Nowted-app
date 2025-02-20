import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../Context/APIContext";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Folder } from "../../Configurations/TypesConfigration";

const FoldersComponent = () => {
  const { folders, foldersLoading, setCurrentFolderName, addNewFolder } =
    useApi();
  const navigate = useNavigate();
  const { folderid } = useParams();
  const [folderButton, setFolderButton] = useState(false);
  const [newFolder, setNewFolder] = useState("New Folder");
  const [currentFolder, setCurrentFolder] = useState<string>(folderid || "");

  useEffect(() => {
    if (folders.length > 0) {
      if (location.pathname === "/") {
        setCurrentFolder(folders[0].id);
        setCurrentFolderName(folders[0].name);
        navigate(`/folders/${folders[0].id}/notes`, { replace: true });
      } else if (folderid && folders.some((folder) => folder.id === folderid)) {
        setCurrentFolder(folderid);
        setCurrentFolderName(
          folders.find((folder) => folder.id === folderid)?.name || "Folder"
        );
      }
    }
  }, [folders, folderid]);

  function handleFoldersButton(folder: Folder) {
    setCurrentFolderName(folder.name);
    setCurrentFolder(folder.id);
    navigate(`/folders/${folder.id}/notes`);
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const createdFolder = await addNewFolder(newFolder);

    if (createdFolder) {
      setCurrentFolder(createdFolder.id);
      setCurrentFolderName(createdFolder.name);
      navigate(`/folders/${createdFolder.id}/notes`);
    }

    setNewFolder("New Folder");
    setFolderButton(false);
  }

  return (
    <div className="flex-1 flex-col gap-2">
      <div className="flex pl-4 pr-4 justify-between items-center">
        <h1 className="text-[#FFFFFF99]">Folders</h1>
        <img
          onClick={() => setFolderButton((prev) => !prev)}
          src="/public/assets/Add-Folder-Icon.svg"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 max-h-50 overflow-y-scroll">
        {folderButton && (
          <form
            onSubmit={handleOnSubmit}
            className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2"
          >
            <img src="/public/assets/Folder-Icon.svg" alt="folder" />
            <input
              type="text"
              className="text-[#FFFFFF99] bg-transparent outline-none appearance-none border-b border-[#FFFFFF99]"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
            />
          </form>
        )}
        {foldersLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ffffff" size={30} />
          </div>
        ) : (
          folders.map((item) => {
            const isHighlighted = currentFolder === item.id;
            return (
              <button
                key={item.id}
                className={`cursor-auto ${
                  isHighlighted ? "bg-[#FFFFFF08]" : "hover:bg-[#FFFFFF08]"
                }`}
                onClick={() => handleFoldersButton(item)}
              >
                <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
                  {isHighlighted ? (
                    <>
                      <img
                        src="/public/assets/Open-Folder-Icon.svg"
                        alt="folder"
                      />
                      <h1 className="text-white">{item.name}</h1>
                    </>
                  ) : (
                    <>
                      <img src="/public/assets/Folder-Icon.svg" alt="folder" />
                      <h1 className="text-[#FFFFFF99]">{item.name}</h1>
                    </>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
export default FoldersComponent;
