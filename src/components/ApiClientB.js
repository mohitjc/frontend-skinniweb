import environment from "../environment";
import { setAuthorizationToken } from "../methods/auth";
import axios from "axios";
import { toast } from "react-toastify";
import loader from "../methods/loader";
import { useState } from "react";
import { useSelector } from "react-redux";

const ApiClientB = () => {
  const user = useSelector(state => state.user)
  const [isLoading, setLoading] = useState(false)
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const baseUrl = environment.api;


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
      console.log("message", message)
      console.log("err", err)
      console.log("messageD", messageD)
      if (messageD) message = messageD[0].issue
      if (!message) message = err.message;
      if (!message) message = "Server Error";
    }
    if (!hideError) toast.error(message);
  };


  const get = (url1, params = {}, base = "", hidError = "") => {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    let auth = params?.Authorization || user?.access_token || ''
    setAuthorizationToken(axios, auth);
    setLoading(true)
    return new Promise(function (fulfill, reject) {
      delete params?.Authorization
      axios
        .get(url, { ...config, params: params })
        .then(function (response) {
          setLoading(false)
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          setLoading(false)
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

  const post = (url1, payload, params = {}, base = "", hideError = false) => {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    let auth = params?.Authorization || user?.access_token || ''
    setAuthorizationToken(axios, auth);
    setLoading(true)
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, JSON.stringify(payload), { ...config, params: params })
        .then(function (response) {
          fulfill(response && response.data);
          setLoading(false)
        })
        .catch(function (error) {
          loader(false);
          setLoading(false)
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

  const put = (url1, payload, base = "") => {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    let auth = payload?.Authorization || user?.access_token || ''
    setAuthorizationToken(axios, auth);
    setLoading(true)
    return new Promise(function (fulfill, reject) {
      axios
        .put(url, JSON.stringify(payload), config)
        .then(function (response) {
          setLoading(false)
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          setLoading(false)
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

  const deleteApi = (url1, params = {}, base = "") => {
    let url = baseUrl + url1;
    if (base) url = base + url1;
    if (url1.includes('https')) url = url1;
    let auth = params?.Authorization || user?.access_token || ''
    setAuthorizationToken(axios, auth);
    setLoading(true)
    return new Promise(function (fulfill, reject) {
      axios
        .delete(url, { ...config, params: params })
        .then(function (response) {
          setLoading(false)
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          setLoading(false)
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

  const allApi = (url, params, method = "get") => {
    if (method == "get") {
      return get(url, params);
    } else if (method == "put") {
      return put(url, params);
    }
    if (method == "post") {
      return post(url, params);
    }
  }

  const multiImageUpload = (url, files, params = {}, key = "file") => {
    let configupdate = {
      headers: { "Content-Type": "multipart/form-data" },
      params: params,
    };
    url = baseUrl + url;
    let body = new FormData();

    let i = 0;
    for (let item of files) {
      let file = files.item(i);
      body.append(key, file);
      i++;
    }
    let auth = params?.Authorization || user?.access_token || ''
    setAuthorizationToken(axios, auth);
    setLoading(true)
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, body, configupdate)
        .then(function (response) {
          setLoading(false)
          fulfill(response && response.data);
        })
        .catch(function (error) {
          loader(false);
          setLoading(false)
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

  const postFormData=(url1, params)=> {
    let url = baseUrl + url1;
    if (url1.includes('https')) url = url1;
    let auth = params?.Authorization || user?.access_token || ''
    setAuthorizationToken(axios, auth);
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

  return {
    get,
    post,
    put,
    deleteApi,
    allApi,
    multiImageUpload,
    postFormData,
    isLoading
  }
}


export default ApiClientB