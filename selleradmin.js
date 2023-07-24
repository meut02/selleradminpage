async function savetoserver(event){
    event.preventDefault()
    const Price=event.target.price.value
    const Name=event.target.name.value
    const Category=event.target.category.value

    const details={
        Price,
        Name,
        Category
    }

    try{
        const response=await axios.post('https://crudcrud.com/api/ebcb5e32c6fb472eaeb30e74680d1ba8/adminpage',details)

        showUserOnScreen(response.data);
        console.log(response);
    }
     catch (err) {
        console.log(err);
    }
    
}

async function refresh() {
    try {
        const response = await axios.get('https://crudcrud.com/api/ebcb5e32c6fb472eaeb30e74680d1ba8/adminpage');
        
        for (const user of response.data) {
            showUserOnScreen(user);
        }
    } catch (err) {
        console.log(err);
    }
}

function showUserOnScreen(details){

    const parentelement=document.getElementById('users')
    const childelement=document.createElement('li')
    childelement.textContent=details.Price+ '|' + details.Name +  '|' +details.Category

    const deletebtn=document.createElement('button')
    const editbtn=document.createElement('button')

    
    deletebtn.textContent='delete'
    editbtn.textContent='edit'
    
    deletebtn.onclick= async()=>{
        try{
       await axios.delete(`https://crudcrud.com/api/ebcb5e32c6fb472eaeb30e74680d1ba8/adminpage/${details._id}`)
         console.log('userdeleted:',details)
        }
        catch(err) {
            console.log(err)
        }


        parentelement.removeChild(childelement)
    }

    editbtn.onclick=async()=>{
        try{
        await axios.delete(`https://crudcrud.com/api/ebcb5e32c6fb472eaeb30e74680d1ba8/adminpage/${details._id}`)

            console.log('edituser:',details)
        }
        catch(err){
            console.log(err)
        }
        parentelement.removeChild(childelement)
        document.getElementById('price').value=details.Price
        document.getElementById('name').value=details.Name
        document.getElementById('category').value=details.Category
    }
    childelement.appendChild(deletebtn)
    childelement.appendChild(editbtn)

    parentelement.appendChild(childelement)

}

window.addEventListener('DOMContentLoaded', refresh)