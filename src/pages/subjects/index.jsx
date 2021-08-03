/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import { Selects } from "../../components/elements/forms/selects";

import Modal from "../../components/partials/modals/create-modal";
import subjectService from "../../services/subjects";

import { FiUser } from "react-icons/fi";

export default function Schools({
  allSubjects,
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
    const data = allSubjects;
    return <Datatable columns={columns} data={data} link="/subjects"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id){
    router.push(`subjects/${id}/edit`)
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle="Student's" />
      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Create New User"
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiUser size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <form>
                <div className="form flex flex-wrap w-full">
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Id</div>
                      <input
                        name="id"
                        type="number"
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                  </div>
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Name</div>
                      <input
                        name="id"
                        type="text"
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                  </div>

                  <div className="w-full  mb-4">
                    
                  </div>
                </div>
              </form>
            }
            buttonTitle="Save"
            buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"
          />
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

  const allSubjects = await subjectService.get_Subjects();

  return {
    props: {
      allSubjects
    },
  };
};
