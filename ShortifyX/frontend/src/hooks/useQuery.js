// import { useQuery } from "@tanstack/react-query";
// import api from '../api/api';


// export const useFetchTotalClicks = (token, onError) => {
//     return useQuery("url-totalclick",
//         async () => {
//             return await api.get(
//                 "/api/urls/totalClicks?startDate=2024-01-01&endDate=2024-12-31",
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Accept: "application/json",
//                         Authorization: "Bearer " + token,
//                     },
//                 }
//             );
//         },
//                {
//                 select: (data) => {
//                     const convertToArray = Object.keys(data.data).map((key) => ({
//                         clickDate: key,
//                         count: data.data[key],
//                     }));
//                     return convertToArray;
//                 },
//                 onError,
//                 staleTime: 5000
//                })
// }


import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],

    queryFn: async () => {
      const response = await api.get(
        "/api/urls/myurls",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },

    // select: (data) => {
    //   const sortedData = data.data.sort(
    //     (a,b) => new Date(b.createdDate) - new Date(a.createdDate)
    //   );
    //   return sortedData;
    // },

    select: (data) => {
      return data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },

    onError,
    staleTime: 5000
  });
};



export const useFetchTotalClicks = (token) => {
  return useQuery({
    queryKey: ["url-totalclick"],

    queryFn: async () => {
      const response = await api.get(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2035-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },

    select: (data) => {
      return Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      }));
    },

    staleTime: 5000,
    enabled: !!token,
  });
};