import axios from "axios";
import { LogOut } from "@/store/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useDispatch } from "react-redux";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "https://api.petclinic.homans.world:8443/";

axios.interceptors.response.use(
  res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
  err => Promise.reject(err)
)

export function listDisease(){
  axios.get('listDisease/')
    .then(res=>{
      console.log(res);
    },(error)=>{
      console.log(error);
    })
}


