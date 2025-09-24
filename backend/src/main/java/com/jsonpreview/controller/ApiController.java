/**
 * Main REST API Controller for JsonParsePreview Application
 * 
 * This controller handles all HTTP requests for the JSON API response beautifier,
 * including file uploads, request execution, and health checks.
 * 
 * Features:
 * - Postman collection and environment file upload
 * - Direct JSON response file upload for instant beautification
 * - API request execution with parameter substitution
 * - Cross-origin support for React frontend (localhost:3000)
 * 
 * @author JsonParsePreview Team
 * @version 1.0.0
 * @since 2025-09-24
 */
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
import java.util.Map;

/**
 * REST Controller providing API endpoints for JSON processing and Postman collection management
 * 
 * Base URL: /api
 * CORS enabled for: http://localhost:3000 (React development server)
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {
    
    // Logger for tracking API requests and debugging
    private static final Logger logger = LoggerFactory.getLogger(ApiController.class);
    
    // Service dependencies injected via Spring's dependency injection
    @Autowired
    private PostmanParserService postmanParserService;
    
    @Autowired
    private ApiExecutionService apiExecutionService;
    
    /**
     * Upload and parse a Postman collection file
     * 
     * Accepts multipart file uploads containing Postman Collection v2.1 JSON format.
     * The collection is parsed and stored in memory for subsequent request execution.
     * 
     * @param file MultipartFile containing Postman collection JSON
     * @return ResponseEntity with success status and collection metadata
     * 
     * @throws Exception if file parsing fails or invalid format is provided
     * 
     * Example successful response:
     * {
     *   "success": true,
     *   "message": "Collection uploaded successfully", 
     *   "collectionName": "My API Collection"
     * }
     */
    @PostMapping("/upload/collection")
    public ResponseEntity<?> uploadCollection(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading collection file: {} (size: {} bytes)", 
                       file.getOriginalFilename(), file.getSize());
            
            // Parse the uploaded Postman collection
            PostmanCollection collection = postmanParserService.parseCollection(file);
            
            logger.info("Successfully parsed collection: {} with {} items", 
                       collection.getInfo().getName(), 
                       collection.getItem().size());
            
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Collection uploaded successfully",
                "collectionName", collection.getInfo().getName(),
                "itemCount", collection.getItem().size()
            ));
        } catch (Exception e) {
            logger.error("Error uploading collection file '{}': {}", 
                        file.getOriginalFilename(), e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to parse collection: " + e.getMessage()
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