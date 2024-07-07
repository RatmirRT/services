import { domen } from '@/services/fetch'
import * as signalR from '@microsoft/signalr'

const url = domen + 'userChatHub'

const UsersChat = new signalR.HubConnectionBuilder()
  .withUrl(url, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build()

export default {
  async start () {
    try {
      await UsersChat.start()
    } catch (error) {
      console.error(error)
    }
  },

  getMessage (callback: any) {
    UsersChat.on('ReceiveMessage', callback)
  }

  stopConnection(){
    UsersChat.stop()
  }
}
