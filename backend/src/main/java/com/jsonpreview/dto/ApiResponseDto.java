package com.jsonpreview.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ApiResponseDto {
    
    private int statusCode;
    private Map<String, String> headers;
    private Object responseBody;
    private String rawResponse;
    private long executionTimeMs;
    private LocalDateTime timestamp;
    private String error;
    
    // Constructors
    public ApiResponseDto() {
        this.timestamp = LocalDateTime.now();
    }
    
    public ApiResponseDto(int statusCode, Object responseBody, long executionTimeMs) {
        this();
        this.statusCode = statusCode;
        this.responseBody = responseBody;
        this.executionTimeMs = executionTimeMs;
    }
    
    // Getters and Setters
    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
    
    public Map<String, String> getHeaders() { return headers; }
    public void setHeaders(Map<String, String> headers) { this.headers = headers; }
    
    public Object getResponseBody() { return responseBody; }
    public void setResponseBody(Object responseBody) { this.responseBody = responseBody; }
    
    public String getRawResponse() { return rawResponse; }
    public void setRawResponse(String rawResponse) { this.rawResponse = rawResponse; }
    
    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}