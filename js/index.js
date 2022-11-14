//DEIXANDO O BOTÃO DE SEARCH INATIVO
let btnSearch = document.querySelector('button.btnSearch')
btnSearch.addEventListener('click', function(e){
    e.preventDefault();
});



//VITRINE
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
        addToCar.addEventListener('click', function(){
            let idSelected = addToCar.id.substring(4);
            let produto = procurarProduto(idSelected);
            carList.push(produto);
    
            printCar();
    
        });
    
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


let menuBtn = document.querySelectorAll('.menuItem')

let elementsContainer = document.querySelector('.elementsContainer');

elementsContainer.addEventListener('click', function(e){
    let filterArr = []
    vitrine.innerHTML = '';


    for(let i = 0; i < data.length; i++){
        let product = data[i]
        for(let j = 0; j < product.tag.length; j++){
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

//funcionalidade de buscar produto
let input = document.querySelector('input.input');
input.addEventListener('input', function(){
    vitrine.innerHTML = '';
    let found = [];
    let tamanho = input.value.length
    for(let i = 0; i < data.length; i++){
        let product = data[i];
        if(input.value.toLowerCase() === product.nameItem.substring(0,tamanho).toLowerCase()){
            found.push(product);
        }
    }

    printVitrine(found)

});



//CARRINHO
// SOMA
function soma(){
    let soma = 0;
    for(let i = 0; i < carList.length; i++){
        let produto = carList[i];
        soma += produto.value;
    }
    return soma;
}


//CARRINHO VAZIO E CARRINHO CHEIO
let produtosCarrinho = document.querySelector('.produtosCarrinho');

let addButtons = document.querySelectorAll('.addToCar');

let carList = [];

let aside = document.querySelector('aside')

aside.insertAdjacentHTML('beforeend', `
    <section class="conta">
        <div class="quantidade">
            <p>Quantidade:</p>
            <p class='quantidadeCarrinho'></p>
        </div>
        <div class="total">
            <p>Total:</p>
            <p class='contaTotal'></p>
        </div>
    </section>
`);

function atualizaTotal(){
    let quantidadeCarrinho = document.querySelector('p.quantidadeCarrinho')
    quantidadeCarrinho.innerText = `${carList.length}`;
    let contaTotal = document.querySelector('p.contaTotal');
    contaTotal.innerText = `R$ ${soma().toFixed(2).replace('.',',')}`
}




function printCar(){
    produtosCarrinho.innerHTML = '';

    let sectionConta = document.querySelector('section.conta');


    if(carList.length < 1){

        sectionConta.classList.add('hidden')
        
        produtosCarrinho.classList.remove('produtosCarrinhoCheio')
        produtosCarrinho.classList.add('produtosCarrinhoVazio')
        
        produtosCarrinho.insertAdjacentHTML('afterbegin', `
        <div class="avisoCarrinho">
            <h1 class="carrinhoVazio">Carrinho vazio</h1>
            <small class="adicioneItens">Adicione itens</small>
        </div>`
        );
        
        
    }else{
        sectionConta.classList.remove('hidden');

        produtosCarrinho.classList.remove('produtosCarrinhoVazio');
        produtosCarrinho.classList.add('produtosCarrinhoCheio');

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
            let btnRemoveColection = document.querySelectorAll('button.btnRemove');
            for(let k = 0; k < btnRemoveColection.length; k++){
                let btnRemove = btnRemoveColection[k];
                btnRemove.addEventListener('click', function(){
                    let currentId = btnRemove.id.substring(4);
                    for(let j = 0; j < carList.length; j++){
                        if(currentId == carList[j].id){
                            carList.splice(j,1);
                        }
                    }
    
                    printCar();              
                });
            }

            

        }

        if(carList.length > 3){
            produtosCarrinho.classList.add('carrinhoScroll');
        }

    }
    atualizaTotal();
}

printCar();


function procurarProduto(idSelected){
    for(let i = 0; i < data.length; i++){
        let produto = data[i];
        if(idSelected == produto.id){
            return produto;
        }
    }
    return 'Produto não encontrado';
}


//FOOTER
let footer = document.querySelector('footer');
let ulInstitucional = document.createElement('ul')
let listaInstitucional = ['Sobre nós', 'Sustentabilidade', 'Trabalhe conosco'];
function imprimeListaFooter(titulo, ul, array){
    let section = document.createElement('section')
    section.setAttribute('class', 'footerSection')
    let title = document.createElement('h2');
    title.innerText = titulo;
    section.appendChild(title)

    for(let i = 0; i < array.length; i++){
        let item = array[i];
        let link = document.createElement('a')
        link.href = 'https://www.google.com/'
        link.target = '_blank'
        let li = document.createElement('li');
        link.innerText = item;
        li.appendChild(link)
        ul.appendChild(li)
    }
    section.appendChild(ul)
    footer.appendChild(section)

}

imprimeListaFooter('Institucional', ulInstitucional, listaInstitucional);

let ulContato = document.createElement('ul')
let listaContato = ['Telefone: (61) 3222-2222', 'Intagram: @weartakebrasil', 'E-mail: weartake@hotmail.com']
imprimeListaFooter('Contato', ulContato, listaContato);

let ulLojas = document.createElement('ul')
let listaLojas = ['São Paulo - SP', 'Rio de Janeiro - RJ', 'Brasília - DF', 'Salvador - BA']
imprimeListaFooter('Lojas', ulLojas, listaLojas);

