# Poong-dung-react   
   
   
## 한강 수온 체크 웹앱 Poongdung 입니다.   
    
## 프로젝트 상세   
#### 현재 한강 수온 및 수온 통계를 그래프로 확인이 가능합니다.   
   
   
## 저는 이 프로젝트를 통해...   
   
  ### Back-end   
Open API를 활용하여 데이터를 추출하여 활용하는 법을 배웠습니다.   
서버에서 쿼리를 보내 RDB의 CRUD기능을 활용하는 법을 배웠습니다.   
파이썬을 통한 데이터 가공 방법을 배웠습니다.   
스케줄러 기능을 구현/활용하는 법을 배웠습니다.   
Node.js/Express.js를 이용해 API를 구현하는 법을 배웠습니다.   
   
  ### Front-end   
React JS의 state 생명주기를 활용하여 클라이언트 단을 구현할 줄 안다.   
Back-end에서 만든 API에서 쿼리 요청을 통해 데이터를 받아오는 법을 배웠습니다.   
HTML5이 지원하는 <canvas>태그의 2D Context에서 받아온 데이터를 이용해 통계 그래프를 구현하는 법을 배웠습니다.     
   
   
### 추가 구현 예정 기능   
   
- [x] DB 추가 ( Mysql DB ) - 20.04.14 구현   
- [x] 주기적으로 open API 에서 DB에 데이터를 추가할 스케줄러 구현  - 20.04.14 구현   
- [x] DB 데이터를 기반으로 한 API 구현  - 20.04.14 구현   
- [x] React-router 기능 구현 - 20.04.17 구현   
- [x] API에서 데이터를 받아와 HTML Canvas를 통한 통계 그래프 구현  - 20.04.17 구현   
   
   
## 사용 기술 스택   
   
### Back-end   
1. Mysql : RDB를 구현하기 위해 사용했습니다.   
2. python/requests : Open API(https://data.seoul.go.kr/dataList/OA-15488/S/1/datasetView.do)에서 데이터를 받아와 동기적 처리방식으로 데이터를 가공하기 위해 사용했습니다.   
3. Node.js/node-scheduler : 매일 6, 9, 12, 24시마다 데이터를 받아올 python파일을 실행시켜 DB에 저장하도록 하기 위해 사용했습니다.   
4. Node.js/Express : API를 router형식으로 만들기 위해 사용했습니다.   
### Front-end   
1. ReactJS/react-router-dom : SPA를 만드는것이 목적이었기 때문에 사용했습니다. react-router-dom은 한번 써보고싶어서 사용했습니다.
2. HTML5 Canvas : 서버단에서 가져온 데이터로 그래프를 그리기 위해 사용했습니다.
