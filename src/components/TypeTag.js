import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const TypeTag = ({ type }) => {
  const isInitialMount = useRef(true);
  const [frName, setFrName] = useState([]);

  const getFrName = () => {
    if (type !== "blank" && typeof type !== "undefined") {
      axios.get(type).then((res) => {
        let tempFrName = "";
        try {
          tempFrName = res.data.names.filter((n) => n.language.name === "fr")[0]
            .name;
        } catch {
          tempFrName =
            res.data.names.filter((n) => n.language.name === "en")[0].name +
            " (en)";
        }
        setFrName(tempFrName);
      });
    } else {
      setFrName("blank");
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getFrName();
    }
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
