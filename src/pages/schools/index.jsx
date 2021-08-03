/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";


import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";


import schoolService from "../../services/schools";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allSchools,
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
          Header: "School Number",
          accessor: "schoolNumber",
          Cell: (props) => (
            <a href={`/groups/${props.value?.name}`}>{props.value?.name}</a>
          ),
        },
        {
          Header: "Vat",
          accessor: "vat"
        },
        {
          Header: "Phone Number",
          accessor: "phoneNumber"
        },
      ],
      []
    );
    const data = allSchools;
    return <Datatable columns={columns} data={data} link="/schools"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id) {
    router.push(`schools/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("schools/new")
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

  const allSchools = await schoolService.get_Schools();

  return {
    props: {
      allSchools
    },
  };
};
