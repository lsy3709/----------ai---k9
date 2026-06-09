// 한 줄 실행: Ctrl + Alt + S  /  전체 실행: Ctrl + Alt + R

use("testDB"); // DB 선택 (없으면 데이터 넣을 때 생성)
db.testCollection.insertOne({ name: "이상용", age: 20 }); // 첫 문서 삽입

//////////////////////////////////////////////////////////
use("testDB");
db.testCollection.find(); // 조회

//////////////////////////////////////////////////////////
use("testDB"); // testDB 선택 (생략 시 기본 test DB 사용)
// use를 안 쓰면 기본 test DB에 저장되니 주의

db.testCollection.insertOne({
  name: "이상용",
  age: 20,
  favoriteFood: ["국밥", "국수", "고기"], // 배열도 그대로 저장 가능
});

//////////////////////////////////////////////////////////
use("testDB");
db.testCollection.find(); // 방금 넣은 문서 확인

//////////////////////////////////////////////////////////
use("testDB");
// 이름이 '이상용'인 문서의 age를 33으로 변경
db.testCollection.updateOne(
  { name: "이상용" }, // 조건(filter)
  { $set: { age: 33 } }, // 변경 내용
);
//////////////////////////////////////////////////////////
// 이름이 '이상용'인 문서 삭제
use("testDB");
db.testCollection.deleteOne({ name: "이상용" });

//////////////////////////////////////////////////////////
use("playgroundDB");

db.sales.insertMany([
  {
    item: "abc",
    price: 10,
    quantity: 2,
    date: new Date("2014-03-01T08:00:00Z"),
  },
  {
    item: "jkl",
    price: 20,
    quantity: 1,
    date: new Date("2014-03-01T09:00:00Z"),
  },
  {
    item: "xyz",
    price: 5,
    quantity: 10,
    date: new Date("2014-03-15T09:00:00Z"),
  },
  {
    item: "abc",
    price: 10,
    quantity: 10,
    date: new Date("2014-04-04T21:23:13Z"),
  },
]);

// 2014년에 팔린 상품을 item별 총매출로 묶어보기 (CH17 집계 미리보기)
db.sales.aggregate([
  {
    $match: {
      date: { $gte: new Date("2014-01-01"), $lt: new Date("2015-01-01") },
    },
  },
  {
    $group: {
      _id: "$item",
      totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
    },
  },
]);
