// import DeletedNoteView from "./components/DeletedNoteView";
import FolderView from "./components/FolderView";
import MainComponent from "./components/MainComponent";
// import NoNotesView from "./components/NoNotesView";
import NotesView from "./components/NotesView";
import SideBarView from "./components/SideBarView";

function App() {
  return (
    <>
      <MainComponent>
        <SideBarView />
        <FolderView />
        <NotesView />
        {/* <NoNotesView /> */}
        {/* <DeletedNoteView /> */}
      </MainComponent>
    </>
  );
}

export default App;
