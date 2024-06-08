import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { API_PRODUCT } from "../../config/api-consts";

export default function useListProduct () {

    const [dataListProduct , setDataListProduct] = React.useState([]);
    
    useEffect(() =>{
        axios.get(API_PRODUCT)
            .then(function (response) {
                const data = Array.isArray(response.data)
                ? response.data
                : [response.data];
                setDataListProduct(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    } ,[]);



    return [dataListProduct];
}