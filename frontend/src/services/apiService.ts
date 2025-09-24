import axios from 'axios';
import { RequestSummary, ExecuteRequest, ApiResponse, UploadResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Upload Postman collection
  uploadCollection: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/upload/collection', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Upload Postman environment
  uploadEnvironment: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/upload/environment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Get all requests from uploaded collection
  getRequests: async (): Promise<RequestSummary[]> => {
    const response = await apiClient.get('/requests');
    return response.data;
  },

  // Execute a specific request
  executeRequest: async (executeRequest: ExecuteRequest): Promise<ApiResponse> => {
    const response = await apiClient.post('/executeRequest', executeRequest);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<any> => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};