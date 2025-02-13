import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Folder,
  NotesPreview,
  Note,
  RecentNotesPreview,
} from "./TypesConfigration";

interface ApiContextType {
  folders: Folder[];
  notesPreview: NotesPreview;
  note: Note | null;
  recentNotes: RecentNotesPreview[];
  error: string | null;
  addFolder: (folder: Folder) => Promise<Folder | undefined>;
  //   addNotes: (notes: Notes) => Promise<void>;
  getNotes: (folder: Folder) => Promise<void>;
  getNote: (noteId: string) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notesPreview, setNotesPreview] = useState<NotesPreview>({
    "": [],
  } as NotesPreview);
  const [note, setNote] = useState<Note | null>(null);
  const [recentNotes, setRecentNotes] = useState<RecentNotesPreview[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/folders")
      .then((response) => {
        const foldersdata = response.data.folders;
        console.log(foldersdata);
        setFolders(foldersdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("/api/notes/recent")
      .then((response) => {
        const notesdata = response.data.recentNotes;
        console.log(notesdata);
        setRecentNotes(notesdata);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const addFolder = async (folder: Folder) => {
    try {
      const response = await axios.post("/api/folders", { folder });
      if ((response.status = 200)) {
        return folder;
      }
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  const getNotes = async (folder: Folder) => {
    try {
      const response = await axios.get("api/notes", {
        params: {
          archived: false,
          favorite: false,
          deleted: false,
          folderId: folder.id,
          page: 1,
          limit: 10,
        },
      });
      const notesData = response.data.notes;
      setNotesPreview({ [folder.name]: notesData });
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  const getNote = async (noteId: string) => {
    try {
      const response = await axios.get(`api/notes/${noteId}`);
      const noteData = response.data.note;
      console.log(noteData);
      setNote(noteData);
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  return (
    <ApiContext.Provider
      value={{
        folders,
        notesPreview,
        note,
        recentNotes,
        error,
        addFolder,
        getNotes,
        getNote,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
