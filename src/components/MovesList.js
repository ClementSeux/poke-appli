import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TypeTag from "./TypeTag";

const MovesList = ({ moveListEn, size }) => {
  const isInitialMount = useRef(true);

  const [urls, setUrls] = useState([]);
  const [list, setList] = useState([]);
  const [frNames, setFrNames] = useState([]);

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

  //update frNames
  const getFrNames = () => {
    let frListing = [];
    list.map((move) => {
      frListing.push({
        frName: getTranslation(move.names),
        pow: move.power,
        acc: move.accuracy,
        type: move.type,
        class: move.damage_class.name,
      });
      frListing = frListing
        .sort((a, b) => b.pow - a.pow)
        .filter((move) => move.pow >= 55 && move.pow < 150 && move.acc > 69)
        .slice(0, 20);
    });

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
