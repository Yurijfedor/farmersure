import {
  NavList,
  NavItem,
  SubcategoriesList,
  SubcategoriesItem,
} from "./Nav.styled";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const handleSubcategoryClick = () => {
    setIsOpen(false);
  };

  return (
    <nav>
      <NavList>
        {categories.map((category) => (
          <NavItem key={category.id}>
            <div
              onClick={(event) => {
                if (selectedCategory === category) {
                  setIsOpen((prevState) => !prevState);
                } else {
                  setSelectedCategory(category);
                  setIsOpen(true);
                }
                event.stopPropagation();
              }}
            >
              {category.title}
            </div>
            {isOpen && selectedCategory === category && (
              <SubcategoriesList ref={ref}>
                {category.subcategories.map((subcategory) => (
                  <SubcategoriesItem key={subcategory.id}>
                    <Link
                      to={subcategory.route}
                      onClick={(event) => {
                        handleSubcategoryClick(event);
                      }}
                    >
                      {subcategory.title}
                    </Link>
                  </SubcategoriesItem>
                ))}
              </SubcategoriesList>
            )}
          </NavItem>
        ))}
      </NavList>
    </nav>
  );
};
