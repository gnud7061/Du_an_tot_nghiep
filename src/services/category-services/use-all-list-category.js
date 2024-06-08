
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { API_CATEGORY_PRODUCT } from "../../config/api-consts";

export default function useListCategory(){
    const [dataCategory , setDataCategory ] = useState([]);

    useEffect(()=>{

        var myHeaders = new Headers();
        myHeaders.append(
          'Cookie',
          'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
        );
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
    
        fetch(API_CATEGORY_PRODUCT, requestOptions)
          .then(response => response.json())
          .then(result => setDataCategory(result))
          .catch(error => console.log('error', error));

    },[]);

    return [dataCategory];
}