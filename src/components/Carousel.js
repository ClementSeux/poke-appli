import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { clear } from "@testing-library/user-event/dist/clear";

const Carousel = ({ range }) => {
  const [cursor, setCursor] = useState(1);
  const [loaded, setLoaded] = useState(12);
  const [pokeData, setData] = useState([]);
  const [moveRight, setMoveRight] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);

  const ballMaker = () => {
    let content = [];
    range.map((i) => {
      content.push(
        <div className="" key={i}>
          {" "}
          <div
            className={
              "ball " +
              (i === cursor ? "selected " : "") +
              (i < cursor + 3 && i > cursor - 3 ? "visible-ball " : "") +
              (i < cursor + 4 && i > cursor - 4 ? "quartervisible-ball " : "") +
              (i < cursor + 5 && i > cursor - 5 ? "semivisible-ball" : "")
            }
            key={i}
            style={{
              transform:
                "translate(0," +
                Math.abs(i - cursor) *
                  Math.abs(i - cursor) *
                  Math.abs(i - cursor) *
                  -1 +
                "px)",
            }}
          >
            <div
              className={
                "red-cap red-cap" + (i % 7 === 0 || i % 5 === 0 ? "2" : "1")
              }
            ></div>
            <div className="white-cap"></div>
          </div>
        </div>
      );
    });
    return content;
  };

  const goLeft = () => {
    if (cursor > range[0]) {
      setCursor(cursor - 1);
    }
  };

  const goRight = () => {
    if (range[range.length - 1] > cursor) {
      setCursor(cursor + 1);
    }
  };

  useEffect(() => {
    setCursor(range[0]);
  }, [range]);

  return (
    <div className="display-carousel">
      <div className="left-zone" onMouseEnter={() => goLeft()}>
        left
      </div>
      <div className="right-zone" onMouseEnter={() => goRight()}>
        right
      </div>
      <div
        className="ball-row"
        style={{
          left: window.innerWidth / 2 - 38 * (cursor - range[0] + 1) + "px",
        }}
      >
        <div className="circle">{ballMaker()}</div>
      </div>
      {/* <div className="flying-sprite-box">{spriteBoxMaker()}</div> */}
    </div>
  );
};

export default Carousel;
