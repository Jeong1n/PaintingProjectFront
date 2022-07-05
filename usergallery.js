const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function userpictureget() {
    const user_id = location.href.split("?")[1]
    const picturData = async () => {
        const response = await fetch(`${backend_base_url}/picture/usergallery/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    picturData().then((data) => {
        pic = data.posts
        bloger = data.bloger
        console.log(bloger)

        let name = bloger['username']
        let temp_html = `${name}'s Gallery`
        $('#myname').append(temp_html)
        for (let i = 0; i < pic.length; i++) {
            let id = pic[i]['id']
            let image = pic[i]['image_path']

            let temp_html = `<article>
                                <a class="image fit" href="picture.html?${id}" data-position="left center"><img src="${image}" alt="" /></a>
                            </article>`
            $('#usergallerypicture').append(temp_html)
        }
    })
}

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
    window.location.replace(`${frontend_base_url}/login.html`);
}

$('document').ready(userpictureget());