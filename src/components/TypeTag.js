import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const TypeTag = ({ type }) => {
  const [frName, setFrName] = useState([]);

  const getFrName = () => {
    switch (type) {
      case "normal":
      case 1:
        setFrName("Normal");
        break;
      case "fighting":
      case 2:
        setFrName("Combat");
        break;
      case "flying":
      case 3:
        setFrName("Vol");
        break;
      case "poison":
      case 4:
        setFrName("Poison");
        break;
      case "ground":
      case 5:
        setFrName("Sol");
        break;
      case "rock":
      case 6:
        setFrName("Roche");
        break;
      case "bug":
      case 7:
        setFrName("Insecte");
        break;
      case "ghost":
      case 8:
        setFrName("Spectre");
        break;
      case "steel":
      case 9:
        setFrName("Acier");
        break;
      case "fire":
      case 10:
        setFrName("Feu");
        break;
      case "water":
      case 11:
        setFrName("Eau");
        break;
      case "grass":
      case 12:
        setFrName("Plante");
        break;
      case "electric":
      case 13:
        setFrName("Électrik");
        break;
      case "psychic":
      case 14:
        setFrName("Psy");
        break;
      case "ice":
      case 15:
        setFrName("Glace");
        break;
      case "dragon":
      case 16:
        setFrName("Dragon");
        break;
      case "dark":
      case 17:
        setFrName("Ténèbres");
        break;
      case "fairy":
      case 18:
        setFrName("Fée");
        break;
      case "special":
        setFrName("Sp");
        break;
      case "physical":
        setFrName("Ph");
        break;
      case "status":
        setFrName("St");
        break;
    }
  };

  useEffect(() => {
    getFrName();
  }, [type]);

  return (
    <span
      className={
        "type-tag " + (typeof frName === "string" ? frName.toLowerCase() : "")
      }
    >
      {frName !== "blank" ? frName : ""}
    </span>
  );
};

export default TypeTag;
