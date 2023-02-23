import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const SpriteBox = ({ arrayOfPokeDatas, cursor }) => {
  const [cardsPile, setCardsPile] = useState([
    null,
    <Card poke={arrayOfPokeDatas[1]} size="s" key={1} />,
  ]);

  const getCards = (arr) => {
    //on copie la pile de cartes
    let content = cardsPile.slice(0, 10000);

    //on map à travers les données reçues
    arrayOfPokeDatas.slice(1, 10000).map((poke) => {
      //si la carte n'existe pas, on la crée
      if (!content[poke.id]) {
        content[poke.id] = <Card poke={poke} size="s" key={poke.id} />;
        console.log("card added :");
        console.log(poke);
      }
    });

    setCardsPile(content);
  };

  useEffect(() => {
    getCards(arrayOfPokeDatas);
  }, [arrayOfPokeDatas]);

  useEffect(() => {
    //visualisation
    console.log("spritebox :");
    console.log("   array :");
    console.log(arrayOfPokeDatas);
    console.log("   cursor " + cursor);
    console.log("   cards Pile :");
    console.log(cardsPile);
  }, [arrayOfPokeDatas, cursor]);

  return (
    <div id="sprites-container" className="">
      <div className={"sprite-default card size-s"}>{cardsPile[cursor]}</div>
    </div>
  );
};

export default SpriteBox;
