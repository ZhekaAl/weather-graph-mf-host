import { useQuery, UseQueryResult } from 'react-query';

import { Coord, Statistics } from '../store/types';

import { fetchStatisticsCityApi } from '../api/api';

import { minToMsec } from '../utils/utils';
import { useEffect, useState } from 'react';

type StatisticsCache = {
  queryStatisticsCity: UseQueryResult<Statistics, unknown>;
};

export function useStatistics(): StatisticsCache {
  
  /* TO_DO query param  */
  const  coord: Coord = {lat: 59.8944, lon: 30.2642};

  const queryStatisticsCity = useQuery(
    ['statisticsCity', coord],
    () => fetchStatisticsCityApi(coord),
    {
      enabled: !!coord,
      staleTime: minToMsec(60),
    },
  );

  return {
    queryStatisticsCity,
  };
}

export type StatisticsSimpleCahe = {

  data?: Statistics,
  hasError: boolean,
  isFetching: boolean;
  isLoading: boolean,
  isIdle: boolean,
}

export const useStatisticsSimpleFetch = (): StatisticsSimpleCahe => {

  const [data, setData] = useState<Statistics | undefined>(undefined);
  const [isFetching, seIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [hasError, setHasError] = useState(false);
 
   const loadData  = async () =>{

    setIsLoading(true);
    setIsIdle(false);
    try {
      const  coord: Coord = {lat: 59.8944, lon: 30.2642};
      const statisticData = await fetchStatisticsCityApi(coord);
      setData(statisticData);
    }
    catch{
      setHasError(true)
    }
    finally{
      setIsLoading(false);
    }

  }

  useEffect(()=>{
    loadData();
  },[]);

  return {data, isFetching, isLoading, isIdle, hasError}

}
