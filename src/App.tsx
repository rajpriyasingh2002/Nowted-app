import { ApiProvider } from "./components/APIContext";
import MainComponent from "./components/MainComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent />} />
        </Routes>
        {/* <MainComponent>
          <SideBarView />
          <FolderView />
          <DisplayNotes />
        </MainComponent> */}
      </Router>
    </ApiProvider>
  );
}

export default App;
