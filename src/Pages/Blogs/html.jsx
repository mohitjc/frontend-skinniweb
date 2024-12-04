import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import methodModel from "../../methods/methods";
import Pagination from "react-pagination-js";
import FormControl from "../../components/common/FormControl";
import loader from "../../methods/loader";
import PageLayout from "../../components/global/PageLayout";
import { IoIosSearch } from "react-icons/io";
import DOMPurify from 'dompurify';
const Html = ({
  filters,
  data,
  total = { total },
  setData,
  result = () => {},
}) => {
  
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setform] = useState({categoryId:""})
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const navigate = useNavigate();
  const getCategories = () => {
    ApiClient.get("category/listing", {
      status: "active",
      categoryType: "Blog",
    }).then((res) => {
      if (res.success) {
        setCategories(res.data);
      }
    });
  };
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const fetchData = (page, count) => {
    loader(true);
    ApiClient.get("blog/listing", { page, count, ...filters, search:searchTerm}).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotalCount(res.total);
      }
      loader(false);
    });
  };

  const handleFilterbyCategory = (selectedValue, page, count) => {
    loader(true);
    ApiClient.get("blog/listing", { page, count, ...filters, search:searchTerm, categoryId:selectedValue }).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotalCount(res.total);
      }
      loader(false);
    });
  }
  const handlePaginate = (newPage) => {
    setPage(newPage);
    result({ event: "page", value: newPage });
    fetchData(newPage);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
    }
  };

  const handleSearchSubmit = (event) => {
    if (event) {
      event.preventDefault(); 
    }
    fetchData();
  };

  useEffect(() => {
    getCategories();
    fetchData(page, count);
  }, [page, count]);
  return (
    <PageLayout>

  <div className="body_section">
    <div className="section mt-10 max-[499px]:px-[15px] max-[639px]:px-[25px] sm:px-[50px] md:px-[50px] lg:px-[100px] pb-5">
      <div className="container mx-auto">
        <div className="text-[32px] font-[600] text-center mb-5">
          OUR <span className="text-[#0065FF]"> BLOGS </span>
        </div>
        <div className="mb-[6rem]">
        <p className="max-w-[800px] mx-auto text-center text-[#7e7e7e] text-[14px] mt-5">
          OUR BLOG Stay up-to-date with the latest news, trends, and
          insights from our industry. Our blog is your go-to source for
          informative articles, expert opinions, and thought-provoking
          discussions.
        </p>
        <form>
            <div className="max-w-[400px] mx-auto mt-5">
            <FormControl
              type="select"
              placeholder="Select Category"
              value={form.categoryId}
              theme="search"
              options={categories}
              onChange={(e) => {setform({ ...form, categoryId: e }); handleFilterbyCategory(e)}}
              required
            />
          </div>
          </form>
          </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-8 mt-10">
          <div className="col-span-12 md:col-span-8 2xl:col-span-9 ">
            <div className="blog_section relative ">
              {data && data?.length > 0 ? (

            <>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {data.map((itm) => {
                  return itm?.status == "deactive" ? null : (
                    <div className="shadow-md rounded-b-lg">
                      <div className="overflow-hidden">
                        <img
                          src={methodModel?.userImg(itm?.banner, "users")}
                          onClick={() =>
                            navigate(`/blogs/${itm?.id}`)
                          }
                          className="w-full rounded-t-lg cursor-pointer h-[200px] 2xl:h-[200px] object-cover transform transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-[#7e7e7e] text-[10px] flex  gap-2 mb-2 items-center">
                          <a
                            className="text-white bg-[#37BFCD] px-1 py-[1px] rounded-lg capitalize"
                            onClick={() =>
                              navigate(`/blogs/${itm?.id}`)
                            }
                          >
                            {itm?.category_name}
                          </a>
                          <a>
                            {datepipeModel.date(itm?.createdAt)} 15:00pm
                          </a>
                        </p>
                        <a
                          className="capitalize text-lg font-medium block mb-2"
                          onClick={() =>
                            navigate(`/blogs/${itm?.id}`)
                          }
                        >
                          {itm?.title}
                        </a>
                        <p className="ellipsis_class text-[12px] text-[#4F4F4F] capitalize">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(itm.description)
                                ? DOMPurify.sanitize(itm.description)
                                : "--",
                            }}
                            className="text-[12px] font-normal  line-clamp-2"
                          ></p>
                        </p>
                        <div className="flex items-center justify-center mt-4 space-x-4 border-t border-gray-200 pt-2">
                          <button
                            onClick={() =>
                              navigate(`/blogs/${itm?.id}`)
                            }
                            className="cta flex items-center gap-2 relative mx-auto py-3 px-4 transition-all ease-linear border-none bg-transparent cursor-pointer"
                          >
                            <span className="relative font-ubuntu font-normal text-md tracking-wider text-[#454242]">
                              View More
                            </span>

                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              </>
                ):(
                  <>
                  <div className="grid justify-center gap-6">
                    Blogs not found
                  </div>
                  </>
                )}
            </div>
            {totalCount > 10 && (
              <div className="flex items-center justify-end mt-6 border-y border-gray-200 py-4">
                <div className="">
                  <Pagination
                    currentPage={page}
                    totalSize={total}
                    sizePerPage={count}
                    changeCurrentPage={handlePaginate}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 2xl:col-span-3 ">
            <div className="md:sticky md:top-10">
              <div className="border border-black/46 shadow-md px-6 py-8 rounded-lg">
                <div className="blogs_details">
                  <div class="flex items-center justify-center mb-4 ">
                    <form class="w-full">
                      <div class="border rounded-lg border-black/23 bg-white flex items-center h-10 ">
                        <div class="flex relative w-full">
                          <input
                            className="w-full px-4 placeholder:text-gray-800 bg-white pr-10"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress} 
                            placeholder="Search Blogs..."
                          />
                        </div>
                        <div
                          onClick={handleSearchSubmit}
                          class="h-full  w-12 bg-primary text-[#454242] text-xl text-[#fff] rounded-r-lg flex items-center justify-center cursor-pointer"
                        >
                          <IoIosSearch />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mb-4">
                    <p className="text-xl font-medium">RECENT BLOGS</p>
                  </div>
                  {data?.slice(0, 3)?.map((blog) => (
                    <div className="flex gap-4  bg-white p-2 rounded-md border border-gray  items-center  mb-3" onClick={() => navigate(`/blogs/${blog?.id}`)}  >
                      <img
                        src={methodModel?.userImg(
                          blog?.banner,
                          "users"
                        )}
                        className="h-20 w-20 object-cover rounded-lg "
                        alt=""
                      />
                      <div className="w-full mt-2">
                      <div >
                          <div className="flex justify-between flex-wrap  items-center">
                            <p className="text-xs mb-2">
                              {datepipeModel.date(blog?.createdAt)}
                            </p>
                          </div>
                          <h2 className="text-sm font-semibold text-gray-800  capitalize">
                            {blog?.title}
                          </h2>
                          {blog?.description ? (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(blog.description)
                                  ? DOMPurify.sanitize(blog.description)
                                  : "--",
                              }}
                              className="text-[12px] font-normal  line-clamp-2 h-14 set-text"
                            ></p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {data?.length == 0 && (
                    <div className="text-center">NO RECENT POSTS</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </PageLayout>
  );
};

export default Html;
