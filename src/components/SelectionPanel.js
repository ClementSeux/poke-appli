import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const SelectionPanel = () => {
  const [gen, setGen] = useState(1);
  const [rangeSelected, setRange] = useState([]);

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

  const getRange = () => {
    let range = [];
    let min = 1;
    let max = 151;
    switch (gen) {
      case 1: //Kanto
        min = 1;
        max = 151;
        break;
      case 2: //Johto
        min = 152;
        max = 251;
        break;
      case 3: //Hoenn
        min = 252;
        max = 386;
        break;
      case 4: //Sinnoh
        min = 387;
        max = 493;
        break;
      case 5: //Unys
        min = 494;
        max = 649;
        break;
      case 6: //Kalos
        min = 650;
        max = 721;
        break;
      case 7: //Alola
        min = 722;
        max = 809;
        break;
      case 8: //Galar
        min = 810;
        max = 898;
        break;
      case 9: //Hisui
        min = 899;
        max = 905;
        break;
      case 10: //Paldea
        min = 906;
        max = 1008;
        break;
    }
    for (var i = min; i <= max; i++) {
      range.push(i);
    }
    setRange(range);
  };

  useEffect(() => {
    getRange();
  }, [gen]);

  return (
    <div className="panel">
      <div className="gen-folders">
        {genButtonsMaker()}
        <div className="display-range-limits">
          <span>
            # {rangeSelected[0]} - # {rangeSelected[rangeSelected.length - 1]}
          </span>
        </div>
      </div>
      <Carousel range={rangeSelected} />
    </div>
  );
};

export default SelectionPanel;
