# Fase 1: Compilación
FROM maven:3.8.5-openjdk-11 AS build
WORKDIR /app

# 1. Copiamos solo el POM primero
COPY pom.xml .

# 2. Descargamos las dependencias (este paso se cacheará)
# El flag 'go-offline' descarga todo lo necesario según el pom.xml
RUN mvn dependency:go-offline -B

# 3. Ahora copiamos el código fuente (lo que sí cambia a menudo)
COPY src ./src

# 4. Empaquetamos (como las librerías ya están, será instantáneo)
RUN mvn clean package -DskipTests

# Fase 2: Imagen final (Tomcat)
FROM tomcat:9.0-jdk11-openjdk
RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080
CMD ["catalina.sh", "run"]