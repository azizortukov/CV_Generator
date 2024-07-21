# CV Generator

The CV Generator is a Java-based web application that allows users to create their own resumes by filling out personal details. It generates a downloadable resume in PDF format, all within the project itself without relying on external APIs.

## Features

- **No External APIs**: Everything is handled within the project.
- **PDF Generation**: Create and download resumes in PDF format.
- **User-Friendly Interface**: Simple and intuitive form to fill in personal details.

## Technologies Used

- **Java**: Programming language used for backend development.
- **Spring Boot**: Framework for building the backend application.
- **Spring MVC (Thymeleaf)**: Template engine for rendering HTML pages.
- **Apache PDFBox Library**: Used for generating PDF documents.
- **HTML to PDF Converter Library**: Converts HTML content to PDF.
- **HTML, CSS, JS**: Technologies for the frontend interface.

## Project Screenshots

### Home page
<img src="/src/main/resources/screenshots/homepage.png" style="width:400px;">

### Generated CV example
<img src="/src/main/resources/screenshots/generated_cv.png" style="width:400px;">

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anas-ortukov/cv_generator.git
   ```
2. **Navigate to the Project Directory**
   ```bash
    cd cv-generator
   ```

3. **Build and Run application**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

4. **Access Frontend page**
   ```frontend/index.html```

5. **Fill out your details**
   - Enter your personal details into the form fields.
   - Click the "Generate CV" button to create your resume.
