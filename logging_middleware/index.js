const Log = async (stack, level, package_, message) => {
  try {
    await fetch('http://20.207.122.201/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.TOKEN}`
      },
      body: JSON.stringify({ stack, level, package: package_, message })
    })
  } catch (err) {
    console.error('Log failed:', err.message)
  }
}

module.exports = { Log }
