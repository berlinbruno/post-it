import PropTypes from "prop-types";
import { Audio } from "react-loader-spinner";

const Spinner = ({ message, color = "red", height = "80", width = "80" }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen" role="alert" aria-live="assertive">
      <Audio
        height={height}
        width={width}
        radius="9"
        color={color}
        ariaLabel="loading"
      />
      <p className="text-xl text-center px-2">{message}</p>
    </div>
  );
};

// Define prop types
Spinner.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Spinner;
