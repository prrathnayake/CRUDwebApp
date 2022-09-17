const express = require('express')
const nodemailer = require('nodemailer')
const {con} = require("../database/mydb")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')

const router = express.Router()

const otp = ''

function generateAccessToken(user) {
    return jwt.sign(user,'212d1e1cf99eefc14589ae996b69dddc6b3238363c24f6ba4b2363fca09a88d2ca4f6f00198f0bca5dabded22b55b22f6035d36c2f2f23bf4f8b8ed2a8163aef' , { expiresIn: '30m' })
}

const verfyUser = (req, res, next) => {
    const token = req.body.accessToken
    if (!token) return res.json('no Token')

    jwt.verify(token, '212d1e1cf99eefc14589ae996b69dddc6b3238363c24f6ba4b2363fca09a88d2ca4f6f00198f0bca5dabded22b55b22f6035d36c2f2f23bf4f8b8ed2a8163aef', (err, user) => {
        if(err) return res.json('not authenticated')
        req.user = user
        next()
    })
}

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT staff_id, s_email, s_pword, s_role FROM staffs WHERE s_email = ?', [email], (error, results) => {
            if(error){
                console.log(error)
            }
            else if(results.length == 0){
                console.log("Wrong Email!")
                res.json('Wrong Email!')
            }else{
                let spword = results[0].s_pword
                bcrypt.compare(password, spword, function(err, isMatch) {
                    if (err) {
                    throw err
                    } 
                    else if (!isMatch) {
                        console.log("Password doesn't match!")
                        res.json('Password doesn\'t match!')
                    } 
                    else {
                        console.log("Password matches!")
                        const user = { 
                            id:results[0].staff_id,
                            email:results[0].s_email ,
                            role:results[0].s_role  
                        }
                        const accessToken = generateAccessToken(user)
                        res.json({accessToken: accessToken, role: results[0].s_role, authentcated: true})
                        // if (results[0].s_role == 'admin' ){
                        //     console.log('admin')
                        //     res.json({accessToken: accessToken})
                        // }else {
                        //     console.log('staff')
                        // }
                    }
                })
            }          
        })
    });
})

router.post('/contact', (req, res) => {
    const {name, email, comment} = req.body
    
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pasan.webtesting@gmail.com',
            pass: 'ndchajrwuzsbgfip'
        }
    })

    const mailOptions = {
        from: email,
        to: 'pasan.webtesting@gmail.com',
        subject: `Comment from ${email}:`,
        text: comment
    }

    transpoter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }else {
            console.log('email sent...')
        }
    })
})

router.post('/adminAuth', verfyUser,  (req, res) => {
    res.json('authenticated')
})

router.post('/changePassword', async (req, res) => {
    const { email } = req.body
    con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT staff_id, s_fname, s_lname, s_email FROM staffs WHERE s_email = ?', [email], (error, results) => {
            if(error){
                console.log(error)
            }
            else if(results.length == 0){
                console.log("Wrong Email!")
            }else{
                console.log("Found!")
                const user = { 
                    id:results[0].staff_id,
                    email:results[0].s_email 
                }
                const accessToken = jwt.sign(user,'212d1e1cf99eefc14589ae996b69dddc6b3238363c24f6ba4b2363fca09a88d2ca4f6f00198f0bca5dabded22b55b22f6035d36c2f2f23bf4f8b8ed2a8163aef' , { expiresIn: '20m' })
                con.query("UPDATE staffs SET reset_link = ? WHERE s_email = ? ", [accessToken, req.body.email],  (err, result) => {
                    if (err) throw err;
                    console.log("record(s) updated");
                });
                const transpoter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pasan.webtesting@gmail.com',
                        pass: 'ndchajrwuzsbgfip'
                    }
                })
            
                const mailOptions = {
                    from: 'pasan.webtesting@gmail.com',
                    to: email,
                    subject: 'Change your password',
                    text: `Your link:  http://localhost:3000/resetPassword/${accessToken}:`
                }
            
                transpoter.sendMail(mailOptions, (error, info) => {
                    if(error){
                        console.log(error);
                        res.send('error');
                    }else {
                        console.log('email sent...')
                    }
                })
                res.json(results[0])
            }          
        })
    });
})

router.post('/reset', verfyUser, async (req, res) => {
    console.log('password changed')
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    con.connect(function(err) {
        if (err) throw err;
        con.query("UPDATE staffs SET s_pword = ? WHERE reset_link = ? ", [hashedPassword, req.body.accessToken],  (err, result) => {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
    });
})

router.get('/viewstaffs', async (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT staff_id, s_fname, s_lname, s_email FROM staffs",  (error, results) => {
            if(error){
                console.log(error)
            }
            else if(results.length == 0){
                console.log("no details!!")
            }else{
                res.json(results)
            }          
          
        });
    });
})

router.post('/staff/view',async (req, res) => {
    const {id} = req.body
    con.connect((err) => {
        if (err) throw err;
        con.query("SELECT staff_id, s_fname, s_lname, s_Address, s_email, s_mobile, s_role FROM staffs where staff_id = ?",[id], async (error, results) => {
            if(error){
                console.log(error)
            }else{
                if(results.length > 0){
                    res.json(results[0])
                }else {
                    res.json('Invalid ID')
                }
            }    
        })
    })
})

router.post('/staff/delete',async (req, res) => {
    const {id} = req.body
    con.connect((err) => {
        if (err) throw err;
        con.query("DELETE FROM staffs where staff_id = ?",[id], async (error, results) => {
            if(error){
                console.log(error)
            }else{
                if(results.length > 0){
                    res.json(results[0])
                }else {
                    res.json('done')
                }
            }    
        })
    })
})

router.post('/staff/update',async (req, res) => {
    const{staff_id, s_fname, s_lname, s_Address, s_mobile, s_email, s_role} = req.body.details;
    con.query("SELECT * FROM staffs WHERE s_email = ?", [s_email], async (error, results) => {
        if(error){
            console.log(error)
        }

        if(results.length > 1){
            res.json("That Email is already in use!!!");
        }else {
            con.query("UPDATE staffs SET ? WHERE staff_id = ?", [{s_fname: s_fname, s_lname:s_lname, s_Address:s_Address, s_mobile:s_mobile, s_email:s_email, s_role:s_role}, staff_id], (error,results) => {
                if(error){
                    console.log("error:",error)
                } else{
                    res.json('Updated');
                }
            })
        }

    })
})

module.exports = router