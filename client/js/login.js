function validateSignupForm(e) {
    

    let valid = true;

    // בדיקת אימייל
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = 'אנא הכנס אימייל תקני.';
        valid = false;
    }

    // בדיקת סיסמה
    const password = document.getElementById("password").value;
    const passwordPattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;


        if ( !passwordPattern.test(password)) {
            document.getElementById("passwordError").textContent = 'הסיסמא לא תקינה.';
            valid = false;
        }

    if (!valid) {
        e.preventDefault(); // מונע שליחת הטופס אם יש שגיאות
        return false;
    }

}
document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    validateSignupForm(event)

    const emailValue = document.getElementById("email").value.trim();
    const passwordValue = document.getElementById("password").value;
    try {
        // ✅ Send signup request
        const loginResponse = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailValue, password: passwordValue }),
        });

        const loginData = await loginResponse.json();
        console.log("login response:", loginData); // ✅ Debugging output

        if (!loginResponse.ok) {
            err.textContent = loginData.error || "שגיאה בהתחברות אל המשתמש.";
            return;
        }

        console.log("משתמש התחבר בהצלחה!...");
        localStorage.setItem("userId", loginData.userId); // Save user ID to localStorage
        // ✅ Redirect to login page or perform any other action
        window.location.href = "/"; // Change this to your desired redirect URL

    } catch (error) {
        console.error("Error during login:", error);
        err.textContent = "שגיאה בהרשמה, נסה שוב.";
    }
});