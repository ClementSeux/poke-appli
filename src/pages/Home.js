import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navigation from "../components/Navigation";

const Home = () => {
  //back
  const [number, setNumber] = useState(25);

  const getRndNumber = () => {
    setNumber(Math.ceil(Math.random() * 1007) + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getRndNumber();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  //front
  return (
    <div>
      <div id="box1">
        <Navigation size="l" />
      </div>

      <div id="box2">
        <div className="card size-l">
          <img
            className="card"
            style={{ width: "100%" }}
            src="https://img.gamewith.net/article/thumbnail/rectangle/13537.png"
            alt=""
          />
        </div>
      </div>

      <div id="box3">
        <Card number={number} size="l" />
      </div>
    </div>
  );
};

export default Home;
