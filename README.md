# My Story App

## Purpose

The purpose of this portfolio project is to gain hands-on experience with Java Spring Boot, Angular frontend, and MySQL database integration while adhering to Test-Driven Development (TDD) principles.

## Swagger Docs

You you access the Swagger documentation at http://localhost:8080/swagger-ui/index.html when the server is running.

## Start Servers

These need to be updated for my specific app
Starting a Docker container can be done in various ways, depending on your specific needs, such as whether you're starting a single container manually or managing multiple containers with Docker Compose. Below are some of the common methods to start Docker containers:

### 1. Using `docker run`

The `docker run` command is the most basic and commonly used command to start a new container from an image. It allows you to specify many options such as ports, environment variables, volumes, and more.

```sh
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

- `IMAGE` is the name of the image you want to start a container from.
- `[COMMAND]` is an optional command to run inside the container.
- `[ARG...]` are optional arguments to pass to the command.
- `[OPTIONS]` can include things like `-d` to run in detached mode, `-p` for port mapping, `-v` for volume mounting, `--name` to name your container, and many more.

Example:

```sh
docker run -d -p 8080:8080 --name my-spring-boot-app my-spring-boot-image
```

### 2. Using `docker start`

If you have a stopped container that you wish to start again, you can use the `docker start` command followed by the container name or ID.

```sh
docker start [OPTIONS] CONTAINER [CONTAINER...]
```

- `CONTAINER` can be the name or ID of the container you want to start.

Example:

```sh
docker start my-spring-boot-app
```

### 3. Using `docker-compose up`

For applications that consist of multiple containers, Docker Compose is a tool that allows you to define and run multi-container Docker applications. You use a `docker-compose.yml` file to configure your application’s services, networks, and volumes.

```sh
docker-compose up [OPTIONS] [SERVICE...]
```

- `[SERVICE...]` is optional and specifies which services to start as defined in `docker-compose.yml`.
- `[OPTIONS]` can include `-d` to run in detached mode, `--build` to build images before starting containers, among others.

Example:

```sh
docker-compose up -d
```

This command reads the `docker-compose.yml` file in the current directory, builds images if necessary, and starts all services defined in the file.

### 4. Using `docker-compose start`

If you've previously stopped services using `docker-compose stop`, you can start them again without recreating containers using `docker-compose start`.

```sh
docker-compose start [SERVICE...]
```

This command starts existing containers for services defined in your `docker-compose.yml`.

### Restarting Containers

- To restart a running container, you can use `docker restart [CONTAINER]`.
- For Docker Compose managed containers, `docker-compose restart [SERVICE...]` restarts all or specified services.

### Stopping and Starting Containers

You might also need to stop containers before starting them again, for which you can use `docker stop [CONTAINER]` or `docker-compose stop [SERVICE...]`.

Each method offers different levels of control and is suitable for various scenarios, from development and testing to production deployments.
## Restart Server
Manually triggering a restart of your Spring Boot application running inside a Docker container from VS Code can be achieved in several ways, depending on your project setup and how you're interacting with Docker. Here are a few methods:

### 1. Using the Docker Extension for VS Code

If you're using the Docker extension for VS Code, it provides a convenient way to interact with your containers directly from the IDE.

- **Restart the Container**: You can simply restart the Docker container running your Spring Boot application. Find the Docker icon in the Activity Bar on the side of VS Code, locate your container under the Containers section, right-click it, and choose "Restart". This will stop and then start your container again, effectively restarting your application.

### 2. Using the Terminal

VS Code has an integrated terminal that you can use to run Docker commands directly.

- **Restart via Docker Compose**: If you're using Docker Compose, you can navigate to the directory containing your `docker-compose.yml` file in the VS Code terminal and run:
  ```bash
  docker-compose restart <service-name>
  ```
  Replace `<service-name>` with the name of the service running your Spring Boot application as defined in your `docker-compose.yml`.

- **Restart a Specific Container**: If you know the container ID or name, you can also restart it directly using Docker commands:
  ```bash
  docker restart <container-name-or-id>
  ```
  You can find the container name or ID by running `docker ps`.

### 3. Triggering a File Change

Since you're interested in manually triggering the mechanism that Spring Boot DevTools uses to restart the application, you can do this by modifying a file in the project:

- **Touch a File**: In the terminal, you can use the `touch` command on a file in your project to update its last modified time, which should trigger a restart if Spring Boot DevTools is set up correctly and is monitoring file changes. For example:
  ```bash
  touch src/main/resources/application.properties
  ```

### 4. Using Spring Boot Dashboard Extension

If you are running your Spring Boot application directly from VS Code (not inside a Docker container), and if you have the Spring Boot Dashboard extension installed, you can easily start, stop, or restart your application from the dashboard UI. However, this method doesn't apply directly to Docker containers but is useful for local development.

### Choose the Method That Fits Your Workflow

- If you're frequently restarting your application, the Docker extension method or Docker Compose commands can be quick and efficient.
- If you're looking to simulate the automatic restart feature of DevTools manually, touching a file might be your go-to method.
- Always ensure your Docker and Docker Compose commands are executed in the context of the correct directory, especially when using the integrated terminal in VS Code.