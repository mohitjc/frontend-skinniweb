import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useSelector } from "react-redux";
const Timely = () => {
  const user = useSelector((state) => state.user);
  const refreshToken=user.connectionsDetails?.find(itm=>itm.type=='timely'&&itm.connected)?.refreshToken
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(false);
  const [me, setMe] = useState();
  const [eventTypes, setEventTypes] = useState([]);
  const [projectData, setProjectData] = useState([])

  const sortClass = (key) => {
    let cls = "fa-sort";
    if (filters.key == key && filters.sorder == "asc") cls = "fa-sort-up";
    else if (filters.key == key && filters.sorder == "desc")
      cls = "fa-sort-down";
    return "fa " + cls;
  };
 

  const sorting = (key) => {
    let sorder = "asc";
    if (filters.key == key) {
      if (filters.sorder == "asc") {
        sorder = "desc";
      } else {
        sorder = "asc";
      }
    }

    let sortBy = `${key} ${sorder}`;
    setFilter({ ...filters, sortBy, key, sorder });
    getData({ sortBy, key, sorder });
  };
  const getProjectData = (p = {}) => {
    loader(true);
    
    let filter = { 
      account_id:me?.id, 
    };
    if(filter.eventType) filter.event_type=filter.eventType
    if(filter.sortBy) filter.sort=filter.sortBy.replace(' ',':')
      if(filter.startDate){
        filter.min_start_time=new Date(filter.startDate).toUTCString()
        filter.max_start_time=new Date(filter.endDate).toUTCString()
      }
      let url='timely/getprojects'
       ApiClient.get(url, filter).then((res) => {
      if (res) {
        const projectTotal = res?.data?.map((itm) => itm?.length)
        setProjectData(res.data)
      setTotal(projectTotal)
        
    }
    loader(false);
  })
   
  };

  const getData = (p = {}) => {
    let filter = { 
      account_id:me?.id,
    };
    if(filter.eventType) filter.event_type=filter.eventType
    if(filter.sortBy) filter.sort=filter.sortBy.replace(' ',':')
      if(filter.startDate){
        filter.min_start_time=new Date(filter.startDate).toUTCString()
        filter.max_start_time=new Date(filter.endDate).toUTCString()
      }
      loader(true);
      let url='timely/getevents'
    ApiClient.get(url, filter).then((res) => {
      if (res?.success) {
        setData(res.data)
        getProjectData()

    }
    loader(false);
  })
   
  };
 

  const clear = () => {
    let f = {
      startDate: "",
      endDate: "",
      platform: "",
      search: "",
      status: "",
      eventType:'',
      page: 1,
      role: "",
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };


  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    // if(user.role=='admin') value=true
    return value;
  };

  const getAuth=()=>{
    loader(true)
    ApiClient.get('timely/account/list').then(res=>{
      loader(false)
      if(res.success){
        let data=res?.data?.[0]
        setMe(data)
      }
    })
  }


  useEffect(() => {
    if (refreshToken) {
      getAuth()
    }
  }, [refreshToken]);


  const getEventTypes=()=>{
    setLoader(true)
    ApiClient.get('timely/activities',{
      account_id:me?.id,
    }).then(res=>{
      if(res.success){
        let data=res.data.map(itm=>{
          return {
            ...itm,
            name:itm.entity.name
          }
        })
        setEventTypes(data)
         getData()

      }
      setLoader(false)
    })
  }

  useEffect(()=>{
    if(me){
      getEventTypes()
    }
  },[me])

  return (
    <>
      <Html
      eventTypes={eventTypes}
      me={me}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        projectData={projectData}
      />
    </>
  );
};

export default Timely;
