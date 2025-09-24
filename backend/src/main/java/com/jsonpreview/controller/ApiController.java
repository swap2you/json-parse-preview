package com.jsonpreview.controller;

import java.util.Map;
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
import java.nio.charset.StandardCharsets;

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
    // Common response keys
    private static final String KEY_SUCCESS = "success";
    private static final String KEY_ERROR = "error";
    private static final String KEY_MESSAGE = "message";
    
    // Logger for tracking API requests and debugging
    private static final Logger logger = LoggerFactory.getLogger(ApiController.class);
    
    // Service dependencies injected via Spring's dependency injection
    private final PostmanParserService postmanParserService;
    private final ApiExecutionService apiExecutionService;

    public ApiController(PostmanParserService postmanParserService, ApiExecutionService apiExecutionService) {
        this.postmanParserService = postmanParserService;
        this.apiExecutionService = apiExecutionService;
    }
    
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
    public ResponseEntity<Map<String, Object>> uploadCollection(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading collection file: {} (size: {} bytes)", 
                       file.getOriginalFilename(), file.getSize());
            
            // Parse the uploaded Postman collection
            PostmanCollection collection = postmanParserService.parseCollection(file);
            
            logger.info("Successfully parsed collection: {} with {} items", 
                       collection.getInfo().getName(), 
                       collection.getItems().size());
            
            java.util.Map<String, Object> resp = new java.util.HashMap<>();
            resp.put(KEY_SUCCESS, true);
            resp.put(KEY_MESSAGE, "Collection uploaded successfully");
            resp.put("collectionName", collection.getInfo().getName());
            resp.put("itemCount", collection.getItems().size());
            return ResponseEntity.ok().body(resp);
        } catch (Exception e) {
            logger.error("Error uploading collection file '{}': {}", 
                        file.getOriginalFilename(), e.getMessage(), e);
            java.util.Map<String, Object> resp = new java.util.HashMap<>();
            resp.put(KEY_SUCCESS, false);
            resp.put(KEY_ERROR, "Failed to parse collection: " + e.getMessage());
            return ResponseEntity.badRequest().body(resp);
        }
    }
    
    @PostMapping("/upload/environment")
    public ResponseEntity<Map<String, Object>> uploadEnvironment(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading environment file: {}", file.getOriginalFilename());
            PostmanEnvironment environment = postmanParserService.parseEnvironment(file);
            java.util.Map<String, Object> resp = new java.util.HashMap<>();
            resp.put(KEY_SUCCESS, true);
            resp.put(KEY_MESSAGE, "Environment uploaded successfully");
            resp.put("environmentName", environment.getName());
            return ResponseEntity.ok().body(resp);
        } catch (Exception e) {
            logger.error("Error uploading environment: {}", e.getMessage(), e);
            java.util.Map<String, Object> resp = new java.util.HashMap<>();
            resp.put(KEY_SUCCESS, false);
            resp.put(KEY_ERROR, e.getMessage());
            return ResponseEntity.badRequest().body(resp);
        }
    }
    
    @PostMapping("/upload/json-response")
    public ResponseEntity<Map<String, Object>> uploadJsonResponse(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Uploading JSON response file: {}", file.getOriginalFilename());
            
            // Read and parse the JSON file
            String jsonContent = new String(file.getBytes(), StandardCharsets.UTF_8);
            Object parsedJson = postmanParserService.parseJsonResponse(jsonContent);
            
            // Create response similar to API execution response
            ApiResponseDto response = new ApiResponseDto();
            response.setResponseBody(parsedJson);
            response.setStatusCode(200);
            response.setExecutionTimeMs(0L);
            response.setTimestamp(java.time.LocalDateTime.now());
            
            java.util.Map<String, Object> resp = new java.util.HashMap<>();
            resp.put(KEY_SUCCESS, true);
            resp.put(KEY_MESSAGE, "JSON response uploaded successfully");
            resp.put("response", response);
            return ResponseEntity.ok().body(resp);
        } catch (Exception e) {
            logger.error("Error uploading JSON response: {}", e.getMessage(), e);
            java.util.Map<String, Object> resp = new java.util.HashMap<>();
            resp.put(KEY_SUCCESS, false);
            resp.put(KEY_ERROR, "Invalid JSON file: " + e.getMessage());
            return ResponseEntity.badRequest().body(resp);
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
    public ResponseEntity<Map<String, Object>> health() {
        java.util.Map<String, Object> resp = new java.util.HashMap<>();
        resp.put("status", "UP");
        resp.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok().body(resp);
    }
    
    // (Removed custom Map.of helper)
}