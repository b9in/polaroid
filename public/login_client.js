const rememberMeCheckbox = document.querySelector('input[name="rememberMe"]');
const pwd = document.querySelector('input[name="password"]');
const repeatpwd = document.querySelector('input[name="r_pwd"]');

document.addEventListener('DOMContentLoaded', function () {
    const userIdCookie = getCookie('userId');
    
    if (userIdCookie) {
        const userIdInput = document.querySelector('input[name="id"]');
        userIdInput.value = userIdCookie;
        document.getElementById("remember").checked = true;
    }
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

rememberMeCheckbox.addEventListener('change', function () {
    const rememberMeChecked = this.checked;

    if (!rememberMeChecked) {
        deleteCookie('userId');
    }
});

// 쿠키 삭제
function deleteCookie(name) {
    // 쿠키 만료일을 현재 시간 이전으로 설정하여 삭제
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
