
import WebsiteRoutes from "./routes/WebsiteRoutes";
import { WebsiteContentProvider } from "./context/WebsiteContentProvider";

const App = () => {
  return (
    <WebsiteContentProvider>
      <div>
        {/* <Header /> */}
        {/* <Admin /> */}
        <WebsiteRoutes />
      </div>
    </WebsiteContentProvider>
  );
};

export default App;
