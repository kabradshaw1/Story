FROM openjdk:17-jdk-slim

ARG MAVEN_VERSION=3.8.4
RUN apt-get update && apt-get install -y curl && \
    mkdir /opt/maven && \
    curl -fsSL https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz | \
    tar -xzC /opt/maven --strip-components=1 && \
    ln -s /opt/maven/bin/mvn /usr/bin/mvn

WORKDIR /app

COPY . .