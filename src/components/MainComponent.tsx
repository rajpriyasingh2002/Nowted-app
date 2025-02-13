import { ReactNode } from "react";

const MainComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-[#181818] flex h-[100%]">{children}</div>
    </>
  );
};

export default MainComponent;
