/*
  백업 데이터 형식
  date는 YYYY-MM-DD 입니다.
  type: text | image | reply
  image는 assets 폴더의 파일명을 사용합니다.

  실제 백업을 넣을 때 messages 배열에 계속 추가하면 됩니다.
*/
const BUBBLE_DATA = {
  artist: "강현",
  bubbleCount: "+816",
  profile: "assets/profile.jpg",
  messages: [
    {date:"2026-09-26", type:"pole", time:"11:01", text:"오늘 저녁 메뉴 골라줘", options:"라면;치킨;피자"},
    {date:"2026-09-26", type:"reply", time:"", title:"ARTIST의 답장", text:"굿나잇 노래 추천해주세요"},
    {date:"2026-09-26", type:"text", time:"00:39", text:"Mondo grosso - 1974 wayhome"},
    {date:"2026-09-27", type:"text", time:"14:35", text:"즐거운주말보내!! 난 오늘도내일도 열일^^^^ 헤헤"},
    {date:"2026-09-27", type:"image", time:"17:34", src:"assets/sample-photo.jpg"},
    {date:"2026-09-27", type:"text", time:"17:34", text:"누가또 이런거보냈어... ㅜ"},
    {date:"2026-09-27", type:"reply", time:"", title:"ARTIST의 답장", text:""}
  ]
};
