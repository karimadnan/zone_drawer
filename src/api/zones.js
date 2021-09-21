import Axios from 'axios';
import { vars } from '../assets/data/vars';

function getZones(token, setData) {
    Axios.get(`${vars.endPoint}zones`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            setData(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createZone(token, data, setZones) {
    Axios.post(`${vars.endPoint}zones`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            getZones(token, setZones);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function deleteZone(token, id, setZones) {
    Axios.delete(`${vars.endPoint}zones/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            getZones(token, setZones);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export {
    getZones,
    createZone,
    deleteZone
};