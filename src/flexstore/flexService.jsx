import { useDispatch, useSelector } from "react-redux";
import { htboxSelector } from "./FlexMachine";
import axios from "axios";

export const useFlexService = () => {
  const dispatch = useDispatch();
  const iqSliceState = useSelector((state) => state.iqSlice);
  function FlexSender(storeName, args) {
    const dispatchHandler = htboxSelector[storeName];
    console.log(htboxSelector);
    try {
      // Dispatch the action
      return dispatch(dispatchHandler(args));
    } catch (error) {
      // Handle the error here
      console.error("An error occurred while dispatching the action:", error);
      // You can choose to re-throw the error if needed
      // throw error;
    }
  }

  function FlexDetector(args) {
    // You can return the selected state if you need it outside of the component
    return iqSliceState[args];
  }

  async function FlexApi({
    method,
    url,
    payload: data = null,
    contentType = "application/json",
    onUploadProgress = null,
    onDownloadProgress = null,
    flexstore,
  }) {
    try {
      let loadingStatus = "Loading...";
      let loadedPercentage = 0;

      const config = {
        headers: {
          "Content-Type": contentType,
        },
        onUploadProgress, // Pass the provided onUploadProgress callback
        onDownloadProgress, // Pass the provided onDownloadProgress callback
      };

      let response;
      if (method === "GET") {
        if (data) {
          response = await axios.get(url, { ...config, data });
        } else {
          response = await axios.get(url, config);
        }
      } else if (method === "POST") {
        response = await axios.post(url, data, config);
      } else if (method === "PUT") {
        response = await axios.put(url, data, config);
      } else if (method === "DELETE") {
        response = await axios.delete(url, config);
      }

      loadingStatus = "Loading completed.";
      if (flexstore?.storeaccess) {
        FlexSender(flexstore?.statename, response.data);
      }
      return {
        data: response.data,
        loadingStatus,
        loadedPercentage,
        status: response.status,
      };
    } catch (error) {
      console.error("Error:", error.message);
      return {
        data: null,
        loadingStatus: "Error occurred.",
        loadedPercentage: 0,
        error: error.message,
        status: error.response ? error.response.status : 500,
      };
    }
  }
  return {
    FlexSender,
    FlexDetector,
    FlexApi,
  };
};

// Usage example
// async function fetchDataWithProgress() {
//     try {
//       const onUploadProgress = (progressEvent) => {
//         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//         console.log(`Upload Progress: ${progress}%`);
//       };

//       const onDownloadProgress = (progressEvent) => {
//         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//         console.log(`Download Progress: ${progress}%`);
//       };

//       const result = await FlexApi({
//         method: "GET",
//         url: "https://api.example.com/data",
//         onUploadProgress,
//         onDownloadProgress
//       });
//       console.log(result);
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   }

//   // Call the fetchDataWithProgress function
//   fetchDataWithProgress();
