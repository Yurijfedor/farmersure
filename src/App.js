import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Router } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const Subcategory = lazy(() => import("./pages/Subcategory"));
const Category = lazy(() => import("./pages/Category"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Layout = lazy(() => import("./components/layout/layout"));
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
  const { isAuth } = useAuth();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Outlet />}>
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
          <Route path="/ourservices">
            <Route path="store" element={<Store />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route element={<PrivateRoutes />}>
              <Route path="rent" element={<Rent />} />
            </Route>
          </Route>
          <Route path="/ourcompany">
            <Route path="values" element={<Values />} />
            <Route path="team" element={<Team />} />
            <Route path="achievements" element={<Achievements />} />
          </Route>
          <Route path="/apiculture">
            <Route path="beekeeping" element={<Beekeeping />} />
            <Route path="production" element={<Production />} />
            <Route path="problems" element={<Problems />} />
          </Route>
          <Route path="/news">
            <Route path="freshNews" element={<Freshnews />} />
            <Route path="recommendations" element={<Recommendations />} />
          </Route>
          <Route path="/ourcontacts">
            <Route path="contacting" element={<Contacting />} />
            <Route path="contactInfo" element={<Contactinfo />} />
            <Route path="ordering" element={<Ordering />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
