import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("all");
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        const storedData = localStorage.getItem("apiData");
        const data = storedData ? JSON.parse(storedData) : [];
        setShows(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShows();
  }, [query]);
  console.log("show", shows);

  return (
    <>
      <h1 className="text-2xl p-4 flex items-center justify-center text-orange-700 font-bold">
        Movies Portal
      </h1>
      <div className="grid grid-cols-1 gap-3 items-center mx-auto h-screen p-4 md:grid-cols-3">
        {shows.map((item, i) => (
          <Card
            key={i}
            className="max-w-sm hover:bg-gradient-to-t from-orange-400 via-blue-500 to-red-500 hover:scale-110 transition-all"
            imgAlt={item.show && item.show.name}
            imgSrc={item.show && item.show.image && item.show.image.medium}
          >
            <h5 className="font-bold underline text-red-900 dark:text-white text-md">
              {item.show && item.show.name}
            </h5>
            <div className="flex justify-between">
              <p className="text-sm font-bold text-gray-800 capitalize">
                averageRuntime: {item.show && item.show.averageRuntime}
              </p>
              <p className="text-sm font-bold text-gray-800 capitalize">
                Rating:
                {item.show && item.show.rating && item.show.rating.average}
              </p>
            </div>
            <Link to={`/show/${item.show && item.show.id}`}>
              <Button gradientDuoTone="purpleToPink">Read More</Button>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Home;
