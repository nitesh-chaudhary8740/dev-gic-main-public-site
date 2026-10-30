import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import WebsiteLayout from "../layout/WebsiteLayout";
import DynamicPage from "../pages/DynamicPage";

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        {/* Home page */}
        <Route index element={<Home />} />

        {/* All API-driven pages */}
        <Route path="*" element={<DynamicPage />} />
      </Route>
    </Routes>
  );
};

export default WebsiteRoutes;