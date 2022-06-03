package com.example.backend.configuration;

import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToActionTypeConverter());
        registry.addConverter(new StringToTimePeriodConverter());
    }
}
