const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [];
let mbti = "";

function calResult() {
  let pointArray = [
    {
      name: "E",
      value: 0,
      key: 0,
    },
    {
      name: "I",
      value: 0,
      key: 1,
    },
    {
      name: "S",
      value: 0,
      key: 2,
    },
    {
      name: "N",
      value: 0,
      key: 3,
    },
    {
      name: "J",
      value: 0,
      key: 4,
    },
    {
      name: "P",
      value: 0,
      key: 5,
    },
    {
      name: "T",
      value: 0,
      key: 6,
    },
    {
      name: "F",
      value: 0,
      key: 7,
    },
  ];

  for (let i = 0; i < endPoint; i++) {
    let target = qnaList[i].a[select[i]];
    for (let j = 0; j < target.type.length; j++) {
      for (let k = 0; k < pointArray.length; k++) {
        if (target.type[j] === pointArray[k].name) {
          pointArray[k].value += 1;
        }
      }
    }
  }

  let resultArray = pointArray.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });

  mbti += resultArray[0].name;
  mbti += resultArray[1].name;
  mbti += resultArray[2].name;
  mbti += resultArray[3].name;
  return mbti;
}

function sortString(str) {
  return str.split("").sort().join("");
}

function setResult() {
  let point = calResult();
  sorting_mbti = "";
  let idx = 0;
  const resultName = document.querySelector(".resultname");
  for (let i = 0; i < infoList.length; i++) {
    if (sortString(point) === sortString(infoList[i].type)) {
      resultName.innerHTML = infoList[i].name;
      sorting_mbti = infoList[i].type;
      idx = i;
    }
  }
  // console.log("sorting_mbti : ", sorting_mbti);
  let resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  let imgURL = "../assets/img/result/image-" + idx + ".png";
  resultImg.src = imgURL;
  resultImg.alt = idx;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[idx].desc;

  const resultJob = document.querySelector(".resultJob");
  const job_list = infoList[idx].job.split(",");

  job_list.forEach((element, i) => {
    resultJob.innerHTML += `<li class="job-${i}">${element}</li>`;
  });

  setTimeout(() => {
    for (let i = 0; i < job_list.length; i++) {
      document.querySelector(`.job-${i}`).classList.add("is-red");
    }
    setTimeout(() => {
      for (let i = 0; i < job_list.length; i++) {
        document.querySelector(`.job-${i}`).classList.remove("is-red");
      }
      setTimeout(() => {
        for (let i = 0; i < job_list.length; i++) {
          document.querySelector(`.job-${i}`).classList.add("is-red");
        }
        setTimeout(() => {
          for (let i = 0; i < job_list.length; i++) {
            document.querySelector(`.job-${i}`).classList.remove("is-red");
          }
        }, 1000);
      }, 2000);
    }, 3000);
  }, 4000);
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "flex";
      result.style.flexDirection = "column";
      result.style.width = "80%";
      result.style.textAlign = "center";
      result.style.borderRadius = "20px";
    }, 450);
  });
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  let a = document.querySelector(".answerBox");
  let answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener(
    "click",
    () => {
      let children = document.querySelectorAll(".answerList");
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        select[qIdx] = idx;
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        goNext(++qIdx);
      }, 450);
    },
    false
  );
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  let q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  let status = document.querySelector(".progress-bar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
  status.style.backgroundColor = "#FFDE66";
  status.style.height = "30px";
  status.style.borderRadius = "30px";
  if (status.style.width === "100%") {
    status.style.backgroundColor = "hotpink";
  }
}

function begin() {
  let startBtn = document.querySelector("#startBtn");
  startBtn.disabled = true;
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "flex";
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
