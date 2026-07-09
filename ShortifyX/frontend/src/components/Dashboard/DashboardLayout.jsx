import React, { useState } from 'react'
import Graph from './Graph'
import { dummyData } from '../../dummyData/data'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import ShortenUrlList from './ShortenUrlList'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { FaLink } from 'react-icons/fa'

const DashboardLayout = () => {
  // const refetch = false;
  const { token } = useStoreContext();
  const [shortenPopUp, setshortenPopUp] = useState(false);
  const navigate = useNavigate();
  const { isPending, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError);
  const { isPending: loader, data: totalClicks } = useFetchTotalClicks(token, onError);

  function onError() {
    navigate("/error");
  }

  return (
    <div className='lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]'>
      {loader ? (
        <Loader />
      ) : (
        <div className='lg:w-[90%] w-full mx-auto py-16'>
          <div className='h-96 relative'>
            {totalClicks?.length === 0 && (
              <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}
            <Graph graphData={totalClicks} />
          </div>

          <div className='py-5 sm:text-end text-center'>
            <button className='btn-gradient px-4 py-2 rounded-md text-white' onClick={() => setshortenPopUp(true)}>
              Create a new short URL
            </button>
          </div>

          <div>
            {!isPending && myShortenUrls?.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                    You haven't created any short link yet
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm " />
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls}/>
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setshortenPopUp}
      />
    </div>
  )
}

export default DashboardLayout

// import React, { useEffect } from "react";
// import Graph from "./Graph";
// import { useStoreContext } from "../contextApi/ContextApi";
// import { useFetchTotalClicks } from "../hooks/useQuery";

// const DashboardLayout = () => {
//   const { token } = useStoreContext();

//   const {
//     data: graphData = [],
//     isLoading,
//     error,
//   } = useFetchTotalClicks(token);

//   useEffect(() => {
//     if (error) {
//       console.error("ERROR:", error);
//     }
//   }, [error]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
//       <div className="lg:w-[90%] w-full mx-auto py-16">
//         <div className="h-96 relative">
//           <Graph graphData={graphData} />
//         </div>

//         <div className="py-5 sm:text-end text-center">
//           <button className="btn-gradient px-4 py-2 rounded-md text-white">
//             Create a new short URL
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;