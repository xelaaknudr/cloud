import axios from "axios";

export const request = async (options) => {
  return await axios[options.method.toLowerCase()](
    options.url,
    options.data,
  );
}

export const authRequest = async (options) => {
  return await axios[options.method.toLowerCase()](
    options.url,
    {headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }},
  );
}
