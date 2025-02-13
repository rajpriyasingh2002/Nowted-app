import { useState, useRef, useEffect } from "react";

const CustomContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔹 Handle Right-Click
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default right-click menu

    setMenuPosition({ x: event.clientX, y: event.clientY }); // Set position
    setMenuVisible(true);
  };

  // 🔹 Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-gray-900 text-white"
      onContextMenu={handleContextMenu} // Attach right-click event
    >
      <p className="text-lg">Right-click anywhere to open the menu</p>

      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute bg-gray-800 shadow-lg rounded-lg w-48 py-2"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <button className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
            Option 1
          </button>
          <button className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
            Option 2
          </button>
          <button className="block px-4 py-2 hover:bg-red-600 w-full text-left">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomContextMenu;
