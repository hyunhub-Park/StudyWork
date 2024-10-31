function onLoad ()
{
    // 패턴 검색.
    const idPattern = /^[\w]{3,}$/; // [\w]는 영문자, 숫자, _만 입력 가능 {3,} 3글자이상가능
    const pwdPattern = /^[\w]{6,10}$/; // 영문자와 숫자, _ 6~10  
    const emailPattern = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const namePattern = /^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/; // 한글 2~4글자,영문자 2-20 첫글자는대문자 공백가능

    const serial1Pattern = /^[0-9]{6,}$/;   // 9자리 숫자만 입력 가능.
    const serial2Pattern = /^[0-9]{6,}$/;   // 9자리 숫자만 입력 가능.
    const birthPattern = /^[0-2024]{4,}$/;   // 4자리 숫자만 입력 가능, 최댓값은 2024.
    
    // 객체 찾기.
    const inputID = document.querySelector("#id");
    const inputPW1 = document.querySelector("#pwd");
    const inputPW2 = document.querySelector("#pwd_check");
    const inputEmail = document.querySelector("#mail");
    const inputName = document.querySelector("#name");

    const inputSerial1 = document.querySelector("#serial_num1");
    const inputSerial2 = document.querySelector("#serial_num2");
    const inputBrith = document.querySelector("#birth");

    // 폼 객체 찾기.
    const myform = document.querySelector(".myform");

    // eventListener 등록 및 handler처리.
    inputID.addEventListener("blur", () => validate(inputID, idPattern, "영문, 숫자, _(under bar)만 입력 가능."));
    inputPW1.addEventListener("blur", () => validate(inputPW1, pwdPattern, "영문, 숫자, _(under bar)만 입력 가능(6~10 자리)."));
    inputPW2.addEventListener("blur",()=>
    {
        validate (inputPW2, pwdPattern, "영문, 숫자, _(under bar)만 입력 가능(6~10 자리).");
        if(inputPW1.value !== inputPW2.value)
        {
            inputPW2.nextSibling.textContent ="입력하신 비밀번호와 일치하지 않습니다.";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return;
        }
    });
    
    inputEmail.addEventListener("blur", () => validate(inputEmail, emailPattern, "이메일 형식이 맞지 않습니다."));
    inputName.addEventListener("blur", () => validate(inputName, namePattern, "한글(2~4자),영문(2~10자/첫글자 대문자), 공백 입력가능."));

    inputSerial1.addEventListener("blur", () => validate(inputSerial1, serial1Pattern, "숫자 9자리(0~9)를 입력해주세요."));
    inputSerial2.addEventListener("blur", () => validate(inputSerial2, serial2Pattern, "숫자 9자리(0~9)를 입력해주세요."));
    inputBrith.addEventListener("blur", () => validate(inputBrith, birthPattern, "숫자 4자리(1900~2024)를 입력해주세요."));

    // myform 이벤트 등록 및 핸들러 처리.
    myform.addEventListener("submit",(e) =>
    {
        e.preventDefault(); // 서버에 전송하는 기본 기능을 막음.
        validate(inputID, idPattern, "영문, 숫자, _(under bar)만 입력 가능.");
        validate(inputPW1, pwdPattern, "영문, 숫자, _(under bar)만 입력 가능(6~10 자리).");
        validate(inputPW2, pwdPattern, "영문, 숫자, _(under bar)만 입력 가능(6~10 자리).");
        if (inputPW1.value !== inputPW2.value)
        {
            inputPW2.nextSibling.textContent = "입력하신 비밀번호와 일치하지 않습니다.";
            inputPW2.nextSibling.style.color = "red";
            inputPW1.value = "";
            inputPW2.value = "";
            inputPW1.focus();
            return;
        }
        validate(inputEmail, emailPattern, "이메일 형식이 맞지 않습니다.");
        validate(inputName, namePattern, "영문, 숫자, _(under bar)만 입력 가능.");
        validate(inputSerial1, serial1Pattern, "숫자 9자리(0~9)를 입력해주세요.");
        validate(inputSerial2, serial2Pattern, "숫자 9자리(0~9)를 입력해주세요.");
        validate(inputBrith, birthPattern, "숫자 4자리(1900~2024)를 입력해주세요.");

        alert("서버로 전송합니다.");
        myform.submit();
    });

    function validate (userInput, pattern, message)
    {
        if (userInput.value.match(pattern))
        {
            userInput.nextSibling.innerHTML = "입력 성공";
            userInput.nextSibling.style.color = "blue";
        } else
        {
            userInput.nextSibling.innerHTML = message;
            userInput.nextSibling.style.color = "red";
            userInput.value = "";
            userInput.focus();
            return;
        }
    }
}