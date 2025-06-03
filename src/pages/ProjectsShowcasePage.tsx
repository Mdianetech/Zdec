import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Plus, Edit2, Trash2, Image as ImageIcon, Video, Type, Save, X, ExternalLink } from 'lucide-react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (err) {
      setError('Error loading projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    const newProject: Omit<Project, 'id'> = {
      title: 'Nouveau projet',
      description: 'Description du projet',
      content: [],
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      const projectWithId = { ...newProject, id: docRef.id };
      setProjects([...projects, projectWithId]);
      setEditingProject(projectWithId);
      setIsEditing(true);
    } catch (err) {
      setError('Error creating project');
      console.error('Error adding project:', err);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      setError('Error deleting project');
      console.error('Error deleting project:', err);
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    
    try {
      await updateDoc(doc(db, 'projects', editingProject.id), {
        title: editingProject.title,
        description: editingProject.description,
        content: editingProject.content
      });

      setProjects(projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      ));
      setIsEditing(false);
      setEditingProject(null);
      setNewContent(null);
    } catch (err) {
      setError('Error saving project');
      console.error('Error updating project:', err);
    }
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
          <div className="relative group cursor-pointer" onClick={() => setSelectedImage(content.content)}>
            <img 
              src={content.content} 
              alt="" 
              className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative rounded-lg overflow-hidden">
            <video 
              src={content.content}
              controls
              className="w-full rounded-lg"
            />
          </div>
        );
      case 'text':
        return <p className="text-gray-600 leading-relaxed">{content.content}</p>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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
        
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
                  
                  <div className="space-y-4">
                    {editingProject.content.map((content) => (
                      <div key={content.id} className="relative group">
                        {renderContent(content)}
                        <button
                          onClick={() => handleDeleteContent(content.id)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {newContent ? (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg">
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
                    <div className="flex gap-2 mt-4">
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

                  <div className="flex justify-end mt-4">
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
                  
                  <div className="space-y-4">
                    {project.content.map((content) => (
                      <div key={content.id} className="relative">
                        {renderContent(content)}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
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
        </motion.div>
      </div>

      {/* Modal d'affichage d'image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img 
              src={selectedImage} 
              alt="" 
              className="w-full h-auto rounded-lg"
              style={{ maxHeight: '90vh' }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}