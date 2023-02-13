import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Stats = ({ number, size }) => {
  const [stats, setStats] = useState([]);
  const [statsArray, setStatsArray] = useState([]);

  const getStats = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((res) => {
        setStats(res.data.stats);
      });
  };

  const getStatsArray = () => {
    let array = [];
    stats.map((entry) => {
      let statName = entry.stat.name;
      let base_stat = entry.base_stat;
      array.push({ name: statName, base_stat: base_stat });
    });
    setStatsArray(array);
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getStats();
    }
  }, [number]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getStatsArray();
    }
  }, [stats]);

  return (
    <div id="stat-table" className={"card size-" + size}>
      <h3>STATS</h3>
      <div id="table" className={"size-" + size}>
        <div className={"rep-line line50 size-" + size}></div>
        <div className={"rep-line line100 size-" + size}>
          <span className="rep">100</span>
        </div>
        <div className={"rep-line line150 size-" + size}></div>

        {statsArray.map((stat, i) => {
          return (
            <div className={"stat-line size-" + size} key={i}>
              <div
                className={"bar " + stat.name}
                style={{ width: stat.base_stat * (size === "s" ? 1 : 2) }}
              >
                <span className="stat-tag">
                  {stat.name}:{stat.base_stat}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
