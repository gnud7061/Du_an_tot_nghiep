import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { API_PRODUCT_ORDER_ID } from "../../config/api-consts";
import { User } from "../../hooks/useContext";
import { API_ORDER } from "../../config/api-consts";
import {useNavigation} from '@react-navigation/native';


export default function useOrderList (){
    const {userData} = User();
    const [listOrder ,setListOrder] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`${API_ORDER}/${userData._id}`);
              const data = Array.isArray(response.data)
                ? response.data
                : [response.data];
              setListOrder(data);
      
              // Gọi lại API hoặc thực hiện bất kỳ hành động nào khác ở đây sau khi response được trả về
              // Ví dụ: Gọi API khác
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchData();
    },[])
    return listOrder;
}