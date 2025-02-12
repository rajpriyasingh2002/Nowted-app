import { useEffect, useRef, useState } from "react";

const NotesView = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[60%] bg-transparent flex flex-col pt-14 pb-14 p-12 gap-8">
      <div className="flex items-center justify-between relative">
        <h1 className="text-white text-3xl font-semibold">
          Reflection on the Month of June
        </h1>
        <div className="relative" ref={dropdownRef}>
          <img
            className="cursor-pointer"
            src="./public/assets/Notes-Dropdown.svg"
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-[#333333] rounded-md shadow-lg p-2">
              <ul className="py-1 text-white">
                <li className="px-4 py-2 cursor-pointer flex gap-3">
                  <img
                    src="./public/assets/Favourites-Bright-Icon.svg"
                    alt="favourites"
                  />{" "}
                  Add to Favourites
                </li>
                <li className="px-4 py-2 cursor-pointer flex gap-3 pb-5">
                  <img
                    src="./public/assets/Archive-Bright-Icon.svg"
                    alt="archive"
                  />{" "}
                  Archive
                </li>
                <li className="px-4 py-2 border-t-2 border-[#FFFFFF0D] gap-3"></li>
                <li className="px-4 py-2 cursor-pointer flex gap-3">
                  <img
                    src="./public/assets/Trash-Bright-Icon.svg"
                    alt="delete"
                  />{" "}
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-2 border-[#FFFFFF1A] pl-0 p-3">
          <img src="./public/assets/Calender-Icon.svg" alt="calender" />
          <p className="text-[#FFFFFF99] pr-10">Date</p>
          <p className="text-white">21/06/2022</p>
        </div>
        <div className="flex gap-5 pl-0 p-3">
          <img src="./public/assets/Calender-Icon.svg" alt="calender" />
          <p className="text-[#FFFFFF99] pr-10">Date</p>
          <p className="text-white">21/06/2022</p>
        </div>
      </div>
      <div>
        <p className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          vero iusto mollitia consectetur architecto numquam ab, sit fugiat aut
          in ad commodi ratione ex consequatur expedita, id quasi cumque
          veritatis?
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A porro
          labore libero eius tempora tenetur, eos, suscipit, eum in harum dolor
          ex minus natus? Tenetur voluptatum deserunt soluta nihil praesentium.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, libero
          quis quasi reiciendis quod voluptatibus aspernatur obcaecati repellat
          vero iusto nulla quae repudiandae? Ipsa totam unde possimus! Itaque,
          accusantium maiores?
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
          corrupti amet quam reprehenderit, sed adipisci soluta error voluptatem
          debitis praesentium voluptatum consequatur enim quos rem iusto sit
          incidunt, et possimus! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Nobis aperiam voluptatem fugit, alias laboriosam,
          earum iusto, molestiae est tempora atque itaque soluta. Similique,
          porro dolor quam corrupti ducimus tempora rem.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A porro
          labore libero eius tempora tenetur, eos, suscipit, eum in harum dolor
          ex minus natus? Tenetur voluptatum deserunt soluta nihil praesentium.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, libero
          quis quasi reiciendis quod voluptatibus aspernatur obcaecati repellat
          vero iusto nulla quae repudiandae? Ipsa totam unde possimus! Itaque,
          accusantium maiores? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quaerat voluptates ad maxime sint voluptate vel
          reiciendis, unde accusamus atque voluptatem eveniet possimus debitis,
          cumque amet id sapiente commodi praesentium assumenda! Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Aliquid nihil aut dolor
          totam et? Commodi ipsum quo perferendis eius nulla nostrum, quam,
          libero itaque harum nihil possimus accusantium nam suscipit!
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
          corrupti amet quam reprehenderit, sed adipisci soluta error voluptatem
          debitis praesentium voluptatum consequatur enim quos rem iusto sit
          incidunt, et possimus! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Nobis aperiam voluptatem fugit, alias laboriosam,
          earum iusto, molestiae est tempora atque itaque soluta. Similique,
          porro dolor quam corrupti ducimus tempora rem.
        </p>
      </div>
    </div>
  );
};
export default NotesView;
