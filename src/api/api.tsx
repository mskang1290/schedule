import axios from "axios";
import Const from "../const/const";
import useAxios from "axios-hooks";

let api_url = Const.localhost;

const Api = {
  get: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAxios(api_url + Const.api.getEvent);
  },

  post: async (url: string, param: any) => {
    await axios(api_url + url, {
      method: "POST",
      data: param,
      headers: new Headers(),
    }).then(({ data }) => {
      console.log(data);
    });
  },
};
export default Api;
