import { useEffect, useState } from "react";
import axios ,{ Axios} from "axios";
import { API_EVALUATE } from "../../config/api-consts";


export default function useListEvaluate(productId){
    const [listEvaluate , setListEvuale] =  useState([]);

    useEffect(() =>{
        axios.get(`${API_EVALUATE}/${productId}`)
            .then(function (response) {
                console.log(response.data);
                const data = Array.isArray(response.data)
                ? response.data
                : [response.data];
                setListEvuale(data);
            })
            .catch(function (error) {
                console.log(error);
            });

    },[productId]);

    return listEvaluate;
}