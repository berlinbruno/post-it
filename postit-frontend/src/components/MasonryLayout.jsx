import Masonry from "react-masonry-css";
import Pin from "./Pin";

// Define the breakpoint columns for responsive layout
const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  if (!pins || pins.length === 0) {
    return <p className="text-center mt-5">No pins available.</p>;
  }

  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakpointColumnsObj}
      columnClassName="masonry-column"
    >
      {pins.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
