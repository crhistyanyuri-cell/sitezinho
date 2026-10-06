const botaoCriarProjeto =
    document.getElementById("criarProjeto");

const areaProjetos =
    document.querySelector(".projetos");

let imagemSelecionada = null;

let indiceImagemSelecionada = null;

let tipoAcao = null;

let projetos =
    JSON.parse(
        localStorage.getItem("projetos")
    ) || [];


// Converte projetos antigos para o novo formato

projetos =
    projetos.map(
        function(projeto) {

            if (typeof projeto === "string") {

                return {

                    id:
                        Date.now().toString() +
                        Math.random(),

                    nome:
                        projeto

                };

            }

            return projeto;

        }
    );


localStorage.setItem(
    "projetos",
    JSON.stringify(projetos)
);


// Mostra os projetos

function mostrarProjetos() {

    if (!areaProjetos) {
        return;
    }

    areaProjetos.innerHTML = "";

    // Pega as imagens salvas

    const imagensProjetos =
        JSON.parse(
            localStorage.getItem(
                "imagensProjetos"
            )
        ) || {};


    projetos.forEach(
        function(projeto, indice) {

            const novoProjeto =
                document.createElement(
                    "div"
                );

            novoProjeto.classList.add(
                "projeto"
            );


            // Link para abrir o projeto

            const linkProjeto =
                document.createElement(
                    "a"
                );

            linkProjeto.href =
                "Projeto.html?id=" +
                encodeURIComponent(
                    projeto.id
                );


            // Área da capa

            const capaProjeto =
                document.createElement(
                    "div"
                );

            capaProjeto.classList.add(
                "capa-projeto"
            );


            // Imagem da capa

            const imagem =
                document.createElement(
                    "img"
                );


            /*
                Primeiro verifica se o usuário
                escolheu uma capa.
            */

            if (projeto.capa) {

                imagem.src =
                    projeto.capa;

            }


            /*
                Se não houver capa escolhida,
                usa a primeira imagem do projeto.
            */

            else if (
                imagensProjetos[projeto.id] &&
                imagensProjetos[projeto.id].length > 0
            ) {

                imagem.src =
                    imagensProjetos[
                        projeto.id
                    ][0];

            }


            /*
                Se o projeto não tiver imagens,
                usa a imagem padrão.
            */

            else {

                imagem.src =
                    "50acd9cf91eda47f089bdb8372f8cfbc.jpg";

            }


            imagem.alt =
                projeto.nome;


            capaProjeto.appendChild(
                imagem
            );


            // Nome do projeto

            const titulo =
                document.createElement(
                    "h2"
                );

            titulo.textContent =
                projeto.nome;


            // Quantidade de imagens

            const quantidade =
                document.createElement(
                    "p"
                );

            let numeroImagens = 0;

            if (
                imagensProjetos[projeto.id]
            ) {

                numeroImagens =
                    imagensProjetos[
                        projeto.id
                    ].length;

            }


            quantidade.textContent =
                numeroImagens +
                (
                    numeroImagens === 1
                        ? " imagem"
                        : " imagens"
                );


            // Coloca capa, título e quantidade no link

            linkProjeto.appendChild(
                capaProjeto
            );

            linkProjeto.appendChild(
                titulo
            );

            linkProjeto.appendChild(
                quantidade
            );


            // Botão de opções

            const botaoOpcoes =
                document.createElement(
                    "button"
                );

            botaoOpcoes.textContent =
                "⋮";

            botaoOpcoes.classList.add(
                "botao-opcoes-projeto"
            );


            // Menu de opções

            const menu =
                document.createElement(
                    "div"
                );

            menu.classList.add(
                "menu-projeto"
            );


            // Botão renomear

            const botaoRenomear =
                document.createElement(
                    "button"
                );

            botaoRenomear.textContent =
                "Renomear";

            botaoRenomear.classList.add(
                "botao-renomear-projeto"
            );


            // Botão excluir

            const botaoExcluir =
                document.createElement(
                    "button"
                );

            botaoExcluir.textContent =
                "Excluir";

            botaoExcluir.classList.add(
                "botao-excluir-projeto"
            );


            // Abre o menu

            botaoOpcoes.addEventListener(
                "click",
                function(evento) {

                    evento.preventDefault();

                    evento.stopPropagation();

                    menu.classList.toggle(
                        "aberto"
                    );

                }
            );


            // Renomear projeto

            botaoRenomear.addEventListener(
                "click",
                function(evento) {

                    evento.preventDefault();

                    evento.stopPropagation();


                    const novoNome =
                        prompt(
                            "Digite o novo nome do projeto:",
                            projeto.nome
                        );


                    if (!novoNome) {

                        return;

                    }


                    projeto.nome =
                        novoNome;


                    localStorage.setItem(
                        "projetos",
                        JSON.stringify(
                            projetos
                        )
                    );


                    mostrarProjetos();

                }
            );


            // Excluir projeto

            botaoExcluir.addEventListener(
                "click",
                function(evento) {

                    evento.preventDefault();

                    evento.stopPropagation();


                    // Remove o projeto

                    projetos.splice(
                        indice,
                        1
                    );


                    // Remove as imagens desse projeto

                    delete imagensProjetos[
                        projeto.id
                    ];


                    // Salva os projetos atualizados

                    localStorage.setItem(
                        "projetos",
                        JSON.stringify(
                            projetos
                        )
                    );


                    // Salva as imagens atualizadas

                    localStorage.setItem(
                        "imagensProjetos",
                        JSON.stringify(
                            imagensProjetos
                        )
                    );


                    // Atualiza a tela

                    mostrarProjetos();

                }
            );


            // Coloca os botões dentro do menu

            menu.appendChild(
                botaoRenomear
            );

            menu.appendChild(
                botaoExcluir
            );


            // Coloca tudo dentro do projeto

            novoProjeto.appendChild(
                linkProjeto
            );

            novoProjeto.appendChild(
                botaoOpcoes
            );

            novoProjeto.appendChild(
                menu
            );


            // Coloca o projeto na página

            areaProjetos.appendChild(
                novoProjeto
            );

        }
    );

}


