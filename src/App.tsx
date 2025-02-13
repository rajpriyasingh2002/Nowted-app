import { ApiProvider } from "./components/APIContext";
import FolderView from "./components/FolderView";
import MainComponent from "./components/MainComponent";
import SideBarView from "./components/SideBarView";
import DisplayNotes from "./components/DisplayNotes";
import CustomContextMenu from "./components/CustomContextMenu";

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
      {/* <CustomContextMenu /> */}
    </>
  );
}

export default App;
