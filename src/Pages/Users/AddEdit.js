import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import { useSelector } from "react-redux";
import {
  roleType,
} from "../../models/type.model";
import { decryptData, encryptUrlData2 } from "../../models/crptoUtils";
import { IoIosInformationCircle } from "react-icons/io";

const AddEdit = () => {
  const { id } = useParams();
  const ucidata = encryptUrlData2(id)
  const uci = decryptData(ucidata)
  const [images, setImages] = useState({ image: "" });;
  const [subRole, setSubRole] = useState([])
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subRole:"",
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const inValidEmail = methodModel.emailvalidation(form?.email);
  const formValidation = [
    { key: "email", required: true, message: "Email is required", email: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;

   
    let method = "post";
    let url = shared.addApi;
    
     let value = {
        ...form,
        id: uci,
      };
    if (uci) {
      method = "put";
      url = shared.editApi;
      delete value.email
      delete value.subRole
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };
  useEffect(() => {
    if (uci) {
      loader(true);
      ApiClient.get(shared.detailApi, { id:uci }).then((res) => {
        if (res.success) {
          let value = {
            ...res.data.userDetails,
            ...res.data,
          };
          let payload = form;
          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });

          // payload.id=value.user_id

          setform({
            ...payload,
            email:value.email,
            subRole:value.subRoleDetails?.id,
          });
          let img = images;
          Object.keys(img).map((itm) => {
            img[itm] = value[itm];
          });
          setImages({ ...img });
        }
        loader(false);
      });
    }
  }, [uci]);


 
  const getData = (p = {}) => {
    loader(true);
    let filter = { status:"active", addedBy:user.id };
  
    ApiClient.get(`userroles/listing`, filter).then((res) => {
      if (res.success) {
        setSubRole(
          res.data.map((itm) => ({
            id: itm.id,   
            name: itm.name,
          }))
        );

      }
      loader(false);
    });
  };
  
  useEffect(() => {
    getData()
  },[])

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
              <Tooltip placement="top" title="Back">
                <Link
                  to={`/${shared.url}`}
                   className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#0065FF] hover:text-white border transition-all bg-white mr-3" >
                  <i className="fa fa-angle-left text-lg"></i>
                </Link>
              </Tooltip>
              <div>
                <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                  {id ? "Edit" : "Add"} {shared.addTitle}
                </h3>
                <p class="text-xs lg:text-sm font-normal text-[#75757A]">
                  Here you can see all about your {shared.addTitle}
                </p>
              </div>
            </div>
         
           
                <div className="pprofile1 mb-10">
         
                <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
                  <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                    <IoIosInformationCircle className="text-[#0065FF]" />
                  </div>
                  <h3 className="text-[16px] font-[500] text-[#0065FF]">
                    Basic Information
                  </h3>
                </div>
           <div className="grid grid-cols-12 gap-4 p-4">
             <div className="lg:col-span-6 col-span-12 mb-3">
             <FormControl
               type="text"
               label="First Name"
               value={form.firstName}
               onChange={(e) => setform({ ...form, firstName: e })}
               required
             />
           </div>
           <div className="lg:col-span-6 col-span-12 mb-3">
             <FormControl
               type="text"
               label="Last Name"
               value={form.lastName}
               onChange={(e) => setform({ ...form, lastName: e })}
               required
             />
           </div>
           <div className="lg:col-span-6 col-span-12 mb-3">
            {subRole && subRole.length > 0 ? (
              <FormControl
                type="select"
                label="Role"
                value={form.subRole}
                theme="search"
                options={subRole}
                onChange={(e) => setform({ ...form, subRole: e})}
                disabled={id ? true : false}
                required
              />
            ):  <button
            onClick={(e) => {e.preventDefault();history('/userroles/add') }}
            className="text-white bg-[#0065FF] bg-[#0065FF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
          >
            Click here for add Roles
          </button>}
              </div> 
             <div className="lg:col-span-6 col-span-12 mb-3">
               <FormControl
                 type="text"
                 name="email"
                 label="Email"
                 value={form.email}
                 onChange={(e) => setform({ ...form, email: e })}
                 required
                 disabled={id ? true : false}
               />
               {form.email && submitted && !inValidEmail && (
                 <div className="invalid-feedback d-block">
                   Please enter valid email
                 </div>
               )}
             </div>
             </div>


           </div>

            <div className="text-right">
            
          
           <button
                type="submit"
                className="text-white bg-[#0065FF] bg-[#0065FF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
              >
                Save
              </button>
            </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEdit;