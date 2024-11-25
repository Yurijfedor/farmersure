import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import {
  NavList,
  NavItem,
  SubcategoriesList,
  SubcategoriesItem,
} from "./Nav.styled";

export const NavBar = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { isAuth, isAdmin } = useAuth();

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

  const handleSubcategoryClick = (category, subcategory) => {
    const redirect = `/${category.title.split(" ").join("")}/${
      subcategory.route
    }`;
    localStorage.setItem("toRedirect", JSON.stringify(redirect));
    setIsOpen(false);
  };

  return (
    <nav>
      <NavList>
        {categories.map((category) => {
          // Перевіряємо, чи це "for admin", і якщо так, рендеримо лише для адміна
          if (category.title === "for admin" && !isAdmin) {
            return null; // Якщо не адміністратор, нічого не рендеримо для "for admin"
          }

          return (
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
              <SubcategoriesList ref={ref}>
                {category.subcategories.map((subcategory) => {
                  let toPath;

                  if (
                    subcategory.route === "user" ||
                    subcategory.route === "rent"
                  ) {
                    const user = JSON.parse(localStorage.getItem("user")); // Дістаємо об'єкт користувача
                    if (user && user.uid) {
                      toPath = `${category.title.split(" ").join("")}/${
                        subcategory.route
                      }`;
                    } else {
                      toPath = "/login"; // Якщо користувач не знайдений, перенаправляємо на сторінку входу
                    }
                  } else {
                    toPath = `${category.title.split(" ").join("")}/${
                      subcategory.route
                    }`;
                  }

                  return (
                    <SubcategoriesItem key={subcategory.id}>
                      <Link
                        to={toPath}
                        onClick={() =>
                          handleSubcategoryClick(category, subcategory)
                        }
                      >
                        {subcategory.title}
                      </Link>
                    </SubcategoriesItem>
                  );
                })}
              </SubcategoriesList>
            </NavItem>
          );
        })}
      </NavList>
    </nav>
  );
};
