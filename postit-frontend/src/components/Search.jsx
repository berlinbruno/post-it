import { useEffect, useState } from "react";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

// Debounce function to limit the number of API calls
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce for 300ms

  useEffect(() => {
    const fetchPins = async () => {
      setLoading(true);
      try {
        const query = debouncedSearchTerm
          ? searchQuery(debouncedSearchTerm.toLowerCase())
          : feedQuery;

        const data = await client.fetch(query);
        setPins(data);
      } catch (error) {
        console.error("Error fetching pins:", error);
        setPins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPins();
  }, [debouncedSearchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for pins" />}
      {!loading && pins?.length === 0 && debouncedSearchTerm && (
        <div className="mt-10 text-center text-xl">No Pins Found!</div>
      )}
      {!loading && pins?.length > 0 && <MasonryLayout pins={pins} />}
    </div>
  );
};

export default Search;
