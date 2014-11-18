var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'combohype',
    api_key: 'Wombo123'
  }
}
 
var transporter = nodemailer.createTransport(sgTransport(options));

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
        console.log(error);
    }else{
        //console.log('Message sent: ' + info.response);
    }
});
}
