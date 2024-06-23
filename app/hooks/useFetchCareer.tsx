'use client'
import { useState, useEffect, useRef, useCallback } from 'react';

type Career = string | string[] | object;

const useFetchCareerData = (career: Career, route: string) => {
    const [data, setData] = useState(null);
    const hasFetched = useRef(false);

    const fetchData = useCallback(async () => {
        if (career && !hasFetched.current) {
            hasFetched.current = true;
            const response = await fetch(`http://localhost:3000/api/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ career })
            });
            const responseData = await response.json();
            setData(responseData);
        }
    }, [career]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data};
};

export default useFetchCareerData;
