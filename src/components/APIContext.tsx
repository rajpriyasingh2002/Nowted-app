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
import { toast } from "react-toastify";

interface ApiContextType {
  folders: Folder[];
  notesPreview: NotesPreview;
  note: Note | null;
  recentNotes: RecentNotesPreview[];
  recentNote: RecentNotesPreview | null;
  selectedFolder: {
    id?: string;
    name?: string;
  };
  newNote: string | null;
  search: boolean;
  searchText: string;
  addFolder: (folderName: string) => Promise<void>;
  getNotes: (folderId: string) => Promise<void>;
  getNote: (noteId: string) => Promise<void>;
  addRecentNote: (recentNote: RecentNotesPreview | null) => void;
  setSelectedFolder: React.Dispatch<
    React.SetStateAction<{
      id?: string;
      name?: string;
    }>
  >;
  setNewNote: React.Dispatch<React.SetStateAction<string | null>>;
  createNewNote: (newCreatedNote: CreatedNote) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  restoreNote: (noteId: string) => Promise<void>;
  moreNotes: (moreDetails: MoreNotes) => Promise<void>;
  setNotesFavourites: (favorite: boolean, noteId: string) => Promise<void>;
  setNotesArchived: (archive: boolean, noteId: string) => Promise<void>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  foldersLoading: boolean;
  setFoldersLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notesLoading: boolean;
  setNotesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  noteLoading: boolean;
  setNoteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateNoteTitle: (
    noteId: string,
    folderId: string,
    title: string
  ) => Promise<void>;
  updateNoteContent: (
    noteId: string,
    folderId: string,
    content: string
  ) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notesPreview, setNotesPreview] = useState<NotesPreview>(
    [] as NotesPreview
  );
  const [note, setNote] = useState<Note | null>(null);
  const [recentNotes, setRecentNotes] = useState<RecentNotesPreview[]>([]);
  const [recentNote, setRecentNote] = useState<RecentNotesPreview | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<{
    id?: string;
    name?: string;
  }>(
    {} as {
      id?: string;
      name?: string;
    }
  );
  const [newNote, setNewNote] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [foldersLoading, setFoldersLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  useEffect(() => {
    setFoldersLoading(true);
    AxiosApi.get("/folders")
      .then((response) => {
        const foldersdata = response.data.folders;
        setFolders(foldersdata);
        if (foldersdata.length > 0) {
          setSelectedFolder({
            id: foldersdata[0].id,
            name: foldersdata[0].name,
          });
          getNotes(foldersdata[0]);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch folders.", error);
      })
      .finally(() => setFoldersLoading(false));

    setNotesLoading(true);
    AxiosApi.get("/notes/recent")
      .then((response) => {
        const notesdata = response.data.recentNotes;
        setRecentNotes(notesdata);
      })
      .catch((error) => {
        toast.error("Failed to fetch recent notes.", error);
      })
      .finally(() => setNotesLoading(false));
  }, []);

  const addFolder = async (folderName: string) => {
    try {
      await AxiosApi.post("/folders", { name: folderName });
      const response = await AxiosApi.get("/folders");
      setFolders(response.data.folders);
    } catch (error) {
      toast.error("Failed to add folder.");
    }
  };

  const getNotes = async (folderId: string) => {
    setNotesLoading(true);
    try {
      const response = await AxiosApi.get("/notes", {
        params: {
          archived: false,
          favorite: false,
          deleted: false,
          folderId: folderId,
          page: 1,
          limit: 10,
        },
      });
      const notesData = response.data.notes;
      setNotesPreview(notesData);
    } catch (error) {
      toast.error("Unable to fetch notes.");
    } finally {
      setNotesLoading(false);
    }
  };

  const getNote = async (noteId: string) => {
    setNoteLoading(true);
    try {
      const response = await AxiosApi.get(`/notes/${noteId}`);
      const noteData = response.data.note;
      setNote(noteData);
    } catch (error) {
      toast.error("Unable to fetch note.");
    } finally {
      setNoteLoading(false);
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
      setNote(newlyCreatedNote);
      setNewNote(null);
    } catch (error) {
      toast.error("Failed to create note.");
    }
  };
  const deleteNote = async (noteId: string) => {
    try {
      const response = await AxiosApi.delete(`/notes/${noteId}`);

      if (response.status !== 200) {
      }
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };
  const restoreNote = async (noteId: string) => {
    try {
      const response = await AxiosApi.post(`/notes/${noteId}/restore`);

      if (response.status !== 200) {
      }
    } catch (error) {
      toast.error("Failed to restore note.");
    }
  };

  const moreNotes = async (moreDetails: MoreNotes) => {
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
      setNotesPreview(notesData);
    } catch (error) {
      toast.error("Failed to fetch notes.");
    }
  };

  const setNotesFavourites = async (favorite: boolean, noteId: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { isFavorite: favorite });
    } catch (error) {
      toast.error("Failed to set favorite.");
    }
  };

  const setNotesArchived = async (archive: boolean, noteId: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { isArchived: archive });
    } catch (error) {
      toast.error("Failed to set archive.");
    }
  };

  const updateNoteTitle = async (
    noteId: string,
    folderId: string,
    title: string
  ) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { title });
      await getNote(noteId);
      await getNotes(folderId)
    } catch (error) {
      toast.error("Failed to update title.");
    }
  };

  const updateNoteContent = async (
    noteId: string,
    folderId: string,
    content: string
  ) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { content });
      await getNotes(folderId)
      await getNote(noteId);
    } catch (error) {
      toast.error("Failed to update content.");
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
        newNote,
        search,
        searchText,
        addFolder,
        getNotes,
        getNote,
        addRecentNote,
        selectedFolder,
        setSelectedFolder,
        setNewNote,
        createNewNote,
        deleteNote,
        restoreNote,
        moreNotes,
        setNotesFavourites,
        setNotesArchived,
        setSearch,
        setSearchText,
        foldersLoading,
        setFoldersLoading,
        notesLoading,
        setNotesLoading,
        noteLoading,
        setNoteLoading,
        updateNoteTitle,
        updateNoteContent,
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
