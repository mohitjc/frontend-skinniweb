import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate(); // Initialize navigate
  
    const handleGoToLogin = () => {
      navigate('/login'); // Navigate to login page
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 11l3 3 7-7"
            />
          </svg>
          <h2 className="text-3xl font-semibold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-lg text-gray-600 mb-4">Your payment was processed successfully. Thank you for your purchase.</p>
          <button
            onClick={handleGoToLogin}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  };
  export default Success
  