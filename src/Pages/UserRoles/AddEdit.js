import React, { useState, useEffect } from "react";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import {
  rolePermission,
  rolePermissions,
  roleType,
} from "../../models/type.model";
import ApiClientB from "../../components/ApiClientB";
import { decryptData, encryptUrlData2 } from "../../models/crptoUtils";
import { IoIosInformationCircle } from "react-icons/io";

const AddEdit = () => {
  const {get,allApi,isLoading}=ApiClientB()
  const { id } = useParams();
  const ucidata = encryptUrlData2(id)
  const uci = decryptData(ucidata)
  const [images, setImages] = useState({ image: "" });
  const [form1, setForm1] = useState({ ...roleType });
  const permissions = rolePermissions;
  const permission = rolePermission;
  const [form, setform] = useState({
    name: "",
  });
  const history = useNavigate();
  const formValidation = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;

    let method = "post";
    let url = shared.addApi;

    let value = {
      ...form,
      ...form1,
    };
    if (uci) {
      method = "put";
      url = shared.editApi;
      delete value.addedBy
    } else {
      delete value.id;
    }

    loader(true);
    allApi(url, value, method).then((res) => {
      if (res.success) {
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };
  useEffect(() => {
    if (uci) {
      loader(true);
      get(shared.detailApi, { id:uci }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = form;
          let payload1 = form1;
          let permissions = value.permissions || [];

          Object.keys(payload1).map((itm) => {
            if (itm !== "permissions") payload1[itm] = value[itm];
          });

          Object.entries(permissions).forEach(([permission, permValue]) => {
            if (payload1.permissions) {
              payload1.permissions[permission] = permValue;
            }
          });
          setForm1({
            ...payload1,
          });

          setform({
            ...value,
          });
          let img = images;
          Object.keys(img).map((itm) => {
            img[itm] = value[itm];
          });
          setImages({ ...img });
        }
        loader(false);
      });
    } else  {
      setform({ name: "" });
      setForm1({
        ...roleType,
        permissions: Object.keys(roleType?.permissions)?.reduce((acc, key) => {
          acc[key] = false; 
          return acc;
        }, {}),
      });
    }
    
  }, [uci]);

  const setpermission = (key, value) => {
    setForm1({
      ...form1,
      permissions: {
        ...form1.permissions,
        [key]: value,
      },
    });
  };

  const HandleAll = (check) => {
    let value = check ? true : false;
    let permissions = form1.permissions;
    Object.keys(permissions).map((itm) => {
      permissions[itm] = value;
    });
    setForm1({ ...form1, permissions: permissions });
  };
  const isAllChecked = () => {
    let value = true;
    let permissions = form1.permissions;
    Object.keys(permissions).map((itm) => {
      if (!permissions[itm]) value = false;
    });
    return value;
  };

  const HandleAllRead = (check, key = "read") => {
    let value = check ? true : false;

    let keys = {};
    permissions.map((itm) => {
      keys = { ...keys, [`${key}${itm.key}`]: value };
    });

    setForm1({
      ...form1,
      permissions: {
        ...form1.permissions,
        ...keys,
      },
    });
  };
  const isAllPCheck = (key = "read") => {
    let value = true;
    permissions.map((itm) => {
      if (!form1.permissions[`${key}${itm.key}`]) value = false;
    });
    return value;
  };

  const handleAllPermission = (e) => {
    let key = e.name;
    let checked = e.checked;

    let keys = {};
    permission.map((itm) => {
      keys = { ...keys, [`${itm.key}${key}`]: checked };
    });

    setForm1({
      ...form1,
      permissions: {
        ...form1.permissions,
        ...keys,
      },
    });
  };

  const isCheckAll = (key) => {
    let value = true;
    permission.map((itm) => {
      if (!form1.permissions[`${itm.key}${key}`]) value = false;
    });
    return value;
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <Link
                to={`/${shared.url}`}
                className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#0065FF] hover:text-white border transition-all bg-white mr-3"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </Link>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {form && form.id ? "Edit" : "Add"} {shared.addTitle}
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
                  label="Role"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="shadow-box w-full bg-white rounded-lg mb-6 mt-4">
            <div className="scrollbar w-full overflow-auto">
              <div class="table_section tablepadding">
                <p className="text-xl font-semibold text-[#fff] bg-[#205dff] rounded-t-lg px-4 py-3">
                  Permissions
                </p>
                <table class="w-full">
                  <thead class="table_head roleTable">
                    <tr class="border-b border-[#EAECF0]">
                      <th
                        scope="col"
                        class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"
                      ></th>
                      <th
                        scope="col"
                        class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) => HandleAll(e.target.checked)}
                          checked={isAllChecked()}
                          className="h-4 w-4 me-1"
                        />
                        All
                      </th>
                      {permission.map((itm) => {
                        return (
                          <>
                            <th
                              scope="col"
                              class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 me-1"
                                onChange={(e) =>
                                  HandleAllRead(e.target.checked, itm.key)
                                }
                                checked={isAllPCheck(itm.key)}
                              />
                              {itm.name}
                            </th>
                          </>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="roleTable">
                    {permissions.map((itm) => {
                      return (
                        <>
                          <tr>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              {itm.name}
                            </td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              <input
                                type="checkbox"
                                className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                name={itm.key}
                                onChange={(e) => handleAllPermission(e.target)}
                                checked={isCheckAll(itm.key)}
                              />
                            </td>
                            {permission.map((pitm) => {
                              return (
                                <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                                  <div Name="checkList">
                                    <label className="mb-0">
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                        checked={
                                          form1.permissions[
                                            `${pitm.key}${itm.key}`
                                          ]
                                        }
                                        onChange={(e) =>
                                          setpermission(
                                            `${pitm.key}${itm.key}`,
                                            e.target.checked
                                          )
                                        }
                                      />
                                    </label>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="text-white bg-[#0065FF] bg-[#0065FF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
            >
              Save {isLoading?<i className="fa fa-spinner fa-spin"></i>:''}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEdit;
