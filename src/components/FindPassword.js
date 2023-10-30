import emailjs from 'emailjs-com';
import { useState } from 'react';
import { updatePassword } from '../api/user';
//https://www.emailjs.com/ 사용.
// 임시 비밀번호
const temporaryPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}
const FindPassword = ({ email, birthday, id  }) => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const password = temporaryPassword();
    const sendVerificationEmail = () => {
        const templateParams = {
            to_email: {email}, 
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
            .then((response) => {
                console.log('이메일이 성공적으로 보내졌습니다:', response);
                setIsEmailSent(true);
            })
            .catch((error) => {
                console.error('이메일 보내기 실패:', error);
            });
    };

    const handleVerification = (e) => {
        e.preventDefault(); 
        updatePassword( {id,birthday,password} );
        console.log(birthday);
        console.log(password);
        sendVerificationEmail();
    };

    return (
        <div>
            {isEmailSent ? (
                <p>
                    인증 이메일이 성공적으로 발송되었습니다. 이메일을
                    확인해주세요!
                    {console.log(email)}
                    {console.log(birthday)}
                </p>
            ) : (
                <button onClick={handleVerification}>인증</button>
            )}
        </div>
    );
}

export default FindPassword;

