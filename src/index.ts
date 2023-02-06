import express from 'express'

const app = express()

app.get('/', (req, res) => {
  return res.send('ok')
})

app.listen(3000, () =>{
  console.log('listening....')
})


console.log('@@@@@')

const run = async () => {
  console.log("xablau")
}