/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import { Selects } from "../../components/elements/forms/selects";

import studentsService from "../../services/students";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allStudents,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const Simple = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Code",
          accessor: "id"
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Phone Number",
          accessor: "phoneNumber"
        },
      ],
      []
    );
    const data = allStudents;
    return <Datatable columns={columns} data={data} link="/students"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id){
    router.push(`students/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("students/new")
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle="Student's" />
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

  const allStudents = await studentsService.get_Students();

  return {
    props: {
      allStudents
    },
  };
};
