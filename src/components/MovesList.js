import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TypeTag from "./TypeTag";

const MovesList = ({ moveListEn, size, sendCoverage, rank }) => {
  const isInitialMount = useRef(true);

  const [urls, setUrls] = useState([]);
  const [list, setList] = useState([]);
  const [frNames, setFrNames] = useState([]);
  const [coverage, setCoverage] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
  });

  const getTranslation = (names) => {
    let frName = "";
    try {
      frName = names.filter((n) => n.language.name === "fr")[0].name;
    } catch {
      frName = names.filter((n) => n.language.name === "en")[0].name + " (en)";
    }
    return frName;
  };

  //updates urls
  const fetchUrls = () => {
    let urlList = [];
    moveListEn.map((move) => urlList.push(move.move.url));
    setUrls(urlList);
  };

  //updates list
  const requests = urls.map((url) => axios.get(url));
  const batchRequests = () => {
    let listing = [];
    axios.all(requests).then((responses) => {
      responses.map((resp) => listing.push(resp.data));
      setList(listing);
    });
  };

  const getTypeNumber = (typeName) => {
    switch (typeName) {
      case "normal":
        return 1;
        break;
      case "fighting":
        return 2;
        break;
      case "flying":
        return 3;
        break;
      case "poison":
        return 4;
        break;
      case "ground":
        return 5;
        break;
      case "rock":
        return 6;
        break;
      case "bug":
        return 7;
        break;
      case "ghost":
        return 8;
        break;
      case "steel":
        return 9;
        break;
      case "fire":
        return 10;
        break;
      case "water":
        return 11;
        break;
      case "grass":
        return 12;
        break;
      case "electric":
        return 13;
        break;
      case "psychic":
        return 14;
        break;
      case "ice":
        return 15;
        break;
      case "dragon":
        return 16;
        break;
      case "dark":
        return 17;
        break;
      case "fairy":
        return 18;
        break;
    }
  };

  const addCoverage = (typeEn) => {
    let coverageCopy = coverage;
    coverageCopy[getTypeNumber(typeEn)] = true;
    setCoverage(coverageCopy);
  };

  //update frNames
  const getFrNames = () => {
    //reinitialize coverage
    setCoverage({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false,
    });

    let frListing = [];
    list.map((move) => {
      if (move.power >= 55 && move.power < 150 && move.accuracy > 69) {
        addCoverage(move.type.name);
        frListing.push({
          frName: getTranslation(move.names),
          pow: move.power,
          acc: move.accuracy,
          type: move.type,
          class: move.damage_class.name,
        });
      }
    });
    frListing = frListing.sort((a, b) => b.pow - a.pow);
    setFrNames(frListing);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUrls();
    }
  }, [moveListEn]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      batchRequests();
    }
  }, [urls]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getFrNames();
    }
  }, [list]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      sendCoverage(coverage, rank);
    }
  }, [coverage]);

  return (
    <div className={"card size-" + size}>
      <ul className={"scroller size-" + size}>
        <li key={0}>
          <div className="move-line header-line">
            <span className="">
              <b>Attaque</b>{" "}
            </span>
            {size === "l" && <span>Puis. / Précis.</span>}

            <div className="tags-section">
              {size === "l" && <span>Classe </span>}
              <span>Type</span>
            </div>
          </div>
          <hr />
        </li>
        {frNames.map((move, i) => {
          return (
            <li key={i}>
              <div className="move-line">
                <span className="">
                  <b>{move.frName}</b>{" "}
                </span>
                {size === "m" && <span> P:{move.pow}</span>}

                {size === "l" && (
                  <span>
                    {" "}
                    {move.pow} / {move.acc}
                  </span>
                )}

                <div className="tags-section">
                  {size === "l" && <TypeTag type={move.class} />}
                  <TypeTag type={move.type.name} />
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovesList;
