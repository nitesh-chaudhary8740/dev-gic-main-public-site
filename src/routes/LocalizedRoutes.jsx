import React from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { ROUTE_MAP } from "./routeTranslations";

import Home from "../pages/Home/Home";
import WebsiteLayout from "./../layout/WebsiteLayout";
import About_Us from "../pages/About-Us/About_Us";
import History_in_Brief from "../pages/About-Us/History_in_Brief";
import Vision_Mission from "./../pages/About-Us/Vision_Mission";
import Corporate_Management from "./../pages/About-Us/Corporate-Management/Corporate_Management";
import Board_of_Directors from "./../pages/About-Us/Corporate-Management/Board_of_Directors";
import Executives from "./../pages/About-Us/Corporate-Management/Executives";
import Key_Persons_Key_Managerial_Persons from "./../pages/About-Us/Corporate-Management/Key_Persons_Key_Managerial_Persons";
import Independent_External_Monitor from "./../pages/About-Us/Corporate-Management/Independent_External_Monitor";
import Regulatory_Framework from "./../pages/About-Us/Regulatory_Framework";
import Subsidiary_Company from "./../pages/About-Us/Subsidiary-Company/Subsidiary_Company";
import Brochure from "./../pages/About-Us/Brochure";

const LocalizedRoutes = () => {
  const { lang } = useParams();
  
  // Default to 'en' if the selected language code is missing in ROUTE_MAP
  const routes = ROUTE_MAP[lang] || ROUTE_MAP.en;

  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.aboutUs} element={<About_Us />} />
        <Route path={routes.historyInBrief} element={<History_in_Brief />} />
        <Route path={routes.visionMission} element={<Vision_Mission />} />
        <Route path={routes.corporateManagement} element={<Corporate_Management />} />
        <Route path={routes.boardOfDirectors} element={<Board_of_Directors />} />
        <Route path={routes.executives} element={<Executives />} />
        <Route path={routes.keyPersons} element={<Key_Persons_Key_Managerial_Persons />} />
        <Route path={routes.independentMonitor} element={<Independent_External_Monitor />} />
        <Route path={routes.regulatoryFramework} element={<Regulatory_Framework />} />
        <Route path={routes.subsidiaryCompany} element={<Subsidiary_Company />} />
        <Route path={routes.brochure} element={<Brochure />} />
      </Route>
    </Routes>
  );
};

const WebsiteRoutes = () => {
  return (
    <Routes>
      {/* Root path '/' ko automatically default language '/en' par redirect karein */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* Dynamic Language Route Handler */}
      <Route path="/:lang/*" element={<LocalizedRoutes />} />
    </Routes>
  );
};

export default WebsiteRoutes;