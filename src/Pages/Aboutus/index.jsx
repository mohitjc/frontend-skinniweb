import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import PageLayout from "../../components/global/PageLayout";
import DOMPurify from 'dompurify';

const Aboutus = () => {
  const [data, setData] = useState();
  const getDetail = () => {
    loader(true);
    ApiClient.get("content/detail", { slug: "about" }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const sanitizedMessage = DOMPurify.sanitize( data?.description);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PageLayout>
      <div>
        <div className="">
          <section className="">
            <div className="w-full lg:justify-start justify-center items-start flex">
              {data && data?.image ? (
                <div className="w-full">
                  <img
                    className="w-full h-[300px] object-cover"
                    src={methodModel?.userImg(data?.image, "users")}
                    alt="about Us image"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="container mx-auto px-5">
              <div className="relative pt-10 pb-8">
                <h2 className="text-[#005AAB] text-[25px] font-bold font-manrope lg:text-start leading-[48px] absolute w-[250px] text-center bg-white left-0 right-0 mx-auto py-5 px-5 rounded-t-2xl">
                  {data?.title}
                </h2>
                <p
                  className="text-gray-500 text-base font-normal leading-relaxed lg:text-start"
                  dangerouslySetInnerHTML={{ __html: sanitizedMessage}}
                ></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Aboutus;
