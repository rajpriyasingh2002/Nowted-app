import { useApi } from "./APIContext";
import { FoldersComponentView } from "./TypesConfigration";
import { ClipLoader } from "react-spinners";

const FoldersComponent: React.FC<FoldersComponentView> = ({
  handleFolderClickButton,
  folderButton,
  handleOnSubmit,
  newFolder,
  handleNewFolder,
  folders,
  selectedFolder,
  handleFoldersButton,
  recentNote,
}) => {
  const { foldersLoading } = useApi();
  return (
    <div className="flex-1 flex-col gap-2">
      <div className="flex pl-4 pr-4 justify-between items-center">
        <h1 className="text-[#FFFFFF99]">Folders</h1>
        <img
          onClick={handleFolderClickButton}
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
              onChange={handleNewFolder}
            />
          </form>
        )}
        {foldersLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ffffff" size={30} />
          </div>
        ) : (
          folders.map((item) => {
            const isHighlighted =
              selectedFolder?.id === item.id ||
              (recentNote?.folderId === item.id && !selectedFolder?.id);

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
