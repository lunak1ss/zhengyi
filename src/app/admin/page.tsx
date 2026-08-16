'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Upload, Plus, Trash2, Edit3, Save, X, Eye, EyeOff, Video, Image, FileText } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  titleEn: string;
  badge: string;
  badgeEn: string;
  category: string;
  role: string;
  intro: string;
  contributions: { title: string; desc: string }[];
  flow: string[];
  results: string[];
  capabilityTags: string[];
  heroImage: string;
  resultImage?: string;
  endImage?: string;
  link?: { label: string; url: string };
}

interface MediaWork {
  id: number;
  title: string;
  type: 'video' | 'poster';
  cover: string;
  src: string;
  description: string;
  visible: boolean;
}

interface SiteContent {
  hero: {
    name: string;
    title: string;
    titleEn: string;
    subtitle: string;
    description: string;
    tags: string[];
  };
  about: string[];
  contact: {
    email: string;
    wechat: string;
    jobTargets: string[];
  };
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'media' | 'content'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [mediaWorks, setMediaWorks] = useState<MediaWork[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, mediaRes, contentRes] = await Promise.all([
        fetch('/api/data/projects'),
        fetch('/api/data/media-works'),
        fetch('/api/data/site-content')
      ]);
      setProjects(await projRes.json());
      setMediaWorks(await mediaRes.json());
      setSiteContent(await contentRes.json());
    } catch (err) {
      showMessage('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) return data.url;
    } catch (err) {
      showMessage('上传失败');
    }
    return null;
  };

  // Project Management
  const updateProject = async (index: number, field: string, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const saveProjects = async () => {
    try {
      await fetch('/api/data/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects)
      });
      showMessage('项目数据已保存');
    } catch (err) {
      showMessage('保存失败');
    }
  };

  const addProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: '新项目',
      titleEn: 'New Project',
      badge: 'NEW',
      badgeEn: 'NEW',
      category: '商业策划',
      role: '项目负责人',
      intro: '项目介绍...',
      contributions: [],
      flow: [],
      results: [],
      capabilityTags: [],
      heroImage: ''
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (index: number) => {
    if (confirm('确定删除这个项目吗？')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  // Media Management
  const updateMedia = async (index: number, field: string, value: any) => {
    const updated = [...mediaWorks];
    updated[index] = { ...updated[index], [field]: value };
    setMediaWorks(updated);
  };

  const saveMedia = async () => {
    try {
      await fetch('/api/data/media-works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaWorks)
      });
      showMessage('作品数据已保存');
    } catch (err) {
      showMessage('保存失败');
    }
  };

  const addMedia = () => {
    const newMedia: MediaWork = {
      id: Date.now(),
      title: '新作品',
      type: 'poster',
      cover: '',
      src: '',
      description: '作品描述',
      visible: true
    };
    setMediaWorks([...mediaWorks, newMedia]);
  };

  const deleteMedia = (index: number) => {
    if (confirm('确定删除这个作品吗？')) {
      setMediaWorks(mediaWorks.filter((_, i) => i !== index));
    }
  };

  const toggleMediaVisibility = (index: number) => {
    const updated = [...mediaWorks];
    updated[index].visible = !updated[index].visible;
    setMediaWorks(updated);
  };

  // Content Management
  const updateContent = (section: string, field: string, value: any) => {
    if (!siteContent) return;
    const updated = { ...siteContent };
    if (section === 'hero') {
      updated.hero = { ...updated.hero, [field]: value };
    } else if (section === 'contact') {
      updated.contact = { ...updated.contact, [field]: value };
    }
    setSiteContent(updated);
  };

  const saveContent = async () => {
    try {
      await fetch('/api/data/site-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteContent)
      });
      showMessage('网站内容已保存');
    } catch (err) {
      showMessage('保存失败');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">内容管理系统</h1>
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300">← 返回网站</Link>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className="fixed top-20 right-6 bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-2 rounded-lg backdrop-blur-xl z-50">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            项目管理
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'media'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            作品管理
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'content'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            网站内容
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">项目列表 ({projects.length})</h2>
              <div className="flex gap-3">
                <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  <Plus size={16} /> 添加项目
                </button>
                <button onClick={saveProjects} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                  <Save size={16} /> 保存全部
                </button>
              </div>
            </div>

            {projects.map((project, index) => (
              <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">项目 {index + 1}</h3>
                  <button onClick={() => deleteProject(index)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">标题</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">英文标题</label>
                    <input
                      type="text"
                      value={project.titleEn}
                      onChange={(e) => updateProject(index, 'titleEn', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">分类</label>
                    <select
                      value={project.category}
                      onChange={(e) => updateProject(index, 'category', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="商业策划">商业策划</option>
                      <option value="活动策划">活动策划</option>
                      <option value="AI应用">AI应用</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">角色</label>
                    <input
                      type="text"
                      value={project.role}
                      onChange={(e) => updateProject(index, 'role', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">项目介绍</label>
                  <textarea
                    value={project.intro}
                    onChange={(e) => updateProject(index, 'intro', e.target.value)}
                    rows={3}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">封面图片路径</label>
                  <input
                    type="text"
                    value={project.heroImage}
                    onChange={(e) => updateProject(index, 'heroImage', e.target.value)}
                    placeholder="/images/xxx.jpg"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">作品列表 ({mediaWorks.length})</h2>
              <div className="flex gap-3">
                <button onClick={addMedia} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  <Plus size={16} /> 添加作品
                </button>
                <button onClick={saveMedia} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                  <Save size={16} /> 保存全部
                </button>
              </div>
            </div>

            {mediaWorks.map((media, index) => (
              <div key={media.id} className={`bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 ${!media.visible && 'opacity-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {media.type === 'video' ? <Video size={20} className="text-blue-400" /> : <Image size={20} className="text-purple-400" />}
                    <h3 className="text-lg font-medium">{media.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${media.visible ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {media.visible ? '已上架' : '已下架'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleMediaVisibility(index)} className="text-white/60 hover:text-white">
                      {media.visible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button onClick={() => deleteMedia(index)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">标题</label>
                    <input
                      type="text"
                      value={media.title}
                      onChange={(e) => updateMedia(index, 'title', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">类型</label>
                    <select
                      value={media.type}
                      onChange={(e) => updateMedia(index, 'type', e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="video">视频</option>
                      <option value="poster">海报</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">封面路径</label>
                    <input
                      type="text"
                      value={media.cover}
                      onChange={(e) => updateMedia(index, 'cover', e.target.value)}
                      placeholder="/media/xxx.jpg"
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">源文件路径</label>
                    <input
                      type="text"
                      value={media.src}
                      onChange={(e) => updateMedia(index, 'src', e.target.value)}
                      placeholder="/media/xxx.mp4 或 /media/xxx.jpg"
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">描述</label>
                  <input
                    type="text"
                    value={media.description}
                    onChange={(e) => updateMedia(index, 'description', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">上传文件</label>
                  <input
                    type="file"
                    accept={media.type === 'video' ? 'video/*' : 'image/*'}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file);
                        if (url) {
                          updateMedia(index, 'src', url);
                          if (!media.cover) updateMedia(index, 'cover', url);
                          showMessage('文件上传成功');
                        }
                      }
                    }}
                    className="block w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && siteContent && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">网站内容</h2>
              <button onClick={saveContent} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                <Save size={16} /> 保存内容
              </button>
            </div>

            {/* Hero Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-medium">首页 Hero 区域</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">姓名</label>
                  <input
                    type="text"
                    value={siteContent.hero.name}
                    onChange={(e) => updateContent('hero', 'name', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">主标题</label>
                  <input
                    type="text"
                    value={siteContent.hero.title}
                    onChange={(e) => updateContent('hero', 'title', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">英文标题</label>
                  <input
                    type="text"
                    value={siteContent.hero.titleEn}
                    onChange={(e) => updateContent('hero', 'titleEn', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">副标题</label>
                  <input
                    type="text"
                    value={siteContent.hero.subtitle}
                    onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">个人介绍</label>
                <textarea
                  value={siteContent.hero.description}
                  onChange={(e) => updateContent('hero', 'description', e.target.value)}
                  rows={4}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-medium">联系方式</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">邮箱</label>
                  <input
                    type="text"
                    value={siteContent.contact.email}
                    onChange={(e) => updateContent('contact', 'email', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">微信</label>
                  <input
                    type="text"
                    value={siteContent.contact.wechat}
                    onChange={(e) => updateContent('contact', 'wechat', e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
