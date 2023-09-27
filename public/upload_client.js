const selected = document.querySelector(".uploadImage");
const deleteBtn = document.querySelector("#deleteImage");
const sendBtn = document.querySelector("#sendButton");
const inputBtn = document.querySelector("#inputImage");
const imageTitle = document.querySelector("#imageTitle");
const imageDescription = document.querySelector("#imageDescription");
const section = document.querySelector("section");
const uploadSection = document.querySelector("#upload-section");
const label = document.querySelector("#upload-section label");
const upperMenu = document.querySelector("#upper_menu");

imageTitle.style.display = 'none';
imageDescription.style.display = 'none';
inputBtn.style.display = 'none';
deleteBtn.style.display = 'none';
selected.style.display = 'none';
sendBtn.style.display = 'none';
sendBtn.disabled = true;

inputBtn.addEventListener('change', () => {
    const selectFile = document.querySelector("#inputImage").files[0];
    const file = URL.createObjectURL(selectFile);
    document.querySelector(".uploadImage").src = file;

    selected.style.display = 'block';
    deleteBtn.style.display = 'block';
    
    setTimeout(() => {
        imageTitle.style.display = 'block';
        imageDescription.style.display = 'block';
        sendBtn.style.display = 'block';
    }, 500);

    uploadSection.style.height = '700px';
    uploadSection.style.transform = 'translateY(-100px)';
    uploadSection.style.transition = '0.5s';
    label.style.display = 'none';
    upperMenu.style.transform = 'translateY(-100px)'
    upperMenu.style.transition = '0.5s';
});

function insertTitle() {
    const value = imageTitle.value;
    if (value == "") {
        sendBtn.disabled = true;
    } else {
        sendBtn.disabled = false;
    }
}

function fileReset(form) {
    form.upload.select();
    document.selection.clear();

    document.querySelector(".uploadImage").src = "";

    selected.style.display = 'none';
    deleteBtn.style.display = 'none';
    imageTitle.style.display = 'none';
    imageDescription.style.display = 'none';
    sendBtn.disabled = true;
}
