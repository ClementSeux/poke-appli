import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Carousel = ({ range }) => {
  const [cursor, setCursor] = useState(1);
  const [loaded, setLoaded] = useState(12);
  const [pokeData, setData] = useState([]);

  const ballMaker = () => {
    let content = [];
    range.map((i) => {
      content.push(
        <div className="">
          {" "}
          <div
            className={
              "ball " +
              (i === cursor ? "selected " : "") +
              (i < cursor + 5 && i > cursor - 6 ? "visible-ball " : "") +
              (i < cursor + 7 && i > cursor - 8 ? "quartervisible-ball " : "") +
              (i < cursor + 8 && i > cursor - 9 ? "semivisible-ball" : "")
            }
            key={i}
          >
            <div className="red-cap"></div>
            <div className="white-cap"></div>
          </div>
        </div>
      );
    });
    return content;
  };

  const spriteBoxMaker = () => {
    let content = [];
    range.map((i) => {
      content.push(
        <img
          className="flying-sprite"
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            i +
            ".png"
          }
        />
      );
    });
    return content;
  };

  const goLeft = () => {
    if (cursor > 1) {
      setCursor(cursor - 1);
    }
  };

  const goRight = () => {
    if (range.length > cursor) {
      setCursor(cursor + 1);
    }
    console.log(cursor);
  };

  // const fetchData = () => {
  //   let listToRequest = [];
  //   range.slice(0, cursor + 12).map(async (i) => {
  //     if (pokeData[i] === undefined && i < loaded) {
  //       setLoaded(i);
  //       listToRequest.push(i);
  //     }
  //     let requests = listToRequest.map((j) => axios.get("https://pokeapi.co/api/v2/pokemon/" + j)

  //     });
  //   });
  // };

  useEffect(() => {
    setCursor(1);
  }, [range]);

  return (
    <div className="display-carousel">
      <div className="left-zone" onClick={() => goLeft()}>
        left
      </div>
      <div className="right-zone" onClick={() => goRight()}>
        right
      </div>
      <div className="ball-row" style={{ left: 331 - 34 * cursor + "px" }}>
        <div className="circle">{ballMaker()}</div>
      </div>
      <div className="flying-sprite-box">{spriteBoxMaker()}</div>
    </div>
  );
};

export default Carousel;
