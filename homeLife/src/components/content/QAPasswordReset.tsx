// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for how to add the HomeLife app to the iPhone home screen.

function QAPasswordReset() {

    return (
        <>
            <p>MyHomeLife utilizes OTP, one-time passwords, for password resets. The process is as follows:</p>
            <ul>
                <li>Sign out and go to the login page.</li>
                <li>Click the 'Reset Password' button which will take you to the user reset form.</li>
                <li>Type in your email address and click 'Get OTP'.</li>
                <li>You will be taken to a page with 4 inputs, each for a digit of the OTP. The OTP is automatically sent to your email. Don't forget to check your spam!</li>
                <li>Type in the 4 digits found in the OTP email you received.</li>
                <li>Click 'Confirm'.</li>
                <li>Fill out your email, password, and the confirmation password.</li>
                <li>Click 'Confirm'.</li>
                <li>You're done! Congratulations, you've reset your password!</li>
            </ul>
        </>
    );
}

export default QAPasswordReset;