/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import levelService from "../../../services/academicLevel";

export default function Workschedules({ academicLevel }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle={`Level - ${academicLevel.code}`} />
      <Widget
        title="Details"
        description={
          <span>
            {academicLevel.code} <code>&lt;Shifts, assign... /&gt;</code>
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

    const academicLevel = await levelService.get_AcademicLevel(id[0]);

    return {
      props: {
        academicLevel,
      }
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        academicLevel: null,
      }
    };
  }
};
