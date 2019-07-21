import bus from './eventbus'

export default class WS {
  constructor() {
    if (!window.WebSocket) {
      alert('최신 브라우저를 사용해주세요 ㅠ_ㅠ')
      return
    }

    this.reconnectionCount = 3

    const conn = new window.WebSocket(`ws://${document.location.host}/ws`)

    conn.onmessage = function (e) {
      const json = JSON.parse(e.data)

      window.console.log(json)

      bus.$emit(json.type, json)
    }

    conn.onclose = function (e) {
      bus.$emit('close', e)
    }

    conn.onerror = function (e) {
      bus.$emit('error', e)
    }

    this.conn = conn
  }

  send(type, data) {
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
    payload += JSON.stringify(data)

    this.conn.send(payload.trim())
  }
}