package com.example.backend.configuration;

import com.example.backend.model.TimePeriod;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToTimePeriodConverter implements Converter<String, TimePeriod>  {

    @Override
    public TimePeriod convert(String source) {
        try {
            return TimePeriod.valueOf(source);
        } catch(IllegalArgumentException exception){
            return null;
        }
    }
}
