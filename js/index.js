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
        addToCar.setAttribute('id', 'btn_' + product.id)
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
    e.target.classList.add('selectedItem');
    
});



/* CARRINHO VAZIO E CARRINHO CHEIO */
let produtosCarrinho = document.querySelector('.produtosCarrinho');

let addButtons = document.querySelectorAll('.addToCar');

let carList = [];


function printCar(){
    produtosCarrinho.innerHTML = '';

    if(carList.length < 1){

        produtosCarrinho.classList.remove('produtosCarrinhoCheio')
        produtosCarrinho.classList.add('produtosCarrinhoVazio')

        produtosCarrinho.insertAdjacentHTML('afterbegin', `
            <div class="avisoCarrinho">
                <h1 class="carrinhoVazio">Carrinho vazio</h1>
                <small class="adicioneItens">Adicione itens</small>
            </div>`
        );

    }else{

        produtosCarrinho.classList.remove('produtosCarrinhoVazio')
        produtosCarrinho.classList.add('produtosCarrinhoCheio')

        for(let i = 0; i < carList.length; i++){
            let produto = carList[i];
            produtosCarrinho.insertAdjacentHTML('beforeend',
                `<li class="itemCarrinho">
                    <img src=${produto.img} alt=${produto.img} class="imgCar">
                    <div class="itemCarInfo">
                        <p class="itemCarName">${produto.nameItem}</p>
                        <p class="itemCarPrice">R$ ${produto.value.toFixed(2).replace('.',',')}</p>
                        <button id = 'car_${produto.id}' class="btnRemove">Remover produto</button>
                    </div>
                </li>`
            );
        }
        if(carList.length > 3){
            produtosCarrinho.classList.add('carrinhoScroll')
        }

    }
}
printCar();


for(let i = 0; i < addButtons.length; i++){
    let botao = addButtons[i];
    botao.addEventListener('click', function(){
        let idSelected = botao.id.substring(4);
        let produto = procurarProduto(idSelected);
        carList.push(produto);

        printCar();

    })
}


function procurarProduto(idSelected){
    for(let i = 0; i < data.length; i++){
        let produto = data[i];
        if(idSelected == produto.id){
            return produto;
        }
    }
    return 'Produto não encontrado'
}


