// udp-client.js
import dgram from "dgram"
const client = dgram.createSocket("udp4")

const message = Buffer.from("Hello from local UDP client!")
const PORT = 6903
const HOST = "34.66.204.42" // replace with actual IP

client.send(message, PORT, HOST, (err) => {
  if (err) {
    console.error("Error sending UDP message:", err)
  } else {
    console.log("✅ Message sent!")
  }
  client.close()
})
