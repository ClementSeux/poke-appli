import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import Navigation from "../components/Navigation";
import SelectionPanel from "../components/SelectionPanel";
import Stats from "../components/Stats";
import SelectionMode from "../screen/SelectionMode";

const PokeInfo = () => {
  //back

  const [selectionModeToggle, toggleSelectionMode] = useState(false);
  const [pokeData, setPokeData] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });

  const [number, setNumber] = useState(25);
  const [CyclicRender, cycleResponsiveRender] = useState(1);

  const getRndNumber = () => {
    setNumber(Math.ceil(Math.random() * 1007) + 1);
  };

  const loadPokeData = async (num) => {
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
        setPokeData(poke);
      });
  };

  const toggleMode = () => {
    toggleSelectionMode(!selectionModeToggle);
  };

  const selectionDone = (number) => {
    setNumber(number);
    toggleSelectionMode(false);
  };

  const toggleModeButton = () => {
    return (
      <div
        className="button"
        onClick={() => {
          window.scrollTo(0, 0);
          toggleMode();
        }}
      >
        Galerie
      </div>
    );
  };

  const placeHolder = () => {};

  useEffect(() => {
    getRndNumber();
  }, []);

  useEffect(() => {
    loadPokeData(number);
  }, [number]);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleResponsiveRender(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //front
  return (
    <div
      className={
        window.innerWidth > 1000 && window.innerHeight > 600
          ? "large-screen"
          : ""
      }
    >
      <SelectionMode
        visible={selectionModeToggle}
        toggleMode={toggleMode}
        windowWidth={window.innerWidth}
        select={selectionDone}
      />
      <Navigation size="m" />
      <div
        id={
          window.innerWidth > 1000 && window.innerHeight > 600 ? "wrapper" : ""
        }
      >
        <div id="box1">
          <Card poke={pokeData} size={window.innerWidth > 1500 ? "l" : "m"} />

          <div id="form">
            <div
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
                    : setNumber(number);
                }}
              />
              {toggleModeButton()}
            </div>
          </div>
        </div>

        <div id="box2">
          <Stats
            stats={pokeData.stats}
            size={window.innerWidth > 1200 ? "l" : "m"}
          />

          <MovesList
            moveListEn={pokeData.moveListEn}
            size={window.innerWidth > 1200 ? "l" : "m"}
            sendCoverage={placeHolder}
            rank={1}
          />
        </div>
      </div>
    </div>
  );
};

export default PokeInfo;
