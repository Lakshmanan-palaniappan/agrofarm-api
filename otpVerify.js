const otpGenerator = require('otp-generator');
const crypto = require('crypto');

const key = "otp-secret-key";

async function createOtp(params, callback) {
    const otp = otpGenerator.generate(4, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false
    });

    const ttl = 5 * 60 * 1000; // 5 minutes
    const expires = Date.now() + ttl;
    const data = `${params.phone}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;

    console.log(`Your OTP is ${otp}`);
    return callback(null, { otp, hash: fullHash });
}

async function verifyOtp(params, callback) {
    if (!params.phone || !params.otp || !params.hash) {
        return callback("Missing required parameters");
    }

    let [hashValue, expires] = params.hash.split('.');
    let now = Date.now();

    if (now > parseInt(expires)) {
        return callback("OTP Expired");
    }

    let data = `${params.phone}.${params.otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest('hex');

    if (newCalculatedHash === hashValue) {
        return callback(null, "Success");
    } else {
        return callback("Invalid OTP");
    }
}


// Example Usage:
// createOtp({ phone: "1234567890" }, (err, result) => {
//     if (!err) {
//         console.log("Generated OTP:", result.otp);
//         verifyOtp({ phone: "1234567890", otp: result.otp, hash: result.hash }, (err, msg) => {
//             console.log(err || msg);
//         });
//     }
// });
module.exports={
    createOtp,verifyOtp
}