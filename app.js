const orgs = document.querySelector(".orgslist");
const form = document.querySelector(".form")
function renderOrgs(docs){
    const li = document.createElement('li')
    const name = document.createElement('span')
    const stack = document.createElement('span')
    const year = document.createElement('span')
    const cross = document.createElement('div')

    li.setAttribute('data-id',docs.id)
    name.textContent= docs.data().name;
    stack.textContent= docs.data().stack;
    year.textContent= docs.data().year;
    cross.textContent= 'x';

    name.classList.add("singlecell")
    stack.classList.add("singlecell")
    year.classList.add("singlecell")
    cross.classList.add("singlecell")

    li.appendChild(name)
    li.appendChild(stack)
    li.appendChild(year)
    li.appendChild(cross)
    orgs.appendChild(li);

cross.addEventListener('click',(e)=>{
    e.stopPropagation()
    let id = e.target.parentElement.getAttribute('data-id')
    e.collection('Orgs').doc(id).delete().then(()=>{
        console.log("document deleted successfully")
    }).catch((error)=>{
        console.error(error)
    })
})
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('Orgs').add({
        name: form.name.value,
        stack: form.stack.value,
        year: form.year.value,   

    })
    form.name.value='',
    form.stack.value='',
    form.year.value=''
})

db.collection('Orgs').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderOrgs(change.doc)
        }
        else if(change.type =='removed'){
            let li= orgs.querySelector('[data-id='+change.doc.id+']')
            orgs.removeChild(li)
        }
    })
})
  