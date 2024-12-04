import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import shared from "./shared";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const Calendly = () => {
  const user = useSelector((state) => state.user);
  const refreshToken=user.connectionsDetails?.find(itm=>itm.type=='calendly'&&itm.connected)?.refreshToken
  const [Authorization, setAuthorization] = useState('');
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [eventCount, setEventCount] = useState()
  const [loaging, setLoader] = useState(false);
  const [me, setMe] = useState();
  const [eventTypes, setEventTypes] = useState([]);
  const [upcomingEvents,  setUpcomingEvents] = useState([])
  const history = useNavigate();

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

  const getData = (p = {}) => {
    
    let filter = { ...filters, 
      ...p,
      user:me?.uri,
      Authorization:Authorization,
      status:'active'
    };
    if(!filter.Authorization) return

    if(filter.eventType) filter.event_type=filter.eventType
    if(filter.sortBy) filter.sort=filter.sortBy.replace(' ',':')
      if(filter.startDate){
        filter.min_start_time=new Date(filter.startDate).toUTCString()
        filter.max_start_time=new Date(filter.endDate).toUTCString()
      }
      setLoader(true);
      let url='https://api.calendly.com/scheduled_events'
    ApiClient.get(url, filter).then((res) => {
      if (res.collection) {
        let data=res.collection.map((itm) => {
          itm.id = itm.uri;
          return itm;
        })
    
        setData(data)
        setTotal(res.pagination.count);
      }
      setLoader(false);
    });
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

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0065FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.delete(shared.deleteApi, { id: id }).then((res) => {
          if (res.success) {
            clear();
          }
          loader(false);
        });
      }
    });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };
  const changestatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };

  const getRolesData = (id) => {
    setFilter({ ...filters, role: id, page: 1 });
    getData({ role: id, page: 1 });
  };

  const statusChange = (itm) => {
    if (!isAllow(`edit${shared.check}`)) return;
    let status = "active";
    if (itm.status == "active") status = "deactive";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        status == "active" ? "Activate" : "Inactivate"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0065FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.put(shared.statusApi, { id: itm.id, status }).then((res) => {
          if (res.success) {
            getData();
          }
          loader(false);
        });
      }
    });
  };

  const edit = (id) => {
    history(`/${shared.url}/edit/${id}`);
  };

  const view = (id) => {
    let url = `/${shared.url}/detail/${id}`;
    history(url);
  };

  const uploadFile = (e) => {
    let files = e.target.files;
    let file = files?.item(0);
    let url = "user/import-users";
    if (!file) return;
    loader(true);
    ApiClient.postFormFileData(url, { file }).then((res) => {
      if (res.success) {
      }
      loader(false);
    });
  };

  const exportfun = async () => {
    const token =  user?.access_token;
    const req = await axios({
      method: "get",
      url: `${environment.api}api/export/excel`,
      responseType: "blob",
      body: { token: token },
    });
    var blob = new Blob([req.data], {
      type: req.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${shared.title}.xlsx`;
    link.click();
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    // if(user.role=='admin') value=true
    return true;
  };

  const getAuth=()=>{
    if(!Authorization) return
    loader(true)
    ApiClient.get('https://api.calendly.com/users/me',{
      Authorization:Authorization,
    }).then(res=>{
      loader(false)
      if(res.resource){
        let data=res.resource
        setMe(data)
      }
    })
  }


  useEffect(() => {
    if (user && user.loggedIn) {
      getAuth()
    }
  }, [user,Authorization]);

  useEffect(() => {
    if (user && user.loggedIn) {
      if(!refreshToken) return
      loader(true)
      ApiClient.get('calendly/refresh_token',{
        refresh_token:refreshToken,
      }).then(res=>{
        loader(false)
       if(res.success){
        setAuthorization(res.data.access_token)
       }
      })
    }
  }, [refreshToken]);


  const getEventTypes=()=>{
    if(!Authorization) return
    ApiClient.get('https://api.calendly.com/event_types',{
      Authorization:Authorization,
      organization:me?.current_organization
    }).then(res=>{
      if(res.collection){
        let data=res.collection.map(itm=>{
          return {
            ...itm,
            id:itm.uri,
          }
        })
        setEventTypes(data)
      }
    })
  }
  const getUpcomingEvents = () => {
    ApiClient.get('calendly/upcoming/events').then((res) => {
      if(res.success){
        setUpcomingEvents(res?.data?.collection)
        setEventCount(res?.data?.pagination?.total_count)
      }
    })
  }

  useEffect(()=>{
    if(me){
      getEventTypes()
      getData()
      getUpcomingEvents()
    }
  },[me])

  

  return (
    <>
      <Html
      eventTypes={eventTypes}
      me={me}
      Authorization={Authorization}
        edit={edit}
        view={view}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        deleteItem={deleteItem}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        changestatus={changestatus}
        exportfun={exportfun}
        getRolesData={getRolesData}
        uploadFile={uploadFile}
        upcomingEvents={upcomingEvents}
        eventCount={eventCount}
      />
    </>
  );
};

export default Calendly;
