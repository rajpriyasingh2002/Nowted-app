import { ReactNode } from "react";

const MainComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-[#181818] flex">{children}</div>
    </>
  );
};

export default MainComponent;
