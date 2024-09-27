import React from "react";
import { memberList } from "./constants.js";
import { generateRandomNumber, justifyNumber } from "./utils.js";

export default class MemberList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="member-card" style={{ height: "600px" }}>
        {memberList.map((obj) => {
          return (
            <div className="member-info" key={obj.name}>
              {/* <p className="member-item">{obj.companyNo}</p> */}
              <p className="member-item">{obj.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
