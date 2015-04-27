# Damas.js

Este é um projeto desenvolvido como processo seletivo para a vaga de estágiário desenvolvedor 
front-end para a empresa Chaordic. Foi desenvolvido em JavaScript sem a utilização de nenhuma 
biblioteca externa, mantendo sempre o foco na orientação a objetos e código limpo e legível.

### Modo de jogo padrão:

* Tabuleiro 8x8 com 12 peças
* Peças comuns só comem para frente
* Ao chegar ao lado oposto do tabuleiro peça comum se torna rainha;
* Rainha pode comer para trás e para frente;
* Jogo acaba quando todas as peças forem comidas.


### Funcionalidades Implementadas:

* Modelo independente da interface;
* Highlight nas jogadas possíveis;
* Tornar rainha ao chegar ao lado oposto do tabuleiro;
* Rainha com movimentos exclusivos;
* Conceitos de orientação objeto em javascript com herança e polimorfismo;
* Mostrar o próximo jogador na interface;
* Contador de peças de cada jogador;
* Tamanho do tabuleiro dinâmico;
* Quantidade de peças dinâmica;
* Resetar jogo;

### #TODO:

* Rainha com movimentos amplos;
* Acabar ou empatar o jogo devido a repetição de movimentos ou impossibilidade de concluí-lo;
* Ajustar css para desenhar tabuleiro com qualquer tamanho;
* Refatorar código para colocar peças iniciais;
* Criar método recursivo para poder comer peças em cadeia;
* Dar opções de outros jogos de damas (Inglesa, Francesa, Americana, etc);
