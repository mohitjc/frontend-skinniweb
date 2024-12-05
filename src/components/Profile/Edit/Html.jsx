import React, { useEffect, useState } from "react";
import "./style.scss";

import ImageUpload from "../../common/ImageUpload";

import FormControl from "../../common/FormControl";
import { useNavigate } from "react-router-dom";
import methodModel from "../../../methods/methods";
import ApiClient from "../../../methods/api/apiClient";

const Html = ({
  handleSubmit,
  setForm,
  form,
  getError,
  imageResult,
  images,
  uploadImage,
  submitted,data
}) => {
  const history=useNavigate()
  const [companyType, setCompanyType] = useState([])
  const inValidEmail = methodModel.emailvalidation(form?.email);
  const inValidEmailCompany = methodModel.emailvalidation(form?.CompanyEmail);
  const getData = (p = {}) => {
    ApiClient.get("category/listing", {status:'active', categoryType:"Business"}).then((res) => {
      if (res.success) {
        const data = res?.data?.map((data)=>{
          return{
            "id":data?.id || data?._id,
            "name" : data?.name
          }
        })
        setCompanyType(data);
      }
    });
  };
  
  useEffect(() => {
    getData()
  },[])

  const currencyOptions = [
    { id: 'US Dollar (USD)', name: 'US Dollar (USD)' },
    { id: 'Euro (EUR)', name: 'Euro (EUR)' },
    { id: 'British Pound (GBP)', name: 'British Pound (GBP)' },
    { id: 'Australian Dollar (AUD)', name: 'Australian Dollar (AUD)' },
    { id: 'Japanese Yen (JPY)', name: 'Japanese Yen (JPY)' },
  ];
  return (
    <>
      <div className="wrapper_section">
        <div className="flex items-center  justify-between">
          <h3 className="text-2xl font-semibold text-[#111827]">
            Edit Profile
          </h3>
        </div>

        <form name="profileForm" className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 mb-4 gap-4 shadow p-6 mt-6 gap-4 bg-white rounded-[10px]">
            {data?.subRoleDetails && data?.subRoleDetails?.id ? (
              <>
               <div className="col-span-12 md:col-span-6">
              <FormControl
                type="text"
                label="Full Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e })}
                required
              />
            </div>
              </>
            ):(
              <>
            <div className="col-span-12 md:col-span-6">
              <FormControl
                type="text"
                label="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e })}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <FormControl
                type="text"
                label="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e })}
                required
              />
            </div>
              </>
            )}


            <div className="col-span-12 md:col-span-6">
              <FormControl
                type="phone"
                label="Mobile No"
                value={form.mobileNo}
                onChange={(e) => setForm({ ...form, mobileNo: e })}
                required
              />
              {submitted && !form.mobileNo && (
                <div className="invalid-feedback d-block" style={{color:"red"}}>
                Company Mobile is required
              </div>
              )}
            </div>
            <div className="col-span-12 md:col-span-6">
            <label className="text-sm mb-2 block">Email</label>
              <input
                type="email"
                className="relative border  border-[#00000036] [#bg-white w-full rounded-lg h-11 flex items-center gap-2 overflow-hidden px-2"
                value={form.email}
                autoComplete="false"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
                required
                disabled
              />
            </div>

            <div className="col-span-12 md:col-span-6">
            <label className="text-sm mb-2 block">Image</label>
             
              <ImageUpload
                model="users"
                accept="image/*"
                result={(e) => imageResult(e, "image")}
                value={images.image || form.image}
                multiple={false}
              />
            </div>

            {/* <div className="col-span-12 md:col-span-6">
              <label>Customer Role<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Customer Role"
                intialValue={form.customerRole}
                result={e => { setForm({ ...form, customerRole: e.value,skills:[] }) }}
                options={roles}
                theme="search"
                disabled
              />
              {submitted && !form.customerRole ? <div className="invalid-feedback d-block">Customer Role is Required</div> : <></>}
            </div> */}
          </div>

             <div>
              <h4 className="p-4 border-b border-t bg-white font-medium rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF] ">
                  <img src ="/assets/img/usero-blue.svg" className="me-3 bg-[#e9f0f8] p-2 rounded-md"/>
                Company Profile
              </h4>
            </div>
            <div className="grid grid-cols-12 mb-4 bg-white gap-4 p-4">
            <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="text"
                  label="Company Name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e })}
                  required
                />
              </div>
              <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="select"
                  label="Business Type"
                  value={form.companyType}
                  options={companyType}
                  theme="search"
                  onChange={(e) => setForm({ ...form, companyType: e })}
                  required
                />
              </div>
              <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="phone"
                  name="companyMobileNo"
                  label="Company Mobile No"
                  value={form.companyMobileNo}
                  onChange={(e) => setForm({ ...form, companyMobileNo: e })}
                  required
                />
                {submitted && !form.companyMobileNo && (
                  <div className="invalid-feedback d-block" style={{color:"red"}}>
                    Company Mobile is required
                  </div>
                )}
              </div>
              <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="text"
                  name="CompanyEmail"
                  label="Company Email"
                  value={form.CompanyEmail}
                  onChange={(e) => setForm({ ...form, CompanyEmail: e })}
                  required
                  // disabled={id ? true : false}
                />
                {submitted && form.CompanyEmail && !inValidEmailCompany && (
                  <div className="invalid-feedback d-block" style={{color:"red"}}>
                   Please enter valid  Company Email
                  </div>
                )}
              </div>
              
              </div>
              <div>
              <h4 className="p-4 border-b border-t bg-white font-medium rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF] ">
                  <img src ="/assets/img/usero-blue.svg" className="me-3 bg-[#e9f0f8] p-2 rounded-md"/>
                Company Information
              </h4>
            </div>
            <div className="grid grid-cols-12 gap-4 bg-white p-4">
            <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="text"
                  label="Company Address"
                  value={form.companyAddress}
                  onChange={(e) => setForm({ ...form, companyAddress: e })}
                  required
                />
              </div>
              <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="text"
                  label="Contact Name"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e })}
                  required
                />
              </div>
              <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="select"
                  label="Currency"
                  value={form.currency}
                  options={currencyOptions}
                  theme="search"
                  onChange={(e) => setForm({ ...form, currency: e })}
                  required
                />
              </div>
              <div className="lg:col-span-6 col-span-12 mb-3">
                <FormControl
                  type="text"
                  label="Website URL"
                  value={form.websiteURL}
                  onChange={(e) => setForm({ ...form, websiteURL: e })}
                  required
                />
              </div>
              </div>
          <div className="text-right mt-3">
            <button type="button" onClick={()=>history('/')} className="text-white bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3">
              Cancel
            </button>
            <button className="text-white bg-[#0065FF] bg-[#0065FF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Html;
