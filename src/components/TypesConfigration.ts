export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

export type NotesPreview = {
  [key: string]: {
    id: string;
    folderId: string;
    title: string;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    preview: string;
    folder: Folder;
  }[];
};

export type RecentNotesPreview = {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  preview: string;
  folder: Folder;
};

export type Note = {
  id: string;
  folderId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  folder: Folder;
};

export type FoldersComponentView = {
  folders: Folder[];
  handleFoldersButton: (folder: Folder) => void;
  handleFolderClickButton: () => void;
  folderButton: boolean;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newFolder: string;
  handleNewFolder: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFolderId: string | null;
  recentNote: RecentNotesPreview | null;
  addRecentNote: (recentNote: RecentNotesPreview) => void;
};
