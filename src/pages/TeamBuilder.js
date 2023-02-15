import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [pokeData1, setPokeData1] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  const [pokeData2, setPokeData2] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  const [pokeData3, setPokeData3] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  const [pokeData4, setPokeData4] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  const [pokeData5, setPokeData5] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  const [pokeData6, setPokeData6] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });

  const arrayOfNumbers = [number1, number2, number3, number4, number5, number6];

  const arrayOfSetters = [
    setNumber1,
    setNumber2,
    setNumber3,
    setNumber4,
    setNumber5,
    setNumber6,
  ];

  const arrayOfPokeData = [
    pokeData1,
    pokeData2,
    pokeData3,
    pokeData4,
    pokeData5,
    pokeData6,
  ];

  const arrayOfSetPokeData = [
    setPokeData1,
    setPokeData2,
    setPokeData3,
    setPokeData4,
    setPokeData5,
    setPokeData6,
  ];

  const loadPokeData = async (num, i) => {
    let poke = {
      id: num,
      frName: "",
      spriteUrl: "",
      moveListEn: [],
      types: [],
      stats: [],
    };

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then(async (res) => {
        poke.spriteUrl = res.data.sprites.front_default;
        poke.types = [res.data.types[0].type.name];
        poke.moveListEn = res.data.moves;

        if (res.data.types[1]) {
          poke.types.push(res.data.types[1].type.name);
        }

        let array = [];
        res.data.stats.map((entry) => {
          let statName = entry.stat.name;
          let base_stat = entry.base_stat;
          array.push({ name: statName, base_stat: base_stat });
        });
        poke.stats = array;

        await axios.get(res.data.species.url).then((res) => {
          let tempFrName = "";
          try {
            tempFrName = res.data.names.filter(
              (n) => n.language.name === "fr"
            )[0].name;
          } catch {
            tempFrName =
              res.data.names.filter((n) => n.language.name === "en")[0].name +
              " (en)";
          }
          poke.frName = tempFrName;
        });
        arrayOfSetPokeData[i](poke);
        console.log(arrayOfPokeData);
      });
  };

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
    //bar central
    let content = [];
    for (var i = 1; i < 19; i++) {
      content.push(<TypeTag type={i} />);
    }
    return content;
  };

  const getField = (i) => {
    return (
      <div className="field">
        <label className="diese"># | </label>
        <input
          className="input-number"
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
        <Card poke={arrayOfPokeData[i]} size="s" />
        {getField(i)}
      </div>
    );
  };

  useEffect(() => {
    loadPokeData(number1, 0);
  }, [number1]);
  useEffect(() => {
    loadPokeData(number2, 1);
  }, [number2]);
  useEffect(() => {
    loadPokeData(number3, 2);
  }, [number3]);
  useEffect(() => {
    loadPokeData(number4, 3);
  }, [number4]);
  useEffect(() => {
    loadPokeData(number5, 4);
  }, [number5]);
  useEffect(() => {
    loadPokeData(number6, 5);
  }, [number6]);

  //front

  return (
    <div id={window.innerWidth > 1500 ? "screen" : ""}>
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

      <div id={window.innerWidth > 1500 ? "wrapper" : ""}>
        <div className="boxlat">
          {getCard(0)}
          <Stats stats={arrayOfPokeData[0].stats} size="s" />
          <MovesList moveListEn={arrayOfPokeData[0].moveListEn} size="m" />
        </div>
        <div className="boxlat">
          {getCard(2)}
          <Stats stats={arrayOfPokeData[2].stats} size="s" />
          <MovesList moveListEn={arrayOfPokeData[2].moveListEn} size="m" />
        </div>
        <div className="boxlat">
          {getCard(4)}
          <Stats stats={arrayOfPokeData[4].stats} size="s" />
          <MovesList moveListEn={arrayOfPokeData[4].moveListEn} size="m" />
        </div>
        {window.innerWidth > 1500 && <div id="types-bar">{getTypeBar()}</div>}
        <div className="boxlat">
          {getCard(1)}
          <Stats stats={arrayOfPokeData[1].stats} size="s" />
          <MovesList moveListEn={arrayOfPokeData[1].moveListEn} size="m" />
        </div>
        <div className="boxlat">
          {getCard(3)}
          <Stats stats={arrayOfPokeData[3].stats} size="s" />
          <MovesList moveListEn={arrayOfPokeData[3].moveListEn} size="m" />
        </div>
        <div className="boxlat">
          {getCard(5)}
          <Stats stats={arrayOfPokeData[5].stats} size="s" />
          <MovesList moveListEn={arrayOfPokeData[5].moveListEn} size="m" />
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;
