const fs = require('fs')

const requestHandler = (req, res) => {
  url = req.url
  method = req.method

  switch (url) {
    case '/':
      res.setHeader('Content-Type', 'text/html')
      res.write('<html>')
      res.write('<head><title>Greetings</title></head>')
      res.write('<body>')
      res.write('<h1>Hello, welcome to week 1!</h1>')
      res.write(
        '<form action="/create-user" method="POST"><input type"text" name="username"><button type"submit">Send</button></input></form>'
      )
      res.write('</body>')
      res.write('</html>')
      return res.end()
      break

    case '/users':
      res.setHeader('Content-Type', 'text/html')
      res.write('<html>')
      res.write('<head><title>Users</title></head>')
      res.write('<body>')
      res.write('<h1>User List</h1>')
      res.write('<ul>')
      res.write('<li>Julien</li>')
      res.write('<li>Nanouh</li>')
      res.write('<li>Aela</li>')
      res.write('</ul>')
      res.write('</body>')
      res.write('</html>')
      return res.end()
      break
    case '/create-user':
      if (method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
          console.log(chunk)
          user.push(chunk)
        })
        return req.on('end', () => {
          const parseBody = Buffer.concat(body).toString()
          const newUser = parseBody.split('=')[1]
          console.log(newUser)
          return res.end()
        })
      }

      console.log()
      break

    default:
      break
  }
}

module.exports = requestHandler
