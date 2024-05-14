import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUsername} from '../helper/helper';
axios.defaults.baseURL = "http://localhost:3001";
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const {username} = !query ? await getUsername() : '';
                console.log("username in fetchhool kis",username);
                const {data, status} = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);
                console.log('status is ',status)
                if (status === 200) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }));
            } catch (error) {
                console.log(error)
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query])
    return [getData,setData];
}