let vitrine = document.querySelector('.vitrine')


function printVitrine(array){
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        let card = document.createElement('div');
        card.classList.add('card');
    
        let img = document.createElement('img');
        img.src = product.img;
        let divInfo = document.createElement('div');
        divInfo.classList.add('info');
        
        let tag = document.createElement('span');
        tag.classList.add('tag');
        tag.innerText = product.tag
        
        let nameItem = document.createElement('h2');
        nameItem.classList.add('nameItem');
        nameItem.innerText = product.nameItem;
        
        let description = document.createElement('small')
        description.classList.add('description');
        description.innerText = product.description;
        
        let value = document.createElement('p')
        value.classList.add('value');
        value.innerText = `R$ ${product.value.toFixed(2).replace('.',',')}`;
        
        let addToCar = document.createElement('p')
        addToCar.classList.add('addToCar');
        addToCar.innerText = product.addCart;
    
        divInfo.appendChild(tag);
        divInfo.appendChild(nameItem);
        divInfo.appendChild(description);
        divInfo.appendChild(value);
        divInfo.appendChild(addToCar);
        card.appendChild(img);
        card.appendChild(divInfo);
        vitrine.appendChild(card);
    
    }   
}
printVitrine(data);


// function filter(){
    
// }
// let menu = querySe
let menuBtn = document.querySelectorAll('.menuItem')

let elementsContainer = document.querySelector('.elementsContainer');

elementsContainer.addEventListener('click', function(e){
    let filterArr = []
    vitrine.innerHTML = '';


    for(let i = 0; i < data.length; i++){
        let product = data[i]
        for(let j = 0; j < product.tag.length; j++){
            console.log('teste')
            if(e.target.innerText === 'Todos'){
                filterArr.push(product);      
            }else if(e.target.innerText === product.tag[j]){
                filterArr.push(product);
            }
        }
    }
    
    printVitrine(filterArr)

    for(let i = 0; i < menuBtn.length; i++){
        let btn = menuBtn[i];
        btn.classList.remove('selectedItem')
    }
    e.target.classList.add('selectedItem')
    
});



