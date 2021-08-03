/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import teacherService from "../../../services/teachers";

export default function Workschedules({ teacher }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle={`User - ${teacher.name}`} />
      <Widget
        title="Details"
        description={
          <span>
            {teacher.name} <code>&lt;Shifts, assign... /&gt;</code>
          </span>
        }
      >
        {/* <Simple /> */}
      </Widget>
    </>
  );
}


export const getServerSideProps = async (ctx) => {
  try {
    const { 'attendance.token': token } = parseCookies(ctx)

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    const { id } = ctx.params;

    const teacher = await teacherService.get_Teacher(id[0]);

    return {
      props: {
        teacher,
      }
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        teacher: null,
      }
    };
  }
};
