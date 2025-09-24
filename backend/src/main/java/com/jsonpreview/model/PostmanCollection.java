package com.jsonpreview.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PostmanCollection {
    
    @JsonProperty("info")
    private CollectionInfo info;
    
    @JsonProperty("item")
    private List<PostmanItem> items;
    
    @JsonProperty("variable")
    private List<PostmanVariable> variables;

    // Getters and Setters
    public CollectionInfo getInfo() { return info; }
    public void setInfo(CollectionInfo info) { this.info = info; }
    
    public List<PostmanItem> getItems() { return items; }
    public void setItems(List<PostmanItem> items) { this.items = items; }
    
    public List<PostmanVariable> getVariables() { return variables; }
    public void setVariables(List<PostmanVariable> variables) { this.variables = variables; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CollectionInfo {
        private String name;
        private String description;
        
        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}