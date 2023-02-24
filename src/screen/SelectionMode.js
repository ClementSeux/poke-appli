import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import SelectionPanel from "../components/SelectionPanel";
import Stats from "../components/Stats";
import SpriteBox from "../components/SpriteBox";

const SelectionMode = ({
  windowWidth,
  visible, // when true, grey screen become visible
  toggleMode, //passe plat function to tell the page to make it invisible (return button)
}) => {
  //recu de carousel
  const [cursor, setCursor] = useState(1);
  //fetch here
  const [arrayOfPokeDatas, setArrayOfPokeDatas] = useState([
    null,
    {
      id: 1,
      frName: "Bulbizarre",
      spriteUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      moveListEn: [
        { move: { url: "https://pokeapi.co/api/v2/move/13/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/14/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/15/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/20/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/22/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/29/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/33/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/34/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/36/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/38/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/45/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/70/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/72/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/73/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/74/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/38/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/45/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/70/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/72/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/73/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/74/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/75/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/76/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/77/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/79/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/80/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/81/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/92/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/580/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/526/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/590/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/803/" } },
      ],
      types: ["grass", "poison"],
      stats: [
        { name: "hp", base_stat: 45 },
        { name: "attack", base_stat: 49 },
        { name: "defense", base_stat: 49 },
        { name: "special-attack", base_stat: 65 },
        { name: "special-defense", base_stat: 65 },
        { name: "speed", base_stat: 45 },
      ],
    },
  ]);

  const [pokeSelected, setpokeSelected] = useState(arrayOfPokeDatas[1]);

  const updateArray = async (c) => {
    //on copie les données stockées
    let array = arrayOfPokeDatas.slice(0, 10000);
    //on définit un interval flottant de [-5, +15] autour du cursor
    let min = c - 5 > 0 ? c - 15 : 1;
    let max = c + 15 < 1008 ? c + 15 : 1008;
    //en fonction des données manquantes on définit une liste d'urls à interroger
    let urlList = [];
    for (let id = min; id <= max; id++) {
      if (!array[id]) {
        urlList.push("https://pokeapi.co/api/v2/pokemon/" + id);
      }
    }

    //first list with raw datas from the api
    let listing = [];
    await axios.all(urlList.map((url) => axios.get(url))).then((data) => {
      data.map((item) => listing.push(item.data));
    });

    //second list with the data in the format we need
    listing.map(async (item) => {
      let poke = {
        id: item.id,
        frName: "pokémon name",
        spriteUrl: item.sprites.front_default,
        moveListEn: item.moves,
        types: [],
        stats: [],
      };

      //fetch name
      await axios.get(item.species.url).then((res) => {
        let tempFrName = "";
        try {
          tempFrName = res.data.names.filter((n) => n.language.name === "fr")[0]
            .name;
        } catch {
          tempFrName =
            res.data.names.filter((n) => n.language.name === "en")[0].name +
            " (en)";
        }
        poke.frName = tempFrName;
      });

      //fetch types
      poke.types = [item.types[0].type.name];
      if (item.types[1]) {
        poke.types.push(item.types[1].type.name);
      }

      //fetch stats
      let arrayStat = [];
      item.stats.map((entry) => {
        let statName = entry.stat.name;
        let base_stat = entry.base_stat;
        arrayStat.push({ name: statName, base_stat: base_stat });
      });
      poke.stats = arrayStat;

      array[poke.id] = poke;
      setArrayOfPokeDatas(array);
    });
  };

  //passe-plat remontant de SPanel
  const getCursor = (c) => {
    setCursor(c);
  };

  useEffect(() => {
    updateArray(cursor);
  }, [cursor]);

  useEffect(() => {
    if (arrayOfPokeDatas[cursor]) {
      setpokeSelected(arrayOfPokeDatas[cursor]);
      console.log("pokeToDisplay stats move");
      console.log(pokeSelected);
    }
  }, [arrayOfPokeDatas, cursor]);

  return (
    <div className={"grey-screen " + (visible ? "visible" : "")}>
      {visible && (
        <>
          <div
            className={
              "selection-display" + (windowWidth < 1000 ? " wrap" : "")
            }
          >
            <SpriteBox arrayOfPokeDatas={arrayOfPokeDatas} cursor={cursor} />

            {pokeSelected && (
              <>
                <Stats
                  stats={pokeSelected.stats}
                  size={windowWidth < 1000 ? "s" : "m"}
                />
                <MovesList
                  moveListEn={pokeSelected.moveListEn}
                  size={
                    windowWidth < 1000 ? "xl" : windowWidth < 1400 ? "m" : "l"
                  }
                />
              </>
            )}
          </div>

          <SelectionPanel sendCursor={getCursor} />

          <div className="button" onClick={() => toggleMode()}>
            Retour
          </div>
        </>
      )}
    </div>
  );
};

export default SelectionMode;
