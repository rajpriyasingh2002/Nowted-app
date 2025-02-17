import SideBarView from "./SideBarView";
import FolderView from "./FolderView";
import DisplayNotes from "./DisplayNotes";

const MainComponent = () => {
  return (
    <>
      <div className="bg-[#181818] flex h-screen">
        <SideBarView />
        <FolderView />
        <DisplayNotes />
      </div>
    </>
  );
};

export default MainComponent;
