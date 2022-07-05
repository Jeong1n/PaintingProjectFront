const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// my gallery 그림 불러오기
async function userpictureget() {

    const picturData = async () => {
        const response = await fetch(`${backend_base_url}/picture/mygallery/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    picturData().then((data) => {
        console.log(data)
        pic = data.posts
        bloger = data.bloger
        console.log(pic)
        console.log(bloger)
        let name = bloger['username']
        let temp_html = `<h1>${name}'s</h1>
        <h1>Gallery</h1>`
        $('#myname').append(temp_html)
        for (let i = 0; i < pic.length; i++) {
            let id = pic[i]['id']
            let image = pic[i]['image_path']
            let temp_html = `<article>
            <a class="image fit" href="picture.html?${id}" data-position="left center"><img src="${image}" alt="" /></a>
            </article>`
            $('#mypicture-box').append(temp_html)
        }
    })
}

// 로그아웃 기능 추가
async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}


$('document').ready(userpictureget());