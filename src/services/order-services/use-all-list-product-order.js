import { useEffect, useState } from "react";
import axios,{ Axios } from "axios";
import { API_PRODUCT_ORDER } from "../../config/api-consts";

export default function useProductOderList(OrderId){
    
    const [listProductOrder ,setListProductOrder] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`${API_PRODUCT_ORDER}`);
              const data = Array.isArray(response.data)
                ? response.data
                : [response.data];
              setListProductOrder(data);
      
              // Gọi lại API hoặc thực hiện bất kỳ hành động nào khác ở đây sau khi response được trả về
              // Ví dụ: Gọi API khác
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchData();
    },[])

    return listProductOrder;
}