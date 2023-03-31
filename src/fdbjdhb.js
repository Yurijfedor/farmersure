import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { categories } from "./siteStructure";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";

const NotFound = lazy(() => import("./pages/NotFound"));
const Layout = lazy(() => import("./components/layout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Ourservices = lazy(() => import("./pages/OurServices"));
const Rent = lazy(() => import("./pages/Rent"));
const Store = lazy(() => import("./pages/Store"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Ourcompany = lazy(() => import("./pages/OurCompany"));
const Values = lazy(() => import("./pages/Values"));
const Team = lazy(() => import("./pages/Team"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Apiculture = lazy(() => import("./pages/Apiculture"));
const Beekeeping = lazy(() => import("./pages/Beekeeping"));
const Production = lazy(() => import("./pages/Production"));
const Problems = lazy(() => import("./pages/Problems"));
const News = lazy(() => import("./pages/News"));
const Freshnews = lazy(() => import("./pages/FreshNews"));
const Recommendations = lazy(() => import("./pages/Recommendations"));
const Ourcontacts = lazy(() => import("./pages/OurContacts"));
const Contacting = lazy(() => import("./pages/Contacting"));
const Contactinfo = lazy(() => import("./pages/ContactInfo"));
const Ordering = lazy(() => import("./pages/Ordering"));
const Login = lazy(() => import("./pages/LogIn"));
const Register = lazy(() => import("./pages/Register"));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<About />} />
        {categories.map((category) => {
          const categoryTitle = category.title
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
          const CategoryComponent = () => <Category category={category} />;
          return (
            <Route
              key={category.id}
              path={`/${category.title.split(" ").join("")}`}
              element={React.createElement(CategoryComponent)}
            >
              {category.subcategories.map((subcategory) => {
                const SubcategoryComponent = () => (
                  <Subcategory subcategory={subcategory} />
                );
                const subcategoryRoute = subcategory.route
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join("");
                return (
                  <Route
                    key={subcategory.id}
                    path={subcategoryRoute}
                    element={React.createElement(SubcategoryComponent)}
                  />
                );
              })}
            </Route>
          );
        })}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
