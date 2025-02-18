import { ApiProvider } from "./components/APIContext";
import MainComponent from "./components/MainComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ApiProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
