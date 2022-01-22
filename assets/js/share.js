const url = "https://jobtype.netlify.app/";

function setShare() {
  let resultImg = document.querySelector("#resultImg");
  let resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = "추천 당신의 직업 결과";
  const shareName = infoList[resultAlt].name;
  const shareImage = url + "img/result/image-" + resultAlt + ".png";
  const shareURL = url + "page/result-" + resultAlt + ".html";

  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: shareTitle,
      description: shareName,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },

    buttons: [
      {
        title: "결과 확인하기",
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
    ],
  });
}
