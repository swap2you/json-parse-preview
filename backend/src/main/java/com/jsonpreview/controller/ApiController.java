package com.jsonpreview.controller;

import com.jsonpreview.dto.ApiResponseDto;
import com.jsonpreview.dto.ExecuteRequestDto;
import com.jsonpreview.dto.RequestSummaryDto;
import com.jsonpreview.model.PostmanCollection;
import com.jsonpreview.model.PostmanEnvironment;
import com.jsonpreview.service.ApiExecutionService;
import com.jsonpreview.service.PostmanParserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {
    
    private static final Logger logger = LoggerFactory.getLogger(ApiController.class);
    
    @Autowired
    private PostmanParserService postmanParserService;
    
    @Autowired
    private ApiExecutionService apiExecutionService;
    
    @PostMapping("/upload/collection")
    public ResponseEntity<?> uploadCollection(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading collection file: {}", file.getOriginalFilename());
            PostmanCollection collection = postmanParserService.parseCollection(file);
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Collection uploaded successfully",
                "collectionName", collection.getInfo().getName()
            ));
        } catch (Exception e) {
            logger.error("Error uploading collection: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    @PostMapping("/upload/environment")
    public ResponseEntity<?> uploadEnvironment(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading environment file: {}", file.getOriginalFilename());
            PostmanEnvironment environment = postmanParserService.parseEnvironment(file);
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Environment uploaded successfully",
                "environmentName", environment.getName()
            ));
        } catch (Exception e) {
            logger.error("Error uploading environment: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    @PostMapping("/upload/json-response")
    public ResponseEntity<?> uploadJsonResponse(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading JSON response file: {}", file.getOriginalFilename());
            
            // Read and parse the JSON file
            String jsonContent = new String(file.getBytes(), "UTF-8");
            Object parsedJson = postmanParserService.parseJsonResponse(jsonContent);
            
            // Create response similar to API execution response
            ApiResponseDto response = new ApiResponseDto();
            response.setResponseBody(parsedJson);
            response.setStatusCode(200);
            response.setExecutionTimeMs(0L);
            response.setTimestamp(java.time.LocalDateTime.now());
            
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "JSON response uploaded successfully",
                "response", response
            ));
        } catch (Exception e) {
            logger.error("Error uploading JSON response: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Invalid JSON file: " + e.getMessage()
            ));
        }
    }
    
    @GetMapping("/requests")
    public ResponseEntity<List<RequestSummaryDto>> getRequests() {
        try {
            List<RequestSummaryDto> requests = postmanParserService.getAllRequests();
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            logger.error("Error getting requests: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @PostMapping("/executeRequest")
    public ResponseEntity<ApiResponseDto> executeRequest(@RequestBody ExecuteRequestDto requestDto) {
        try {
            logger.info("Executing request: {}", requestDto.getRequestName());
            ApiResponseDto response = apiExecutionService.executeRequest(requestDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error executing request: {}", e.getMessage(), e);
            ApiResponseDto errorResponse = new ApiResponseDto();
            errorResponse.setError("Internal server error: " + e.getMessage());
            errorResponse.setStatusCode(500);
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok().body(Map.of(
            "status", "UP",
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    // Helper method for creating Map responses
    private static class Map {
        public static java.util.Map<String, Object> of(String k1, Object v1, String k2, Object v2) {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put(k1, v1);
            map.put(k2, v2);
            return map;
        }
        
        public static java.util.Map<String, Object> of(String k1, Object v1, String k2, Object v2, String k3, Object v3) {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put(k1, v1);
            map.put(k2, v2);
            map.put(k3, v3);
            return map;
        }
    }
}