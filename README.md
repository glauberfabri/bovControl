# Desafio de Desenvolvimento Backend


A Bovcontrol tem como missão digitalizar a pecuária, coletando e analisando dados para aumentar a produtividade, eficiência e rentabilidade do agronegócio. Este documento descreve a solução para o desafio proposto, incluindo as tecnologias usadas e instruções para iniciar o projeto.

## Tecnologias Utilizadas

- **JavaScript**: Linguagem principal para o desenvolvimento da API.
- **Express**: Framework para construção da API REST.
- **Swagger**: Ferramenta para documentação da API (opcional).
- **Node.js**: Ambiente de execução para o código JavaScript.
- **MongoDB**: Banco de dados NoSQL para armazenamento dos dados.
- **dotenv**: Biblioteca para gerenciar variáveis de ambiente.

## Bibliotecas e Dependências

- `express`: Framework para criar a API REST.
- `mongodb`: Driver nativo para conectar ao MongoDB.
- `dotenv`: Para carregar variáveis de ambiente do arquivo `.env`.
- `swagger-ui-express` e `swagger-jsdoc` (opcional): Para documentação da API.

Instalação das dependências:

```bash
npm install express mongodb dotenv swagger-ui-express swagger-jsdoc


Estrutura do Projeto
src/config/database.js: Configuração e conexão com o MongoDB.
src/routes/: Contém as rotas da API.
src/controllers/: Contém a lógica de controle das rotas.
src/models/: Contém os modelos de dados.
src/tests/: Contém os testes unitários.




Clone o Repositório

bash => git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as Dependências

bash => npm install
Configure as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:


MONGO_URI=mongodb://localhost:27017/bovcontrol (ou use o mongo Atlas)
PORT=5000
Inicie o Servidor

bash => npm start
O servidor estará disponível em http://localhost:3000.

Rodar os Testes
Para garantir que tudo está funcionando corretamente, você pode rodar os testes:
bash => npm test



Funcionalidades Implementadas
1. Cadastro de Fazendeiro e Fazenda
Rota: POST /farmers

Descrição: Cadastra um novo fazendeiro e sua fazenda.

Código: src/routes/farmerRoutes.js

2. Cadastro da Produção de Leite Diário
Rota: POST /productions

Descrição: Registra a produção diária de leite em litros.

Código: src/routes/productionRoutes.js

3. Consulta do Volume de Leite Entregue
Rota: GET /volume

Descrição: Consulta o volume total de leite entregue e a média mensal para uma fazenda e mês específicos.

Código: src/routes/volumeRoutes.js

4. Consulta do Preço do Litro de Leite
Rota: GET /price

Descrição: Consulta o preço do litro de leite para uma fazenda e mês específicos, com exibição nos formatos numérico brasileiro e inglês.

Código: src/routes/priceRoutes.js

Conclusão
Este README fornece uma visão geral de como o desafio foi implementado, as tecnologias e bibliotecas utilizadas, e as instruções para iniciar o projeto. Se tiver dúvidas ou precisar de mais detalhes, sinta-se à vontade para entrar em contato.