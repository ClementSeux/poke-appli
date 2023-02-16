import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import SelectionPanel from "../components/SelectionPanel";
import Stats from "../components/Stats";

const SelectionMode = ({ visible, toggleMode }) => {
  //data du poké hovered
  const [preSelection, setPpreSelection] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });

  //data du poké clicked
  const [selection, setSelection] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });

  //faire les appels

  return (
    <div className={"grey-screen " + (visible ? "visible" : "")}>
      <div className="selection-display">
        {/* fournir à la partie display les datas, on hover, et on click */}
        <Card poke={preSelection} size={"s"} />
        <Stats stats={selection.stats} size="s" />
        <MovesList moveListEn={selection.moveListEn} size="m" />
      </div>

      <SelectionPanel />

      <div className="button" onClick={() => toggleMode()}>
        Retour
      </div>
    </div>
  );
};

export default SelectionMode;
