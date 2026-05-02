import { Card, CardContent, Typography, Chip, Box } from '@mui/material'

const TYPE_COLOR = { Placement: 'success', Result: 'warning', Event: 'info' }

export default function NotificationCard({ notification, isNew, onView }) {
  return (
    <Card
      onClick={onView}
      sx={{
        mb: 2,
        cursor: 'pointer',
        border: isNew ? '2px solid #1976d2' : '1px solid #e0e0e0',
        backgroundColor: isNew ? '#f0f7ff' : '#fff'
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{notification.Message}</Typography>
          <Box display="flex" gap={1}>
            <Chip label={notification.Type} color={TYPE_COLOR[notification.Type]} size="small" />
            {isNew && <Chip label="New" color="primary" size="small" />}
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}