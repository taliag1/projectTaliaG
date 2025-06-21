
function validateSignupForm(e) {
    let valid = true;

    // ניקוי שגיאות קודמות
    document.getElementById("nameError").textContent = '';
    document.getElementById("lastNameError").textContent = '';
    document.getElementById("emailError").textContent = '';
    document.getElementById("passwordError").textContent = '';
    document.getElementById("passVerifyError").textContent = '';

    // בדיקת שם מלא
    const fname = document.getElementById("firstName").value;
    if (fname.length<=2) {
        document.getElementById("nameError").textContent = 'שם  חייב להכיל לפחות 2 תווים.';
        valid = false;
    }

    // בדיקת אימייל
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = 'אנא הכנס אימייל תקני.';
        valid = false;
    }

    // בדיקת סיסמה
    const password = document.getElementById("password").value;
    // const passwordPattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const passwordPattern = /^.{8,16}$/

    if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").textContent = 'הסיסמא לא תקינה.';
        valid = false;
    }

    // בדיקת אישור סיסמה
    const confirmPassword = document.getElementById("passVerify").value;
    if (confirmPassword !== password) {
        document.getElementById("passVerifyError").textContent = 'הסיסמה ואישור הסיסמה אינם תואמים.';
        valid = false;
    }

    if (!valid) {
        e.preventDefault(); // מניעת שליחת הטופס אם יש שגיאות
        return false;
    }
}
document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    validateSignupForm(event)

    console.log("Form submitted, validating...");
    const email = document.getElementById("email").value.trim();
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const confirmPasswordValue = document.getElementById("passVerify").value;

    if (password !== confirmPasswordValue) {
        err.textContent = "הסיסמאות אינן תואמות";
        return;
    }

    try {
        // ✅ Send signup request
        console.log("Sending signup request with:", { email: email, first_name: first_name, last_name: last_name, password: password });
        const err = document.getElementById("err");
        const signupResponse = await fetch("/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, first_name: first_name, last_name: last_name, password: password }),
        });

        const signupData = await signupResponse.json();
        console.log("Signup response:", signupData); // ✅ Debugging output
        
        if (!signupResponse.ok) {
            err.textContent = signupData.error || "שגיאה ביצירת משתמש.";
            return;
        }

        localStorage.setItem("userId", signupData.userId); // Save user ID to localStorage
        console.log("משתמש נוצר בהצלחה! מחבר אותך אוטומטית...");
        // ✅ Redirect to login page or perform any other action
        window.location.href = "/"; // Change this to your desired redirect URL

    } catch (error) {
        console.error("Error during signup:", error);
        err.textContent = "שגיאה בהרשמה, נסה שוב.";
    }
});