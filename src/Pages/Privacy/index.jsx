import React, { useEffect, useState } from 'react'
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import PageLayout from '../../components/global/PageLayout';
import DOMPurify from 'dompurify';

const Privacy = () => {
    const [data, setData] = useState()
  const getDetail = () => {
    loader(true);
    ApiClient.get('content/detail', { slug:'privacy' }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  useEffect(() => {
getDetail()
  },[])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <PageLayout>
   <section className='secthree '>
      <div className='container mx-auto px-5 '>
              <div className="my-5 py-5">
                           <h2 className="text-[#005AAB] text-3xl font-bold font-manrope text-center leading-[44px] mb-8 border-b pb-5">{data?.title}</h2>
                  <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data?.description)}}></p> 

                    </div>
              </div>
  </section>
    </PageLayout>
  )
}

export default Privacy
