import { createContext, useContext, useEffect, useState } from "react";
import {
  Folder,
  NotesPreview,
  Note,
  RecentNotesPreview,
} from "./TypesConfigration";
import AxiosApi from "../AxiosApiInstance";

interface ApiContextType {
  folders: Folder[];
  notesPreview: NotesPreview;
  note: Note | null;
  recentNotes: RecentNotesPreview[];
  recentNote: RecentNotesPreview | null;
  error: string | null;
  selectedFolderId: string | null;
  addFolder: (folderName: string) => Promise<void>;
  //   addNotes: (notes: Notes) => Promise<void>;
  getNotes: (folder: Folder) => Promise<void>;
  getNote: (noteId: string) => Promise<void>;
  addRecentNote: (recentNote: RecentNotesPreview | null) => void;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [recentNote, setRecentNote] = useState<RecentNotesPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  useEffect(() => {
    AxiosApi.get("/folders")
      .then((response) => {
        const foldersdata = response.data.folders;
        console.log(foldersdata);
        setFolders(foldersdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    AxiosApi.get("/notes/recent")
      .then((response) => {
        const notesdata = response.data.recentNotes;
        console.log(notesdata);
        setRecentNotes(notesdata);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const addFolder = async (folderName: string) => {
    try {
      await AxiosApi.post("/folders", { name: folderName });
      const response = await AxiosApi.get("/folders");
      setFolders(response.data.folders);
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  const getNotes = async (folder: Folder) => {
    try {
      const response = await AxiosApi.get("/notes", {
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
      const response = await AxiosApi.get(`/notes/${noteId}`);
      const noteData = response.data.note;
      console.log(noteData);
      setNote(noteData);
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };
  const addRecentNote = (recentNote: RecentNotesPreview | null) => {
    setRecentNote(recentNote);
  };

  return (
    <ApiContext.Provider
      value={{
        folders,
        notesPreview,
        note,
        recentNotes,
        recentNote,
        error,
        addFolder,
        getNotes,
        getNote,
        addRecentNote,
        selectedFolderId,
        setSelectedFolderId,
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
