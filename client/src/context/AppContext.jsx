import { createContext, useEffect, useState } from "react"; // Import React hooks
import { jobsData } from "../assets/assets"; // Import initial job data

// Creating a context to share state globally
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State to store search filter values (job title and location)
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  // State to check if a search has been performed
  const [isSearched, setIsSearched] = useState(false);

  // State to store the list of jobs
  const [jobs, setJobs] = useState([]);

  // State to control the visibility of the recruiter login modal
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // Function to fetch job data (here using static data from assets)
  const fetchJobs = async () => {
    try {
      setJobs(jobsData); // Set jobs state with the data
    } catch (error) {
      console.error("Error fetching jobs:", error); // Log errors if fetching fails
    }
  };

  // useEffect runs once on component mount to fetch jobs initially
  useEffect(() => {
    fetchJobs();
  }, []);

  // Object to pass all states and setters via context
  const value = {
    searchFilter, // current search filter
    setSearchFilter, // function to update search filter
    isSearched, // boolean flag if search is done
    setIsSearched, // function to update search status
    jobs, // array of jobs
    setJobs, // function to update jobs
    showRecruiterLogin, //boolean to show/hide recruiter login modal
    setShowRecruiterLogin, //function to update showRecruiterLogin state
  };

  // Providing context values to all child components
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
