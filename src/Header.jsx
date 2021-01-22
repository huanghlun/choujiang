import React from "react";
import { memberList } from "./constants.js";
import { generateRandomNumber, justifyNumber } from "./utils.js";

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <p className="header-text" onClick={() => this.props.onClick(0)}>
          抽奖
        </p>
        <p className="header-text" onClick={() => this.props.onClick(1)}>
          名单
        </p>
      </div>
    );
  }
}
