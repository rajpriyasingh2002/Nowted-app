import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../Context/APIContext";
import SideBarView from "./SideBarComponent/SideBarView";
import FolderView from "./NotesViewComponent/FolderView";
import DisplayNotes from "./NoteComponent/DisplayNotes";

const MainComponent = () => {
  const { folderid, noteid } = useParams();
  const { getNotes, getNote, setSelectedFolder, folders, moreNotes } = useApi();

  useEffect(() => {
    const initializeFromURL = async () => {
      if (folderid) {
        if (folderid === "favorite") {
          setSelectedFolder({ name: "Favorites" });
          moreNotes({ favorite: true, archived: false, deleted: false });
        } else if (folderid === "trash") {
          setSelectedFolder({ name: "Trash" });
          moreNotes({ favorite: false, archived: false, deleted: true });
        } else if (folderid === "archive") {
          setSelectedFolder({ name: "Archived Notes" });
          moreNotes({ favorite: false, archived: true, deleted: false });
        } else {
          const folder = folders.find((f) => f.id === folderid);
          if (folder) {
            setSelectedFolder({ id: folder.id, name: folder.name });
            await getNotes(folder.id);
          }
        }
        if (noteid) {
          await getNote(noteid);
        }
      }
    };

    initializeFromURL();
  }, [folderid, noteid]);

  return (
    <div className="bg-[#181818] flex h-screen">
      <SideBarView />
      <FolderView />
      <DisplayNotes />
    </div>
  );
};

export default MainComponent;
