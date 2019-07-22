import store from '../store'

class WS {
  constructor() {
    if (!window.WebSocket) {
      alert('최신 브라우저를 사용해주세요 ㅠ_ㅠ')
      return
    }

    this.reconnectionCount = 3

    const conn = new window.WebSocket(`ws://${document.location.host}/ws`)

    conn.onmessage = function (e) {
      const json = JSON.parse(e.data)

      // 응답 메세지 타입은 뒤에 Res suffix를 붙이기로 한다.
      store.dispatch(`${json.type}Res`, json)
    }

    conn.onclose = function () {
      store.dispatch('close')
    }

    conn.onerror = function (e) {
      store.dispatch('error', e)
    }

    this.conn = conn
  }

  send(type, data = null) {
    // 연결되지 않은 상태라면
    // 최대 3회 재접속을 시도한다.
    if (this.conn.readyState !== 1) {

      if (this.reconnectionCount === 0) {
        const msg = '서버가 응답하지 않습니다.'

        window.console.error(msg)
        window.alert(msg)
        return
      }

      setTimeout(() => {
        this.send(type, data)
      }, 1500)

      this.reconnectionCount--

      return
    }

    // 메세지 프로토콜
    // 첫줄은 요청 타입이고
    // 한줄의 공백 이후 본문에 JSON 메세지를 담는다.
    let payload = `${type}\r\n\r\n`
    if (data !== null) {
      payload += JSON.stringify(data)
    }

    this.conn.send(payload.trim())
  }
}

export default new WS()