// Criar projeto

if (botaoCriarProjeto) {

    botaoCriarProjeto.addEventListener(
        "click",
        function() {

            const nomeProjeto =
                prompt(
                    "Digite o nome do projeto:"
                );


            if (nomeProjeto) {

                const novoProjeto = {

                    id:
                        Date.now().toString() +
                        Math.random(),

                    nome:
                        nomeProjeto

                };


                projetos.push(
                    novoProjeto
                );


                localStorage.setItem(
                    "projetos",
                    JSON.stringify(
                        projetos
                    )
                );


                mostrarProjetos();

            }

        }
    );

}


// Mostra os projetos quando a página abre

mostrarProjetos();


const searchInput =
    document.getElementById("searchInput");

const items =
    document.querySelectorAll(".pin");


if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        function() {

            const query =
                searchInput.value.toLowerCase();

            for (
                let i = 0;
                i < items.length;
                i++
            ) {

                const itemText =
                    items[i]
                        .textContent
                        .toLowerCase();

                if (
                    itemText.includes(
                        query
                    )
                ) {

                    items[i].style.display = '';

                } else {

                    items[i].style.display = 'none';

                }

            }

        }
    );

}


// Sistema de salvar

const pins =
    document.querySelectorAll(".pin");


pins.forEach(
    function(pin) {

        const botaoSalvar =
            document.createElement(
                "button"
            );


        botaoSalvar.textContent =
            "Salvar";


        botaoSalvar.classList.add(
            "botao-salvar"
        );


        botaoSalvar.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();

                evento.stopPropagation();


                // Pega os projetos existentes

                const projetosSalvar =
                    JSON.parse(
                        localStorage.getItem(
                            "projetos"
                        )
                    ) || [];


                // Cria a janela

                const janelaProjetos =
                    document.createElement(
                        "div"
                    );


                janelaProjetos.classList.add(
                    "janela-salvar"
                );


                // Cria um botão para cada projeto

                projetosSalvar.forEach(
                    function(projeto) {

                        const botaoProjeto =
                            document.createElement(
                                "button"
                            );


                        botaoProjeto.textContent =
                            projeto.nome;


                        janelaProjetos.appendChild(
                            botaoProjeto
                        );

                    }
                );


                // Coloca a janela na página

                document.body.appendChild(
                    janelaProjetos
                );

            }
        );


        // Coloca o botão dentro da imagem

        pin.appendChild(
            botaoSalvar
        );

    }
);