const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


//변환된 이미지를 blob으로 바꾸어 저장
async function pictureupload() {
    const canvas = document.getElementById('stylized');
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    console.log(blob);
    const description = document.getElementById('description').value
    const formData = new FormData();
    formData.append("description", description)
    formData.append("image", blob,'image.png')
    const response = await fetch(`${backend_base_url}/picture/`, {
        headers: { "Authorization": "Bearer " + localStorage.getItem("access"), },
        method: 'POST',
        body: formData
    }
    )
    if (response.status == 200) {
        alert("업로드 완료!")
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }
    return response.json()

}

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}
