package com.portfolio.sbd.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Value("${server.port:8090}")
    private String serverPort;

    @Bean
    public OpenAPI customOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:" + serverPort);
        devServer.setDescription("Servidor de Desenvolvimento");

        Contact contact = new Contact();
        contact.setEmail("contato@portfolio.com");
        contact.setName("Portfolio API");
        contact.setUrl("https://www.portfolio.com");

        License mitLicense = new License()
                .name("MIT License")
                .url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("SBD API - Sistema de Banco de Dados")
                .version("1.0.0")
                .contact(contact)
                .description("API REST para gerenciamento do sistema SBD com Spring Boot")
                .termsOfService("https://www.portfolio.com/terms")
                .license(mitLicense);

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer));
    }
}
