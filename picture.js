const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// 유저 페이지 그림 띄워주기
async function userpictureget() {
    const picture_id = location.href.split("?")[1]
    const picturData = async () => {
        const response = await fetch(`${backend_base_url}/picture/picture/${picture_id}`, {
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
        pics = pic[0]
        let description = pics['description']
        let id = pics['user']
        let name = pics['username']
        let temp_html = `<h1><a href="usergallery.html?${id}">${name}</a></h1>
                    <p>${description}</p>`
        $('#user-box').append(temp_html)
        for (let i = 0; i < pic.length; i++) {
            let image = pic[i]['image_path']
            let temp_html = `<div class="image main"><img src="${image}" alt=""></div>`
            $('#userpic-box').append(temp_html)
        }
    })
}

// 코멘트 띄우기
function commentView() {
    const comment_id = location.href.split('?')[1]
    const imgData = async () => {
        const response = await fetch(`${backend_base_url}/picture/comment/${comment_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    imgData().then((data) => {
        comment = data
        console.log(comment)
        for (let i = 0; i < comment.length; i++) {
            let user_id = comment[i]['user']
            let username = comment[i]['username']
            let desc = comment[i]['comment']
            let date = comment[i]['created_at']
            let temp_html = `<tr>
								<td><a href="usergallery.html?${user_id}">${username}</a></td>
								<td>${desc}</td>
								<td>${date}</td>
                            </tr>`
            $('#all_comments').append(temp_html)
        }
    })
}

//코멘트 작성
async function commentupload() {
    const comment_id = location.href.split('?')[1]
    const commentData = {
        comment: document.getElementById("message").value,
    }
    const response = await fetch(`${backend_base_url}/picture/comment/${comment_id}`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        withCredentials: true,
        method: 'POST',
        body: JSON.stringify(commentData)
    }
    )
    response_json = await response.json()
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/picture.html?${comment_id}`);
    } else {
        alert(response.status)
    }
}

// 로그아웃
async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}

$('document').ready(userpictureget());
$('document').ready(commentView());