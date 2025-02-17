import { createContext, useContext, useEffect, useState } from "react";
import {
  Folder,
  NotesPreview,
  Note,
  RecentNotesPreview,
  CreatedNote,
  MoreNotes,
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
  newNote: string | null;
  search: boolean;
  searchText: string;
  addFolder: (folderName: string) => Promise<void>;
  getNotes: (folder: Folder) => Promise<void>;
  getNote: (noteId: string) => Promise<void>;
  addRecentNote: (recentNote: RecentNotesPreview | null) => void;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<string | null>>;
  setNewNote: React.Dispatch<React.SetStateAction<string | null>>;
  createNewNote: (newCreatedNote: CreatedNote) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  restoreNote: (noteId: string) => Promise<void>;
  moreNotes: (type: string, moreDetails: MoreNotes) => Promise<void>;
  setNotesFavourites: (favorite: boolean, noteId: string) => Promise<void>;
  setNotesArchived: (archive: boolean, noteId: string) => Promise<void>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
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
  const [newNote, setNewNote] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);

  useEffect(() => {
    AxiosApi.get("/folders")
      .then((response) => {
        const foldersdata = response.data.folders;
        setFolders(foldersdata);

        if (foldersdata.length > 0) {
          setSelectedFolderId(foldersdata[0].id);
          getNotes(foldersdata[0]);
        }
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

  const createNewNote = async (newCreatedNote: CreatedNote) => {
    try {
      await AxiosApi.post("/notes", newCreatedNote);

      const response = await AxiosApi.get("/notes", {
        params: {
          archived: false,
          favorite: false,
          deleted: false,
          folderId: newCreatedNote.folderId,
          page: 1,
          limit: 10,
        },
      });

      const updatedNotes = response.data.notes;

      if (!updatedNotes || updatedNotes.length === 0) {
        throw new Error("No notes found after creation");
      }

      const newlyCreatedNote = updatedNotes[0];

      setNotesPreview((prev) => ({
        ...prev,
        [newCreatedNote.folderId]: updatedNotes,
      }));

      setSelectedFolderId(newCreatedNote.folderId);
      setNote(newlyCreatedNote);
      setNewNote(null);
    } catch (error) {
      console.error("Failed to create note:", error);
      setError("Failed to create note");
    }
  };
  const deleteNote = async (noteId: string) => {
    try {
      const response = await AxiosApi.delete(`/notes/${noteId}`);

      if (response.status !== 200) {
        console.log("Notes not deleted");
      }
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };
  const restoreNote = async (noteId: string) => {
    try {
      const response = await AxiosApi.post(`/notes/${noteId}/restore`);

      if (response.status !== 200) {
        console.log("Notes not restored");
      }
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  const moreNotes = async (type: string, moreDetails: MoreNotes) => {
    try {
      const response = await AxiosApi.get("/notes", {
        params: {
          archived: moreDetails.archived,
          favorite: moreDetails.favorite,
          deleted: moreDetails.deleted,
          folderId: null,
          page: 1,
          limit: 10,
        },
      });
      const notesData = response.data.notes;
      setNotesPreview({ [type]: notesData });
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  const setNotesFavourites = async (favorite: boolean, noteId: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { isFavorite: favorite });
    } catch (error) {
      console.error("Failed to add folder:", error);
      setError("Failed to add folder");
    }
  };

  const setNotesArchived = async (archive: boolean, noteId: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { isArchived: archive });
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
        recentNote,
        error,
        newNote,
        search,
        searchText,
        addFolder,
        getNotes,
        getNote,
        addRecentNote,
        selectedFolderId,
        setSelectedFolderId,
        setNewNote,
        createNewNote,
        deleteNote,
        restoreNote,
        moreNotes,
        setNotesFavourites,
        setNotesArchived,
        setSearch,
        setSearchText,
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
