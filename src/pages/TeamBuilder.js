import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import Navigation from "../components/Navigation";
import Stats from "../components/Stats";
import TypeTag from "../components/TypeTag";

const TeamBuilder = () => {
  //back
  const [number1, setNumber1] = useState(25);
  const [number2, setNumber2] = useState(448);
  const [number3, setNumber3] = useState(94);
  const [number4, setNumber4] = useState(149);
  const [number5, setNumber5] = useState(882);
  const [number6, setNumber6] = useState(865);

  const arrayOfNumbers = [number1, number2, number3, number4, number5, number6];

  const arrayOfSetters = [
    setNumber1,
    setNumber2,
    setNumber3,
    setNumber4,
    setNumber5,
    setNumber6,
  ];

  const setNumbers = (array) => {
    for (var i = 0; i < 6; i++) {
      arrayOfSetters[i](array[i]);
    }
  };
  const getRndNumbers = () => {
    let array = [];
    for (var i = 0; i < 6; i++) {
      array.push(Math.ceil(Math.random() * 1007) + 1);
    }
    setNumbers(array);
  };

  const getSachasTeam = () => {
    setNumbers([25, 448, 94, 149, 882, 865]);
  };

  const getTypeBar = () => {
    let content = [];
    for (var i = 1; i < 19; i++) {
      let url = `https://pokeapi.co/api/v2/type/${i}/`;
      content.push(<TypeTag type={url} />);
    }
    return content;
  };

  const getField = (i) => {
    return (
      <div className="field">
        <label># </label>
        <input
          type="number"
          min="1"
          max="1008"
          value={arrayOfNumbers[i]}
          onChange={(e) => {
            arrayOfSetters[i](parseInt(e.target.value));
          }}
        />
      </div>
    );
  };

  const getCard = (i) => {
    return (
      <div>
        <Card number={arrayOfNumbers[i]} size="s" />
        {getField(i)}
      </div>
    );
  };

  //front

  return (
    <div id="screen">
      <div className="boxlat">
        <Navigation size="m" />
        <div
          className="card size-m
        "
        >
          <h3 id="title-menu">OUTILS</h3>
          <div
            id="new-poke"
            className="button"
            onClick={() => {
              getRndNumbers();
            }}
          >
            Générer une équipe
          </div>
          <div
            id="new-poke"
            className="button"
            onClick={() => {
              getSachasTeam();
            }}
          >
            Sacha's Team
          </div>
        </div>
      </div>

      <div id="wrapper">
        <div className="boxlat">
          {getCard(0)}
          <Stats number={number1} size="s" />
        </div>
        <div className="boxlat">
          {getCard(2)}
          <Stats number={number3} size="s" />
        </div>
        <div className="boxlat">
          {getCard(4)}
          <Stats number={number5} size="s" />
        </div>
        <div id="types-bar">{getTypeBar()}</div>
        <div className="boxlat">
          {getCard(1)}
          <Stats number={number2} size="s" />
        </div>
        <div className="boxlat">
          {getCard(3)}
          <Stats number={number4} size="s" />
        </div>
        <div className="boxlat">
          {getCard(5)}
          <Stats number={number6} size="s" />
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;
