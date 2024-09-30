import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsCategoriesOpenStore } from "../../../store/categories";

const CategoriesMenu = ({ groups, categories }) => {
  const [activeGroup, setActiveGroup] = useState(1);
  const navigate = useNavigate();

  const setIsCategoriesOpen = useIsCategoriesOpenStore(state => state.setIsCategoriesOpen);

  const handleChangeCategory = (category) => () => {
    setIsCategoriesOpen(false);
    navigate(`/coupon?categories[]=${category}`);
  }

  return (
    <div className="absolute left-0 mt-2 flex w-screen bg-[#e5e1f7] border-t border-gray-200 shadow-lg">
      <ul className="w-1/4 bg-[#E9E7F9] p-4 border-r border-gray-200">
        {groups.map((group) => (
          <li
            key={group.id}
            className="hover:bg-purple-100 px-4 py-2 cursor-pointer flex justify-between"
            onClick={() => setActiveGroup(group.id)}
          >
            {group.name}
            <span className={`ml-2 transform ${activeGroup === group.id ? "rotate-90" : ""}`}>
              {">"}
            </span>
          </li>
        ))}
      </ul>
      <div className="w-3/4 p-4">
        {groups.map((group) => {
          if (activeGroup === group.id) {
            const groupCategories = categories.filter(
              (category) => category.group_id === group.id
            );
            return (
              <div key={group.id} className="mb-4">
                <div className="px-4 py-2 font-bold">{group.name} Categories</div>
                <ul>
                  {groupCategories.map((category) => (
                    <li
                      key={category.id}
                      className="hover:bg-purple-100 px-4 py-2 cursor-pointer"
                      onClick={handleChangeCategory(category.name)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CategoriesMenu;