const inpFile2 = document.getElementById("inpFile2");
const previewContainer2 = document.getElementById("imagePreview2");
const previewImage2 = previewContainer2.querySelector(".image-preview__image2");
const previewDefaultText2 = previewContainer2.querySelector(".image-preview__default-text");
inpFile2.addEventListener("change", function() {
    const file = this.files[0];

    console.log(file);

    if (file) {
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage2.style.display = "block";

        reader.addEventListener("load", function() {
            // console.log(this);
            previewImage2.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    } else {
        previewDefaultText.style.display = null;
        previewImage2.style.display = null;
        previewImage2.setAttribute("src", "");
    }
});