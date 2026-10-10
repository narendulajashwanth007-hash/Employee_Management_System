# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy the pom.xml and source code for the backend
COPY employee-management-backend/pom.xml ./employee-management-backend/
COPY employee-management-backend/src ./employee-management-backend/src

# Set working directory to the backend folder and build the app
WORKDIR /app/employee-management-backend
RUN mvn clean package -DskipTests

# Stage 2: Create the production image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/employee-management-backend/target/*.jar app.jar

# Render will provide the PORT env var dynamically
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
