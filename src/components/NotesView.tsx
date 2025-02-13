import { useEffect, useRef, useState } from "react";

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
};

const NotesView: React.FC<NotesViewProps> = ({ note }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between relative">
        <h1 className="text-white text-3xl font-semibold">{note.title}</h1>
        <div className="relative" ref={dropdownRef}>
          <img
            className="cursor-pointer"
            src="./public/assets/Notes-Dropdown.svg"
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-[#333333] rounded-md shadow-lg p-2">
              <ul className="py-1 text-white">
                <li className="px-4 py-2 cursor-pointer flex gap-3">
                  <img
                    src="./public/assets/Favourites-Bright-Icon.svg"
                    alt="favourites"
                  />{" "}
                  Add to Favourites
                </li>
                <li className="px-4 py-2 cursor-pointer flex gap-3 pb-5">
                  <img
                    src="./public/assets/Archive-Bright-Icon.svg"
                    alt="archive"
                  />{" "}
                  Archive
                </li>
                <li className="px-4 py-2 border-t-2 border-[#FFFFFF0D] gap-3"></li>
                <li className="px-4 py-2 cursor-pointer flex gap-3">
                  <img
                    src="./public/assets/Trash-Bright-Icon.svg"
                    alt="delete"
                  />{" "}
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-2 border-[#FFFFFF1A] pl-0 p-3">
          <img src="./public/assets/Calender-Icon.svg" alt="calender" />
          <p className="text-[#FFFFFF99] pr-10">Date</p>
          <p className="text-white">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
        </div>
        <div className="flex gap-5 pl-0 p-3">
          <img src="./public/assets/Folder-Icon.svg" alt="calender" />
          <p className="text-[#FFFFFF99] pr-10">Folder</p>
          <p className="text-white">{note.folder.name}</p>
        </div>
      </div>
      <div>
        <p className="text-white">{note.content}</p>
      </div>
    </div>
  );
};

export default NotesView;
