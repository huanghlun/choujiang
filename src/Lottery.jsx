import React from "react";
import { memberList } from "./constants.js";
import FinalList from "./FinalList.jsx";
import { generateRandomNumber, justifyNumber } from "./utils.js";
import ikbcImg from "./assets/ikbc.png";
import brushImg from "./assets/brush.png";
import jinmoqiang from "./assets/jinmoqiang.png";
import beatsImg from "./assets/beats.png";
import kindleImg from "./assets/kindle.png";
import fengtongImg from "./assets/fengtong.png";
import iphoneImg from "./assets/iphone.png";
import switchImg from "./assets/switch.png";

const prizeList = [
  {
    name: "三等奖",
    number: 10,
    imgList: [ikbcImg, brushImg, jinmoqiang],
  },
  {
    name: "二等奖",
    number: 6,
    imgList: [beatsImg, kindleImg, fengtongImg],
  },
  {
    name: "一等奖",
    number: 1,
    imgList: [iphoneImg],
  },
  {
    name: "组长奖",
    number: 3,
    imgList: [switchImg],
  },
  {
    name: "boss大奖",
    number: 1,
  },
];

export default class Lottery extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      companyNos: [...memberList],
      companyNo: "---",
      currentName: "",
      currentPriceIndex: 0,
      currentPriceNumber: 0,
      buttonText: "开始",
      status: false,
      finalList: [],
      tempList: [],
      showFinalList: false,
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
  }

  componentDidMount() {
    let prevStatus;
    let callback = () => {
      let index = generateRandomNumber(this.state.companyNos.length);
      if (this.state.status) {
        this.setState({
          companyNo: this.state.companyNos[index].companyNo,
          currentName: "",
        });
      } else if (
        !this.state.status &&
        prevStatus != undefined &&
        this.state.status != prevStatus
      ) {
        this.setState((prevState) => {
          let companyNos = [...prevState.companyNos];
          let tempList = [...prevState.tempList];
          while (justifyNumber(companyNos[index].companyNo)) {
            index = generateRandomNumber(companyNos.length);
          }
          tempList.push(companyNos[index]);
          companyNos.splice(index, 1);
          console.log(tempList);
          return {
            companyNos: companyNos,
            companyNo: prevState.companyNos[index].companyNo,
            currentName: prevState.companyNos[index].name,
            currentPriceNumber: prevState.currentPriceNumber + 1,
            tempList,
          };
        });
      }
      prevStatus = this.state.status;
    };
    let animateFunc = () => {
      callback();
      window.requestAnimationFrame(animateFunc);
    };
    window.requestAnimationFrame(animateFunc);
  }

  handleBtnClick() {
    if (this.state.buttonText != "暂停") {
      this.setState({
        buttonText: "暂停",
        status: true,
      });
    } else {
      this.setState({
        buttonText: "继续",
        status: false,
      });
    }
  }

  handleNextBtnClick() {
    if (this.state.currentPriceIndex < prizeList.length - 1) {
      this.setState((prevState) => {
        let finalList = [...prevState.finalList];
        finalList.unshift({
          priceName: prizeList[prevState.currentPriceIndex].name,
          memberList: prevState.tempList,
        });
        console.log(finalList);
        return {
          currentPriceIndex: prevState.currentPriceIndex + 1,
          currentPriceNumber: 0,
          companyNo: "---",
          currentName: "",
          tempList: [],
          finalList,
          showFinalList: false,
        };
      });
    } else {
      this.setState((prevState) => {
        let finalList = [...prevState.finalList];
        finalList.unshift({
          priceName: prizeList[prevState.currentPriceIndex].name,
          memberList: prevState.tempList,
        });
        console.log(finalList);
        return {
          companyNo: "---",
          currentName: "",
          tempList: [],
          finalList,
          showFinalList: true,
        };
      });
    }
  }

  render() {
    return !this.state.showFinalList ? (
      <div className="lottery-card">
        <div className="lottery-title">
          {prizeList[this.state.currentPriceIndex].name}
          <p className="lottery-subtitle">
            {this.state.currentPriceNumber}/
            {prizeList[this.state.currentPriceIndex].number}
          </p>
        </div>
        {!!prizeList[this.state.currentPriceIndex].imgList && (
          <div className="lottery-image-list">
            {prizeList[this.state.currentPriceIndex].imgList.map(
              (src, i, arr) => {
                return (
                  <img
                    src={src}
                    key={i}
                    className="lottery-image"
                    style={arr.length == 1 ? { width: "200px" } : {}}
                  />
                );
              }
            )}
          </div>
        )}
        <p className="lottery-number">{this.state.companyNo}</p>
        {!!this.state.currentName && (
          <p className="lottery-name">{this.state.currentName}</p>
        )}
        <button
          onClick={this.handleBtnClick}
          className="lottery-button"
          disabled={
            this.state.currentPriceNumber >=
            prizeList[this.state.currentPriceIndex].number
          }
        >
          {this.state.buttonText}
        </button>
        <button
          onClick={this.handleNextBtnClick}
          className="lottery-button"
          disabled={
            this.state.currentPriceNumber <
            prizeList[this.state.currentPriceIndex].number
          }
        >
          {this.state.currentPriceIndex < prizeList.length - 1
            ? "next"
            : "中奖名单"}
        </button>
      </div>
    ) : (
      <FinalList finalList={this.state.finalList} />
    );
  }
}
