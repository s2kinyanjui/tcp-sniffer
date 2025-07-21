// udp-server.js
import dgram from "dgram"

const server = dgram.createSocket("udp4")

const PORT = 6903

server.on("error", (err) => {
  console.error(`❌ Server error:\n${err.stack}`)
  server.close()
})

server.on("message", (msg, rinfo) => {
  const hex = msg.toString("hex")
  const ascii = msg.toString("ascii")
  const base64 = msg.toString("base64")

  console.log(
    `[${new Date().toISOString()}] From ${rinfo.address}:${rinfo.port}`
  )
  console.log("📦 Raw Buffer:", msg)
  console.log("📦 ASCII:", ascii)
  console.log("📦 Hex:", hex)
  console.log("📦 Base64:", base64)
})

server.on("listening", () => {
  const address = server.address()
  console.log(`✅ UDP Server listening on ${address.address}:${address.port}`)
})

server.bind(PORT, "0.0.0.0")
