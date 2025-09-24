package com.jsonpreview.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsonpreview.dto.RequestSummaryDto;
import com.jsonpreview.model.PostmanCollection;
import com.jsonpreview.model.PostmanEnvironment;
import com.jsonpreview.model.PostmanItem;
import com.jsonpreview.model.PostmanVariable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostmanParserService {
    
    private final ObjectMapper objectMapper;
    private PostmanCollection currentCollection;
    private PostmanEnvironment currentEnvironment;
    
    public PostmanParserService() {
        this.objectMapper = new ObjectMapper();
    }
    
    public PostmanCollection parseCollection(MultipartFile file) throws IOException {
        this.currentCollection = objectMapper.readValue(file.getInputStream(), PostmanCollection.class);
        return this.currentCollection;
    }
    
    public PostmanEnvironment parseEnvironment(MultipartFile file) throws IOException {
        this.currentEnvironment = objectMapper.readValue(file.getInputStream(), PostmanEnvironment.class);
        return this.currentEnvironment;
    }
    
    public List<RequestSummaryDto> getAllRequests() {
        if (currentCollection == null) {
            return Collections.emptyList();
        }
        
        List<RequestSummaryDto> requests = new ArrayList<>();
        extractRequestsFromItems(currentCollection.getItems(), requests);
        return requests;
    }
    
    private void extractRequestsFromItems(List<PostmanItem> items, List<RequestSummaryDto> requests) {
        if (items == null) return;
        
        for (PostmanItem item : items) {
            if (item.getRequest() != null) {
                // This is a request
                RequestSummaryDto dto = createRequestSummary(item);
                requests.add(dto);
            } else if (item.getItem() != null) {
                // This is a folder, recurse
                extractRequestsFromItems(item.getItem(), requests);
            }
        }
    }
    
    private RequestSummaryDto createRequestSummary(PostmanItem item) {
        PostmanItem.PostmanRequest request = item.getRequest();
        RequestSummaryDto dto = new RequestSummaryDto();
        
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setMethod(request.getMethod());
        
        if (request.getUrl() != null) {
            dto.setUrl(request.getUrl().getRaw());
        }
        
        // Extract parameters
        List<RequestSummaryDto.ParameterDto> parameters = new ArrayList<>();
        
        // Query parameters
        if (request.getUrl() != null && request.getUrl().getQuery() != null) {
            for (PostmanItem.PostmanQuery query : request.getUrl().getQuery()) {
                parameters.add(new RequestSummaryDto.ParameterDto(
                    query.getKey(), query.getValue(), "query", query.getDescription()
                ));
            }
        }
        
        // Headers
        if (request.getHeader() != null) {
            for (PostmanItem.PostmanHeader header : request.getHeader()) {
                if (isParameterizable(header.getValue())) {
                    parameters.add(new RequestSummaryDto.ParameterDto(
                        header.getKey(), header.getValue(), "header", header.getDescription()
                    ));
                }
            }
        }
        
        dto.setParameters(parameters);
        return dto;
    }
    
    private boolean isParameterizable(String value) {
        return value != null && (value.contains("{{") || value.contains("${"));
    }
    
    public PostmanItem findRequestByName(String requestName) {
        if (currentCollection == null) return null;
        return findRequestInItems(currentCollection.getItems(), requestName);
    }
    
    private PostmanItem findRequestInItems(List<PostmanItem> items, String requestName) {
        if (items == null) return null;
        
        for (PostmanItem item : items) {
            if (item.getName().equals(requestName) && item.getRequest() != null) {
                return item;
            } else if (item.getItem() != null) {
                PostmanItem found = findRequestInItems(item.getItem(), requestName);
                if (found != null) return found;
            }
        }
        return null;
    }
    
    public Map<String, String> getEnvironmentVariables() {
        if (currentEnvironment == null || currentEnvironment.getValues() == null) {
            return Collections.emptyMap();
        }
        
        return currentEnvironment.getValues().stream()
            .collect(Collectors.toMap(
                PostmanVariable::getKey,
                PostmanVariable::getValue,
                (existing, replacement) -> replacement
            ));
    }
    
    public String replaceVariables(String input, Map<String, String> parameters) {
        if (input == null) return null;
        
        String result = input;
        
        // Replace environment variables
        Map<String, String> envVars = getEnvironmentVariables();
        for (Map.Entry<String, String> entry : envVars.entrySet()) {
            result = result.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        
        // Replace parameters
        if (parameters != null) {
            for (Map.Entry<String, String> entry : parameters.entrySet()) {
                result = result.replace("{{" + entry.getKey() + "}}", entry.getValue());
                result = result.replace("${" + entry.getKey() + "}", entry.getValue());
            }
        }
        
        return result;
    }
    
    public Object parseJsonResponse(String jsonContent) throws IOException {
        // Parse JSON content into generic object structure
        return objectMapper.readValue(jsonContent, Object.class);
    }
}