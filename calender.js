// console.log(`1. Rander Calaender < month >
// 2. On double click, CRUD with LS
// 3. save event as hoverabel dots showing detailed dialog`);
let X = [
  { date: "12/12/2023", msg: "working" },
  { date: "13/12/2023", msg: "working" },
  { date: "11/12/2023", msg: "working" },
  { date: "9/3/2024", msg: "working" },
  { date: "9/3/2024", msg: "working" },
  { date: "9/2/2024", msg: "working" },
  { date: "3/2/2024", msg: "working" },
];

function drawCalendar(startDate, endDate, viewMode) {
  //yeh kam kar lia to bas
}
let spanOfCells = document.querySelector(".span-of-cells");
let currMnthSpan = document.querySelector(".current-month");
let RightNow = dayjs();
let day = 0;
let endOfMonth;
let y;
let m;
let d;


let currentDate = document.querySelector(".current-date");
currentDate.innerHTML += RightNow.format("DD/MM/YYYY").toString();


function currMnthSpanHTML(rightNow) {
  currMnthSpan.innerHTML = `${rightNow.format("DD/MMMM/YYYY").split("/")[1]} 
  ${rightNow.format("DD/MMMM/YYYY").split("/")[2]
  }`;
}
currMnthSpanHTML(RightNow);

endOfMonth = RightNow.endOf("month").date();

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
let a = localStorage.setItem('event',JSON.stringify(X))
let LSData = localStorage.getItem('event');

function server(browserLSData) {
  if (browserLSData) {
    LSData = JSON.parse(LSData)
  }else{
    LSData = [];
  }
  // LSData = localStorage.setItem('event' , JSON.stringify[LSData]);
}
server(LSData)
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////



function getEventsHtmlForDate(events) {
  return events.map((evt) => `${evt.date} <br>`);
}

function renderingCells(noOfCells, currMonth, currYear) {
  let reqLsData = LSData.filter((reqObj) => 
    reqObj.date.endsWith(`${currMonth + 1}/${currYear}`)
  );
  // console.log(reqLsData);

  for (let i = 1; i <= noOfCells; i++) {
    ++day;
    const eventsHtml = getEventsHtmlForDate(
      reqLsData.filter((evt) => evt.date.split("/")[0] === `${day}`)
    );
    spanOfCells.innerHTML += `<div ondblclick="dblClik(this,RightNow.month(),RightNow.year())" class="month">${day}<hr style="border: 1px solid yellow;"><span class="li">${eventsHtml}</span></div>`;
  }
}
renderingCells(endOfMonth, RightNow.month(), RightNow.year());

function dblClik(currCell, currMonth, currYear) {
  let test =
    currCell.firstChild.nodeValue + "/" + `${currMonth + 1}` + "/" + currYear;
  console.log(currCell, +currCell.firstChild.nodeValue, test);
  openForm()
}

let dec_inc_Month = (btn) => {
  spanOfCells.innerHTML = null;
  day = 0;
  let inc_dec_btn = btn.childNodes[0].nodeValue;

  y = RightNow.year();
  m = RightNow.month();
  d = RightNow.date();
  let monthRef = Number(`${RightNow.month() + 1}`);

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  if (inc_dec_btn === "<") {
    monthRef = Math.abs(monthRef - 1);
    // console.log('monthRef: ', monthRef);

    if (monthRef === 0) {
      monthRef = Math.abs(monthRef - 12);
      y = y - 1;
    }
    // console.log('monthRef: ', monthRef);
    if (monthRef !== 0) RightNow = dayjs(`${monthRef}/${12}/${y}`);
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
  } else if (inc_dec_btn === ">") {
    monthRef = Math.abs(monthRef + 1);
    // console.log('monthRef: ', monthRef);

    if (monthRef === 0 || monthRef > 12) {
      monthRef = Math.abs(monthRef - 12);
      y = y + 1;
    }
    if (monthRef !== 0) RightNow = dayjs(`${monthRef}/${12}/${y}`);
    // console.log('monthRef: ', monthRef, );
  }
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  // console.log("spanOfCells: ", spanOfCells.childNodes);

  endOfMonth = RightNow.endOf("month").date();
  renderingCells(endOfMonth, RightNow.month(), RightNow.year());
  currMnthSpanHTML(RightNow);
};
