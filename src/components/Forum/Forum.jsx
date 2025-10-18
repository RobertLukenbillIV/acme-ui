import React from 'react';
import Avatar from '../Avatar';
import './Forum.css';

const Forum = ({ 
  user = {},
  message = '',
  timestamp,
  onReact,
  onForward,
  onReply,
  onReport,
  reactions = [],
  className = ''
}) => {
  const {
    name = 'Anonymous User',
    avatar = null,
    role = null,
    isOnline = false
  } = user;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={`acme-forum-message ${className}`}>
      {/* Header with profile and user info */}
      <div className="forum-header">
        <div className="user-profile">
          <div className="avatar-container">
            <Avatar
              src={avatar}
              name={name}
              size="medium"
              status={isOnline ? 'online' : 'offline'}
              className="user-avatar"
            />
          </div>
          
          <div className="user-info">
            <div className="user-name">
              {name}
              {role && <span className="user-role">{role}</span>}
            </div>
            {timestamp && (
              <div className="message-timestamp">
                {formatTimestamp(timestamp)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message content */}
      <div className="forum-content">
        <div className="message-text">
          {message}
        </div>
      </div>

      {/* Reactions display */}
      {reactions && reactions.length > 0 && (
        <div className="reactions-display">
          {reactions.map((reaction, index) => (
            <span key={index} className="reaction-badge">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons footer */}
      <div className="forum-actions">
        <button 
          className="action-btn react-btn"
          onClick={onReact}
          aria-label="React to message"
        >
          <span className="action-icon">👍</span>
          <span className="action-text">React</span>
        </button>
        
        <button 
          className="action-btn reply-btn"
          onClick={onReply}
          aria-label="Reply to message"
        >
          <span className="action-icon">💬</span>
          <span className="action-text">Reply</span>
        </button>
        
        <button 
          className="action-btn forward-btn"
          onClick={onForward}
          aria-label="Forward message"
        >
          <span className="action-icon">↗️</span>
          <span className="action-text">Forward</span>
        </button>
        
        <button 
          className="action-btn report-btn"
          onClick={onReport}
          aria-label="Report message"
        >
          <span className="action-icon">⚠️</span>
          <span className="action-text">Report</span>
        </button>
      </div>
    </div>
  );
};

export default Forum;