import React, { useRef, useState } from 'react';

// App.js에 출력될 InputSample를 만든다.
const InputSample = () => {
    // username과 passwor과 저장될 userInfo 객체를 만든다.
    const userInfo = {
        username: '',
        password: '',
    }

    // useState는 컴포넌트의 값이 바뀔때 마다 관리를 해주는 함수이다. 
    // userInfo의 값이 바뀔 때 마다 userIput과 userInfoText에 값이 저장이 된다. 
    const [userInput, setUserInput] = useState(userInfo);
    const [userInfoText, setUserInfoText] = useState(userInfo);

    // userInfoText에 저장이 되어 있는 usernmae과 password의 값을 
    // 비구조 할당을 통해 username과 password에 값을 저장한다.
    const { username, password } = userInfoText;

    // userRef는 자바스크립의 document.querySelector 역할을 한다.
    // 이걸 통해 좀 더 간편히 구조를 가져온다.
    const passwordRef = useRef();

    // hanlerChange는 input 창에 onChange가 일어나면 실행되는 함수로
    // setUserInput에 값을 저장한다.
    const hanlerChange = (e) => {
       const { name, value } = e.target;
       setUserInput({...userInput, [name]: value});
    }

    // nextFocus는 enter가 실행되면 password 창에 focus를 맞추는 함수
    const nextFocus = (e) => {
        if(e.keyCode === 13) {
            passwordRef.current.focus();
        }
    }

    // password 창에 enter가 실행되면 입력된 값들을 보여주는 역할을 한다.
    const submitHeandler = (e) => {
        if(e.keyCode === 13){
            setUserInfoText({...userInput});
        }
    }

    return (
        <div>
            <input 
                type="text" 
                onChange={hanlerChange}
                onKeyUp={nextFocus} 
                name="username"
            />
            <input 
                type="text" 
                onChange={hanlerChange}
                onKeyUp={submitHeandler}  
                name="password"
                ref={passwordRef}
            />
            <div>username: {username}</div>
            <div>password: {password}</div>
        </div>
    );
};

export default InputSample;