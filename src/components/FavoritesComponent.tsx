import { useApi } from "./APIContext";

export const FavoritesComponent = () => {
  const { moreNotes, setSelectedFolder } = useApi();

  function favoriteButtonHandler(type: string) {
    setSelectedFolder({ name: type });
    const moreDetails = {
      favorite: true,
      archived: false,
      deleted: false,
    };
    moreNotes(moreDetails);
  }
  return (
    <button
      onClick={() => favoriteButtonHandler("Favorites")}
      className="cursor-pointer hover:bg-[#FFFFFF08]"
    >
      <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
        <img src="./public/assets/Favourites-Icon.svg" alt="favourites" />
        <h1 className="text-[#FFFFFF99]">Favorites</h1>
      </div>
    </button>
  );
};
