import { RotatingLines } from "react-loader-spinner";

const Loader = () => (
  <div>
    <RotatingLines
      visible={true}
      height="30"
      width="30"
      strokeColor="grey"
      strokeWidth="2"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Loader;