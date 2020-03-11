import express from 'express'

app.get('/', (req, res) => res.status(404).json({ "message": "success" }))

const port = 5000 || process.env.PORT

app.listen(port, () => console.log(`server running at ${port}`))