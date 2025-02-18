import { useEffect, useRef, useState } from "react";
import { useApi } from "./APIContext";

type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

type Note = {
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

type NotesViewProps = {
  note: Note;
  onDeleteHandler: (noteid: string) => void;
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
};

const NotesView: React.FC<NotesViewProps> = ({
  note,
  onDeleteHandler,
  updateNoteTitle,
  updateNoteContent,
}) => {
  const { setNotesFavourites, setNotesArchived, getNotes } = useApi();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [favorite, setFavorite] = useState<boolean>(note.isFavorite);
  const [archive, setArchive] = useState<boolean>(note.isArchived);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(note.title);
  const [editedContent, setEditedContent] = useState<string>(note.content);

  const pRef = useRef<HTMLParagraphElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Measure the height of the <p> tag and set it to the <textarea> when entering edit mode
  useEffect(() => {
    if (isEditingContent && pRef.current && textareaRef.current) {
      // Get the height of the <p> tag
      const pHeight = pRef.current.offsetHeight;
      // Set the height of the <textarea> to match the <p> tag
      textareaRef.current.style.height = `${pHeight}px`;
    }
  }, [isEditingContent]);

  const date = new Date(Date.parse(note.createdAt));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setNotesFavourites(favorite, note.id);
    setNotesArchived(archive, note.id);
    getNotes(note.folder.id);
  }, [favorite, archive]);

  const handleTitleSubmit = () => {
    updateNoteTitle(note.id, note.folder.id, editedTitle);
    setIsEditingTitle(false);
  };

  const handleContentSubmit = () => {
    updateNoteContent(note.id, note.folder.id, editedContent);
    setIsEditingContent(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between relative">
        {isEditingTitle ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-white text-3xl font-semibold bg-transparent outline-none border-b border-white"
            />
            <button
              onClick={handleTitleSubmit}
              className="bg-white text-black w-20 rounded text-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <h1
            className="text-white text-3xl font-semibold cursor-default"
            onDoubleClick={() => setIsEditingTitle(true)}
          >
            {note.title}
          </h1>
        )}
        <div className="relative" ref={dropdownRef}>
          <img
            className="cursor-pointer"
            src="/public/assets/Notes-Dropdown.svg"
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-70 bg-[#333333] rounded-md shadow-lg p-2">
              <ul className="py-1 text-white">
                <li className="px-4 py-2">
                  <button
                    onClick={() => setFavorite((prev) => !prev)}
                    className="flex gap-3 cursor-pointer"
                  >
                    <img
                      src="/public/assets/Favourites-Bright-Icon.svg"
                      alt="favourites"
                    />{" "}
                    {favorite ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </li>
                <li className="px-4 py-2 pb-5">
                  <button
                    onClick={() => setArchive((prev) => !prev)}
                    className="flex gap-3 cursor-pointer"
                  >
                    <img
                      src="/public/assets/Archive-Bright-Icon.svg"
                      alt="archive"
                    />{" "}
                    {archive ? "Remove from Archive" : "Archive"}
                  </button>
                </li>
                <li className="px-4 py-2 border-t-2 border-[#FFFFFF0D] gap-3"></li>
                <li className="px-4 py-2 ">
                  <button
                    onClick={() => onDeleteHandler(note.id)}
                    className="flex gap-3 cursor-pointer"
                  >
                    <img
                      src="/public/assets/Trash-Bright-Icon.svg"
                      alt="delete"
                    />{" "}
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-2 border-[#FFFFFF1A] pl-0 p-3">
          <img src="/public/assets/Calender-Icon.svg" alt="calender" />
          <p className="text-[#FFFFFF99] pr-10 cursor-default">Date</p>
          <p className="text-white cursor-default">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
        </div>
        <div className="flex gap-5 pl-0 p-3">
          <img src="/public/assets/Folder-Icon.svg" alt="calender" />
          <p className="text-[#FFFFFF99] pr-10 cursor-default">Folder</p>
          <p className="text-white cursor-default">{note.folder.name}</p>
        </div>
      </div>
      <div>
        {isEditingContent ? (
          <div className="flex flex-col gap-10 pb-14">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="text-white text-lg outline-none bg-transparent"
              rows={25}
            />
            <button
              onClick={handleContentSubmit}
              className="text-2xl bg-white pr-4 pl-4 rounded-md cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : (
          <div
            className="text-white text-lg cursor-default pb-14"
            onDoubleClick={() => setIsEditingContent(true)}
          >
            {note.content.split("\n").map((paragraph, index) => (
              <p key={index} className="text-white text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesView;
