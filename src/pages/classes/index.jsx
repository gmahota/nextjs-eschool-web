/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import classService from "../../services/classes";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allClasses,
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
          Header: "Year",
          accessor: "year",
        },
        {
          Header: "Description",
          accessor: "description"
        },
        {
          Header: "Limit",
          accessor: "limit"
        },
        {
          Header: "Active",
          accessor: "active"
        },
      ],
      []
    );
    const data = allClasses;
    return <Datatable columns={columns} data={data} link="/classes"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id){
    router.push(`classes/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("classes/new")
  }
  return (
    <>
      <SectionTitle title="Tables" subtitle="Classes" />
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

  const allClasses = await classService.get_Classes();

  return {
    props: {
      allClasses
    },
  };
};
