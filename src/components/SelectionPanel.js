import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Carousel from "./Carousel";

const SelectionPanel = ({
  sendCursor, // passe-plat function to send back current cursor
}) => {
  //Responsable de la logique d el'écran de sélection
  const isInitialMount = useRef(true);
  //input crée ici
  const [gen, setGen] = useState(1);
  //input reçue de Carousel
  const [cursor, setCursor] = useState(1);

  //buttons for gen input
  const genButtonsMaker = () => {
    let content = [];
    let romanNumbers = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "H",
      "IX",
    ];
    romanNumbers.map((n, i) => {
      content.push(
        <div
          key={i}
          className={"gen " + (gen === i + 1 ? "gen-active" : "")}
          onClick={() => {
            setGen(i + 1);
          }}
        >
          <span>{n}</span>
        </div>
      );
    });
    return content;
  };
  //update range state from buttons input
  const getNewCursor = (gen) => {
    switch (gen) {
      case 1: //Kanto
        return 1;
        break;
      case 2: //Johto
        return 152;
        break;
      case 3: //Hoenn
        return 252;
        break;
      case 4: //Sinnoh
        return 387;
        break;
      case 5: //Unys
        return 494;
        break;
      case 6: //Kalos
        return 650;
        break;
      case 7: //Alola
        return 722;
        break;
      case 8: //Galar
        return 810;
        break;
      case 9: //Hisui
        return 899;
        break;
      case 10: //Paldea
        return 906;
        break;
    }
  };

  useEffect(() => {
    setCursor(getNewCursor(gen));
  }, [gen]);

  //passe-plat
  const getCursor = (c) => {
    setCursor(c);
  };

  useEffect(() => {
    sendCursor(cursor);
  }, [cursor]);

  // ///updates urls
  // const fetchArray = async () => {
  //   sendCursor(cursor, realCursor);
  //   let urlList = [];
  //   rangeSelected.slice(0, cursor + 8).map((id) => {
  //     urlList.push("https://pokeapi.co/api/v2/pokemon/" + id);
  //   });
  //   setUrls(urlList);

  //   let listing = [];
  //   let listingCurated = [];

  //   //first list with raw datas from the api
  //   await axios.all(urls.map((url) => axios.get(url))).then((data) => {
  //     data.map((item) => listing.push(item.data));
  //   });

  //   //second list with the data we need
  //   listing.map(async (item) => {
  //     let poke = {
  //       id: item.id,
  //       frName: "pokémon name",
  //       spriteUrl: item.sprites.front_default,
  //       moveListEn: item.moves,
  //       types: [],
  //       stats: [],
  //     };
  //     //fetch name
  //     await axios.get(item.species.url).then((res) => {
  //       let tempFrName = "";
  //       try {
  //         tempFrName = res.data.names.filter((n) => n.language.name === "fr")[0]
  //           .name;
  //       } catch {
  //         tempFrName =
  //           res.data.names.filter((n) => n.language.name === "en")[0].name +
  //           " (en)";
  //       }
  //       poke.frName = tempFrName;
  //     });
  //     //fetch types
  //     poke.types = [item.types[0].type.name];
  //     if (item.types[1]) {
  //       poke.types.push(item.types[1].type.name);
  //     }
  //     //fetch stats
  //     let array = [];
  //     item.stats.map((entry) => {
  //       let statName = entry.stat.name;
  //       let base_stat = entry.base_stat;
  //       array.push({ name: statName, base_stat: base_stat });
  //     });
  //     poke.stats = array;

  //     listingCurated.push(poke);
  //   });

  //   if (
  //     listing > arrayOfPokeDatas ||
  //     (listing[0] && listing[0].id !== arrayOfPokeDatas[0].id)
  //   ) {
  //     setArrayOfPokeDatas(listingCurated);
  //   }
  // };

  //front
  return (
    <div className="panel">
      <div className="gen-folders">{genButtonsMaker()}</div>
      <Carousel
        cursorJumper={cursor}
        // arrayOfPokeDatas={arrayOfPokeDatas}
        sendCursor={getCursor} // passe-plat
      />
    </div>
  );
};

export default SelectionPanel;
