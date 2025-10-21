import React, { useState, useEffect, useRef } from 'react';
import './CommandPalette.css';

/**
 * CommandPalette component - A powerful search and command interface
 * 
 * Features:
 * - Fuzzy search through commands and content
 * - Keyboard shortcuts for quick access
 * - Recent commands and favorites
 * - Command categories and grouping
 * - Customizable command actions
 * - Quick navigation and file search
 */
const CommandPalette = ({
  isOpen = false,
  onClose,
  onOpen,
  commands = [],
  recentCommands = [],
  placeholder = 'Type a command or search...',
  maxResults = 10,
  showCategories = true,
  showRecent = true,
  categories = {},
  className = '',
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const paletteRef = useRef(null);

  // Default command categories
  const defaultCategories = {
    navigation: { label: 'Navigation', icon: '🧭' },
    edit: { label: 'Edit', icon: '✏️' },
    view: { label: 'View', icon: '👁️' },
    file: { label: 'File', icon: '📁' },
    search: { label: 'Search', icon: '🔍' },
    tools: { label: 'Tools', icon: '🔧' },
    help: { label: 'Help', icon: '❓' },
    recent: { label: 'Recent', icon: '🕐' }
  };

  const allCategories = { ...defaultCategories, ...categories };

  // Sample default commands if none provided
  const defaultCommands = commands.length > 0 ? commands : [
    {
      id: 'go-to-file',
      label: 'Go to File...',
      category: 'navigation',
      shortcut: '⌘P',
      description: 'Quickly open any file',
      action: () => console.log('Open file picker')
    },
    {
      id: 'command-palette',
      label: 'Command Palette',
      category: 'navigation',
      shortcut: '⌘⇧P',
      description: 'Show all commands',
      action: () => console.log('Open command palette')
    },
    {
      id: 'find-in-files',
      label: 'Find in Files',
      category: 'search',
      shortcut: '⌘⇧F',
      description: 'Search across all files',
      action: () => console.log('Search in files')
    },
    {
      id: 'toggle-sidebar',
      label: 'Toggle Sidebar',
      category: 'view',
      shortcut: '⌘B',
      description: 'Show or hide the sidebar',
      action: () => console.log('Toggle sidebar')
    },
    {
      id: 'new-file',
      label: 'New File',
      category: 'file',
      shortcut: '⌘N',
      description: 'Create a new file',
      action: () => console.log('Create new file')
    },
    {
      id: 'save-all',
      label: 'Save All',
      category: 'file',
      shortcut: '⌘⌥S',
      description: 'Save all open files',
      action: () => console.log('Save all files')
    }
  ];

  // Fuzzy search function
  const fuzzySearch = (text, query) => {
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery === '') return true;
    
    let queryIndex = 0;
    for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
      if (normalizedText[i] === normalizedQuery[queryIndex]) {
        queryIndex++;
      }
    }
    
    return queryIndex === normalizedQuery.length;
  };

  // Filter and sort commands based on query
  useEffect(() => {
    let results = [];
    
    // Add recent commands if showing recent and no query
    if (showRecent && query === '' && recentCommands.length > 0) {
      const recentItems = recentCommands.map(cmd => ({
        ...cmd,
        category: 'recent',
        isRecent: true
      }));
      results.push(...recentItems.slice(0, 5));
    }
    
    // Filter commands
    const filtered = defaultCommands.filter(command =>
      fuzzySearch(command.label, query) ||
      fuzzySearch(command.description || '', query) ||
      fuzzySearch(allCategories[command.category]?.label || '', query)
    );
    
    // Sort by relevance (exact matches first, then by query position)
    filtered.sort((a, b) => {
      const aLower = a.label.toLowerCase();
      const bLower = b.label.toLowerCase();
      const queryLower = query.toLowerCase();
      
      const aExact = aLower.includes(queryLower);
      const bExact = bLower.includes(queryLower);
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      const aIndex = aLower.indexOf(queryLower);
      const bIndex = bLower.indexOf(queryLower);
      
      if (aIndex !== bIndex) return aIndex - bIndex;
      
      return a.label.localeCompare(b.label);
    });
    
    results.push(...filtered);
    
    // Limit results
    results = results.slice(0, maxResults);
    
    setFilteredCommands(results);
    setSelectedIndex(0);
  }, [query, defaultCommands, recentCommands, maxResults, showRecent, allCategories]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
          
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
          
        default:
          // Focus input for typing
          if (e.key.length === 1 && inputRef.current) {
            inputRef.current.focus();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && paletteRef.current && !paletteRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const executeCommand = (command) => {
    if (command.action) {
      command.action();
    }
    handleClose();
  };

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    if (onClose) onClose();
  };

  const handleItemClick = (command, index) => {
    setSelectedIndex(index);
    executeCommand(command);
  };

  const renderCommandItem = (command, index) => {
    const category = allCategories[command.category] || {};
    const isSelected = index === selectedIndex;
    
    return (
      <div
        key={`${command.id}-${index}`}
        className={`command-item ${isSelected ? 'selected' : ''} ${command.isRecent ? 'recent' : ''}`}
        onClick={() => handleItemClick(command, index)}
        onMouseEnter={() => setSelectedIndex(index)}
        role="option"
        aria-selected={isSelected}
      >
        <div className="command-icon">
          {category.icon || '⚡'}
        </div>
        <div className="command-content">
          <div className="command-label">{command.label}</div>
          {command.description && (
            <div className="command-description">{command.description}</div>
          )}
        </div>
        <div className="command-meta">
          {showCategories && !command.isRecent && (
            <div className="command-category">{category.label}</div>
          )}
          {command.shortcut && (
            <div className="command-shortcut">{command.shortcut}</div>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay">
      <div ref={paletteRef} className={`command-palette ${className}`} {...props}>
        <div className="command-search">
          <div className="search-icon">🔍</div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={filteredCommands[selectedIndex]?.id}
          />
          <button
            onClick={handleClose}
            className="close-button"
            aria-label="Close command palette"
          >
            ✕
          </button>
        </div>
        
        <div 
          ref={listRef}
          id="command-list"
          className="command-list"
          role="listbox"
          aria-label="Commands"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => renderCommandItem(command, index))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <div className="no-results-text">
                No commands found for "{query}"
              </div>
            </div>
          )}
        </div>
        
        <div className="command-footer">
          <div className="footer-hint">
            <kbd>↑↓</kbd> to navigate • <kbd>↵</kbd> to select • <kbd>esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;