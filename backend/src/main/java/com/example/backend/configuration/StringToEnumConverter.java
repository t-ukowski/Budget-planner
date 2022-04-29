package com.example.backend.configuration;

import com.example.backend.model.ActionType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToEnumConverter implements Converter<String, ActionType> {
    @Override
    public ActionType convert(String source) {
        try {
            return ActionType.valueOf(source);
        } catch(IllegalArgumentException exception){
            return null;
        }
    }
}
