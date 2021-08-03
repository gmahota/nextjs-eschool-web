import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_AcademicYears = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/eschool/academicYears";

    let res = [];

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    })
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_AcademicYear = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI + `api/eschool/academicYears/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};
export default { get_AcademicYears, get_AcademicYear };
