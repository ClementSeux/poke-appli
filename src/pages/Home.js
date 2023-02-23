import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navigation from "../components/Navigation";

const Home = () => {
  //back
  const [number, setNumber] = useState(25);
  const [pokeData, setPokeData] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });

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

  const getRndNumber = () => {
    setNumber(Math.ceil(Math.random() * 1007) + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getRndNumber();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadPokeData(number);
  }, [number]);

  //front
  return (
    <div>
      <Navigation size="l" />
      <div id="box1">
        <div className={"card size-" + (window.innerWidth > 1000 ? "l" : "m")}>
          <img
            className="card"
            style={{ width: "100%" }}
            src="https://img.gamewith.net/article/thumbnail/rectangle/13537.png"
            alt=""
          />
        </div>
      </div>

      <div id="box2">
        <Card poke={pokeData} size={window.innerWidth > 1000 ? "l" : "m"} />
      </div>
    </div>
  );
};

export default Home;
