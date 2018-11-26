const axios = require('axios')

getPosts()

document.getElementById('show-create-post').onclick = createDisplay
document.getElementById('create-post').onclick = postRegister
document.getElementById('update-post').onclick = updateFunction

function createDisplay(){
    window.location.href = '/#/posts/new'
    const createPost = document.querySelector('.createPost')
    const showPost = document.querySelector('.showPost')
    createPost.style.display = "block"
    showPost.style.display = "none"
    
    document.getElementById('title').value = ''
    document.getElementById('content').value = ''
    
}

function getPosts(){
    const showPost = document.querySelector('.showPost')
    showPost.style.display = "block"

    axios.get('https://dry-dusk-46918.herokuapp.com/posts/')
        .then(function(result){
            displayPosts(result.data)
        })
}

const list = document.querySelector('.list-group')
list.onclick = function(event){
    const address = event.target.href
    getOnePost(sliceId(address))
}

function getOnePost(id){
    axios.get(`https://dry-dusk-46918.herokuapp.com/posts/${id}`)
        .then(function(result){
            displayPosts([result.data])
        })
}

function displayPosts (postArr){
   
    if (postArr.length <= 1) {
        const post = postArr[0]
        const title = post.title
        const content = post.content
        getContent(title, content)
  
    } else {
    postArr.map(post => {
        const id = post.id
        const title = post.title
        const content = post.content
        window.location.href = `/#/posts/${id}`
        getTitle(id, title)
        getContent(title, content)
        })
    }
}
    
function getTitle(id, title){
    const titleList = document.querySelector('.list-group')
    const li = document.createElement("li")
    const a = document.createElement("a");
    li.appendChild(a)
    const node = document.createTextNode(title)
    a.appendChild(node)
    a.className = "list-group-item list-group-item-action active"
    a.setAttribute("href", `#/posts/${id}`)
    titleList.appendChild(li)
}

function getContent(title, content){
    const titleDisplay = document.getElementById("title-display")
    const nestedTitle = document.getElementById('nested-title')
    titleDisplay.removeChild(nestedTitle)
    const h2 = document.createElement('h2')
    h2.setAttribute("id", "nested-title")
    const titleNode = document.createTextNode(title)
    h2.appendChild(titleNode)
    titleDisplay.appendChild(h2)
    
    const contentDisplay = document.getElementById("content-display")
    const nestedContent = document.getElementById('nested-content')
    contentDisplay.removeChild(nestedContent)
    const p = document.createElement('p')
    p.setAttribute("id", "nested-content")
    const contentNode = document.createTextNode(content)
    p.appendChild(contentNode)
    contentDisplay.appendChild(p)
}

function postRegister(event){
    event.preventDefault()
    const editPost = document.querySelector('.editView')
    const createPost = document.querySelector('.createPost')
    const showPost = document.querySelector('.showPost')
    const newTitle = document.getElementById('title').value
    const newContent = document.getElementById('content').value
    createPost.style.display = "none"
    editPost.style.display = "none"
    showPost.style.display = "block"
    createNewPost(newTitle, newContent)
}

function emptyTitleList(){
    const titleList = document.querySelector('.list-group')
    titleList.innerHTML=""
}

function createNewPost (newTitle, newContent){
    axios.post('https://dry-dusk-46918.herokuapp.com/posts/', {
        "title": newTitle,
        "content": newContent
    })
    .then(function(result){
        const id = result.data.id
        window.location.href = `/#/posts/${id}`
        emptyTitleList()

        axios.get('https://dry-dusk-46918.herokuapp.com/posts/')
            .then(function(result){
            displayLists(result.data)
            getOnePost(id)
        })
    })
}

const deletePost = document.getElementById('delete-post')
deletePost.onclick = function(e){
    delteOnePosting(window.location.href)
}

function delteOnePosting(address){
    const id = sliceId(address)
    axios.delete(`https://dry-dusk-46918.herokuapp.com/posts/${id}`)
        .then(function(result){
            emptyTitleList()

            axios.get('https://dry-dusk-46918.herokuapp.com/posts/')
                .then(function(result){
                    displayPosts(result.data)
             })
        })
}

function sliceId (address){
    return address.slice(address.lastIndexOf("/")+1, address.lastIndexOf("/")+10)
}

const editPostButton = document.getElementById('edit-post')
editPostButton.onclick = function(e){
    const showPost = document.querySelector('.showPost')
    showPost.style.display = "none"
    const editPost = document.querySelector('.editView')
    editPost.style.display = "block"

    const id = sliceId(window.location.href)
    fetchEditFormData(id)
}

function fetchEditFormData(id){
    axios.get(`https://dry-dusk-46918.herokuapp.com/posts/${id}`)
    .then(function(result){
        populateEditForm(result.data.id, result.data.title, result.data.content)
    })
}

function populateEditForm(id, title, content){
    window.location.href = `/#/posts/${id}`
    const titleLocation = document.querySelector('.editView #title')
    const contentLocation = document.querySelector('.editView #content')
    titleLocation.value = title
    contentLocation.value = content  
}

function updateFunction(event){
    event.preventDefault()
    const id = sliceId(window.location.href)
    const title= document.querySelector('.editView #title').value
    const content = document.querySelector('.editView #content').value
    updatePost(id, title, content)
}

function updatePost(id, title, content){

    axios.put(`https://dry-dusk-46918.herokuapp.com/posts/${id}`,{
            "title": title,
            "content": content
    })
        .then(function(result){
            window.location.href = `/#/posts/${id}`
            const editPost = document.querySelector('.editView')
            editPost.style.display = "none"
            const showPost = document.querySelector('.showPost')
            showPost.style.display = "block"

            emptyTitleList()

            axios.get('https://dry-dusk-46918.herokuapp.com/posts/')
                .then(function(result){
                displayLists(result.data)
                getOnePost(id)
            })
        })
}

function displayLists(postArr){
    postArr.map(post => {
        const id = post.id
        const title = post.title
        getTitle(id, title)
    })
}
