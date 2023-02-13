import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TypeTag from "./TypeTag";

const MovesList = ({ number }) => {
  const isInitialMount = useRef(true);
  const [moves, setMoves] = useState([]);
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

  //updates moves
  const getList = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((res) => {
        setMoves(res.data.moves);
      });
  };
  //updates urls
  const fetchUrls = () => {
    let urlList = [];
    moves.map((move) => urlList.push(move.move.url));
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
        type: move.type,
      });
      frListing = frListing
        .sort((a, b) => b.pow - a.pow)
        .filter((move) => move.pow >= 55 && move.pow < 150)
        .slice(0, 20);
    });

    setFrNames(frListing);
  };

  //cascade effects
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getList();
    }
  }, [number]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUrls();
    }
  }, [moves]);

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
    <div className="card ">
      <ul className="scroller">
        {frNames.map((move, i) => {
          return (
            <li key={i}>
              <div className="move-line">
                <span className="">
                  {move.frName} pow: {move.pow}
                </span>
                <TypeTag type={move.type.url} />
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
