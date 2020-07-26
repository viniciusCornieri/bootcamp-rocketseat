# Para iniciar a aplicação

## Criando os containers docker necessários pela primeira vez

    docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    docker run --name mongobarber -p 27017:27017 -d -t mongo
    docker run --name redis -p 6379:6379 -d -t redis:alpine

## Iniciando os containers docker após criados no passo anterior

    docker start database
    docker start mongobarber
    docker start redis

## Inicializando ambiente de dev

    yarn dev:server

# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com as instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não Funcionais**

- Utilizar MailTrap para testar envios de e-mails em ambiente dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negócio**

- O link enviado por e-mail para resetar a senha, deve expirar em 2h;
- O usuário deve confirmar a nova senha ao resetar a senha;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve pode listar seus agendamentos em um dia específico;
- O usuário deve receber uma notificação sempre que houver um novo agendamento;
- O usuário deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve pode listar todos os prestadores de serviço cadastrados;
- O usuário deve poder os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser guardado em cache;
-

**RN**

- Cada agendamento deve durar exatamente 1h;
- Os agendamentos devem estar disponíveis entre as 8h e 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
