const nodemailer = require('nodemailer'),
    {EMAIL, PASSWORD} = process.env;

module.exports = {
    email: async(req, res) => {
    const {email, subject, content} = req.body
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });
           
        let info = await transporter.sendMail({
            from: email,
            to: 'walliewall2020@gmail.com',
            subject: subject,
            content: content,
            html: `<div>This is from your contact page</div>`
            
        }, (err, res) => {
            if(err){
                console.log(err)
            } else {
                console.log('hit', info)
                res.status(200).send(info);
            }
        })
    } catch(err){
        res.status(500).send(err);
    }
} 
}