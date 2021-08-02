import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_PunchDailyCards = async (filter) => {
  try {
    console.log(filter)
    const url =
      publicRuntimeConfig.SERVER_URI + "api/attendance/punchDailyCards";


    let res = {};
    await fetch(url, {
      method: "POST",
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

export { get_PunchDailyCards };
