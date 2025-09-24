package com.jsonpreview.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PostmanVariable {
    
    private String key;
    private String value;
    private String type;
    private String description;
    
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