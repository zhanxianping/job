import axios from "./http";
import qs from "qs";

export default {
    get: function (url, params) {
        let dataVal = qs.stringify(params);
        return new Promise((resolve, reject) => {
            axios.get(url, dataVal).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        });
    },
    post: function (url, params,type) {
        let dataVal = params;
        return new Promise((resolve, reject) => {
            if (type !== undefined && type.dataType == "json"){
                axios.defaults.headers = {
                    'Content-Type':'application/json;charset=UTF-8'
                };
            }else {
                dataVal = qs.stringify(params);
            }
            axios.post(url, dataVal).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        });
    }

}

