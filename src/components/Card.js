import React, { useEffect, useState } from "react";
import axios from "axios";
import TypeTag from "./TypeTag";

const Card = ({ number, size }) => {
  const [poke, setPoke] = useState([]);
  const [pokeSpecie, setSpecie] = useState([]);
  const [frName, setFrName] = useState("");
  const [sprite, setSprite] = useState("");
  const [types, setTypes] = useState([]);
  const [type1, setType1] = useState();
  const [type2, setType2] = useState(null);

  const changePoke = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((res) => {
        setPoke(res.data);
        setSprite(res.data.sprites.front_default);
        setTypes(res.data.types);
        setType1(res.data.types[0].type.url);
        if (res.data.types[1]) {
          setType2(res.data.types[1].type.url);
        } else {
          setType2(null);
        }
        axios.get(res.data.species.url).then((res) => {
          setSpecie(res.data);
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
          setFrName(tempFrName);
        });
      });
  };

  useEffect(() => {
    changePoke();
  }, [number]);

  return (
    <div className={"card size-" + size}>
      <img
        className={"sprite size-" + size}
        src={
          sprite
            ? sprite
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png"
        }
        alt=""
      />

      <h2 className={"poke-name size-" + size}>
        #{poke.id} {frName}
      </h2>
      <div className={"type-tags-line size-" + size}>
        <TypeTag type={type1} />
        {typeof type2 === "string" ? <TypeTag type={type2} /> : ""}
      </div>
    </div>
  );
};

export default Card;
