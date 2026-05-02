import { useState, useEffect } from 'react'
import { Box, TextField } from '@mui/material'
import NotificationCard from './NotificationCard'

export default function PriorityInbox({ viewed, markViewed }) {
  const [notifications, setNotifications] = useState([])
  const [n, setN] = useState(10)

  useEffect(() => {
    fetchPriority()
  }, [n])

  const fetchPriority = async () => {
    try {
      const res = await fetch(`http://localhost:2222/notifications/priority?n=${n}`)
      const data = await res.json()
      setNotifications(data.notifications)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box>
      <TextField
        label="Top N"
        type="number"
        size="small"
        value={n}
        onChange={e => setN(e.target.value)}
        sx={{ mb: 2 }}
      />
      {notifications.map(n => (
        <NotificationCard
          key={n.ID}
          notification={n}
          isNew={!viewed.includes(n.ID)}
          onView={() => markViewed(n.ID)}
        />
      ))}
    </Box>
  )
}