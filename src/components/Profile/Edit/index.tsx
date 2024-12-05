import React, { useState, useEffect } from "react";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import "./style.scss";
import Html from "./Html";
import { useNavigate } from "react-router-dom";
import formModel from "../../../models/form.model";
import { useDispatch, useSelector } from "react-redux";
import { login_success } from "../../../Pages/actions/user";
import methodModel from "../../../methods/methods";

const EditProfile = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [data, setData]: any = useState();
  const [form, setForm]: any = useState({
    // id: "",
    fullName:"",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    company:"",
    companyType:"",
    companyMobileNo:"",
    CompanyEmail:"",
    companyAddress:"",
    websiteURL:"",
    contactName:"",
    currency:""
  });
  const [images, setImages]: any = useState({ image: "" });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);


  const formValidation = [
    { key: "mobileNo", required: true },
    { key: "email", required: true, message: "Email is required", email: true },
    {key:'CompanyEmail', required: true, message: "Company Email is required", email: true },
    { key: "companyMobileNo", required: true },
  ];
  const gallaryData = () => {
    loader(true);
    ApiClient.get(`user/profile`).then((res) => {
      if (res.success) {
        let payload = form;
        let value = res.data;
        let oarr = Object.keys(form);
        oarr.map((itm) => {
          payload[itm] = value[itm] || null;
        });
        // payload.id = user._id || user.id;
        if(!payload?.mobileNo) payload.mobileNo='44'
        setForm({ ...payload });

        let img = images;
        Object.keys(images).map((itm) => {
          img[itm] = value[itm];
        });

        setImages({ ...img });
        setData(value);
      }
      loader(false);
    });
  };

  const getError = (key: any) => {
    return formModel.getError("profileForm", key);
  };

  const token = user?.access_token
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;

    let value = {
      ...form,
      // id: user._id || user.id,
      // addedBy: user._id || user.id,
      ...images,
      token
    };
    Object.keys(value).map((itm) => {
      if (!value[itm]) value[itm] = null;
    });
    loader(true);
    ApiClient.put("user/edit/profile", value).then((res) => {
      if (res.success) {
        let uUser = { ...user, ...value };
        dispatch(login_success(uUser));
        history("/");
      }
      loader(false);
    });
  };

  const uploadImage = (e: any) => {
    setForm({ ...form, baseImg: e.target.value });
    let files = e.target.files;
    let file = files.item(0);
    loader(true);
    ApiClient.postFormData("api/upload/image?modelName=users", {
      file: file,
      modelName: "users",
    }).then((res) => {
      if (res.fileName) {
        let image = res.fileName;
        setForm({ ...form, image: image });
      } else {
        setForm({ ...form });
      }
      loader(false);
    });
  };

  const imageResult = (e: any, key: any) => {
    images[key] = e.value;
    setImages(images);
  };

  useEffect(() => {
    if (user.loggedIn) {
      gallaryData();
      
    }
  }, []);

  return (
    <>
      <Html
        handleSubmit={handleSubmit}
        setForm={setForm}
        form={form}
        getError={getError}
        submitted={submitted}
        imageResult={imageResult}
        images={images}
        uploadImage={uploadImage}
        data={data}
      />
    </>
  );
};

export default EditProfile;
