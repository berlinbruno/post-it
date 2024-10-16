import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState([]);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setLoading(true);
        const query = categoryId ? searchQuery(categoryId) : feedQuery;
        const data = await client.fetch(query);
        setPins(data);
      } catch (err) {
        console.error("Error fetching pins:", err);
        setError("An error occurred while fetching the pins.");
      } finally {
        setLoading(false);
      }
    };

    fetchPins();
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!pins.length) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        No pins available in this category. Check back later!
      </p>
    );
  }

  return <MasonryLayout pins={pins} />;
};

export default Feed;
