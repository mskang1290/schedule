import axios from "axios";
import Const from "../const/const";
import { Event } from "../Model";
import moment from "moment";

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
    });
  },
};
export default Api;
