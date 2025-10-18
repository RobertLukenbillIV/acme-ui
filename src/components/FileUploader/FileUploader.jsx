import React, { useState, useRef, useCallback } from 'react';
import './FileUploader.css';

// Utility functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (file) => {
  const type = file.type;
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('video/')) return '🎥';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('pdf')) return '📄';
  if (type.includes('text/')) return '📝';
  if (type.includes('application/')) return '📦';
  return '📎';
};

const validateFile = (file, accept, maxSize, minSize) => {
  const errors = [];
  
  // Check file type
  if (accept) {
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const isAccepted = acceptedTypes.some(acceptedType => {
      if (acceptedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
      }
      return file.type.match(acceptedType.replace('*', '.*'));
    });
    
    if (!isAccepted) {
      errors.push(`File type "${file.type}" is not accepted`);
    }
  }
  
  // Check file size
  if (maxSize && file.size > maxSize) {
    errors.push(`File size ${formatFileSize(file.size)} exceeds maximum ${formatFileSize(maxSize)}`);
  }
  
  if (minSize && file.size < minSize) {
    errors.push(`File size ${formatFileSize(file.size)} is below minimum ${formatFileSize(minSize)}`);
  }
  
  return errors;
};

const FileUploader = ({
  label,
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  minSize = 0,
  disabled = false,
  required = false,
  error = null,
  helpText = null,
  variant = 'dropzone', // 'dropzone' | 'button' | 'minimal'
  showPreview = true,
  showProgress = true,
  onFileSelect,
  onFileRemove,
  onUpload,
  onUploadProgress,
  className = ''
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);
  
  // Handle file selection
  const handleFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = [];
    const errors = [];
    
    // Check total file limit
    if (files.length + fileArray.length > maxFiles) {
      errors.push(`Cannot upload more than ${maxFiles} files`);
      return;
    }
    
    fileArray.forEach(file => {
      const validationErrors = validateFile(file, accept, maxSize, minSize);
      
      if (validationErrors.length === 0) {
        const fileWithId = {
          ...file,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          status: 'ready', // 'ready' | 'uploading' | 'success' | 'error'
          errors: []
        };
        validFiles.push(fileWithId);
      } else {
        errors.push(`${file.name}: ${validationErrors.join(', ')}`);
      }
    });
    
    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onFileSelect?.(validFiles, updatedFiles);
    }
    
    if (errors.length > 0) {
      console.warn('File upload errors:', errors);
    }
  }, [files, accept, maxSize, minSize, maxFiles, multiple, onFileSelect]);
  
  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };
  
  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);
  
  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);
  
  // Remove file
  const removeFile = (fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    const updatedFiles = files.filter(f => f.id !== fileId);
    
    // Revoke object URL to prevent memory leaks
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFiles(updatedFiles);
    onFileRemove?.(fileToRemove, updatedFiles);
  };
  
  // Simulate upload (replace with actual upload logic)
  const uploadFile = async (file) => {
    if (!onUpload) return;
    
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, status: 'uploading' } : f
    ));
    
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
        onUploadProgress?.(file, progress);
      }
      
      await onUpload(file);
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'success' } : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'error', errors: [error.message] } : f
      ));
    }
  };
  
  // Upload all files
  const uploadAllFiles = () => {
    files.filter(f => f.status === 'ready').forEach(uploadFile);
  };
  
  // Open file dialog
  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };
  
  const renderDropzone = () => (
    <div
      ref={dropRef}
      className={`acme-file-uploader-dropzone ${dragActive ? 'active' : ''} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <div className="acme-file-uploader-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7,10 12,15 17,10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </div>
      <div className="acme-file-uploader-text">
        <p className="primary-text">
          {dragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="secondary-text">
          or <span className="link-text">browse files</span>
        </p>
      </div>
      {accept && (
        <p className="acme-file-uploader-accept">
          Accepted: {accept}
        </p>
      )}
    </div>
  );
  
  const renderButton = () => (
    <button
      type="button"
      className={`acme-file-uploader-button ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
      onClick={openFileDialog}
      disabled={disabled}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7,10 12,15 17,10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Choose Files
    </button>
  );
  
  const renderMinimal = () => (
    <div className={`acme-file-uploader-minimal ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
      <button
        type="button"
        className="acme-file-uploader-minimal-button"
        onClick={openFileDialog}
        disabled={disabled}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7,10 12,15 17,10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Upload
      </button>
      <span className="acme-file-uploader-minimal-text">
        {files.length === 0 ? 'No files selected' : `${files.length} file(s) selected`}
      </span>
    </div>
  );
  
  return (
    <div className={`acme-file-uploader ${className}`}>
      {label && (
        <label className="acme-form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="acme-file-uploader-input"
        disabled={disabled}
        required={required && files.length === 0}
      />
      
      {variant === 'dropzone' && renderDropzone()}
      {variant === 'button' && renderButton()}
      {variant === 'minimal' && renderMinimal()}
      
      {helpText && !error && (
        <div className="acme-file-uploader-help">
          {helpText}
        </div>
      )}
      
      {error && <span className="acme-form-error">{error}</span>}
      
      {/* File preview */}
      {showPreview && files.length > 0 && (
        <div className="acme-file-uploader-preview">
          <div className="acme-file-uploader-preview-header">
            <span className="file-count">{files.length} file(s)</span>
            {onUpload && files.some(f => f.status === 'ready') && (
              <button
                type="button"
                className="acme-file-uploader-upload-all"
                onClick={uploadAllFiles}
                disabled={disabled}
              >
                Upload All
              </button>
            )}
          </div>
          
          <div className="acme-file-uploader-file-list">
            {files.map(file => (
              <div key={file.id} className={`acme-file-uploader-file-item ${file.status}`}>
                <div className="file-info">
                  <div className="file-icon">
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="image-preview" />
                    ) : (
                      <span className="icon">{getFileIcon(file)}</span>
                    )}
                  </div>
                  <div className="file-details">
                    <div className="file-name" title={file.name}>
                      {file.name}
                    </div>
                    <div className="file-size">
                      {formatFileSize(file.size)}
                    </div>
                    {file.errors.length > 0 && (
                      <div className="file-errors">
                        {file.errors.map((error, index) => (
                          <div key={index} className="error-message">{error}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="file-actions">
                  {file.status === 'uploading' && showProgress && (
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${uploadProgress[file.id] || 0}%` }}
                        />
                      </div>
                      <span className="progress-text">{uploadProgress[file.id] || 0}%</span>
                    </div>
                  )}
                  
                  {file.status === 'ready' && onUpload && (
                    <button
                      type="button"
                      className="file-action-btn upload"
                      onClick={() => uploadFile(file)}
                      disabled={disabled}
                    >
                      Upload
                    </button>
                  )}
                  
                  {file.status === 'success' && (
                    <span className="status-icon success">✓</span>
                  )}
                  
                  {file.status === 'error' && (
                    <span className="status-icon error">✗</span>
                  )}
                  
                  <button
                    type="button"
                    className="file-action-btn remove"
                    onClick={() => removeFile(file.id)}
                    disabled={disabled || file.status === 'uploading'}
                    aria-label="Remove file"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;