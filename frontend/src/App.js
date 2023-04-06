import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/Layout/DefaultLayout";
import PannelLayout from "./components/Layout/PannelLayout";
import { UserState } from "./context/AuthContext";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const {user} = UserState();
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route,index) => {
            const Page = route.component;
            const Layout = DefaultLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
          })}
          {user!==null && privateRoutes.map((route,index) => {
            const Page = route.component;
            const Layout = PannelLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
