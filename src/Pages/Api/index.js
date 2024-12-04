import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import methodModel from "../../methods/methods";
const Features = () => {
  const user = useSelector((state) => state.user);
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });

  const accData = [
    { name: "XERO", platform: "xero" },
    { name: "Quickbooks", platform: "quickbooks" },
    { name: "MYOB", platform: "myob" },
    { name: "Employment Hero", platform: "employment_hero" },
  ];

  const crmData = [
    { name: "HubSpot", platform: "hubSpot" },
    { name: "Salesforce", platform: "salesforce" },
    { name: "Zoho CRM", platform: "zoho" },
  ];

  const paymentData = [
    { name: "Stripe", platform: "stripe" },
    { name: "Square", platform: "square" },
    { name: "PayPal", platform: "paypal" },
  ];

  const scheduleData = [
    { name: "Timely", platform: "timely" },
    { name: "Calendly", platform: "calendly" },
  ];

  const marketingData = [
    { name: "Google Analytics", platform: "google_analytics" },
    { name: "Facebook Ads", platform: "facebook_ads" },
    { name: "Google Ads", platform: "google_ads" },
  ];

  const reviewData = [
    { name: "Asana", platform: "asana" },
    { name: "Trello", platform: "trello" },
    { name: "Monday.com", platform: "monday_com" },
  ];

  const [data, setData] = useState(accData);
  const [total, setTotal] = useState(data.length);
  const [tab, setTab] = useState("accounting");
  const [loaging, setLoader] = useState(false);
  const history = useNavigate();

  

  useEffect(() => {
    let code = methodModel.getPrams("code");
    if (code) {
      let url = "xero/token";
      let realmId = methodModel.getPrams("realmId");
      if (realmId) url = "quickbook/callback";
      if (window.location.pathname.includes("calendly")) {
        ApiClient.get("calendly/access_token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history("/calendly");
            }, 1);
          }
        });

        return;
      }

      if (window.location.pathname.includes("paypal")) {
        ApiClient.get("paypal/accessToken", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history("/paypalTransaction");
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("square")) {
        ApiClient.get("square/access_token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history("/squareTransaction");
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.toLowerCase().includes("hubspot")) {
        ApiClient.get("hubspot/access_token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history("/hubspot");
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("zoho")) {
        ApiClient.get("zoho/access_token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history("/zoho");
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("timely")) {
        ApiClient.get("timely/gettoken", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history('/timely')
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("asana")) {
        ApiClient.get("asana/get-token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              history('/asana')
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("hero")) {
        ApiClient.get("emphero/get-token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              // history('/asana')
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("monday")) {
        ApiClient.get("monday/get-token", { code: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              // history('/asana')
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("goggleads")) {
        ApiClient.post("google/ads/connect", { authCode: code }).then((res) => {
          if (res.success) {
            document.getElementById("updateProfile")?.click();
            setTimeout(() => {
              // history('/asana')
            }, 1);
          }
        });
        return;
      }
      if (window.location.pathname.includes("xero") || realmId) {
        loader(true);
        ApiClient.get(url, {
          code: code,
          userId: user.id,
          realmId: realmId,
        }).then((res) => {
          if (res.success) {
            if (realmId) {
              loader(false);
              document.getElementById("updateProfile")?.click();
              setTimeout(() => {
                history("/invoice");
              }, 1);
              return;
            }

            let token = res.data.access_token;
            ApiClient.get("user/profile").then((res) => {
              if (res.success) {
                ApiClient.get("xero/data", {
                  token: token,
                  tenantId: res.data.connectionsDetails?.find(
                    (itm) => itm.type == "xero" && itm.connected
                  )?.tenantId,
                }).then((res) => {
                  loader(false);
                  if (res.success) {
                    document.getElementById("updateProfile")?.click();
                    setTimeout(() => {
                      history("/transactions");
                    }, 1);
                  }
                });
              } else {
                loader(false);
              }
            });
          } else {
            loader(false);
          }
        });
      }
    }

    let tab = methodModel.getPrams("tab");
    if (tab) tabChange(tab);
  }, []);

  const tabChange = (t) => {
    let list = accData;
    if (t == "crm") list = crmData;
    if (t == "payment") list = paymentData;
    if (t == "scheduling") list = scheduleData;
    if (t == "marketing") list = marketingData;
    if (t == "review") list = reviewData;
    setData(list);
    setTab(t);
  };

  return (
    <>
      <Html
        tabChange={tabChange}
        tab={tab}
        filters={filters}
        setFilter={setFilter}
        loaging={loaging}
        data={data}
        total={total}
      />
    </>
  );
};

export default Features;
