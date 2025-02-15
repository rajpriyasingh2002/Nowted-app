import { useApi } from "./APIContext";
import NotesView from "./NotesView";
import NoNotesView from "./NoNotesView";

const DisplayNotes = () => {
  const { note } = useApi();

  return (
    <div className="w-[60%] bg-transparent flex pt-14 pb-14 p-12 justify-center overflow-y-scroll">
      {note ? <NotesView note={note} /> : <NoNotesView />}
      {/* <DeletedNoteView /> */}
    </div>
  );
};
export default DisplayNotes;
