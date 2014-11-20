var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport("SMTP",{
    service: "Mandrill",
    auth: {
        user: "combohype@gmail.com",
        pass: "0i-N8PV9ZB0ZLm3iFMwu3g"
    }
});

exports.send = function(to, subject, text){
	var mailOptions = {
	    from: 'ComboHype <ComboHype@gmail.com>', // sender address
	    to: to, // list of receivers
	    subject: subject, // Subject line
	    text: text, // plaintext body
	    html: '' // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
    if(error){
    	console.log('Email not sent: ' + error);
    }else{
        console.log('Email sent: ' + info.response);
    }
});
}
