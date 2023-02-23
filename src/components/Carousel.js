import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { clear } from "@testing-library/user-event/dist/clear";

const Carousel = ({
  cursorJumper,
  // arrayOfPokeDatasReceived = array of pokeData objects already fetched in SPanel (is upated bit by bit)
  sendCursor, // passe-plat function to send back current cursor
}) => {
  const [cursor, setCursor] = useState(1);
  const [range, setRange] = useState(
    Array.from(Array(1008).keys()).slice(1, 10000)
  );

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
    if (cursor > 1) {
      setCursor(cursor - 1);
    }
  };

  const goRight = () => {
    if (cursor < 1008) {
      setCursor(cursor + 1);
    }
  };

  useEffect(() => {
    setCursor(cursorJumper);
  }, [cursorJumper]);

  useEffect(() => {
    sendCursor(cursor);
  }, [cursor]);

  return (
    <div className="display-carousel">
      <div className="left-zone" onClick={() => goLeft()}>
        <span>&lt;</span>
      </div>
      <div className="right-zone" onClick={() => goRight()}>
        <span>&gt;</span>
      </div>
      <div
        className="ball-row"
        style={{
          left: window.innerWidth / 2 - 38 * cursor + "px",
        }}
      >
        <div className="circle">{ballMaker()}</div>
      </div>
    </div>
  );
};

export default Carousel;
