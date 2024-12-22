import { create } from "zustand";

const useUserStore = create((set) => ({
  apiResponse: [
    {
      
    }
  ],

  // action: collect the data and store it
  setApiResponse: (response) => {
    set((state) => {
      const updatedResponses = [...state.apiResponse, response];
      console.log("Updated apiResponse array:", updatedResponses);
      return { apiResponse: updatedResponses };
    });
  },
}));

export default useUserStore;