package com.sqli.planification.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by IJANATI on 05/06/2017.
 */
@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/download/colabProjet/**").addResourceLocations("/app/excelColabProjet/");
        registry.addResourceHandler("/download/projet/**").addResourceLocations("/app/excelColab/");
        registry.addResourceHandler("/download/colab/**").addResourceLocations("/app/excelProjet/");
        registry.addResourceHandler("/**").addResourceLocations("/");
    }


}
