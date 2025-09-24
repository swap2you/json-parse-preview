package com.jsonpreview.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsonpreview.dto.ApiResponseDto;
import com.jsonpreview.dto.ExecuteRequestDto;
import com.jsonpreview.model.PostmanItem;
import org.apache.hc.client5.http.classic.methods.*;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.Header;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ApiExecutionService {
    
    private static final Logger logger = LoggerFactory.getLogger(ApiExecutionService.class);
    
    @Autowired
    private PostmanParserService postmanParserService;
    
    private final ObjectMapper objectMapper;
    private final CloseableHttpClient httpClient;
    
    public ApiExecutionService() {
        this.objectMapper = new ObjectMapper();
        this.httpClient = HttpClients.createDefault();
    }
    
    public ApiResponseDto executeRequest(ExecuteRequestDto requestDto) {
        long startTime = System.currentTimeMillis();
        
        try {
            PostmanItem requestItem = postmanParserService.findRequestByName(requestDto.getRequestName());
            if (requestItem == null) {
                return createErrorResponse("Request not found: " + requestDto.getRequestName(), startTime);
            }
            
            PostmanItem.PostmanRequest request = requestItem.getRequest();
            if (request == null) {
                return createErrorResponse("Invalid request configuration", startTime);
            }
            
            // Build the HTTP request
            HttpUriRequestBase httpRequest = buildHttpRequest(request, requestDto.getParameters());
            
            // Execute the request
            try (CloseableHttpResponse response = httpClient.execute(httpRequest)) {
                return processResponse(response, startTime);
            }
            
        } catch (Exception e) {
            logger.error("Error executing request: {}", e.getMessage(), e);
            return createErrorResponse("Execution error: " + e.getMessage(), startTime);
        }
    }
    
    private HttpUriRequestBase buildHttpRequest(PostmanItem.PostmanRequest request, Map<String, String> parameters) 
            throws URISyntaxException, IOException {
        
        // Replace variables in URL
        String url = postmanParserService.replaceVariables(request.getUrl().getRaw(), parameters);
        
        // Create request based on method
        HttpUriRequestBase httpRequest;
        String method = request.getMethod().toUpperCase();
        
        switch (method) {
            case "GET":
                httpRequest = new HttpGet(url);
                break;
            case "POST":
                httpRequest = new HttpPost(url);
                break;
            case "PUT":
                httpRequest = new HttpPut(url);
                break;
            case "DELETE":
                httpRequest = new HttpDelete(url);
                break;
            case "PATCH":
                httpRequest = new HttpPatch(url);
                break;
            default:
                throw new IllegalArgumentException("Unsupported HTTP method: " + method);
        }
        
        // Add headers
        if (request.getHeader() != null) {
            for (PostmanItem.PostmanHeader header : request.getHeader()) {
                String headerValue = postmanParserService.replaceVariables(header.getValue(), parameters);
                httpRequest.addHeader(header.getKey(), headerValue);
            }
        }
        
        // Add body for POST/PUT/PATCH requests
        if (request.getBody() != null && request.getBody().getRaw() != null && 
            (httpRequest instanceof HttpPost || httpRequest instanceof HttpPut || httpRequest instanceof HttpPatch)) {
            
            String body = postmanParserService.replaceVariables(request.getBody().getRaw(), parameters);
            StringEntity entity = new StringEntity(body, ContentType.APPLICATION_JSON);
            
            if (httpRequest instanceof HttpPost) {
                ((HttpPost) httpRequest).setEntity(entity);
            } else if (httpRequest instanceof HttpPut) {
                ((HttpPut) httpRequest).setEntity(entity);
            } else if (httpRequest instanceof HttpPatch) {
                ((HttpPatch) httpRequest).setEntity(entity);
            }
        }
        
        return httpRequest;
    }
    
    private ApiResponseDto processResponse(CloseableHttpResponse response, long startTime) throws IOException, ParseException {
        long executionTime = System.currentTimeMillis() - startTime;
        
        ApiResponseDto dto = new ApiResponseDto();
        dto.setStatusCode(response.getCode());
        dto.setExecutionTimeMs(executionTime);
        
        // Extract headers
        Map<String, String> headers = new HashMap<>();
        for (Header header : response.getHeaders()) {
            headers.put(header.getName(), header.getValue());
        }
        dto.setHeaders(headers);
        
        // Extract response body
        if (response.getEntity() != null) {
            String rawResponse = EntityUtils.toString(response.getEntity());
            dto.setRawResponse(rawResponse);
            
            try {
                // Try to parse as JSON
                JsonNode jsonNode = objectMapper.readTree(rawResponse);
                dto.setResponseBody(jsonNode);
            } catch (Exception e) {
                // If not JSON, store as string
                dto.setResponseBody(rawResponse);
            }
        }
        
        return dto;
    }
    
    private ApiResponseDto createErrorResponse(String error, long startTime) {
        long executionTime = System.currentTimeMillis() - startTime;
        ApiResponseDto dto = new ApiResponseDto();
        dto.setError(error);
        dto.setExecutionTimeMs(executionTime);
        dto.setStatusCode(500);
        return dto;
    }
}