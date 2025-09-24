import React, { useState } from 'react';
import { Upload, FileText, Database, Play, Settings } from 'lucide-react';
import { RequestSummary } from '../types/api';

interface SidebarProps {
  requests: RequestSummary[];
  selectedRequest: RequestSummary | null;
  onRequestSelect: (request: RequestSummary) => void;
  onUploadCollection: (file: File) => void;
  onUploadEnvironment: (file: File) => void;
  onUploadJsonResponse: (file: File) => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  requests,
  selectedRequest,
  onRequestSelect,
  onUploadCollection,
  onUploadEnvironment,
  onUploadJsonResponse,
  isLoading
}) => {
  const [collectionFile, setCollectionFile] = useState<File | null>(null);
  const [environmentFile, setEnvironmentFile] = useState<File | null>(null);
  const [jsonResponseFile, setJsonResponseFile] = useState<File | null>(null);

  const handleCollectionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCollectionFile(file);
      onUploadCollection(file);
    }
  };

  const handleEnvironmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEnvironmentFile(file);
      onUploadEnvironment(file);
    }
  };

  const handleJsonResponseUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJsonResponseFile(file);
      onUploadJsonResponse(file);
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">JSON API Preview</h1>
        <p className="text-sm text-gray-600 mt-1">Upload collections and explore API responses</p>
      </div>

      {/* Upload Section */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Postman Collection
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleCollectionUpload}
              className="hidden"
              id="collection-upload"
            />
            <label
              htmlFor="collection-upload"
              className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">
                {collectionFile ? collectionFile.name : 'Choose collection file'}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Database className="w-4 h-4 inline mr-2" />
            Environment (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleEnvironmentUpload}
              className="hidden"
              id="environment-upload"
            />
            <label
              htmlFor="environment-upload"
              className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">
                {environmentFile ? environmentFile.name : 'Choose environment file'}
              </span>
            </label>
          </div>
        </div>

        {/* JSON Response Upload Section */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Or Upload JSON Response
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleJsonResponseUpload}
              className="hidden"
              id="json-response-upload"
            />
            <label
              htmlFor="json-response-upload"
              className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-primary-300 rounded-md hover:border-primary-400 cursor-pointer transition-colors bg-primary-50"
            >
              <Upload className="w-4 h-4 mr-2 text-primary-500" />
              <span className="text-sm text-primary-700">
                {jsonResponseFile ? jsonResponseFile.name : 'Upload JSON response directly'}
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Skip collection setup and view JSON responses directly
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Available Requests ({requests.length})
          </h3>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No requests found</p>
              <p className="text-xs mt-1">Upload a Postman collection to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {requests.map((request, index) => (
                <button
                  key={index}
                  onClick={() => onRequestSelect(request)}
                  className={`w-full text-left p-3 rounded-md border transition-colors ${
                    selectedRequest?.name === request.name
                      ? 'bg-primary-50 border-primary-200 text-primary-900'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm truncate">{request.name}</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded uppercase ${
                        request.method === 'GET'
                          ? 'bg-green-100 text-green-800'
                          : request.method === 'POST'
                          ? 'bg-blue-100 text-blue-800'
                          : request.method === 'PUT'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.method === 'DELETE'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {request.method}
                    </span>
                  </div>
                  {request.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {request.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 truncate">{request.url}</p>
                  {request.parameters && request.parameters.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {request.parameters.slice(0, 3).map((param, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {param.key}
                        </span>
                      ))}
                      {request.parameters.length > 3 && (
                        <span className="inline-block px-2 py-1 text-xs text-gray-500">
                          +{request.parameters.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <Settings className="w-4 h-4 mr-2" />
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;