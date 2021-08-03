/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import yearService from "../../../services/academicYear";

export default function Workschedules({ academicYear }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle={`Year - ${academicYear.code}`} />
      <Widget
        title="Details"
        description={
          <span>
            {academicYear.code} <code>&lt;Shifts, assign... /&gt;</code>
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

    const academicYear = await yearService.get_AcademicYear(id[0]);

    return {
      props: {
        academicYear:academicYear,
      }
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        academicYear: null,
      }
    };
  }
};
