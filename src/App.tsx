import { ApiProvider } from "./components/APIContext";
import FolderView from "./components/FolderView";
import MainComponent from "./components/MainComponent";
import SideBarView from "./components/SideBarView";
import DisplayNotes from "./components/DisplayNotes";

function App() {
  return (
    <>
      <ApiProvider>
        <MainComponent>
          <SideBarView />
          <FolderView />
          <DisplayNotes />
        </MainComponent>
      </ApiProvider>
    </>
  );
}

export default App;
