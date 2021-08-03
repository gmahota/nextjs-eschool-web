/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import academicLevelService from "../../services/academicLevel";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allLevels,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const Simple = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Code",
          accessor: "code"
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Personal Board",
          accessor: "codePersonalBoard"
        },
        {
          Header: "Status",
          accessor: "status"
        },
        {
          Header: "Type",
          accessor: "type"
        },
      ],
      []
    );
    const data = allLevels;
    return <Datatable columns={columns} data={data} link="/academiclevels"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id){
    router.push(`academiclevels/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("academiclevels/new")
  }
  return (
    <>
      <SectionTitle title="Tables" subtitle="User's" />
      <Widget
        title=""
        description=""
        right={
          <button
            className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
            type="button"
            onClick={handlerAddNew}>

            <FiPlus className="stroke-current text-white" size={18} />
            <span>Add New</span>
          </button>
        }
      >
        <Simple />
      </Widget>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //await apiClient.get('/users')

  const allLevels = await academicLevelService.get_AcademicLevels();

  return {
    props: {
      allLevels
    },
  };
};
