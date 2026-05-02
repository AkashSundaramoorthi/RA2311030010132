import { useState, useEffect } from 'react'
import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import NotificationList from './components/NotificationList'
import PriorityInbox from './components/PriorityInbox'

export default function App() {
  const [notifications, setNotifications] = useState([])
  const [viewed, setViewed] = useState([])
  const [tab, setTab] = useState(0)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:2222/notifications')
      const data = await res.json()
      setNotifications(data.notifications)
    } catch (err) {
      console.error(err)
    }
  }

  const markViewed = (id) => {
    setViewed(prev => [...new Set([...prev, id])])
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Campus Notifications</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="All Notifications" />
        <Tab label="Priority Inbox" />
      </Tabs>
      {tab === 0 && (
        <NotificationList
          notifications={notifications}
          viewed={viewed}
          markViewed={markViewed}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      {tab === 1 && (
        <PriorityInbox
          viewed={viewed}
          markViewed={markViewed}
        />
      )}
    </Container>
  )
}