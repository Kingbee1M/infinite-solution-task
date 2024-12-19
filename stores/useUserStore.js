import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const useUserStore = create((set) => ({
    user: [],
    loading: false,
    error: null,

    // Actions starts here
    // addUser: (newUser) => set((state) => ({ user: [...state.user, newUser] }))
    addUser: async (newUser) => {
        set({loading: true, error: null})

        try {
            const resp = await fetch("http://localhost:4000/Clients", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!resp.ok) {
                throw new Error("Failed to add user. Server returned an error.");
            }

            console.log("User added successfully to JSON server!");
        } catch (error) {
            console.error("Error adding user:", error);
            set({ error: error.message });
        } finally {
            set({ loading: false }); 
        }
    },

    //new action
    populateUser: async () => {
        set({ loading: true, error: null }); // Start loading
      
        try {
            const resp = await fetch("http://localhost:4000/Clients");; // Fetch from JSON server
          const jsonData = await resp.json(); // Parse JSON response
      
          if (!resp.ok) {
            throw new Error("Failed to fetch data from the server.");
          }
      
          set({ user: jsonData }); // Update the `user` state with the fetched data
      
          // Log the updated user array to the console
          console.log("Updated user array:", jsonData);
        } catch (error) {
          console.error("Error fetching data:", error); // Log any error
          set({ error: error.message }); // Update the error state
        } finally {
          set({ loading: false }); // Stop loading
        }
      },

    // new action to populate users with admin data
    populateUserAdmin: async () => {
        set({ loading: true, error: null });
      
        try {
            const resp = await fetch("http://localhost:4000/Contractor");; // Fetch from JSON server
          const jsonData = await resp.json(); // Parse JSON response
      
          if (!resp.ok) {
            throw new Error("Failed to fetch data from the server.");
          }
      
          set({ user: jsonData }); // Update the `user` state with the fetched data
      
          // Log the updated user array to the console
          console.log("Updated user array:", jsonData);
        } catch (error) {
          console.error("Error fetching data:", error); // Log any error
          set({ error: error.message }); // Update the error state
        } finally {
          set({ loading: false }); // Stop loading
        }
      },
}));

export default useUserStore;