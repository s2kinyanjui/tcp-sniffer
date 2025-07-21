// udp-server.js
import dgram from "dgram"

const server = dgram.createSocket("udp4")

const PORT = 6903

server.on("error", (err) => {
  console.error(`❌ Server error:\n${err.stack}`)
  server.close()
})

server.on("message", (msg, rinfo) => {
  console.log(`[${new Date().toISOString()}] ${rinfo.address}:${rinfo.port}`)
  console.log(`📦 Message: ${msg.toString("utf8")} (${msg.length} bytes)`)

  // Optional: send back a response
  // const response = Buffer.from("ACK");
  // server.send(response, rinfo.port, rinfo.address);
})

server.on("listening", () => {
  const address = server.address()
  console.log(`✅ UDP Server listening on ${address.address}:${address.port}`)
})

server.bind(PORT, "0.0.0.0")
