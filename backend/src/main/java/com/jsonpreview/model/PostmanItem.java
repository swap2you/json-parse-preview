package com.jsonpreview.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PostmanItem {
    
    private String name;
    private String description;
    private PostmanRequest request;
    private List<PostmanItem> item; // For folders
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public PostmanRequest getRequest() { return request; }
    public void setRequest(PostmanRequest request) { this.request = request; }
    
    public List<PostmanItem> getItem() { return item; }
    public void setItem(List<PostmanItem> item) { this.item = item; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostmanRequest {
        private String method;
        private PostmanUrl url;
        private List<PostmanHeader> header;
        private PostmanBody body;
        private PostmanAuth auth;
        
        // Getters and Setters
        public String getMethod() { return method; }
        public void setMethod(String method) { this.method = method; }
        
        public PostmanUrl getUrl() { return url; }
        public void setUrl(PostmanUrl url) { this.url = url; }
        
        public List<PostmanHeader> getHeader() { return header; }
        public void setHeader(List<PostmanHeader> header) { this.header = header; }
        
        public PostmanBody getBody() { return body; }
        public void setBody(PostmanBody body) { this.body = body; }
        
        public PostmanAuth getAuth() { return auth; }
        public void setAuth(PostmanAuth auth) { this.auth = auth; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostmanUrl {
        private String raw;
        private List<String> host;
        private List<String> path;
        private List<PostmanQuery> query;
        
        // Getters and Setters
        public String getRaw() { return raw; }
        public void setRaw(String raw) { this.raw = raw; }
        
        public List<String> getHost() { return host; }
        public void setHost(List<String> host) { this.host = host; }
        
        public List<String> getPath() { return path; }
        public void setPath(List<String> path) { this.path = path; }
        
        public List<PostmanQuery> getQuery() { return query; }
        public void setQuery(List<PostmanQuery> query) { this.query = query; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostmanHeader {
        private String key;
        private String value;
        private String description;
        
        // Getters and Setters
        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }
        
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostmanQuery {
        private String key;
        private String value;
        private String description;
        
        // Getters and Setters
        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }
        
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostmanBody {
        private String mode;
        private String raw;
        
        // Getters and Setters
        public String getMode() { return mode; }
        public void setMode(String mode) { this.mode = mode; }
        
        public String getRaw() { return raw; }
        public void setRaw(String raw) { this.raw = raw; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostmanAuth {
        private String type;
        private Map<String, Object> apikey;
        private Map<String, Object> bearer;
        private Map<String, Object> basic;
        
        // Getters and Setters
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public Map<String, Object> getApikey() { return apikey; }
        public void setApikey(Map<String, Object> apikey) { this.apikey = apikey; }
        
        public Map<String, Object> getBearer() { return bearer; }
        public void setBearer(Map<String, Object> bearer) { this.bearer = bearer; }
        
        public Map<String, Object> getBasic() { return basic; }
        public void setBasic(Map<String, Object> basic) { this.basic = basic; }
    }
}