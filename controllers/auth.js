const crypto = require('crypto')

const bcrypt = require('bcryptjs/dist/bcrypt')
// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemail-sendgrid-transport')

const User = require('../models/user')
const user = require('../models/user')

// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth: {
//     api_key: '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'
//   }
// }))

exports.getLogin = (req, res, next) => {
  let message = req.flash('error')
  message.length > 0 ? message = message[0] : message = null
  
  let modal = req.flash('modal')
  modal.length > 0 ? modal = modal[0] : modal = null
  
  let userEmail = req.flash('userEmail')
  userEmail.length > 0 ? userEmail = userEmail[0] : userEmail = null

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    modalMessage: modal,
    userEmail: userEmail,
  })
}

exports.getSignup = (req, res, next) => {
  let message = req.flash('error')
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
  })
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password')
        return res.redirect('/login')
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true
            req.session.user = user
            return req.session.save((err) => {
              console.log(err)
              res.redirect('/')
            })
          }
          req.flash('error', 'Invalid email or password')
          res.redirect('/login')
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/login')
        })
    })
    .catch((err) => console.log(err))
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  User.findOne({ email: email })
    .then((userDuplicate) => {
      if (userDuplicate) {
        req.flash('error', 'E-mail exists already, please pick a different one')
        return res.redirect('/signup')
        // add error message
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          })
          return user.save()
        })
        .then((result) => {
          req.flash('modal', 'You successfully signed up!')
          req.flash('userEmail', email)
          res.redirect('/login')
          // return transporter.sendMail({
          //   to: email,
          //   from: 'shop@node-complete.com',
          //   subject: 'Signup succeeded!',
          //   html: '<h1>You successfully signed up!</h1>'
          // })
        })
        .catch((err) => {
          console.log(err)
        })
    })

    .catch((err) => {
      console.log(err)
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect('/')
  })
}

exports.getReset = (req, res, next) => {
  let message = req.flash('error')
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message,
  })
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
      return res.redirect('/reset')
    }
    const token = buffer.toString('hex')
    User.findOne({ email: req.body.email })
      .then(user => {
        if(!user) {
          req.flash('error', 'No account with that email found')
          return res.redirect('/reset')
        }
        user.resetToken = token
        user.resetTokenExpiration = Date.now() + 3600000
        return user.save()
      })
      .then(result => {
        
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
