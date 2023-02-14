import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import Navigation from "../components/Navigation";
import SelectionPanel from "../components/SelectionPanel";
import Stats from "../components/Stats";

const PokeInfo = () => {
  //back
  const [number, setNumber] = useState(25);

  const [oldValue, setOldValue] = useState(false);

  const getRndNumber = () => {
    setNumber(Math.ceil(Math.random() * 1007) + 1);
  };

  useEffect(() => {
    getRndNumber();
  }, []);

  useEffect(() => {
    setOldValue(number);
  }, [number]);

  //front
  return (
    <div id="wrapper">
      <div id="box1">
        <Navigation size="m" />

        <Card number={number} size="m" />

        <div id="form">
          <div
            style={{
              border: "4px solid white",
            }}
            className="button"
            onClick={() => {
              getRndNumber();
            }}
          >
            Générer un pokémon
          </div>
          <div className="field">
            <label className="diese"># |</label>
            <input
              className="input-number"
              type="number"
              value={number}
              min="1"
              max="1008"
              onChange={(e) => {
                e.target.value > 0 && e.target.value < 1009
                  ? setNumber(e.target.value)
                  : setNumber(oldValue);
              }}
            />
          </div>
          <SelectionPanel />
        </div>
      </div>

      <div id="box2">
        <Stats number={number} size="l" />

        <MovesList number={number} />
      </div>
    </div>
  );
};

export default PokeInfo;
