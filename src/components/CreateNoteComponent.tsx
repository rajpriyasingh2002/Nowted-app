import { useState } from "react";
import { useApi } from "./APIContext";

type CreateComponent = {
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string | null>>;
};

const CreateNoteComponent: React.FC<CreateComponent> = ({
  newNote,
  setNewNote,
}) => {
  const { createNewNote } = useApi();
  const [title, setTitle] = useState<string>("Set Title");
  const [content, setContent] = useState<string>("Type your notes here...");

  function setNotesTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function setNotesContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleSaveButton() {
    const newCreatedNote = {
      folderId: newNote,
      title: title,
      content: content,
      isFavorite: false,
      isArchived: false,
    };
    createNewNote(newCreatedNote);
    setNewNote(null);
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex items-center justify-between">
        <input
          onChange={(e) => setNotesTitle(e)}
          className="text-white bg-transparent outline-none appearance-none border-b border-white text-3xl font-semibold"
          value={title}
        />
        <button
          onClick={() => handleSaveButton()}
          className="text-2xl bg-white pr-4 pl-4 rounded-md cursor-pointer"
        >
          Save
        </button>
      </div>
      <div>
        <textarea
          onChange={(e) => setNotesContent(e)}
          className="text-white text-lg outline-none appearance-none w-full h-auto"
          value={content}
          rows={5}
          onInput={(e) => {
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
      </div>
    </div>
  );
};

export default CreateNoteComponent;
