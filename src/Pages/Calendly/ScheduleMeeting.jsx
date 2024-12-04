import React from "react";
import Layout from "../../components/global/layout";
import { InlineWidget,useCalendlyEventListener } from "react-calendly";
import { useNavigate } from "react-router-dom";
import methodModel from "../../methods/methods";

const Calendar = () => {
  const scheduling_url=methodModel.getPrams('scheduling_url')
  const history=useNavigate()
  useCalendlyEventListener({
    onEventScheduled: (e) =>{
      history('/calendly')
    },
  });
  return (
    <>
      <Layout>
        <h3>Schedule a Meeting</h3>
        <InlineWidget url={scheduling_url} />
      </Layout>
    </>
  );
};

export default Calendar;
