import { useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";
import { rolePermission, rolePermissions } from "../../models/type.model";
import { decryptData, encryptUrlData2 } from "../../models/crptoUtils";
import { IoIosInformationCircle } from "react-icons/io";

const View = () => {

  const [data, setData] = useState();
  const history = useNavigate();
  const { id } = useParams();
  const ucidata = encryptUrlData2(id)
  const uci = decryptData(ucidata)
  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { id: uci }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
      }
    });
  };

  const checkPermission = (permissionKey) => {
    return data?.permissions?.[permissionKey] === true;
  };

  const isAllCheckedForSection = (sectionKey) => {
    return rolePermission.every(
      (permAction) =>
        data?.permissions?.[`${permAction.key}${sectionKey}`] === true
    );
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <>
      <Layout>
        <div className="wrapper_section">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <span
                onClick={() => history(-1)}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#0065FF] text-white hover:text-black"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </span>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {shared.addTitle} Details
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="shadow-box overflow-hidden rounded-lg bg-white gap-4 shrink-0">
              <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
                  <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                    <IoIosInformationCircle className="text-[#0065FF]" />
                  </div>
                  <h3 className="text-[16px] font-[500] text-[#0065FF]">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-6 flex flex-col mb-5">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Role:
                    </label>
                    <p className="text-[14px] text-black font-medium capitalize">
                      {data && data.name}
                    </p>
                  </div>
                  <div className="col-span-6 flex flex-col mb-5">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Status:
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {data && data.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="shadow-box w-full bg-white rounded-lg mb-6 mt-4">
                <div className="scrollbar w-full overflow-auto">
                  <div className="table_section tablepadding">
                    <p className="text-md font-semibold text-[#0065FF] px-4 py-3">
                      Permissions
                    </p>
                    <table className="w-full">
                      <thead className="table_head roleTable">
                        <tr className="border-b border-[#EAECF0]">
                          <th className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3">
                            Permission
                          </th>
                          <th className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3">
                            <input
                              type="checkbox"
                              checked={Object.values(data?.permissions || {}).every((value) => value === true)}
                              className="h-4 w-4 me-1"
                              onChange={(e) => {}}
                            />
                            All
                          </th>
                          {rolePermission.map((permAction) => (
                            <th
                              key={permAction.key}
                              className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3"
                            >
                              {permAction.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="roleTable">
                        {rolePermissions.map((role) => (
                          <tr key={role.key}>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              {role.name}
                            </td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              <input
                                type="checkbox"
                                className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                checked={isAllCheckedForSection(role.key)}
                                onChange={() => {}}
                              />
                            </td>
                            {rolePermission.map((permAction) => {
                              const permissionKey = `${permAction.key}${role.key}`;
                              return (
                                <td
                                  key={permissionKey}
                                  className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]"
                                >
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                    checked={checkPermission(permissionKey)}
                                    onChange={() => {}}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
