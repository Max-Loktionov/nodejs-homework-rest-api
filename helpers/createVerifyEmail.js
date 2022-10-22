const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Please, confirm you email",
    html: `<p>By clicking on the following link, you are confirming your email address.</p>
    <a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank"> Confirm Email Address</a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
