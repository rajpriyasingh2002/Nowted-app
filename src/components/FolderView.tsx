import { useState } from "react";
import { useApi } from "./APIContext";

const FolderView = () => {
  const { notesPreview, getNote } = useApi();

  const folderName = Object.keys(notesPreview)[0];

  const [selectedNotesId, setSelectedNotesId] = useState<string | null>(null);
  function handleNotesOnClick(id: string) {
    getNote(id);
    setSelectedNotesId(id);
  }

  return (
    <div className="bg-[#1C1C1C] w-[20%] flex flex-col p-6 pt-10 gap-10">
      <h1 className="text-white text-2xl font-semibold">{folderName}</h1>
      <div className="flex flex-col gap-4">
        {notesPreview[folderName].map((item) => {
          const date = new Date(Date.parse(item.createdAt));
          return (
            <div
              onClick={() => handleNotesOnClick(item.id)}
              key={item.id}
              className={`${
                selectedNotesId === item.id
                  ? "bg-[#FFFFFF1A]"
                  : "bg-[#FFFFFF08] hover:bg-[#FFFFFF1A]"
              } pt-5 p-4 flex flex-col gap-3`}
            >
              <h1 className="text-white text-lg font-semibold">{item.title}</h1>
              <div className="flex gap-2">
                <p className="text-[#FFFFFF66]">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
                <p className="text-[#FFFFFF99]">
                  {item.preview.slice(0, 25) + "....."}
                </p>
              </div>
            </div>
          );
        })}

        {/* <div className="bg-[#FFFFFF08] hover:bg-[#FFFFFF1A] pt-5 p-4 flex flex-col gap-3">
          <h1 className="text-white text-lg font-semibold">
            My Goals for the next year
          </h1>
          <div className="flex gap-2">
            <p className="text-[#FFFFFF66]">31/01/2022</p>
            <p className="text-[#FFFFFF99]">As the year comes to a...</p>
          </div>
        </div>
        <div className="bg-[#FFFFFF1A] pt-5 p-4 flex flex-col gap-3">
          <h1 className="text-white text-lg font-semibold">
            My Goals for the next year
          </h1>
          <div className="flex gap-2">
            <p className="text-[#FFFFFF66]">31/01/2022</p>
            <p className="text-[#FFFFFF99]">As the year comes to a...</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FolderView;
