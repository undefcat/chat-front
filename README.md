
# chat-front

[DEMO Page](https://chat.taku.kr)

모든 요청, 응답은 `vuex`의 `dispatch`를 이용하여 처리한다.

## api/websocket

웹소켓 래퍼 클래스

- 페이지에 접속 후 서버와 웹소켓 연결을 시도하여, 3회 실패하면 오류 메세지를 띄운다.

- 서버로부터 푸쉬받는 메세지는 모두 `vuex`로 `dispatch`한다.

- 서버로 푸쉬하는 메세지 프로토콜은 HTTP메세지와 비슷하게 첫줄에는 메세지 타입이며, 한 줄의 공백 뒤에 Body영역에 상세 데이터를 `JSON`타입으로 전송한다.

## pages/index

- 대기실 페이지

- 닉네임을 설정하고, 존재하는 채팅방 리스트를 보여준다.

## pages/room

- 채팅방 페이지

## plugins/element.js

- [`ElementUI`](https://elementui.github.io/dev/master/#/en-US)

## Docker

- 도커로 빌드하면 `vue-cli`로 정적 파일로 빌드한 뒤, `nginx`를 이용해 정적파일 서버 호스팅을 한다.

- 기본 포트인 80포트를 노출한다.
