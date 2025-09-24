package com.jsonpreview.dto;

import java.util.Map;

public class ExecuteRequestDto {
    
    private String requestName;
    private Map<String, String> parameters;
    private String environment;
    
    // Getters and Setters
    public String getRequestName() { return requestName; }
    public void setRequestName(String requestName) { this.requestName = requestName; }
    
    public Map<String, String> getParameters() { return parameters; }
    public void setParameters(Map<String, String> parameters) { this.parameters = parameters; }
    
    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }
}