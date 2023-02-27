import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import Navigation from "../components/Navigation";
import Stats from "../components/Stats";
import TypeTag from "../components/TypeTag";

const TeamBuilder = () => {
  //back
  const [cyclicRender, cycleResponsiveRender] = useState(1);
  const [toolBox1Trigger, setToolBox1Trigger] = useState(false);
  const [toolBox2Trigger, setToolBox2Trigger] = useState(false);

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

  const [coverage1, setCoverage1] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });
  const [coverage2, setCoverage2] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });
  const [coverage3, setCoverage3] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });
  const [coverage4, setCoverage4] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });
  const [coverage5, setCoverage5] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });
  const [coverage6, setCoverage6] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });

  const arrayOfCoverage = [
    coverage1,
    coverage2,
    coverage3,
    coverage4,
    coverage5,
    coverage6,
  ];
  const arrayOfSetCoverage = [
    setCoverage1,
    setCoverage2,
    setCoverage3,
    setCoverage4,
    setCoverage5,
    setCoverage6,
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

  const typeTable = {
    1: {
      1: 1,
      2: 2,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 0,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
    },
    2: {
      1: 1,
      2: 1,
      3: 2,
      4: 1,
      5: 1,
      6: 0.5,
      7: 0.5,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 2,
      15: 1,
      16: 1,
      17: 0.5,
      18: 2,
    },
    3: {
      1: 1,
      2: 0.5,
      3: 1,
      4: 1,
      5: 0,
      6: 2,
      7: 0.5,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 0.5,
      13: 2,
      14: 1,
      15: 2,
      16: 1,
      17: 1,
      18: 1,
    },
    4: {
      1: 1,
      12: 0.5,
      10: 1,
      11: 1,
      13: 1,
      15: 1,
      2: 0.5,
      4: 0.5,
      5: 2,
      3: 1,
      14: 2,
      7: 0.5,
      6: 1,
      8: 1,
      16: 1,
      17: 1,
      9: 1,
      18: 0.5,
    },
    5: {
      1: 1,
      12: 2,
      10: 1,
      11: 2,
      13: 0,
      15: 2,
      2: 1,
      4: 0.5,
      5: 1,
      3: 1,
      14: 1,
      7: 1,
      6: 0.5,
      8: 1,
      16: 1,
      17: 1,
      9: 1,
      18: 1,
    },
    6: {
      1: 0.5,
      12: 2,
      10: 0.5,
      11: 2,
      13: 1,
      15: 1,
      2: 2,
      4: 0.5,
      5: 2,
      3: 0.5,
      14: 1,
      7: 1,
      6: 1,
      8: 1,
      16: 1,
      17: 1,
      9: 2,
      18: 1,
    },
    7: {
      1: 1,
      12: 0.5,
      10: 2,
      11: 1,
      13: 1,
      15: 1,
      2: 0.5,
      4: 1,
      5: 0.5,
      3: 2,
      14: 1,
      7: 1,
      6: 2,
      8: 1,
      16: 1,
      17: 1,
      9: 1,
      18: 1,
    },
    8: {
      1: 0,
      12: 1,
      10: 1,
      11: 1,
      13: 1,
      15: 1,
      2: 0,
      4: 0.5,
      5: 1,
      3: 1,
      14: 1,
      7: 0.5,
      6: 1,
      8: 2,
      16: 1,
      17: 2,
      9: 1,
      18: 1,
    },
    9: {
      1: 0.5,
      12: 0.5,
      10: 2,
      11: 1,
      13: 1,
      15: 0.5,
      2: 2,
      4: 0,
      5: 2,
      3: 0.5,
      14: 0.5,
      7: 0.5,
      6: 0.5,
      8: 1,
      16: 0.5,
      17: 1,
      9: 0.5,
      18: 0.5,
    },
    10: {
      1: 1,
      12: 0.5,
      10: 0.5,
      11: 2,
      13: 1,
      15: 0.5,
      2: 1,
      4: 1,
      5: 2,
      3: 1,
      14: 1,
      7: 0.5,
      6: 1,
      8: 1,
      16: 1,
      17: 1,
      9: 0.5,
      18: 1,
    },
    11: {
      1: 1,
      12: 2,
      10: 0.5,
      11: 0.5,
      13: 2,
      15: 0.5,
      2: 1,
      4: 1,
      5: 1,
      3: 1,
      14: 1,
      7: 1,
      6: 1,
      8: 1,
      16: 1,
      17: 1,
      9: 1,
      18: 1,
    },
    12: {
      1: 1,
      12: 0.5,
      10: 2,
      11: 0.5,
      13: 0.5,
      15: 2,
      2: 1,
      4: 2,
      5: 0.5,
      3: 2,
      14: 1,
      7: 2,
      6: 1,
      8: 1,
      16: 1,
      17: 1,
      9: 0.5,
      18: 0.5,
    },
    13: {
      1: 1,
      12: 1,
      10: 1,
      11: 1,
      13: 0.5,
      15: 1,
      2: 1,
      4: 1,
      5: 2,
      3: 0.5,
      14: 1,
      7: 1,
      6: 1,
      8: 1,
      16: 1,
      17: 1,
      9: 0.5,
      18: 1,
    },
    14: {
      1: 1,
      12: 1,
      10: 1,
      11: 1,
      13: 1,
      15: 1,
      2: 0.5,
      4: 1,
      5: 1,
      3: 1,
      14: 0.5,
      7: 2,
      6: 1,
      8: 2,
      16: 1,
      17: 2,
      9: 1,
      18: 1,
    },
    15: {
      1: 1,
      12: 1,
      10: 2,
      11: 1,
      13: 1,
      15: 0.5,
      2: 2,
      4: 1,
      5: 1,
      3: 1,
      14: 1,
      7: 1,
      6: 2,
      8: 1,
      16: 1,
      17: 1,
      9: 2,
      18: 1,
    },
    16: {
      1: 1,
      12: 0.5,
      10: 0.5,
      11: 0.5,
      13: 0.5,
      15: 2,
      2: 1,
      4: 1,
      5: 1,
      3: 1,
      14: 1,
      7: 1,
      6: 1,
      8: 1,
      16: 2,
      17: 1,
      9: 1,
      18: 2,
    },
    17: {
      1: 1,
      12: 1,
      10: 1,
      11: 1,
      13: 1,
      15: 1,
      2: 2,
      4: 1,
      5: 1,
      3: 1,
      14: 0,
      7: 2,
      6: 1,
      8: 0.5,
      16: 1,
      17: 0.5,
      9: 1,
      18: 2,
    },
    18: {
      1: 1,
      12: 1,
      10: 1,
      11: 1,
      13: 1,
      15: 1,
      2: 0.5,
      4: 2,
      5: 1,
      3: 1,
      14: 1,
      7: 0.5,
      6: 1,
      8: 1,
      16: 0,
      17: 0.5,
      9: 2,
      18: 1,
    },
  };

  const getTypeNumber = (typeName) => {
    switch (typeName) {
      case "normal":
        return 1;
        break;
      case "fighting":
        return 2;
        break;
      case "flying":
        return 3;
        break;
      case "poison":
        return 4;
        break;
      case "ground":
        return 5;
        break;
      case "rock":
        return 6;
        break;
      case "bug":
        return 7;
        break;
      case "ghost":
        return 8;
        break;
      case "steel":
        return 9;
        break;
      case "fire":
        return 10;
        break;
      case "water":
        return 11;
        break;
      case "grass":
        return 12;
        break;
      case "electric":
        return 13;
        break;
      case "psychic":
        return 14;
        break;
      case "ice":
        return 15;
        break;
      case "dragon":
        return 16;
        break;
      case "dark":
        return 17;
        break;
      case "fairy":
        return 18;
        break;
    }
  };

  const compareTypes = (attack, defense) => {
    return typeTable[defense][attack];
  };

  const analyseTeam = () => {
    let array = [];

    //teamAttack is an array associating each type N
    //with an array listing the pokemons from the team
    //with moves of this type.
    let teamAttack = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: [],
    };

    //on map à travers les 6 coverages
    arrayOfCoverage.map((coverage, r) => {
      //pour chaque coverage on égraine les types
      for (let i = 1; i <= 18; i++) {
        //si le type est couvert
        if (coverage[i]) {
          //     //on ajoute le nom du poké à la liste de ceux qui couvrent le type
          teamAttack[i].push(arrayOfPokeData[r].frName);
        }
      }
    });

    console.log(teamAttack);

    //teamDefense is an array listing each poke of the team
    //with an object = {name: 'Pikachu', types : [13,]}
    let teamDefense = [];
    arrayOfPokeData.map((data) => {
      let pokeTypesList = { name: data.frName, types: [] };
      data.types.map((t) => {
        let n = getTypeNumber(t);
        pokeTypesList.types.push(n);
      });
      teamDefense.push(pokeTypesList);
    });

    //for each type...
    for (let i = 1; i <= 18; i++) {
      let score = {
        weakness: 0,
        resisted: 0,
        strength: 0,
        weakList: [],
        resistList: [],
        strongList: [],
      };

      //team attack against this type analysis
      for (let a = 1; a <= 18; a++) {
        if (teamAttack[a] && compareTypes(a, i) > 1) {
          score.strength++;
          score.strongList = score.strongList.concat(
            teamAttack[a].filter((item) => score.strongList.indexOf(item) < 0)
          );
        }
      }

      //team defense against this type analysis
      teamDefense.map((poke) => {
        //we define the global multiplier
        //when this poke receive this type of moves
        let computedUnitaryScore = 1;
        poke.types.map((t) => {
          computedUnitaryScore = computedUnitaryScore * compareTypes(i, t);
        });

        //then we add the poke to the resisted list or to the weakness list
        if (computedUnitaryScore < 1) {
          score.weakness++;
          score.weakList.push(poke.name);
        } else if (computedUnitaryScore > 1) {
          score.resisted++;
          score.resistList.push(poke.name);
        }
      });

      array[i] = score;
    }

    return array;
  };

  const getTypeBar = () => {
    //bar central
    let analyse = analyseTeam();

    let content = [];
    content.push(
      <li key={i} className="header-line">
        <div className="type-cell">
          <span>Type</span>
        </div>

        <div className="cell">
          <span className="tag-w">Faiblesses</span>
        </div>

        <div className="cell">
          <span className="tag-r">Resistance</span>
        </div>
        <div className="cell">
          <span className="tag-s">Coverage</span>
        </div>
      </li>
    );

    for (var i = 1; i < 19; i++) {
      let weaknessList = analyse[i].weakList.map((name) => <li>{name}</li>);
      let resistList = analyse[i].resistList.map((name) => <li>{name}</li>);
      let coverageList = analyse[i].strongList.map((name) => <li>{name}</li>);

      content.push(
        <li
          key={i}
          className="sythesis-line"
          style={{
            boxShadow:
              "inset 0 -12px 12px rgb(" +
              250 +
              "," +
              (250 - 10 * analyse[i].resisted * analyse[i].resisted) +
              "," +
              (250 - 10 * analyse[i].resisted * analyse[i].resisted) +
              ")",
          }}
        >
          <div className="type-cell">
            <TypeTag type={i} />
          </div>

          <div className="cell">
            <span className="tag-w">{analyse[i].resisted}</span>
            <div className={"on-hover"}>{resistList}</div>
          </div>

          <div className="cell">
            <span className="tag-r">{analyse[i].weakness}</span>
            <div className={"on-hover"}>{weaknessList}</div>
          </div>
          <div className="cell">
            <span className="tag-s">{analyse[i].strength}</span>
            <div className={"on-hover"}>{coverageList}</div>
          </div>
        </li>
      );
    }
    return <div className="types-list">{content}</div>;
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
      <div className="id-card">
        <Card poke={arrayOfPokeData[i]} size="s" />
        <div className="outflow">{getField(i)}</div>
      </div>
    );
  };

  //passe-plat coverages
  const getCoverage = (receivedCoverage, n) => {
    arrayOfSetCoverage[n](receivedCoverage);
  };

  const getTeamMember = (n) => {
    return (
      <div className="boxlat">
        {getCard(n)}
        {window.innerWidth > 700 && (
          <Stats stats={arrayOfPokeData[n].stats} size="s" />
        )}
        <MovesList
          moveListEn={arrayOfPokeData[n].moveListEn}
          size="m"
          sendCoverage={getCoverage}
          rank={n}
        />
      </div>
    );
  };

  const toogleToolBox = (n) => {
    switch (n) {
      case 1:
        setToolBox1Trigger(!toolBox1Trigger);
        break;
      case 2:
        setToolBox2Trigger(!toolBox2Trigger);
        break;
    }
  };

  const getToolButtons = () => {
    return (
      <>
        <div
          className="button"
          onClick={() => {
            getRndNumbers();
          }}
        >
          Générer une équipe
        </div>
        <div
          className="button"
          onClick={() => {
            getSachasTeam();
          }}
        >
          Sacha's Team
        </div>
      </>
    );
  };

  const toolBox = (n, content) => {
    return (
      <div
        className={
          "tool-box " +
          ((n === 1 ? toolBox1Trigger : toolBox2Trigger) ? " visible " : "") +
          (window.innerWidth > 1750 && window.innerHeight > 800
            ? " unfixed visible"
            : "")
        }
      >
        <div className="tool-box-button">
          {n === 1 ? (
            <span
              onClick={() => {
                toogleToolBox(n);
              }}
            >
              &#128736;
            </span>
          ) : (
            <span
              onClick={() => {
                toogleToolBox(n);
              }}
            >
              &#9878;
            </span>
          )}
        </div>
        <div className="inner-tool-box">
          {window.innerWidth < 1750 || window.innerHeight < 800 ? (
            <span
              className="cross"
              onClick={() => {
                toogleToolBox(n);
              }}
            >
              &#10007;
            </span>
          ) : (
            ""
          )}
          {content}
        </div>
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

  useEffect(() => {
    const interval = setInterval(() => {
      cycleResponsiveRender(Math.random());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  //front

  return (
    <div
      className={
        window.innerWidth > 1500 && window.innerHeight > 800
          ? "large-screen"
          : ""
      }
    >
      <Navigation size="m" />

      <div
        id={
          window.innerWidth > 1500 && window.innerHeight > 800 ? "wrapper" : ""
        }
      >
        <div
          id="tool-bar"
          className={
            window.innerWidth > 1750 && window.innerHeight > 800
              ? "visible"
              : ""
          }
        >
          {toolBox(1, getToolButtons())}
          {toolBox(2, getTypeBar())}
          {/* {window.innerWidth > 1500 && <div id="types-bar">{getTypeBar()}</div>} */}
        </div>

        {getTeamMember(0)}
        {getTeamMember(2)}
        {getTeamMember(4)}
        {getTeamMember(1)}
        {getTeamMember(3)}
        {getTeamMember(5)}
      </div>
    </div>
  );
};

export default TeamBuilder;
