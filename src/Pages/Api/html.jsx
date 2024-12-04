import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import Table from "../../components/Table";
import shared from "./shared";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";
import loader from "../../methods/loader";
import Tabs from "../../components/common/Tabs";
const Html = ({
  sorting,
  pageChange,
  count,
  clear,
  filters,
  loaging,
  data,
  total,
  sortClass,
  tabChange,
  tab
}) => {
  const user = useSelector((state) => state.user);
  const [calRes,setCalRes]=useState()

  const tabsList=[
    {id:'accounting',name:'Accounting & Payroll'},
    {id:'crm',name:'CRM'},
    {id:'payment',name:'Payment Processing'},
    {id:'scheduling',name:'Scheduling & Booking'},
    {id:'marketing',name:'Marketing & Analytics'},
    {id:'review',name:'Project Management'},
  ]

  const add=(itm)=>{

    let url=''
    if(itm.platform==='xero') url='xero/consent/url'
    if(itm.platform==='quickbooks') url='quickbook/requestToken'
    if(itm.platform==='calendly') url='calendly/code'
    if(itm.platform==='paypal') url='paypal/connect'
    if(itm.platform==='hubSpot') url='hubspot/consent/url'
    if(itm.platform==='zoho') url='zoho/consent/url'
    if(itm.platform==='google_analytics') url='analytics/oauth'
    if(itm.platform==='square') url='square/consent/url'
    if(itm.platform==='timely') url='timely/code'
    if(itm.platform === "asana") url = 'asana/code'
    if(itm.platform === "employment_hero") url = "emphero/code"
    if(itm.platform === "monday_com") url = "monday/code"
    if(itm.platform === "google_ads")  url = "google/ads/oath/url"
    // if(itm.platform === "salesforce")  url = "salesforce/code"


    
    if(isConnected(itm.platform)){
      if(itm.platform=='xero'){
        loader(true)
        ApiClient.delete('xero/xero').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='quickbooks'){
        loader(true)
        let payload={
          userId:user.id
        }
        ApiClient.post('quickbook/disconnect',payload).then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='calendly'){
        loader(true)
        ApiClient.get('calendly/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='paypal'){
        
        loader(true)
        ApiClient.get('paypal/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='hubSpot'){
        loader(true)
        ApiClient.delete('hubspot/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='google_analytics'){
        loader(true)
        ApiClient.put('analytics/disconnect').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='square'){
        loader(true)
        ApiClient.delete('square/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }
      else if(itm.platform=='zoho'){
        loader(true)
        ApiClient.delete('zoho/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      } else if(itm.platform=='timely'){
        loader(true)
        ApiClient.get('timely/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      } else if(itm.platform=='asana'){
        loader(true)
        ApiClient.get('asana/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      } else if(itm.platform=='employment_hero'){
        loader(true)
        ApiClient.get('emphero/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }else if(itm.platform=='monday_com'){
        loader(true)
        ApiClient.get('monday/unlink').then(res=>{
          loader(false)
          if(res.success){
            document.getElementById("updateProfile")?.click()
          }
        })
      }
      // else if(itm.platform=='google_ads'){
      //   loader(true)
      //   ApiClient.delete('ads/disconnect').then(res=>{
      //     loader(false)
      //     if(res.success){
      //       document.getElementById("updateProfile")?.click()
      //     }
      //   })
      // }
      return
    }
  
    if(!url) return
    loader(true)
    ApiClient.get(url).then(res=>{
      loader(false)
      if(res.success){
        let url=res.data
        if(itm.platform=='quickbooks') url=res.payload.url
        window.location.assign(url)
      }
    })
  }

  const isConnected=(p)=>{
    let value=false
    if(p=='quickbooks'&&user.quickBookAccesToken) value=true
    if(p=='quickbooks'&&user.connectionsDetails?.find(itm=>(itm.type=='quickbooks'||itm.type=='quickbook'||itm.type=='qbo')&&itm.connected)) value=true
    if(p=='calendly'&&user.connectionsDetails?.find(itm=>itm.type=='calendly'&&itm.connected)) value=true
    if(p=='xero'&&user.connectionsDetails?.find(itm=>itm.type=='xero'&&itm.connected)) value=true
    if(p== 'paypal'&& user.connectionsDetails?.find(itm => itm.type=='paypal' && itm.connected)) value=true 
    if(p== 'hubSpot'&& user.connectionsDetails?.find(itm => itm.type=='hubspot' && itm.connected)) value=true 
    if(p== 'zoho'&& user.connectionsDetails?.find(itm => itm.type=='zoho' && itm.connected)) value=true 
    if(p== 'google_analytics'&& user.connectionsDetails?.find(itm => itm.type=='analytics' && itm.connected)) value=true 
    if(p== 'square'&& user.connectionsDetails?.find(itm => itm.type=='square' && itm.connected)) value=true 
    if(p== 'timely'&& user.connectionsDetails?.find(itm => itm.type=='timely' && itm.connected)) value=true
    if(p== 'asana'&& user.connectionsDetails?.find(itm => itm.type=='asana' && itm.connected)) value=true  
    if(p== 'employment_hero'&& user.connectionsDetails?.find(itm => itm.type=='epm_hero' && itm.connected)) value=true
    if(p== 'monday_com'&& user.connectionsDetails?.find(itm => itm.type=='monday' && itm.connected)) value=true
    // if(p== 'google_ads'&& user.connectionsDetails?.find(itm => itm.type=='monday' && itm.connected)) value=true    
    
    return value
  }


  const columns = [
    {
      key: "name",
      name: "Name",
      // sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.name}</span>;
      },
    },
    {
      key: "action",
      name: "Action",
      render: (itm) => {
        return (
          <>
            <div className="flex items-center justify-start gap-1.5">

                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#0065FF14] px-[14px] h-10 !text-primary flex items-center justify-center"
                    onClick={(e) =>{add(itm)}}
                  >  {isConnected(itm.platform)?'Disconnect':'Connect'}
                  </a>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
       

        <a id="downloadFile"></a>

        <div className="flex">
        </div>
      </div>
      <div className="shadow-box w-full bg-white rounded-lg mt-6">

        <div className="mb-3">
          <Tabs 
          list={tabsList}
          active={tab}
          setActive={e=>tabChange(e)}
          />
        </div>

        {!calRes?<>
        
          {!loaging ? (
          <>
          <div className="px-4 pb-4">

          
            <Table
              className=""
              data={data}
              columns={columns}
              page={filters.page}
              count={filters.count}
              filters={filters}
              total={total}
              result={(e) => {
                if (e.event == "page") pageChange(e.value);
                if (e.event == "sort") {
                  sorting(e.value);
                  sortClass(e.value);
                }
                if (e.event == "count") count(e.value);
              }}
            />
            </div>
          </>
        ) : (
          <></>
        )}

        {loaging ? (
          <div className="text-center py-4">
            <img src="/assets/img/loader.gif" className="pageLoader" />
          </div>
        ) : (
          <></>
        )}
        </>:<>
        </>}

      </div>
    </Layout>
  );
};

export default Html;
