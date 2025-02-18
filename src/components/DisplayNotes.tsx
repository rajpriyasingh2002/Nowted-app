import { useApi } from "./APIContext";
import NotesView from "./NotesView";
import NoNotesView from "./NoNotesView";
import { useEffect, useState } from "react";
import CreateNoteComponent from "./CreateNoteComponent";
import DeletedNoteView from "./DeletedNoteView";
import { ClipLoader } from "react-spinners";

const DisplayNotes = () => {
  const {
    note,
    newNote,
    setNewNote,
    deleteNote,
    restoreNote,
    noteLoading,
    updateNoteTitle,
    updateNoteContent,
  } = useApi();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setNewNote(null);
  }, [note]);

  useEffect(() => {
    if (note?.deletedAt) {
      setIsDeleted(true);
    } else {
      setIsDeleted(false);
    }
  }, [note]);

  let content;
  if (newNote) {
    content = <CreateNoteComponent newNote={newNote} setNewNote={setNewNote} />;
  } else if (isDeleted && note) {
    content = <DeletedNoteView note={note} onRestoreClick={onRestoreClick} />;
  } else if (note) {
    content = (
      <NotesView
        note={note}
        onDeleteHandler={onDeleteHandler}
        updateNoteTitle={updateNoteTitle}
        updateNoteContent={updateNoteContent}
      />
    );
  } else if (noteLoading) {
    content = (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#ffffff" size={30} />
      </div>
    );
  } else {
    content = <NoNotesView />;
  }

  function onDeleteHandler(noteid: string) {
    deleteNote(noteid).then(() => {
      setIsDeleted(true);
    });
  }

  function onRestoreClick(noteId: string) {
    restoreNote(noteId).then(() => setIsDeleted(false));
  }

  return (
    <div className="w-[60%] bg-transparent flex pt-14 pb-14 p-12 justify-center overflow-y-scroll">
      {content}
    </div>
  );
};

export default DisplayNotes;
