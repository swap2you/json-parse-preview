import React, { useState, useEffect } from 'react';
import { Play, Edit, X } from 'lucide-react';

const ParameterInput = ({ request, onExecuteRequest, isExecuting }) => {
  const [parameters, setParameters] = useState({});
  const [customParams, setCustomParams] = useState([]);

  useEffect(() => {
    if (request && request.parameters) {
      const initialParams = {};
      request.parameters.forEach(param => {
        initialParams[param.key] = param.value || '';
      });
      setParameters(initialParams);
    } else {
      setParameters({});
    }
    setCustomParams([]);
  }, [request]);

  const handleParameterChange = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addCustomParameter = () => {
    setCustomParams(prev => [...prev, { key: '', value: '', id: Date.now() }]);
  };

  const updateCustomParameter = (id, field, value) => {
    setCustomParams(prev => 
      prev.map(param => 
        param.id === id ? { ...param, [field]: value } : param
      )
    );
  };

  const removeCustomParameter = (id) => {
    setCustomParams(prev => prev.filter(param => param.id !== id));
  };

  const handleExecute = () => {
    const allParams = { ...parameters };
    
    // Add custom parameters
    customParams.forEach(param => {
      if (param.key && param.value) {
        allParams[param.key] = param.value;
      }
    });

    onExecuteRequest({
      requestName: request.name,
      parameters: allParams,
      environment: 'default'
    });
  };

  if (!request) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Request Selected</h3>
          <p className="text-gray-600">Choose a request from the sidebar to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{request.name}</h2>
            {request.description && (
              <p className="text-sm text-gray-600 mt-1">{request.description}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded uppercase ${
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

        <div className="bg-gray-50 px-4 py-2 rounded-md mb-4">
          <code className="text-sm text-gray-700">{request.url}</code>
        </div>

        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
            isExecuting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isExecuting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Execute Request</span>
            </>
          )}
        </button>
      </div>

      {/* Parameters Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Parameters</h3>

        {/* Original Parameters */}
        {request.parameters && request.parameters.length > 0 ? (
          <div className="space-y-4 mb-6">
            {request.parameters.map((param, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-start">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {param.key}
                  </label>
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    param.type === 'query' ? 'bg-blue-100 text-blue-800' :
                    param.type === 'header' ? 'bg-purple-100 text-purple-800' :
                    param.type === 'path' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {param.type}
                  </span>
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    value={parameters[param.key] || ''}
                    onChange={(e) => handleParameterChange(param.key, e.target.value)}
                    placeholder={param.value || `Enter ${param.key}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {param.description && (
                    <p className="text-xs text-gray-500 mt-1">{param.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 mb-6">
            <p className="text-gray-500">No parameters defined for this request</p>
          </div>
        )}

        {/* Custom Parameters */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">Custom Parameters</h4>
            <button
              onClick={addCustomParameter}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              <span>+</span>
              <span>Add Parameter</span>
            </button>
          </div>

          {customParams.length > 0 ? (
            <div className="space-y-3">
              {customParams.map((param) => (
                <div key={param.id} className="grid grid-cols-5 gap-3 items-center">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) => updateCustomParameter(param.id, 'key', e.target.value)}
                    placeholder="Parameter key"
                    className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => updateCustomParameter(param.id, 'value', e.target.value)}
                    placeholder="Parameter value"
                    className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    onClick={() => removeCustomParameter(param.id)}
                    className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No custom parameters added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParameterInput;