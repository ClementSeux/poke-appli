import React, { useEffect, useState } from "react";
import axios from "axios";
import TypeTag from "./TypeTag";

const Card = ({ poke, size }) => {
  return (
    <div className={"card size-" + size}>
      <img
        className={"sprite size-" + size}
        src={
          poke.spriteUrl
            ? poke.spriteUrl
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png"
        }
        alt=""
      />

      <h2 className={"poke-name size-" + size}>
        # {poke.id} - {poke.frName}
      </h2>
      <div className={"type-tags-line size-" + size}>
        <TypeTag type={poke.types[0]} />
        {typeof poke.types[1] === "string" ? (
          <TypeTag type={poke.types[1]} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
