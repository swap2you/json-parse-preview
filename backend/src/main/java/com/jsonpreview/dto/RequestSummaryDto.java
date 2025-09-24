package com.jsonpreview.dto;

import java.util.List;
import java.util.Map;

public class RequestSummaryDto {
    
    private String name;
    private String method;
    private String url;
    private String description;
    private List<ParameterDto> parameters;
    
    // Constructors
    public RequestSummaryDto() {}
    
    public RequestSummaryDto(String name, String method, String url, String description) {
        this.name = name;
        this.method = method;
        this.url = url;
        this.description = description;
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<ParameterDto> getParameters() { return parameters; }
    public void setParameters(List<ParameterDto> parameters) { this.parameters = parameters; }

    public static class ParameterDto {
        private String key;
        private String value;
        private String type; // query, path, header, body
        private String description;
        
        // Constructors
        public ParameterDto() {}
        
        public ParameterDto(String key, String value, String type, String description) {
            this.key = key;
            this.value = value;
            this.type = type;
            this.description = description;
        }
        
        // Getters and Setters
        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }
        
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}