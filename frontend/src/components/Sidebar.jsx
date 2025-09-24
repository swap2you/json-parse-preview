/**
 * Sidebar Component - Modern tabbed interface for file uploads and controls
 * Features: Gradient design, drag-and-drop uploads, animated transitions
 */
import React, { useState } from 'react';
import { 
  Upload, FileText, Database, Settings, File, RefreshCw, Eye, Code, 
  Play, Sparkles, Zap, Globe, FolderOpen, CheckCircle, AlertCircle 
} from 'lucide-react';

const Sidebar = ({
  requests,
  selectedRequest,
  onRequestSelect,
  onUploadCollection,
  onUploadEnvironment,
  onUploadJsonResponse,
  onRegeneratePreview,
  isLoading,
  viewMode,
  jsonPreviewMode,
  onTogglePreviewMode
}) => {
  // Component state for file uploads and UI
  const [collectionFile, setCollectionFile] = useState(null);
  const [environmentFile, setEnvironmentFile] = useState(null);
  const [jsonResponseFile, setJsonResponseFile] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [dragStates, setDragStates] = useState({
    collection: false,
    environment: false,
    json: false
  });

  // File upload handlers with enhanced user feedback
  const handleCollectionUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setCollectionFile(file);
      onUploadCollection(file);
    }
  };

  const handleEnvironmentUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setEnvironmentFile(file);
      onUploadEnvironment(file);
    }
  };

  const handleJsonResponseUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setJsonResponseFile(file);
      onUploadJsonResponse(file);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (type) => (e) => {
    e.preventDefault();
    setDragStates(prev => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (type) => (e) => {
    e.preventDefault();
    setDragStates(prev => ({ ...prev, [type]: false }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (type, handler) => (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handler({ target: { files: [file] } });
    }
    setDragStates(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div className="w-80 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-r border-gray-200 flex flex-col h-full shadow-xl">
      {/* Enhanced Header with animated gradient */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient-x opacity-75"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white flex items-center mb-2">
            <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
            JSON Preview
          </h1>
          <p className="text-blue-100 text-sm">Modern API Response Beautifier</p>
        </div>
      </div>
          <Code className="w-6 h-6 mr-2" />
          JSON Preview
        </h1>
        <p className="text-blue-100 text-sm mt-1">Explore APIs and JSON data</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'upload'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload
        </button>
        {(viewMode === 'json-response' || requests.length > 0) && (
          <button
            onClick={() => setActiveTab('controls')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'controls'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Controls
          </button>
        )}
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="p-6 space-y-6">
          {/* Collection Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              Postman Collection
            </label>
            <div className="relative group">
              <input
                type="file"
                accept=".json"
                onChange={handleCollectionUpload}
                className="hidden"
                id="collection-upload"
              />
              <label
                htmlFor="collection-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 cursor-pointer transition-all duration-200 group-hover:bg-blue-50 group-hover:shadow-md"
              >
                <Upload className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm text-gray-600 group-hover:text-blue-700">
                  {collectionFile ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {collectionFile.name}
                    </span>
                  ) : (
                    'Choose collection file'
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* Environment Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 flex items-center">
              <Database className="w-4 h-4 mr-2 text-green-500" />
              Environment (Optional)
            </label>
            <div className="relative group">
              <input
                type="file"
                accept=".json"
                onChange={handleEnvironmentUpload}
                className="hidden"
                id="environment-upload"
              />
              <label
                htmlFor="environment-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 cursor-pointer transition-all duration-200 group-hover:bg-green-50 group-hover:shadow-md"
              >
                <Upload className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-500 transition-colors" />
                <span className="text-sm text-gray-600 group-hover:text-green-700">
                  {environmentFile ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {environmentFile.name}
                    </span>
                  ) : (
                    'Choose environment file'
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* JSON Response Upload - Enhanced */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 flex items-center">
              <File className="w-4 h-4 mr-2 text-purple-500" />
              JSON Response File
            </label>
            <div className="relative group">
              <input
                type="file"
                accept=".json"
                onChange={handleJsonResponseUpload}
                className="hidden"
                id="json-response-upload"
              />
              <label
                htmlFor="json-response-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 cursor-pointer transition-all duration-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Upload className="w-5 h-5 mr-3 text-purple-500 group-hover:text-purple-600 transition-colors" />
                <span className="text-sm text-purple-700 font-medium">
                  {jsonResponseFile ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                      {jsonResponseFile.name}
                    </span>
                  ) : (
                    'Upload JSON to preview instantly'
                  )}
                </span>
              </label>
            </div>
            <p className="text-xs text-gray-500 italic px-2">
              ✨ Upload any JSON file to explore its structure
            </p>
          </div>
        </div>
      )}

      {/* Controls Tab */}
      {activeTab === 'controls' && (viewMode === 'json-response' || requests.length > 0) && (
        <div className="p-6 space-y-6">
          {/* View Mode Toggle */}
          {viewMode === 'json-response' && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Preview Mode
              </label>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => onTogglePreviewMode && onTogglePreviewMode('beautify')}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    jsonPreviewMode === 'beautify'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Beautify
                </button>
                <button
                  onClick={() => onTogglePreviewMode && onTogglePreviewMode('raw')}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    jsonPreviewMode === 'raw'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Raw
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">
              Actions
            </label>
            <div className="space-y-2">
              <button
                onClick={onRegeneratePreview}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Preview
              </button>
              
              {selectedRequest && (
                <button
                  onClick={() => {/* Execute request logic */}}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Execute Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Requests List */}
      {activeTab === 'upload' && requests.length > 0 && (
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              Available Requests ({requests.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading requests...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {requests.map((request, index) => (
                  <div
                    key={request.id || index}
                    onClick={() => onRequestSelect(request)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedRequest?.id === request.id
                        ? 'bg-blue-100 border-2 border-blue-300 shadow-md transform scale-105'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{request.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        request.method === 'GET'
                          ? 'bg-green-100 text-green-700'
                          : request.method === 'POST'
                          ? 'bg-blue-100 text-blue-700'
                          : request.method === 'PUT'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {request.method}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{request.url}</p>
                    {request.description && (
                      <p className="text-xs text-gray-500 mt-1">{request.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;