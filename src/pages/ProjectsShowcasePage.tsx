import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Plus, Edit2, Trash2, Image as ImageIcon, Video, Type, Save, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  content: ProjectContent[];
  date: string;
}

interface ProjectContent {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
}

export default function ProjectsShowcasePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newContent, setNewContent] = useState<ProjectContent | null>(null);

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Nouveau projet',
      description: 'Description du projet',
      content: [],
      date: new Date().toISOString().split('T')[0]
    };
    setProjects([...projects, newProject]);
    setEditingProject(newProject);
    setIsEditing(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    
    setProjects(projects.map(p => 
      p.id === editingProject.id ? editingProject : p
    ));
    setIsEditing(false);
    setEditingProject(null);
    setNewContent(null);
  };

  const handleAddContent = (type: 'text' | 'image' | 'video') => {
    if (!editingProject) return;
    
    const newContentItem: ProjectContent = {
      id: Date.now().toString(),
      type,
      content: ''
    };
    
    setNewContent(newContentItem);
  };

  const handleSaveContent = () => {
    if (!editingProject || !newContent) return;
    
    setEditingProject({
      ...editingProject,
      content: [...editingProject.content, newContent]
    });
    setNewContent(null);
  };

  const handleDeleteContent = (contentId: string) => {
    if (!editingProject) return;
    
    setEditingProject({
      ...editingProject,
      content: editingProject.content.filter(c => c.id !== contentId)
    });
  };

  const renderContent = (content: ProjectContent) => {
    switch (content.type) {
      case 'image':
        return (
          <img 
            src={content.content} 
            alt="" 
            className="w-full h-64 object-cover rounded-lg"
          />
        );
      case 'video':
        return (
          <video 
            src={content.content}
            controls
            className="w-full rounded-lg"
          />
        );
      case 'text':
        return <p className="text-gray-600">{content.content}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <Code2 className="mx-auto h-12 w-12 text-primary-600" />
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Nos Réalisations
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Découvrez nos projets et réalisations récentes
            </p>
          </div>
          <button
            onClick={handleAddProject}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Ajouter un projet
          </button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {editingProject?.id === project.id ? (
                <div className="p-6">
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      title: e.target.value
                    })}
                    className="input w-full mb-4"
                    placeholder="Titre du projet"
                  />
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })}
                    className="input w-full mb-4"
                    rows={3}
                    placeholder="Description du projet"
                  />
                  
                  {editingProject.content.map((content) => (
                    <div key={content.id} className="mb-4 relative group">
                      {renderContent(content)}
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {newContent ? (
                    <div className="mb-4">
                      {newContent.type === 'text' ? (
                        <textarea
                          value={newContent.content}
                          onChange={(e) => setNewContent({
                            ...newContent,
                            content: e.target.value
                          })}
                          className="input w-full mb-2"
                          rows={3}
                          placeholder="Entrez votre texte"
                        />
                      ) : (
                        <input
                          type="text"
                          value={newContent.content}
                          onChange={(e) => setNewContent({
                            ...newContent,
                            content: e.target.value
                          })}
                          className="input w-full mb-2"
                          placeholder={`URL de ${newContent.type === 'image' ? "l'image" : 'la vidéo'}`}
                        />
                      )}
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setNewContent(null)}
                          className="btn btn-outline"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleSaveContent}
                          className="btn btn-primary"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => handleAddContent('text')}
                        className="btn btn-outline flex-1"
                      >
                        <Type className="h-4 w-4 mr-2" />
                        Texte
                      </button>
                      <button
                        onClick={() => handleAddContent('image')}
                        className="btn btn-outline flex-1"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Image
                      </button>
                      <button
                        onClick={() => handleAddContent('video')}
                        className="btn btn-outline flex-1"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Vidéo
                      </button>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProject}
                      className="btn btn-primary"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  {project.content.map((content) => (
                    <div key={content.id} className="mb-4">
                      {renderContent(content)}
                    </div>
                  ))}

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="btn btn-outline"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="btn btn-outline text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}