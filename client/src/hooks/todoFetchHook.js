import axios from 'axios';
import { useEffect, useState } from 'react';
// import { getUsername} from '../helper/helper';
// import { ShowUserTodo } from '../helper/helper';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL = BACKEND_URL;
export default function useFetch() {
    const [getData, setData] = useState({ isLoading: false, apiData: [], status: false, serverError: false });

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const token = localStorage.getItem('token');
                const {data, status} = await axios.get('api/todo',{ headers: { "Authorization": `Bearer ${token}` } })
                if (status === 200) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        useEffect(() => {
        fetchData()

    }, [])
    return [getData,fetchData];
}