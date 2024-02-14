# Code Challenge: Pedido cirúrgico 

## Contexto

Um pedido cirúrgico é um documento que o médico preenche para solicitar uma intervenção cirúrgica específica para um paciente. Esse pedido contém informações detalhadas sobre a cirurgia necessária, incluindo o motivo da cirurgia, o tipo de procedimento a ser realizado, os detalhes sobre a preparação do paciente, a data e o local da cirurgia.

Por favor, leia as instruções abaixo e sinta-se à vontade para fazer perguntas, caso ache necessário.

## Objetivo

Criar uma aplicação web que respeite os requisitos abaixo e guarde as informacoes em um banco de dados.

## Pedido cirúrgico

  O sistema deve permitir o listar/cadastar/editar/visualizar/excluir de pedidos cirúrgicos com as propriedades:
  
  - código (auto-incremento)
  - sala (Lista de Salas)
  - procedimentos (Lista de Procedimentos)
  - doutor (campo aberto)
  - paciente (campo aberto)
  - hospital (Lista de Hospitais)
  - data da cirurgia (Calendário)
  - data de criação (Calendário)
  - observações gerais (campo com máximo de 100 caracteres)
  
  ### Critérios de aceitação:
    Todos os atributos são obrigatórios.
    Código não pode se repetir.

## Requisitos

### Configuração do Ambiente 
   Configurar um ambiente de desenvolvimento em Docker para o backend e frontend. Isso ajuda a manter o ambiente consistente e reproduzível.
  
### Desenvolvimento do Backend
  * Tecnologias utilizadas:
     * NestJS como framework backend.
     * Banco de dados (MySQL ou Postgres) para armazenar os dados dos pedidos cirúrgicos.
     * Prisma ou TypeORM como ORM para manipular o banco de dados.
     * Testes unitários e de integração para garantir a qualidade do código.
     * Foco na arquitetura limpa
     * Realizar documentação do código


### Desenvolvimento do Frontend
  * Tecnologias utilizadas:
    * ReactJS como framework frontend.
    * Context API para o gerenciamento de estado, incluindo o controle de status.
    * Styled Components para a estilização do CSS.
    * Aplicação responsiva para ambientes desktop e mobile.
    * Testes unitários para as partes críticas do frontend.


Lembre-se de seguir as melhores práticas de desenvolvimento, incluindo a modularização do código, a documentação adequada e o uso de boas práticas de versionamento.

###  Sobre a entrega
  * Prazo de Entrega
    Prazo máximo de 72 horas (corridas)  a partir do recebimento da solicitação. Caso o prazo esteja se encerrando, pode ser enviado o arquivo zipado com os códigos 
    realizados até o momento da entrega.

  * Como entregar?
    Envie o seu teste compactado para tiago.morais@a3data.com.br ou pode enviar o link do giihub com o repositório, boa sorte!!!


