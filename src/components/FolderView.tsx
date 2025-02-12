const FolderView = () => {
  return (
    <div className="bg-[#1C1C1C] w-[20%] flex flex-col p-6 pt-10 gap-10">
      <h1 className="text-white text-2xl font-semibold">Personal</h1>
      <div className="flex flex-col gap-4">
        <div className="bg-[#FFFFFF08] pt-5 p-4 flex flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default FolderView;
