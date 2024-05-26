import Navbar from "./Navbar"
import PieChart from "./PieChart"
import './css/piechart.css'
import { useNavigate } from "react-router-dom";




function Analytics(){
    const navigate = useNavigate()

useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get expiration date
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  
      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, clear token from local storage and redirect to sign-in page
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      // Token doesn't exist, redirect to sign-in page
      navigate('/login');
    }
  }, [navigate]);

    return (
        <>
        <Navbar></Navbar>
        {/* <div className="analytics-container">
            <h1>Analytics </h1>
        </div> */}
        <div className="chart-container">
            <PieChart/>
        </div>
        </>
    )
}

export default Analytics