/**
 * Main Application Component - JsonParsePreview
 * 
 * This is the root component that orchestrates the entire application,
 * managing state for file uploads, API requests, and UI interactions.
 * 
 * Features:
 * - Multi-format file upload (Collections, Environments, JSON)
 * - Real-time API request execution
 * - Interactive JSON response visualization
 * - Modern responsive design with loading states
 * 
 * @author JsonParsePreview Team
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ParameterInput from './components/ParameterInput';
import JsonViewer from './components/JsonViewer';
import { apiService } from './services/apiService';
import './index.css';

/**
 * Main App Component
 * 
 * Manages application state including:
 * - Uploaded files and parsed requests
 * - API execution state and responses
 * - UI mode switching (collection vs direct JSON view)
 * - Error handling and loading states
 */
function App() {
  // State for managing API requests and collections
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  
  // Loading and execution states
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  
  // Error handling
  const [error, setError] = useState(null);
  
  // UI state management
  const [viewMode, setViewMode] = useState('collection'); // 'collection' or 'json-response'
  const [jsonPreviewMode, setJsonPreviewMode] = useState('beautified'); // 'raw' or 'beautified'

  /**
   * Load and parse requests from uploaded collection
   * 
   * Fetches the parsed requests from the backend after a successful
   * collection upload and auto-selects the first available request.
   */
  const loadRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Loading requests from uploaded collection...');
      const fetchedRequests = await apiService.getRequests();
      
      setRequests(fetchedRequests);
      console.log(`Loaded ${fetchedRequests.length} requests from collection`);
      
      // Auto-select first request for better UX
      if (fetchedRequests.length > 0) {
        setSelectedRequest(fetchedRequests[0]);
        console.log(`Auto-selected request: ${fetchedRequests[0].name}`);
      }
    } catch (err) {
      console.error('Error loading requests:', err);
      setError('Failed to load requests. Please try uploading the collection again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Postman collection file upload
   * 
   * Uploads collection file to backend, switches to collection view mode,
   * and loads the parsed requests for user selection.
   * 
   * @param {File} file - The uploaded Postman collection JSON file
   */
  const handleUploadCollection = async (file) => {
    try {
      setError(null);
      setIsLoading(true);
      
      console.log('Uploading collection file:', file.name, `(${file.size} bytes)`);
      const response = await apiService.uploadCollection(file);
      
      if (response.success) {
        setViewMode('collection');
        setApiResponse(null); // Clear any existing JSON response
        
        console.log('Collection uploaded successfully:', response.collectionName);
        
        // Load requests after successful upload
        await loadRequests();
      } else {
        setError(response.error || 'Failed to upload collection');
        console.error('Collection upload failed:', response.error);
      }
    } catch (err) {
      console.error('Error uploading collection:', err);
      setError('Failed to upload collection. Please check the file format.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle environment variables file upload
   * 
   * Uploads environment file to backend for parameter substitution
   * during API request execution.
   * 
   * @param {File} file - The uploaded Postman environment JSON file
   */
  const handleUploadEnvironment = async (file) => {
    try {
      setError(null);
      console.log('Uploading environment file:', file.name);
      
      const response = await apiService.uploadEnvironment(file);
      if (!response.success) {
        setError(response.error || 'Failed to upload environment');
        console.error('Environment upload failed:', response.error);
      } else {
        console.log('Environment uploaded successfully');
      }
    } catch (err) {
      console.error('Error uploading environment:', err);
      setError('Failed to upload environment file.');
    }
  };

  // Handle JSON response upload
  const handleUploadJsonResponse = async (file) => {
    try {
      setError(null);
      const response = await apiService.uploadJsonResponse(file);
      if (response.success) {
        setViewMode('json-response');
        setApiResponse(response.response);
        setSelectedRequest(null);
        setRequests([]); // Clear requests since we're viewing a direct JSON response
      } else {
        setError(response.error || 'Failed to upload JSON response');
      }
    } catch (err) {
      console.error('Error uploading JSON response:', err);
      setError('Failed to upload JSON response file. Please check the file format.');
    }
  };

  // Handle request execution
  const handleExecuteRequest = async (executeRequest) => {
    try {
      setIsExecuting(true);
      setError(null);
      
      const response = await apiService.executeRequest(executeRequest);
      setApiResponse(response);
      
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      console.error('Error executing request:', err);
      setError('Failed to execute request. Please check your parameters and try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  // Handle request selection
  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
    setApiResponse(null); // Clear previous response
    setError(null);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        requests={requests}
        selectedRequest={selectedRequest}
        onRequestSelect={handleRequestSelect}
        onUploadCollection={handleUploadCollection}
        onUploadEnvironment={handleUploadEnvironment}
        onUploadJsonResponse={handleUploadJsonResponse}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden">
          {/* Parameter Input Section - Only show when in collection mode */}
          {viewMode === 'collection' && (
            <div className="w-1/2 border-r border-gray-200">
              <ParameterInput
                request={selectedRequest}
                onExecuteRequest={handleExecuteRequest}
                isExecuting={isExecuting}
              />
            </div>
          )}

          {/* JSON Response Section */}
          <div className={`${viewMode === 'collection' ? 'w-1/2' : 'w-full'} flex flex-col bg-white`}>
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {viewMode === 'json-response' ? 'JSON Response Viewer' : 'API Response'}
              </h3>
              {apiResponse && (
                <div className="flex items-center space-x-4 mt-2">
                  {viewMode === 'collection' && (
                    <>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          apiResponse.statusCode >= 200 && apiResponse.statusCode < 300
                            ? 'bg-green-100 text-green-800'
                            : apiResponse.statusCode >= 400
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {apiResponse.statusCode}
                      </span>
                      <span className="text-sm text-gray-600">
                        {apiResponse.executionTimeMs}ms
                      </span>
                    </>
                  )}
                  {viewMode === 'json-response' && (
                    <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                      Uploaded JSON
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(apiResponse.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 p-4 overflow-hidden">
              {!apiResponse ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <p>
                      {viewMode === 'json-response' 
                        ? 'Upload a JSON response file to view its structure'
                        : 'Execute a request to see the response'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <JsonViewer
                    data={apiResponse.responseBody}
                    rootKey="response"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;