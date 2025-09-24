import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Copy, Search } from 'lucide-react';

interface JsonViewerProps {
  data: any;
  rootKey?: string;
}

interface JsonNodeProps {
  data: any;
  keyName?: string;
  level?: number;
  isLast?: boolean;
  searchTerm?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, rootKey = 'root' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard:', text);
    });
  };

  const filterData = (obj: any, term: string): any => {
    if (!term) return obj;
    
    const lowercaseTerm = term.toLowerCase();
    
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return obj.filter(item => 
          JSON.stringify(item).toLowerCase().includes(lowercaseTerm)
        );
      } else {
        const filtered: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key.toLowerCase().includes(lowercaseTerm) ||
              JSON.stringify(value).toLowerCase().includes(lowercaseTerm)) {
            filtered[key] = value;
          }
        }
        return filtered;
      }
    }
    
    return JSON.stringify(obj).toLowerCase().includes(lowercaseTerm) ? obj : null;
  };

  const filteredData = useMemo(() => {
    try {
      return filterData(data, searchTerm);
    } catch (error) {
      return data;
    }
  }, [data, searchTerm]);

  return (
    <div className="json-viewer bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search keys and values..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            title="Copy entire JSON"
          >
            <Copy className="w-4 h-4" />
            <span>Copy All</span>
          </button>
        </div>
      </div>

      {/* JSON Content */}
      <div className="p-4 max-h-96 overflow-auto">
        <JsonNode
          data={filteredData}
          keyName={rootKey}
          level={0}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

const JsonNode: React.FC<JsonNodeProps> = ({ 
  data, 
  keyName, 
  level = 0, 
  isLast = true,
  searchTerm = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(level > 2); // Auto-collapse deep levels

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderValue = (value: any, key?: string) => {
    const fullPath = key ? `${keyName}.${key}` : keyName;

    if (value === null) {
      return <span className="json-null">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="json-boolean">{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>;
    }

    if (typeof value === 'string') {
      return (
        <span className="json-string">
          "{value}"
          {value.length > 50 && (
            <button
              onClick={() => copyToClipboard(value)}
              className="ml-2 text-xs text-gray-500 hover:text-gray-700"
              title="Copy value"
            >
              <Copy className="w-3 h-3 inline" />
            </button>
          )}
        </span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ArrayNode
          data={value}
          keyName={fullPath}
          level={level + 1}
          searchTerm={searchTerm}
        />
      );
    }

    if (typeof value === 'object') {
      return (
        <ObjectNode
          data={value}
          keyName={fullPath}
          level={level + 1}
          searchTerm={searchTerm}
        />
      );
    }

    return <span>{String(value)}</span>;
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="json-property" style={{ marginLeft: `${level * 16}px` }}>
      {keyName && (
        <span className="json-key">
          {highlightText(keyName, searchTerm)}
        </span>
      )}
      {keyName && ': '}
      {renderValue(data, keyName)}
    </div>
  );
};

const ObjectNode: React.FC<JsonNodeProps> = ({ 
  data, 
  keyName, 
  level = 0,
  searchTerm = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(level > 1);

  if (!data || typeof data !== 'object') {
    return <span className="json-null">null</span>;
  }

  const entries = Object.entries(data);
  const isEmpty = entries.length === 0;

  const getTypeDescription = (key: string) => {
    // Simple field description generator based on common API field patterns
    const descriptions: Record<string, string> = {
      'id': 'Unique identifier',
      'name': 'Display name',
      'email': 'Email address',
      'phone': 'Phone number',
      'address': 'Physical address',
      'created_at': 'Creation timestamp',
      'updated_at': 'Last update timestamp',
      'status': 'Current status',
      'active': 'Active state',
      'enabled': 'Enabled state',
      'count': 'Total count',
      'total': 'Total amount',
      'price': 'Price value',
      'amount': 'Amount value',
      'description': 'Descriptive text',
      'url': 'Web URL',
      'image': 'Image URL or path',
    };

    const lowerKey = key.toLowerCase();
    for (const [pattern, desc] of Object.entries(descriptions)) {
      if (lowerKey.includes(pattern)) {
        return desc;
      }
    }

    return '';
  };

  return (
    <div className="json-object">
      <div className="flex items-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="json-collapse-btn flex items-center"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <span className="text-gray-600">
          {isEmpty ? '{}' : `{${entries.length} ${entries.length === 1 ? 'property' : 'properties'}}`}
        </span>
      </div>

      {!isCollapsed && !isEmpty && (
        <div className="ml-6 mt-1">
          {entries.map(([key, value], index) => {
            const description = getTypeDescription(key);
            return (
              <div key={key} className="mb-1">
                <div className="flex items-start space-x-2">
                  <span className="json-key flex-shrink-0">"{key}":</span>
                  <div className="flex-1">
                    <JsonNode
                      data={value}
                      keyName={key}
                      level={level + 1}
                      isLast={index === entries.length - 1}
                      searchTerm={searchTerm}
                    />
                    {description && (
                      <div className="text-xs text-gray-500 mt-1 italic">
                        {description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(value, null, 2))}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="Copy this value"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ArrayNode: React.FC<JsonNodeProps> = ({ 
  data, 
  keyName, 
  level = 0,
  searchTerm = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(level > 1);

  if (!Array.isArray(data)) {
    return <span className="json-null">null</span>;
  }

  const isEmpty = data.length === 0;

  return (
    <div className="json-array">
      <div className="flex items-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="json-collapse-btn flex items-center"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <span className="text-gray-600">
          {isEmpty ? '[]' : `[${data.length} ${data.length === 1 ? 'item' : 'items'}]`}
        </span>
      </div>

      {!isCollapsed && !isEmpty && (
        <div className="ml-6 mt-1">
          {data.map((item, index) => (
            <div key={index} className="mb-1">
              <div className="flex items-start space-x-2">
                <span className="text-gray-500 flex-shrink-0">[{index}]:</span>
                <div className="flex-1">
                  <JsonNode
                    data={item}
                    level={level + 1}
                    isLast={index === data.length - 1}
                    searchTerm={searchTerm}
                  />
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(item, null, 2))}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  title="Copy this item"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JsonViewer;