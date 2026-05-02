const express = require('express')
const cors = require('cors')
const { Log } = require('../logging_middleware/index')

const app = express()
app.use(express.json())
app.use(cors())

let TOKEN = ""

const refreshToken = async () => {
  const res = await fetch('http://20.207.122.201/evaluation-service/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: "as7683@srmist.edu.in",
      name: "akash sundaramoorthi",
      rollNo: "ra2311030010132",
      accessCode: "QkbpxH",
      clientID: "ea299bd0-892f-4d94-9cf2-6bc798e67901",
      clientSecret: "NPmvujPdUpREQqdD"
    })
  })
  const data = await res.json()
  TOKEN = data.access_token
  global.TOKEN = TOKEN
  await Log("backend", "info", "auth", "Token refreshed successfully")
}

const PRIORITY = { Placement: 3, Result: 2, Event: 1 }

const fetchNotifications = async () => {
  await Log("backend", "info", "service", "Fetching notifications from API")
  const res = await fetch('http://20.207.122.201/evaluation-service/notifications', {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  })
  const data = await res.json()
  await Log("backend", "info", "service", `Fetched ${data.notifications.length} notifications`)
  return data
}

app.get('/notifications', async (req, res) => {
  await Log("backend", "info", "handler", "GET /notifications called")
  try {
    const data = await fetchNotifications()
    res.json(data)
  } catch (err) {
    await Log("backend", "error", "handler", `GET /notifications failed: ${err.message}`)
    res.status(500).json({ message: err.message })
  }
})

app.get('/notifications/priority', async (req, res) => {
  const n = parseInt(req.query.n) || 10
  await Log("backend", "info", "handler", `GET /notifications/priority called n=${n}`)
  try {
    const data = await fetchNotifications()
    const sorted = data.notifications
      .sort((a, b) => {
        if (PRIORITY[b.Type] !== PRIORITY[a.Type])
          return PRIORITY[b.Type] - PRIORITY[a.Type]
        return new Date(b.Timestamp) - new Date(a.Timestamp)
      })
      .slice(0, n)
    await Log("backend", "info", "handler", `Returning top ${n} priority notifications`)
    res.json({ notifications: sorted })
  } catch (err) {
    await Log("backend", "error", "handler", `GET /notifications/priority failed: ${err.message}`)
    res.status(500).json({ message: err.message })
  }
})

app.get('/refresh-token', async (req, res) => {
  await Log("backend", "info", "handler", "GET /refresh-token called")
  try {
    await refreshToken()
    res.json({ message: 'Token refreshed' })
  } catch (err) {
    await Log("backend", "error", "handler", `Token refresh failed: ${err.message}`)
    res.status(500).json({ message: err.message })
  }
})

refreshToken()
setInterval(refreshToken, 13 * 60 * 1000)

app.listen(2222, () => console.log('Running on port 2222'))