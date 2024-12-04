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
import ApiClient from "./methods/api/apiClient";
import methodModel from "./methods/methods";

const { persistor, store } = configureStoreProd();

function App() {
  
  const routes = [
    { url: "/login", path: "Login" },
    { url: "/signup", path: "Signup" },
    { url: "/dashboard", path: "Dashboard" },
    { url: "/profile", path: "Profile" },
    { url: "/profile/:tab", path: "Settings" },
    { url: "/forgotpassword", path: "Forgotpassword" },
    { url: "/resetpassword", path: "Resetpassword" },
    { url: "/plan", path: "Plans" },
    { url: "/", path: 'Home' },
    { url: "/chat", path: "Chat" },
    { url: "/blogs", path: "Blogs" },
    { url: "/blogs/:id", path: "Blogs/View" },
    { url: "/faqs", path: "Faq" },
    { url: "/newsletter", path: "Newsletter" },
    { url: "/api", path: "Api" },
    { url: "/api/xero", path: "Api" },
    { url: "/api/quickbooks", path: "Api" },
    { url: "/api/calendly", path: "Api" },
    { url: "/api/timely", path: "Api" },
    { url: "/api/paypal", path: "Api" },
    { url: "/api/hubspot", path: "Api" },
    { url: "/api/zoho", path: "Api" },
    { url: "/api/square", path: "Api" },
    { url: "/api/asana", path: "Api" },
    { url: "/api/hero", path: "Api" },
    { url: "/api/goggleads", path: "Api" },
    { url: "/api/monday", path: "Api" },
    { url: "/api/add", path: "Api/AddEdit" },
    { url: "/api/edit/:id", path: "Api/AddEdit" },
    { url: "/activeplan", path: "Billing" },
    { url: "/transaction-dashboard", path: "Transactions/Dashboard" },
    { url: "/quickbookinvoices", path: "Transactions/QuickTransaction" },
    { url: "/activeplan/:id", path: "Billing/View" },
    { url: "/transactions", path: "Transactions" },
    { url: "/paypalTransaction", path: "PaymentProcessing/PaypalTransaction" },
    { url: "/squareTransaction", path: "PaymentProcessing/SquareTransaction" },
    { url: "/paymentprocessing-dashboard", path: "PaymentProcessing/Dashboard" },
    { url: "*", path: "NotFoundPage" },
    { url: "/terms", path: "Terms" },
    { url: "/about", path: "Aboutus" },
    { url: "/privacy", path: "Privacy" },
    { url: "/invoice", path: "Invoice" },
    { url: "/calendly", path: "Calendly" },
    { url: "/calendly/schedule", path: "Calendly/ScheduleMeeting" },
    { url: "/timely", path: "Timely" },
    { url: "/userroles", path: "UserRoles" },
    { url: "/userroles/edit/:id", path: "UserRoles/AddEdit" },
    { url: "/userroles/add", path: "UserRoles/AddEdit" },
    { url: "/userroles/detail/:id", path: "UserRoles/View" },
    { url: "/users", path: "Users" },
    { url: "/users/edit/:id", path: "Users/AddEdit" },
    { url: "/users/add", path: "Users/AddEdit" },
    { url: "/users/detail/:id", path: "Users/View" },
    { url: "/crm-dashboard", path: "CRM/Dashboard" },
    { url: "/hubspot", path: "CRM" },
    { url: "/zoho", path: "CRM/Zoho" },
    {url:'marketing-analytics', path:"MarketingAnalytics/GoogleAnalytics"},
    {url:'googleAd', path:"MarketingAnalytics/GoogleAds"},
    {url:'question-answers', path:"Questions"},
    {url:'revenuecashflow', path:"Financials/RevenueAndCashflow"},
    {url:'profit/loss', path:"Financials/ProfitAndLoss"},
    {url:'accountreceivavble', path:"Financials/AccountsReceivable"},
    {url:'salespipeline', path:"SalesCRM/SalesPipeline"},
    {url:'performance', path:"SalesCRM/SalesTeam"},
    {url:'clientengagement', path:"SalesCRM/ClientEngagement"},
    {url:'marketingperformance', path:"Marketing/MarketingPerformance"},
    {url:'customer-ac', path:"Marketing/CAC"},
    {url:'conversionfunnel', path:"Marketing/ConversionFunnel"},
    {url:'teamproductivity', path:"Projects/Team"},
    {url:'management', path:"Projects/Project"},
    {url:'clientprofile', path:"ClientEngagement/ClientProfile"},
    {url:'engagementmetrics', path:"ClientEngagement/Engagement"},
    {url:'customerfeedback', path:"ClientEngagement/Feedback"},
    {url:'asana', path:"Asana"},
    {url:'businessforcast', path:"BusinessForecast/Business"},
  ];


  // const getSiteDetails = () => {
  //   let siteDetail=localStorage.getItem('siteDetail')
  //   if(siteDetail){
  //     siteDetail=JSON.parse(siteDetail)
  //     // methodModel.updateSiteDetail(siteDetail)
  //   }

  //   ApiClient.get('site/detail').then((res) => {
  //     if (res.success){
  //       let data=res.data
  //       methodModel.updateSiteDetail(data)
  //       localStorage.setItem("siteDetail",JSON.stringify(data))
  //     }
  //   })
  // }
  // getSiteDetails()
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
