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

// const prizeList = [
//   {
//     name: "三等奖（乐高——兰博基尼）",
//     number: [3, 0], // 正职中奖数和外包中奖数
//     // imgList: [ikbcImg, brushImg, jinmoqiang],
//   },
//   {
//     name: "三等奖（野兽派香薰灯）",
//     number: [2, 1],
//     // imgList: [beatsImg, kindleImg, fengtongImg],
//   },
//   {
//     name: "三等奖（罗技机械键盘）",
//     number: [2, 1],
//     // imgList: [iphoneImg],
//   },
//   {
//     name: "三等奖（中国黄金龙年手链或运转珠）",
//     number: [2, 1],
//     // imgList: [switchImg],
//   },
//   {
//     name: "三等奖（小米手环8Pro）",
//     number: [3, 0],
//   },
//   {
//     name: "二等奖（MaisonMargiela香水）",
//     number: [3, 0], // 正职中奖数和外包中奖数
//     // imgList: [ikbcImg, brushImg, jinmoqiang],
//   },
//   {
//     name: "二等奖（富士拍立得）",
//     number: [2, 1],
//     // imgList: [beatsImg, kindleImg, fengtongImg],
//   },
//   {
//     name: "二等奖（华为WATCH FIT 2）",
//     number: [3, 1],
//     // imgList: [iphoneImg],
//   },
//   {
//     name: "一等奖（华为MatePad）",
//     number: [0, 1],
//     // imgList: [switchImg],
//   },
//   {
//     name: "一等奖（星巴克1500消费卡）",
//     number: [1, 0],
//   },
//   {
//     name: "一等奖（音响）",
//     number: [1, 0],
//   },
//   {
//     name: "一等奖（香奈儿女士项链）",
//     number: [1, 0],
//   },
//   {
//     name: "一等奖（Gucci男士手链）",
//     number: [1, 0],
//   },
//   {
//     name: "一等奖（风生水起摆件）",
//     number: [1, 0],
//   },
//   {
//     name: "特等奖",
//     number: [2, 0],
//   },
// ];

const prizeList = [
  {
    name: "Amazing Gift",
    number: [5, 0],
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
      currentPriceNumber: [0, 0], // 正职，外包中奖数
      buttonText: "start",
      hasReset: true,
      status: false,
      finalList: [],
      tempList: [],
      showFinalList: false,
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
  }

  componentDidMount() {
    let prevStatus;
    let callback = () => {
      let index = generateRandomNumber(this.state.companyNos.length);
      if (this.state.status) {
        this.setState({
          companyNo: this.state.companyNos[index].name,
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

          tempList.push(companyNos[index]);
          companyNos.splice(index, 1);
          console.log(tempList, companyNos);
          return {
            companyNos: companyNos,
            companyNo: prevState.companyNos[index].name,
            currentName: prevState.companyNos[index].name,
            currentPriceNumber: [
              prevState.currentPriceNumber[0] + 1,
              prevState.currentPriceNumber[1],
            ],
            tempList,
            hasReset: false,
          };
        });
        // this.setState((prevState) => {
        //   let companyNos = [...prevState.companyNos];
        //   let tempList = [...prevState.tempList];

        //   // 区分正职和外包奖池，如果抽中的是外包则判断外包的奖池是否抽完，抽中的是正职则判断正职的奖池是否抽完
        //   while (
        //     (justifyNumber(companyNos[index].email, companyNos[index].isWb) &&
        //       prevState.currentPriceNumber[1] >=
        //         prizeList[prevState.currentPriceIndex].number[1]) ||
        //     (!justifyNumber(companyNos[index].email, companyNos[index].isWb) &&
        //       prevState.currentPriceNumber[0] >=
        //         prizeList[prevState.currentPriceIndex].number[0])
        //   ) {
        //     index = generateRandomNumber(companyNos.length);
        //   }
        //   let isWbGetPrize = justifyNumber(
        //     companyNos[index].email,
        //     companyNos[index].isWb
        //   );
        //   tempList.push(companyNos[index]);
        //   companyNos.splice(index, 1);
        //   return {
        //     companyNos: companyNos,
        //     companyNo: prevState.companyNos[index].email,
        //     currentName: prevState.companyNos[index].name,
        //     currentPriceNumber: isWbGetPrize
        //       ? [
        //           prevState.currentPriceNumber[0],
        //           prevState.currentPriceNumber[1] + 1,
        //         ]
        //       : [
        //           prevState.currentPriceNumber[0] + 1,
        //           prevState.currentPriceNumber[1],
        //         ],
        //     tempList,
        //   };
        // });
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
    if (this.state.buttonText != "pause") {
      this.setState({
        buttonText: "pause",
        status: true,
      });
    } else {
      this.setState({
        buttonText: "next",
        status: false,
      });
    }
  }

  handleReset() {
    this.setState(
      (prevState) => {
        let tempList = prevState.tempList.slice(0, -1);
        return {
          hasReset: true,
          tempList,
          currentPriceNumber: [
            prevState.currentPriceNumber[0] - 1,
            prevState.currentPriceNumber[1],
          ],
        };
      },
      () => {
        console.log(this.state.tempList, this.state.companyNos);
      }
    );
  }

  handleNextBtnClick() {
    if (this.state.currentPriceIndex < prizeList.length - 1) {
      this.setState((prevState) => {
        let finalList = [...prevState.finalList];
        finalList.unshift({
          priceName: prizeList[prevState.currentPriceIndex].name,
          memberList: prevState.tempList,
        });
        // console.log(finalList);
        return {
          currentPriceIndex: prevState.currentPriceIndex + 1,
          currentPriceNumber: [0, 0],
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
        // console.log(finalList);
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

  getTotalNumber(number) {
    return number.reduce((total, num) => total + num, 0);
  }

  render() {
    return !this.state.showFinalList ? (
      <div className="lottery-card">
        <div className="lottery-title">
          {prizeList[this.state.currentPriceIndex].name}
          <p className="lottery-subtitle">
            {this.getTotalNumber(this.state.currentPriceNumber)}/
            {this.getTotalNumber(
              prizeList[this.state.currentPriceIndex].number
            )}
          </p>
        </div>
        {/* {!!prizeList[this.state.currentPriceIndex].imgList && (
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
        )} */}
        <p className="lottery-number">{this.state.companyNo}</p>
        {!!this.state.currentName && (
          <p className="lottery-name">{this.state.currentName}</p>
        )}
        <button
          onClick={this.handleBtnClick}
          className="lottery-button"
          disabled={
            this.getTotalNumber(this.state.currentPriceNumber) >=
            this.getTotalNumber(prizeList[this.state.currentPriceIndex].number)
          }
        >
          {this.state.buttonText}
        </button>
        <button
          onClick={this.handleReset}
          className="lottery-button"
          disabled={this.state.hasReset}
        >
          reset
        </button>
        <button
          onClick={this.handleNextBtnClick}
          className="lottery-button"
          disabled={
            this.getTotalNumber(this.state.currentPriceNumber) <
            this.getTotalNumber(prizeList[this.state.currentPriceIndex].number)
          }
        >
          {this.state.currentPriceIndex < prizeList.length - 1
            ? "next"
            : "winner list"}
        </button>
      </div>
    ) : (
      <FinalList finalList={this.state.finalList} />
    );
  }
}
