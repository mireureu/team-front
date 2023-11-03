import emailjs from 'emailjs-com';
import { useState } from 'react';
import { updatePassword } from '../api/user';
const temporaryPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}
const FindPassword = ({ email, birthday, id }) => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const password = temporaryPassword();

    const handleVerification = async (e) => {
        e.preventDefault();
        const response = await updatePassword({ id, birthday, password });
        console.log(response.data);
        if (response.data) {
            sendVerificationEmail();
        }
        else {
            alert('입력하신 정보가 잘못되었습니다.');
        }
    };

    const sendVerificationEmail = () => {
        const templateParams = {
            to_email: { email },
            from_name: "중번당",
            message: password,
        };
        emailjs
            .send(
                'Password-Service', // 서비스 ID
                'FindPassword', // 템플릿 ID
                templateParams,
                'YrLlvxqaV48xTtjIa', // public-key
            )
            .then(() => {
                alert('이메일이 성공적으로 보내졌습니다:');
                setIsEmailSent(true);
            });
    };


    return (
        <div>
            {isEmailSent ? (
                <p>
                    인증 이메일이 성공적으로 발송되었습니다. 이메일을
                    확인해주세요!
                </p>
            ) : (
                <button onClick={handleVerification}>인증</button>
            )}
        </div>
    );
}
export default FindPassword;
