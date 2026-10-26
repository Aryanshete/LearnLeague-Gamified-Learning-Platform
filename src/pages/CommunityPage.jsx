import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Plus,
  Send,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { mockCategories } from '../mock/mockCommunity.js';

export default function CommunityPage() {
  const { posts, toggleUpvotePost, addCommunityPost, addCommentToPost } = useApp();
  const [selectedCat, setSelectedCat] = useState('All Topics');
  const [showModal, setShowModal] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Data Structures');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const filtered = posts.filter((p) => {
    if (selectedCat === 'All Topics') return true;
    return p.category === selectedCat;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addCommunityPost({ title, category, content, tags });
    setTitle('');
    setContent('');
    setTags('');
    setShowModal(false);
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addCommentToPost(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Peer Hub
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Technical Discussion Board
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Exchange algorithmic notes, ask questions, and share project implementations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Topic</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5">
        {mockCategories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedCat === c
                ? 'bg-indigo-600 text-white'
                : 'bg-[#141824] border border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <div key={post.id} className="surface-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400">
                  {post.category} • {post.author.name} ({post.author.role})
                </span>
                <h3 className="text-sm font-bold text-white font-heading mt-0.5">
                  {post.title}
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 shrink-0">{post.timeAgo}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {post.content}
            </p>

            {/* Actions: Upvote & Reply */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => toggleUpvotePost(post.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                  post.hasUpvoted
                    ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-[#141824] border-white/[0.08] text-slate-400 hover:text-white'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{post.upvotes}</span>
              </button>

              <span className="text-slate-400 text-[11px]">
                {post.comments?.length || 0} Replies
              </span>
            </div>

            {/* Replies */}
            {post.comments && post.comments.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/[0.04] pl-3">
                {post.comments.map((c) => (
                  <div key={c.id} className="text-xs space-y-0.5">
                    <span className="font-semibold text-slate-300">{c.author.name}: </span>
                    <span className="text-slate-400">{c.content}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add reply input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddComment(post.id);
                }}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleAddComment(post.id)}
                className="p-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#11141d] border border-white/[0.1] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white font-heading">
                Create Topic
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Graph Cycle Detection Edge Cases"
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Data Structures">Data Structures</option>
                  <option value="System Design">System Design</option>
                  <option value="Projects">Projects</option>
                  <option value="Announcements">Announcements</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Content</label>
                <textarea
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Technical question or discussion note..."
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
