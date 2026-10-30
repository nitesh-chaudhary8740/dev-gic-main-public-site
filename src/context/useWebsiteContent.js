import { useContext } from "react";
import WebsiteContentContext from "./WebsiteContentContext";

export const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext);

  if (context === null) {
    throw new Error(
      "useWebsiteContent must be used inside WebsiteContentProvider",
    );
  }

  return context;
};