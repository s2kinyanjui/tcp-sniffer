import net from "net"
import fs from "fs"

const PORT = 6903

const server = net.createServer((socket) => {
  console.log("📡 Device connected:", socket.remoteAddress)

  socket.on("data", (data) => {
    const raw = data.toString("utf8")
    let log

    try {
      const json = JSON.parse(raw)
      log = `[${new Date().toISOString()}] JSON Received:\n${JSON.stringify(
        json,
        null,
        2
      )}\n`
    } catch (err) {
      log = `[${new Date().toISOString()}] Invalid JSON:\n${raw}\n`
    }

    console.log(log)
    fs.appendFileSync("payloads.log", log)
  })

  socket.on("end", () => console.log("🔌 Device disconnected"))
})

server.listen(PORT, () => {
  console.log(`🛰 Listening on port ${PORT}`)
})
