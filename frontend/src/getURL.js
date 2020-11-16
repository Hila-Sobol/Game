import React, { useEffect, useState } from 'react';

import axios from 'axios';

const useHackerNewsApi = (uri) => {
    const [data, setData] = useState();
    const [url, setUrl] = useState(
      uri,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
   
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
   
        try {
          const result = await axios(url);
          setData(result.data);
        } catch (error) {
          setIsError(true);
        }
   
        setIsLoading(false);
      };
   
      fetchData();
    }, [url]);
   
    return [{ data, isLoading, isError }, setUrl];
  }

  export default useHackerNewsApi