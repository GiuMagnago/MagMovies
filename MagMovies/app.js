const api_key = '8bbf64ddc302800725f8c8538c71b966';

var num = 0;




function pesquisaTrailer(movie_id) {
    var erro = false;

    function exibeTrailer() {
        if (!erro) {

            try {
                var trailer_field = document.getElementById(`trailer-field${num}`);
    
                let trailer_link = JSON.parse(this.responseText).results[0].key;
                
                
                trailer_field.innerHTML = `<iframe src="https://www.youtube.com/embed/${trailer_link}" title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`
                    
            
                num++;
            } catch (e) {

            }
        }
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onerror = () => erro = true;
    xhr.onload = exibeTrailer;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}&language=pt-BR`);
    xhr.send();
}




function carouselExibeDados() {
    let carouselContent = document.getElementById('carousel-content');
    let content = '';

    let data = JSON.parse(this.responseText);

    for (let i = 0; i < 3; i++) {
        let filmes = data.results[i];

        pesquisaTrailer(filmes.id);

        

        if (i == 0)
        {
            content += `
            <div class="carousel-item active">
                <div class="carousel-lancamentos">
                    <div class="col-12 col-sm-12 col-md-10 col-lg-6" id="trailer-field${i}">
                    </div>
                    <div class="col-12 col-sm-12 col-md-10 col-lg-6">
                        <h2>${filmes.title}</h2>
                        <p>${filmes.overview}</p>
                    </div>
                </div>
            </div>
            `;
        }
        else {
            content += `
            <div class="carousel-item">
                <div class="carousel-lancamentos">
                    <div class="col-12 col-sm-12 col-md-10 col-lg-6" id="trailer-field${i}">
                    </div>
                    <div class="col-12 col-sm-12 col-md-10 col-lg-6">
                        <h2>${filmes.title}</h2>
                        <p>${filmes.overview}</p>
                    </div>
                </div>
            </div>
            `;
        }
    }

    carouselContent.innerHTML = content;
}

function carouselCarregaDados() {

    let xhr = new XMLHttpRequest();

    xhr.onload = carouselExibeDados;
    xhr.open("GET", `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=pt-BR&page=1`);
    xhr.send();
}






//Função que exibe os resultado da pesquisa realizada
function exibeDados() {
    let tela = document.getElementById('tela');
    let text = '';
    let data = (JSON.parse(this.responseText));
    for (let i = 0; i < data.results.length; i++) {
        let filmes = data.results[i];

        text += `
        <div class="row search-result-main">
            <div class="search-result-unique-result">
                <img src="https://image.tmdb.org/t/p/w500${filmes.poster_path}"
                    alt="" width="250px">
                <div class="search-result-unique-result-txt">
                    <a href="https://www.themoviedb.org/movie/${filmes.id}}" target="_blank">
                        <h1>${filmes.title}</h1>
                    </a>
                    <p>Popularidade: ${filmes.popularity}</p>
                    <p>Data: ${filmes.release_date}</p>
                    <p>Avaliação: ${filmes.vote_average}</p>
                    <p>${filmes.overview}</p>
                </div>
            </div>
        </div>

        `;
    };
    
    console.log(data);
    tela.innerHTML = text;
}

//Função que faz a requisição para a API e realiza a pesquisa de acordo com o que o usuário digitou na barra de pesquisa
function pesquisaDados() {
    let query = document.getElementById('search-bar').value;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeDados;
    xhr.open("GET", `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&language=pt-BR&include_adult=false`);
    xhr.send();
}


//função que carrega o filme o qual o usuário criou em "ver mais"
function carregaFilmes(poster, id, nome, popularidade, lancamento_data, avaliacao, sinopse) {
    let tela = document.getElementById('tela');
    let text = `
        <div class="col-12 unique-movie">
            <img src="https://image.tmdb.org/t/p/w500${poster}" width="500px">
            <h1>${nome}</h1>
            <div class="col-12 unique-movie-txt">
                <p>${sinopse}</p>
                <p>Popularidade: ${popularidade}</p>
                <p>Data: ${lancamento_data}</p>
                <p>Avaliação: ${avaliacao}</p>
            </div>
        </div>
    `;

    tela.innerHTML = text;
}


//função que altera os dados do filmes da home-page logo após o site carregar
function alteraDados() {

    var api_link = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-br&page=1`;

    //Função que exibe os dados na home-page de acordo com a escolha do usuário, por padrão são mostrados "filmes populares"
    function exibeDados1() {
        let tela = document.getElementById('tela-home-page');
        let text = '';

        let data = (JSON.parse(this.responseText));
        for (var i = 0; i < 9; i++) {
            var filmes = data.results[i];

            

            if (filmes.title == undefined) {
                text += `
                <div class="col-12 destaques-unique-result" id="destaques-unique-result-${i + 1}">
                    <img src="https://image.tmdb.org/t/p/w500${filmes.poster_path}"
                        alt="" width="250px">
                    <div class="destaques-unique-result-txt">
                        <a href="https://www.themoviedb.org/movie/${filmes.id}" target="_blank">
                            <h1>${filmes.name}</h1>
                        </a>
                        <p>Popularidade: ${filmes.popularity}</p>
                        <p>Data: ${filmes.first_air_date}</p>
                        <p>Avaliação: ${filmes.vote_average}</p>
                        <p>${filmes.overview}</p>
                        <button id="btn-verMais" onclick="carregaFilmes('${filmes.poster_path}', ${filmes.id}, '${filmes.name}', '${filmes.popularity}', '${filmes.first_air_date}', '${filmes.vote_average}', '${filmes.overview}')">Ver mais</button>
                    </div>
                </div>
                `;
            } else {
                text += `
                <div class="col-12 destaques-unique-result" id="destaques-unique-result-${i + 1}">
                    <img src="https://image.tmdb.org/t/p/w500${filmes.poster_path}"
                        alt="" width="250px">
                    <div class="destaques-unique-result-txt">
                        <a href="https://www.themoviedb.org/movie/${filmes.id}" target="_blank">
                            <h1>${filmes.title}</h1>
                        </a>
                        <p>Popularidade: ${filmes.popularity}</p>
                        <p>Data: ${filmes.release_date}</p>
                        <p>Avaliação: ${filmes.vote_average}</p>
                        <p>${filmes.overview}</p>
                        <button id="btn-verMais" onclick="carregaFilmes('${filmes.poster_path}', ${filmes.id}, '${filmes.title}', '${filmes.popularity}', '${filmes.release_date}', '${filmes.vote_average}', '${filmes.overview}')">Ver mais</button>
                    </div>
                </div>
                `;
                

            }
        };

        

        
        tela.innerHTML = text;
    }

    //função que faz a requisição para a API
    function pesquisaDados1() {

        let xhr = new XMLHttpRequest();
        xhr.onload = exibeDados1;
        xhr.open('GET', api_link);
        xhr.send();
    }


    



    var select = document.getElementById('dropdown');
    var select_value = select.options[select.selectedIndex].value;
    console.log(select_value);

    var titulo = document.getElementById('titulo-destaque');

    //condições que alteram o link para requisição da API de acordo com a escolha do usuário (filmes populares, filmes nos cinemas, séries de tv e tendências)
    if (select_value == 'filmes-populares') {
        titulo.innerHTML = 'Filmes Populares';
        api_link = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`;
        pesquisaDados1();

    }

    if (select_value == 'filmes-cinema') {
        titulo.innerHTML = 'Filmes no Cinema';
        api_link = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=pt-BR&page=1`;
        pesquisaDados1();
    }

    if (select_value == 'series-tv') {
        titulo.innerHTML = 'Séries de TV';
        api_link = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=pt-BR&page=1`;
        pesquisaDados1();


    }

    if (select_value == 'mais-votados') {
        titulo.innerHTML = 'Mais Votados';
        api_link = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}&language=pt-BR`;
        pesquisaDados1();

    }


}

/*função que exibe mais dados caso o botão "carregar mais filmes" seja clicado (disponível na versão mobile e feito para 
reduzir a quantidade de informação na tela, podendo ser visto o conteúdo completo ao clicar no botão)*/
function maisDados () {
    
    for (i = 0; i < 9; i++)
    {

        let child_div = document.getElementById(`destaques-unique-result-${i + 1}`);

        child_div.style.display = 'inline-flex';
        
    }

    document.getElementById("btnMoreMovies").style.display = 'none';

}

//função para fazer o scroll no site para a região em que o usuário clicar (Ex: clicando em "Lançamentos" é feito o scroll e a página "se move" para a região de lançamentos)
function move(element) {
    var rect = element.getBoundingClientRect();
    console.log(rect.top);
    scrollTo(0, rect.top);
}

//Inicialização de algumas funções
window.onload = () => {
    alteraDados();
    carouselCarregaDados();
    document.getElementById("btn-search").addEventListener('click', pesquisaDados);
}
