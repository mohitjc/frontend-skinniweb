/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Mohit Kumar
 */

import axios from "axios";
import { setAuthorizationToken } from "../auth";
import { toast } from "react-toastify";
import loader from "../loader";
import environment from "../../environment"; 

var config = {
  headers: { "Content-Type": "application/json" },
};

var baseUrl = environment.api;

const handleError = (err, hideError) => {
  let message = "";
  if (err) {
    
    if (err && err.error && err.error.code == 401) {
      hideError = true;
      // localStorage.removeItem("persist:admin-app");
      // localStorage.removeItem("token");
      // methodModel.route("/");
      document.getElementById('logoutBtn')?.click()
    }
    message = err && err.error && err.error.message;
    let messageD = err && err.error && err.error.details;
    console.log("message",message)
    console.log("err",err)
    console.log("messageD",messageD)
    if(messageD) message=messageD[0].issue
    if (!message) message = err.message;
    if (!message) message = "Server Error";
  }
  if (!hideError) toast.error(message);
};

class ApiClient {
  static post(url1, payload,params={},base = "", hideError = false) {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    setAuthorizationToken(axios);
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, JSON.stringify(payload), {...config,params:params})
        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data, hideError);
            fulfill({ ...eres.data, success: false });
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

  static put(url1, payload, base = "") {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    setAuthorizationToken(axios);
    return new Promise(function (fulfill, reject) {
      axios
        .put(url, JSON.stringify(payload), config)
        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data);
            fulfill(eres.data);
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

  static get(url1, params = {}, base = "", hidError = "") {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    setAuthorizationToken(axios,params?.Authorization);
    return new Promise(function (fulfill, reject) {
      delete params?.Authorization
      axios
        .get(url, { ...config, params: params })
        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data, hidError);
            fulfill({ ...eres.data, success: false });
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

  static delete(url1, params = {}, base = "") {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    setAuthorizationToken(axios);
    return new Promise(function (fulfill, reject) {
      axios
        .delete(url, { ...config, params: params })
        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data);
            fulfill(eres.data);
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

  static allApi(url, params, method = "get") {
    if (method == "get") {
      return this.get(url, params);
    } else if (method == "put") {
      return this.put(url, params);
    }
    if (method == "post") {
      return this.post(url, params);
    }
  }

  /*************** Form-Data Method ***********/
  static postFormData(url1, params) {
    let url = baseUrl + url1;
    if (url1.includes('https')) url = url1;
    setAuthorizationToken(axios);
    return new Promise(function (fulfill, reject) {
      var body = new FormData();
      let oArr = Object.keys(params);
      oArr.map((itm) => {
        body.append(itm, params[itm]);
      });

      let configupdate = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      axios
        .post(url, body, {...config,...configupdate})
        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data);
            fulfill(eres.data);
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

  static postFormFileData(url, params) {
    let configupdate = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    url = baseUrl + url;
    setAuthorizationToken(axios);
    return new Promise(function (fulfill, reject) {
      var body = new FormData();
      let oArr = Object.keys(params);
      oArr.map((itm) => {
        body.append(itm, params[itm]);
      });

      axios
        .post(url, body, configupdate)

        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data);
            fulfill(eres.data);
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

  static multiImageUpload(url, files, params = {}, key = "file") {
    let configupdate = {
      headers: { "Content-Type": "multipart/form-data" },
      params: params,
    };
    url = baseUrl + url;
    setAuthorizationToken(axios);
    let body = new FormData();

    let i = 0;
    for (let item of files) {
      let file = files.item(i);
      body.append(key, file);
      i++;
    }
    setAuthorizationToken(axios);
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, body, configupdate)
        .then(function (response) {
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.data);
            fulfill(eres.data);
          } else {
            toast.error("Network Error");
            reject(error);
          }
        });
    });
  }

}

export default ApiClient;
