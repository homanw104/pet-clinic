import axios from "axios";
export const getUserAsync = (params) => axios.get('/login/',{
  params: params
})
