import React, { useEffect, useState } from "react";
import shared from "./shared";
import ApiClient from "../../methods/api/apiClient";
import FormControl from "../../components/common/FormControl";
import loader from "../../methods/loader";
import PageLayout from "../../components/global/PageLayout";
const Html = ({
  filters,
  data,
  total = { total },
  setData,
  getData,
}) => {
  const [categories, setCategories] = useState([]);
  const [form, setform] = useState({ categoryId: "" });
  const getCategories = () => {
    ApiClient.get("category/listing", {
      status: "active",
      categoryType: "FAQ",
    }).then((res) => {
      if (res.success) {
        setCategories(res.data);
      }
    });
  };

  const handleFilterbyCategory = (selectedValue) => {
    loader(true);
    ApiClient.get(shared.listApi, {
      ...filters,
      categoryId: selectedValue,
    }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  useEffect(() => {
    getCategories();
    getData();
  }, []);

  return (
    <PageLayout>
      <div className="body_section ">
        <section class="text-gray-700 pb-5">
          <div class="section max-[499px]:px-[15px] max-[639px]:px-[25px] sm:px-[50px] md:px-[50px] lg:px-[100px] pt-[3rem] md:pt-[1rem">
            <div className="container mx-auto">
              <div className="max-w-[1200px]w-full xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1 pb-8">
                <div className="">
                  <p className="text-lg text-center font-medium text-[#0065FF] lg:text-left">
                    FAQ
                  </p>
                  <h2 className="text-3xl sm:!text-[52px] !leading-[65px] font-extrabold tracking-tight text-gray-900 mb-2">
                    {" "}
                    Frequently <br /> Asked{" "}
                    <span className="text-[#0065FF]"> Question </span>
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start">
                    {" "}
                    The most common questions about how our business works and
                    what can do for you.
                  </p>
                  <div className="max-w-[300px] mb-3 mt-2">
                    <FormControl
                      type="select"
                      placeholder="Select Category"
                      value={form.categoryId}
                      theme="search"
                      options={categories}
                      onChange={(e) => {
                        setform({ ...form, categoryId: e });
                        handleFilterbyCategory(e);
                      }}
                      required
                    />
                  </div>
                  <div class="max-h-[385px] overflow-auto mt-16">
                    {data && data?.length > 0 ? (
                      <>
                        <div class="grid grid-cols-12 gap-5 px-3">
                          {data?.map((itm, i) => {
                            return itm?.status == "deactive" ? (
                              " "
                            ) : (
                              <details class="col-span-12 shadow-lg">
                                <summary class="text-[#0065FF]  font-semibold  border-[1px] border-[#e5e5e5] rounded-md py-4 px-4">
                                  {itm?.question}
                                </summary>
                                <div className="p-3">{itm?.answer}</div>
                              </details>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div class="grid  gap-5 px-3">FAQ's not found</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full sm:h-[646px] h-full">
                  <img
                    src="/assets/img/faq.png"
                    className="sm:mt-5 sm:ml-5 w-full rounded-3xl object-contain"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Html;
