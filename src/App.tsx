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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import configureStoreProd from "./Pages/config/configureStore.prod";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import methodModel from "./methods/methods";
import environment from "./environment";

// Import the page components directly
import Login from "./Pages/Login";
import Forum from "./Pages/Forum";
import Signup from "./Pages/Signup";
import Otp from "./Pages/Otp";
import Chats from "./Pages/Chats";
import Dashboard from "./Pages/Dashboard";
import OrderListing from "./Pages/Orders/orderlisting";
import MyPayments from "./Pages/MyPayments";
import Orders from "./Pages/Orders";
import Subscription from "./Pages/Subscription";
import Meals from "./Pages/Meals";
import AppointmentListing from "./Pages/MyAppointment/appointmentListing";
import MyAppointment from "./Pages/MyAppointment";
import UserProfile from "./Pages/UserProfile";
import Settings from "./Pages/Settings";
import Forgotpassword from "./Pages/Forgotpassword";
import Resetpassword from "./Pages/Resetpassword";
import ChangePassword from "./Pages/ChangePassword";
import Goals from "./Pages/Goals";
import Blogs from "./Pages/Blogs";
import BlogView from "./Pages/Blogs/View";
import Faq from "./Pages/Faq";
import Plans from "./Pages/Plans";
import NotFoundPage from "./Pages/NotFoundPage";
import Terms from "./Pages/Terms";
import Aboutus from "./Pages/Aboutus";
import Privacy from "./Pages/Privacy";
import Success from "./Pages/Success";
import UserRoles from "./Pages/UserRoles";
import UserRolesAddEdit from "./Pages/UserRoles/AddEdit";
import Users from "./Pages/Users";
import UsersAddEdit from "./Pages/Users/AddEdit";
import MyProfile from "./Pages/MyProfile";
import SubscriptionListing from "./Pages/Subscription/subscriptionlist";

const { persistor, store } = configureStoreProd();

function App() {
  console.log(environment?.secretKey, "environment?.secretKey")
  const routes = [
    { url: "/login", component: Login },
    { url: "/forum", component: Forum },
    { url: "/signup", component: Signup },
    { url: "/otp", component: Otp },
    { url: "/chats", component: Chats },
    { url: "/dashboard", component: Dashboard },
    { url: "/myorders", component: OrderListing },
    { url: "/mypayments", component: MyPayments },
    { url: "/myordersDetail/:id", component: Orders },
    { url: "/subscription/:id", component: Subscription },
    { url: "/meals", component: Meals },
    { url: "/myappointment", component: AppointmentListing },
    { url: "/myappointmentData/:id", component: MyAppointment },
    { url: "/user/detail/:id", component: UserProfile },
    { url: "/subscription", component: SubscriptionListing },
    { url: "/profile/:tab", component: Settings },
    { url: "/forgotpassword", component: Forgotpassword },
    { url: "/resetpassword", component: Resetpassword },
    { url: "/changepassword", component: ChangePassword },
    { url: "/Goals", component: Goals },
    { url: "/", component:MyProfile },
    // { url: "/chat", component: Chat },
    { url: "/blogs", component: Blogs },
    { url: "/blogs/:id", component: BlogView },
    { url: "/faqs", component: Faq },
    // { url: "/newsletter", component: Newsletter },
    { url: "/plans", component: Plans },
    { url: "*", component: NotFoundPage },
    { url: "/terms", component: Terms },
    { url: "/about", component: Aboutus },
    { url: "/privacy", component: Privacy },
    { url: "/success", component: Success },
    { url: "/userroles", component: UserRoles },
    { url: "/userroles/edit/:id", component: UserRolesAddEdit },
    { url: "/userroles/add", component: UserRolesAddEdit },
    { url: "/userroles/detail/:id", component: UserRolesAddEdit },
    { url: "/users", component: Users },
    { url: "/users/edit/:id", component: UsersAddEdit },
    { url: "/users/add", component: UsersAddEdit },
    { url: "/users/detail/:id", component: UsersAddEdit },
  ];

  methodModel.updateSiteDetail({
    name: 'Skinni Web',
    fabIcon: ''
  });

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
                {routes.map((itm, index) => {
                  return (
                    <Route
                      key={index}
                      path={itm.url}
                      element={<itm.component />}
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
