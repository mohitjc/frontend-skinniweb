import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import "react-quill/dist/quill.snow.css";
import "./scss/main.scss";
import configureStoreProd from "./Pages/config/configureStore.prod";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";
import methodModel from "./methods/methods";
import environment from "./environment";

const { persistor, store } = configureStoreProd();

function App() {
  console.log(environment?.secretKey,"environment?.secretKey")
  const routes = [
    { url: "/login", path: "Login" },
    { url: "/signup", path: "Signup" },
    { url: "/otp", path: "Otp" },
    { url: "/dashboard", path: "Dashboard" },
    { url: "/myorders", path: "Orders/orderlisting" },
    { url: "/myordersDetail", path: "Orders" },
    // { url: "/myprofile", path: "MyProfile" },
    { url: "/subscription", path: "Subscription" },
    { url: "/profile/:tab", path: "Settings" },
    { url: "/forgotpassword", path: "Forgotpassword" },
    { url: "/resetpassword", path: "Resetpassword" },
    { url: "/changepassword", path: "ChangePassword" },
    { url: "/Goals", path: "Goals" },
    { url: "/", path: 'MyProfile' },
    { url: "/chat", path: "Chat" },
    { url: "/blogs", path: "Blogs" },
    { url: "/blogs/:id", path: "Blogs/View" },
    { url: "/faqs", path: "Faq" },
    { url: "/newsletter", path: "Newsletter" },
    { url: "/api", path: "Api" },
 
    { url: "*", path: "NotFoundPage" },
    { url: "/terms", path: "Terms" },
    { url: "/about", path: "Aboutus" },
    { url: "/privacy", path: "Privacy" },
 
    { url: "/userroles", path: "UserRoles" },
    { url: "/userroles/edit/:id", path: "UserRoles/AddEdit" },
    { url: "/userroles/add", path: "UserRoles/AddEdit" },
    { url: "/userroles/detail/:id", path: "UserRoles/View" },
    { url: "/users", path: "Users" },
    { url: "/users/edit/:id", path: "Users/AddEdit" },
    { url: "/users/add", path: "Users/AddEdit" },
    { url: "/users/detail/:id", path: "Users/View" },
 
 
  ];


  methodModel.updateSiteDetail({
    name:'Skinni Web',
    fabIcon:''
  })
  sessionStorage.removeItem('browseload');
  sessionStorage.removeItem('siteload');
  sessionStorage.removeItem('activeRooms');

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={"loading ..."} persistor={persistor}>
          <Suspense
            fallback={
              <div id="loader" className="loaderDiv">
                <div>
                  <img
                    src="/assets/img/loader.gif"
                    alt="logo"
                    className="loaderlogo"
                  />
                </div>
              </div>
            }
          >
            <Router>
              <Routes>
                {routes.map((itm:any) => {
                  const Element = lazy(() => import(`./Pages/${itm.path}`));
                  return (
                    <Route
                      path={itm.url}
                      element={itm.path ? <Element /> : itm?.element}
                    />
                  );
                })}
              </Routes>
            </Router>
          </Suspense>
        </PersistGate>
      </Provider>
      <div id="loader" className="loaderDiv d-none">
        <div>
          <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
