# Chat

A chat project with Vue & Nginx web and Golang & MySQL server parts in Docker containers

- Install
  * Go
  * Node.js
  * Docker
  * docker-compose

- Usage:

```bash
    cd $GOPATH/src

    git clone https://github.com/Tairyoku/chat-project

    cd chat-project

    docker-compose up (need restart after build)
```

## Set up test database

```bash
    docker exec -it chat_db bash -l

    mysql -uroot -p@root
```
- Open chat :
```bash
http://localhost:90
