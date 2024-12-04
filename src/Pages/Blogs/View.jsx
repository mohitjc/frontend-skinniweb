import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { TbCalendarClock } from "react-icons/tb";
import datepipeModel from "../../models/datepipemodel";
import PageLayout from "../../components/global/PageLayout";
import DOMPurify from 'dompurify';

const ViewBlog = () => {
  const [data, setData] = useState();
  const [dataa, setDataa] = useState([]) 
  const history = useNavigate();
  const [filters, setFilter] = useState({ search: "", status: "active" });
const [searchTerm, setSearchTerm] = useState("");
const [total, setTotal] = useState(0);

  const { id } = useParams();

  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { id: id }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
      }
    });
  }; 

  const getDetailThree = () => {
    loader(true);
    let filter = { ...filters, search: searchTerm };
    ApiClient.get("blog/listing", filter).then((res) => {
      loader(false);
      if (res.success) {
        setDataa(res.data);
        setTotal(res.total);
      }
    });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getDetailThree();
  }, [searchTerm]);
  const sanitizedMessages = DOMPurify.sanitize( data?.description);
  const sanitizedMessage = DOMPurify.sanitize( data?.description);
  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <>
      <PageLayout>
      <div className="p-4 bg-white">
              <div className="xl:container items-center  px-8 mx-auto xl:px-5">
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 md:col-span-8 lg:col-span-9 2xl:col-span-9">
                    <div className='bg-gray-50 p-4 rounded-lg shadow'>
                      <img
                      src={methodModel?.userImg(
                        data?.banner,
                        "users"
                      )}
                      className="w-full h-[400px] object-contain  mb-6 rounded-[4px]"
                      alt=""
                    />
                    </div>
                    <div className="mt-4 flex items-center justify-between w-full mb-5">
                      <div>
                        {data?.keywords && data?.keywords?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {data?.keywords?.map((keyword, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-[#12388F] text-white rounded-full text-sm "
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                   
                    </div>

                    <div className='flex justify-between flex-wrap gap-4 items-center mb-4'>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                      {data?.title}
                    </h2>
                        <p className=" text-[12px]  text-[#000000b3] shrink-0 flex items-center gap-2">
                        <TbCalendarClock className='text-xl' />
                          {datepipeModel.date(data?.createdAt)}
                        </p>
                      </div>
                    <p className=" leading-[20px] text-[14px] font-normal" dangerouslySetInnerHTML={{
                      __html:sanitizedMessages,
                    }}>
                    </p>
                  </div>
                  <div class="col-span-12 md:col-span-4 lg:col-span-3 2xl:col-span-3">
                    <div class="md:sticky md:top-20">
                      <div class="border border-black/46 shadow-md px-6 py-6 rounded-lg">

                        <div class="blogs_details">
                          <div class="mb-4">
                            <p class="text-xl font-medium">RECENT BLOGS</p>
                          </div>
                          {dataa?.slice(0, 3)?.map((blog) => (
                          <div className="flex gap-4  bg-white p-2 rounded-md border border-gray  items-center gap-2 mb-3" onClick={() => history(`/blogs/${blog?.id}`)}>
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
                                <div className="flex justify-between flex-wrap items-center">
                                  <p className="text-xs mb-2">
                                    {datepipeModel.date(blog?.createdAt)}
                                  </p>
                                </div>
                                <h2 className="text-sm font-semibold text-gray-800 capitalize">
                                  {blog?.title}
                                </h2>
                                {blog?.description ? (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(blog.description)
                                        ? DOMPurify.sanitize(blog.description)
                                        : "--",
                                    }}
                                    className="text-[12px] font-normal  line-clamp-2"
                                  ></p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                          {data?.length == 0 && (
                            <div class="text-center">NO RECENT POSTS</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </PageLayout>
    </>
  );
};

export default ViewBlog;
