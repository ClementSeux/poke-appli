import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import MovesList from "../components/MovesList";
import SelectionPanel from "../components/SelectionPanel";
import Stats from "../components/Stats";

const SelectionMode = ({ visible, toggleMode }) => {
  const [preSelection, setPpreSelection] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  const [selection, setSelection] = useState({
    id: null,
    frName: "",
    spriteUrl: "",
    moveListEn: [],
    types: [],
    stats: [],
  });
  return (
    <div className={"grey-screen " + (visible ? "visible" : "")}>
      <div className="selection-display">
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
