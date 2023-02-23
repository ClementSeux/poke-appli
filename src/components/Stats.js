import React, { useEffect, useState, useRef } from "react";

const Stats = ({ stats, size }) => {
  const isInitialMount = useRef(true);

  return (
    <div id="stat-table" className={"card size-" + size}>
      <h3>STATS</h3>
      <div id="table" className={"size-" + size}>
        <div className={"rep-line line50 size-" + size}></div>
        <div className={"rep-line line100 size-" + size}>
          <span className="rep">100</span>
        </div>
        <div className={"rep-line line150 size-" + size}></div>

        {stats.map((stat, i) => {
          return (
            <div className={"stat-line size-" + size} key={i}>
              <div
                className={"bar " + stat.name}
                style={{
                  width:
                    stat.base_stat *
                    (size === "s" ? 1 : size === "m" ? 1.5 : 2),
                }}
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
