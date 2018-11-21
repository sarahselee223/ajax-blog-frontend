

function createFunction(){
    const createPost = document.querySelector('.createPost')
    createPost.style.display = "block"
}

function getPosting(){
    axios.get('http://127.0.0.1:5000/posts/')
        .then(function(result){
            displayPosts(result.data)
        })
}
function displayPosts (postArr){
    postArr.map(post => {
        const id = post.id
        const title = post.title
        const content = post.content
        getTitle(id, title)
        //getContent(title, content)
    })
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
    titleDisplay.appendChild(titleNode)
    
    const contentDisplay = document.getElementById("content-display")
    const nestedContent = document.getElementById('nested-content')
    contentDisplay.removeChild(nestedContent)
    const p = document.createElement('p')
    p.setAttribute("id", "nested-content")
    const contentNode = document.createTextNode(content)
    contentDisplay.appendChild(contentNode)
}



function registerFunction(event){
    // const newTitle = document.getElementById('title')
    // const newContent = document.getElementById('content')
    // const titleList = document.querySelector('.list-group')

    const createPost = document.querySelector('.createPost')
    createPost.style.display = "none"
    const showPost = document.querySelector('.showPost')
    showPost.style.display = "block"
    event.preventDefault()
}