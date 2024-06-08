import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_COLOR_PRODUCT } from "../../config/api-consts";

export default function useListOrderQuantity(orderItems) {
  
    const [listOrderQuantity , setListOrderQuantity] = useState([]);

    console.log(orderItems, "lllll");

    useEffect(()=> {
        const postData = async () => {
            try {
                const response = await axios.post( `${API_COLOR_PRODUCT}`, { orderItems });
                console.log(response.data , "dữ liệu trả về từ MongoDB");
                setListOrderQuantity(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        postData();
    }, [orderItems]);

    return listOrderQuantity;
}
