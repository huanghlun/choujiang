import React from "react";
import { memberList } from "./constants.js";
import { generateRandomNumber, justifyNumber } from "./utils.js";

export default class FinalList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="member-card">
        {this.props.finalList.map((obj) => {
          return (
            <div className="final-info" key={obj.priceName}>
              <p className="final-price-name">{obj.priceName}</p>
              <div className="final-price-member-container">
                {obj.memberList.map((member) => {
                  return (
                    <p className="final-price-member" key={member.companyNo}>
                      {member.name}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
