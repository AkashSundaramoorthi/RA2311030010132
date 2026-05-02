import { useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'
import NotificationCard from './NotificationCard'

const TYPES = ['All', 'Placement', 'Result', 'Event']

export default function NotificationList({ notifications, viewed, markViewed, filter, setFilter }) {
  const filtered = notifications.filter(n => filter === 'All' || n.Type === filter)

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {TYPES.map(t => (
          <Chip
            key={t}
            label={t}
            onClick={() => setFilter(t)}
            color={filter === t ? 'primary' : 'default'}
          />
        ))}
      </Stack>
      {filtered.map(n => (
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