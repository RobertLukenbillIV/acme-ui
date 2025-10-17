import React, { useState } from 'react';
import Card from '../../src/components/Card';
import Forum from '../../src/components/Forum';
import Hero from '../../src/components/Hero';
import { TextInput, TextArea } from '../../src/components/Form';

const ForumPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const forumUsers = [
    {
      name: 'Alice Johnson',
      avatar: 'https://picsum.photos/100/100?random=person1',
      role: 'Moderator',
      isOnline: true
    },
    {
      name: 'Bob Developer',
      avatar: 'https://picsum.photos/100/100?random=person2',
      role: 'User',
      isOnline: false
    },
    {
      name: 'Carol Designer',
      avatar: 'https://picsum.photos/100/100?random=person3',
      role: 'Admin',
      isOnline: true
    },
    {
      name: 'David Tester',
      avatar: 'https://picsum.photos/100/100?random=person4',
      role: 'User',
      isOnline: true
    }
  ];

  const forumMessages = [
    {
      user: forumUsers[0],
      message: "Welcome to the Acme UI Components Forum! This is a great place to discuss our React component library, share examples, and get help with implementation. Feel free to explore all the interactive features including reactions, replies, and more.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      reactions: [
        { emoji: '👍', count: 15 },
        { emoji: '❤️', count: 8 },
        { emoji: '🚀', count: 5 },
        { emoji: '🎉', count: 3 }
      ]
    },
    {
      user: forumUsers[1],
      message: "Just implemented the ImageGallery component in my project and it works perfectly! The lightbox animations are so smooth. Thanks for building such a comprehensive library.",
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      reactions: [
        { emoji: '👍', count: 12 },
        { emoji: '💯', count: 4 },
        { emoji: '🔥', count: 2 }
      ]
    },
    {
      user: forumUsers[2],
      message: "The new dark mode toggle is fantastic! I love how it seamlessly switches between themes and persists the user's preference. The design consistency across all components is impressive.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      reactions: [
        { emoji: '👍', count: 9 },
        { emoji: '❤️', count: 6 },
        { emoji: '✨', count: 4 }
      ]
    },
    {
      user: forumUsers[3],
      message: "Has anyone tried the multi-position Navigation component yet? I'm particularly interested in the layered navigation feature for complex menu structures.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      reactions: [
        { emoji: '👍', count: 7 },
        { emoji: '🤔', count: 2 }
      ]
    },
    {
      user: forumUsers[0],
      message: "@David The layered navigation supports up to 4 levels deep! Check out the demo on the homepage - we have examples with left sidebar, right sidebar, and top dropdown navigation all working together.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      reactions: [
        { emoji: '👍', count: 5 },
        { emoji: '🙏', count: 3 },
        { emoji: '💡', count: 2 }
      ]
    }
  ];

  const handleForumAction = (action, messageIndex) => {
    console.log(`Forum action: ${action} on message ${messageIndex}`);
    // In a real app, you would handle the action here
    alert(`${action} action triggered! (This is just a demo)`);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !newUsername.trim()) return;
    
    alert(`Message submitted by ${newUsername}: "${newMessage}" (This is just a demo)`);
    setNewMessage('');
    setNewUsername('');
  };

  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/600?random=community"
        title="Forum & Community Components"
        subtitle="Build engaging community features with interactive forum components"
        variant="static"
        height="50vh"
      >
        <p style={{ 
          fontSize: '1.1rem', 
          marginTop: '1rem',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          Share your experiences, ask questions, and collaborate with the community
        </p>
      </Hero>
      
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '4rem' }}>
          <Card title="Forum Features">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4>👥 User Profiles</h4>
                <p>Rich user profiles with avatars, roles, and online status indicators</p>
              </div>
              <div>
                <h4>💬 Interactive Messages</h4>
                <p>Full message threading with timestamps and user information</p>
              </div>
              <div>
                <h4>😊 Reaction System</h4>
                <p>Express yourself with emoji reactions and see community engagement</p>
              </div>
              <div>
                <h4>⚡ Real-time Actions</h4>
                <p>Reply, forward, and report functionality for community moderation</p>
              </div>
            </div>
            
            <h4>Usage Example:</h4>
            <pre className="code-block">
{`<Forum 
  user={{
    name: 'John Doe',
    avatar: '/avatar.jpg',
    role: 'User',
    isOnline: true
  }}
  message="Hello community!"
  timestamp={new Date()}
  onReact={() => handleReact()}
  onReply={() => handleReply()}
  onForward={() => handleForward()}
  onReport={() => handleReport()}
  reactions={[
    { emoji: '👍', count: 5 },
    { emoji: '❤️', count: 2 }
  ]}
/>`}
            </pre>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Recent Discussions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {forumMessages.map((message, index) => (
              <Forum 
                key={index}
                user={message.user}
                message={message.message}
                timestamp={message.timestamp}
                onReact={() => handleForumAction('react', index)}
                onReply={() => handleForumAction('reply', index)}
                onForward={() => handleForumAction('forward', index)}
                onReport={() => handleForumAction('report', index)}
                reactions={message.reactions}
              />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <Card title="Post a New Message">
            <form onSubmit={handleSubmitMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                label="Your Name"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter your name"
                required
              />
              
              <TextArea
                label="Your Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts with the community..."
                rows={4}
                required
              />
              
              <button 
                type="submit" 
                className="demo-button primary" 
                style={{ alignSelf: 'flex-start' }}
              >
                Post Message
              </button>
            </form>
          </Card>
        </section>

        <section>
          <Card title="Forum Component Properties">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color, #ddd)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Property</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Type</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Required</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>user</code></td>
                    <td style={{ padding: '0.75rem' }}>Object</td>
                    <td style={{ padding: '0.75rem' }}>Yes</td>
                    <td style={{ padding: '0.75rem' }}>User object with name, avatar, role, and isOnline</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>message</code></td>
                    <td style={{ padding: '0.75rem' }}>String</td>
                    <td style={{ padding: '0.75rem' }}>Yes</td>
                    <td style={{ padding: '0.75rem' }}>The message content to display</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>timestamp</code></td>
                    <td style={{ padding: '0.75rem' }}>Date</td>
                    <td style={{ padding: '0.75rem' }}>No</td>
                    <td style={{ padding: '0.75rem' }}>When the message was posted</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>reactions</code></td>
                    <td style={{ padding: '0.75rem' }}>Array</td>
                    <td style={{ padding: '0.75rem' }}>No</td>
                    <td style={{ padding: '0.75rem' }}>Array of reaction objects with emoji and count</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>onReact</code></td>
                    <td style={{ padding: '0.75rem' }}>Function</td>
                    <td style={{ padding: '0.75rem' }}>No</td>
                    <td style={{ padding: '0.75rem' }}>Callback when react button is clicked</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>onReply</code></td>
                    <td style={{ padding: '0.75rem' }}>Function</td>
                    <td style={{ padding: '0.75rem' }}>No</td>
                    <td style={{ padding: '0.75rem' }}>Callback when reply button is clicked</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>onForward</code></td>
                    <td style={{ padding: '0.75rem' }}>Function</td>
                    <td style={{ padding: '0.75rem' }}>No</td>
                    <td style={{ padding: '0.75rem' }}>Callback when forward button is clicked</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}><code>onReport</code></td>
                    <td style={{ padding: '0.75rem' }}>Function</td>
                    <td style={{ padding: '0.75rem' }}>No</td>
                    <td style={{ padding: '0.75rem' }}>Callback when report button is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
};

export default ForumPage;