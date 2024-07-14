import { Audio } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="red"
        ariaLabel="loading"
      />
      <p className="text-xl text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
