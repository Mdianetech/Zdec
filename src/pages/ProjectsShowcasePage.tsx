import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Video, 
  Type, 
  Save, 
  X, 
  ExternalLink,
  Zap,
  BatteryCharging,
  Home,
  Network,
  Filter,
  Grid3X3,
  List,
  Search
} from 'lucide-react';
import { 
  getProjects, 
  addProject, 
  updateProject, 
  deleteProject, 
  addProjectContent, 
  deleteProjectContent,
  initializeDemoProjects,
  type Project,
  type ProjectContent 
} from '../lib/firebaseProjects';

const categories = [
  { id: 'all', name: 'Tous les projets', icon: Grid3X3, color: 'bg-gray-100 text-gray-700' },
  { id: 'electrical', name: 'Électricité', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  { id: 'irve', name: 'Bornes IRVE', icon: BatteryCharging, color: 'bg-green-100 text-green-700' },
  { id: 'domotique', name: 'Domotique', icon: Home, color: 'bg-purple-100 text-purple-700' },
  { id: 'network', name: 'Réseaux', icon: Network, color: 'bg-orange-100 text-orange-700' },
];

export default function ProjectsShowcasePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newContent, setNewContent] = useState<ProjectContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedCategory, searchTerm]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      const projectsData = await getProjects();
      
      if (projectsData.length === 0) {
        // Initialiser les projets de démonstration si aucun projet n'existe
        await initializeDemoProjects();
        const newProjectsData = await getProjects();
        setProjects(newProjectsData);
      } else {
        setProjects(projectsData);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des projets:', err);
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProjects(filtered);
  };

  const handleAddProject = async () => {
    try {
      const projectId = await addProject({
        title: 'Nouveau projet',
        description: 'Description du projet',
        date: new Date().toISOString().split('T')[0],
        category: 'electrical'
      });
      
      const newProject: Project = {
        id: projectId,
        title: 'Nouveau projet',
        description: 'Description du projet',
        date: new Date().toISOString().split('T')[0],
        category: 'electrical',
        content: [],
        created_at: new Date(),
        updated_at: new Date()
      };
      
      setProjects([newProject, ...projects]);
      setEditingProject(newProject);
      setIsEditing(true);
    } catch (err) {
      console.error('Erreur lors de l\'ajout du projet:', err);
      setError('Erreur lors de la création du projet');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      setError('Erreur lors de la suppression du projet');
      console.error('Error deleting project:', err);
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;

    try {
      await updateProject(editingProject.id, {
        title: editingProject.title,
        description: editingProject.description,
        date: editingProject.date,
        category: editingProject.category
      });

      setProjects(projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      ));
      setIsEditing(false);
      setEditingProject(null);
      setNewContent(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde du projet');
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

  const handleSaveContent = async () => {
    if (!editingProject || !newContent) return;

    try {
      const contentId = await addProjectContent(editingProject.id, {
        type: newContent.type,
        content: newContent.content,
        order: editingProject.content.length
      });

      const newContentWithId = { ...newContent, id: contentId };

      setEditingProject({
        ...editingProject,
        content: [...editingProject.content, newContentWithId]
      });
      setNewContent(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde du contenu');
      console.error('Error saving content:', err);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!editingProject) return;

    try {
      await deleteProjectContent(editingProject.id, contentId);

      setEditingProject({
        ...editingProject,
        content: editingProject.content.filter(c => c.id !== contentId)
      });
    } catch (err) {
      setError('Erreur lors de la suppression du contenu');
      console.error('Error deleting content:', err);
    }
  };

  const renderContent = (content: ProjectContent) => {
    switch (content.type) {
      case 'image':
        return (
          <div className="relative group cursor-pointer" onClick={() => setSelectedImage(content.content)}>
            <img 
              src={content.content} 
              alt="" 
              className="w-full h-64 object-cover rounded-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-end justify-center pb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <ExternalLink className="text-white h-5 w-5" />
              </div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <video 
              src={content.content}
              controls
              className="w-full rounded-xl"
            />
          </div>
        );
      case 'text':
        return (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-primary-500">
            <p className="text-gray-700 leading-relaxed font-medium">{content.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des réalisations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header avec gradient moderne */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container mx-auto px-6 py-16">
          {error && (
            <div className={`mb-6 p-4 rounded-xl ${
              isFirebaseAvailable 
                ? 'bg-red-500/20 border border-red-300 text-red-100' 
                : 'bg-blue-500/20 border border-blue-300 text-blue-100'
            }`}>
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    Nos Réalisations
                  </h1>
                  <p className="text-xl text-primary-100">
                    Découvrez nos projets et réalisations récentes
                  </p>
                </div>
              </div>
              
              {/* Barre de recherche */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Toggle view mode */}
              <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'masonry' 
                      ? 'bg-white text-primary-600' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <button
                onClick={handleAddProject}
                className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="h-5 w-5" />
                Ajouter un projet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-102'
                }`}
              >
                <Icon className="h-5 w-5" />
                {category.name}
                {category.id !== 'all' && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {projects.filter(p => p.category === category.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Grille des projets */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === 'masonry'
                ? "columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8"
                : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            }
          >
            {filteredProjects.map((project, index) => {
              const categoryInfo = getCategoryInfo(project.category);
              const CategoryIcon = categoryInfo.icon;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2 ${
                    viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''
                  }`}
                >
                  {editingProject?.id === project.id ? (
                    <div className="p-8">
                      <div className="space-y-6">
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            title: e.target.value
                          })}
                          className="w-full text-2xl font-bold border-none outline-none bg-gray-50 p-4 rounded-xl"
                          placeholder="Titre du projet"
                        />
                        
                        <textarea
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            description: e.target.value
                          })}
                          className="w-full border-none outline-none bg-gray-50 p-4 rounded-xl resize-none"
                          rows={3}
                          placeholder="Description du projet"
                        />
                        
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            category: e.target.value
                          })}
                          className="w-full border-none outline-none bg-gray-50 p-4 rounded-xl"
                        >
                          {categories.slice(1).map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-6 mt-8">
                        {editingProject.content.map((content) => (
                          <div key={content.id} className="relative group">
                            {renderContent(content)}
                            <button
                              onClick={() => handleDeleteContent(content.id)}
                              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {newContent ? (
                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-blue-200">
                          {newContent.type === 'text' ? (
                            <textarea
                              value={newContent.content}
                              onChange={(e) => setNewContent({
                                ...newContent,
                                content: e.target.value
                              })}
                              className="w-full border-none outline-none bg-white p-4 rounded-xl resize-none"
                              rows={4}
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
                              className="w-full border-none outline-none bg-white p-4 rounded-xl"
                              placeholder={`URL de ${newContent.type === 'image' ? "l'image" : 'la vidéo'}`}
                            />
                          )}
                          <div className="flex justify-end gap-3 mt-4">
                            <button
                              onClick={() => setNewContent(null)}
                              className="p-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleSaveContent}
                              className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                            >
                              <Save className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3 mt-8">
                          <button
                            onClick={() => handleAddContent('text')}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Type className="h-5 w-5" />
                            Texte
                          </button>
                          <button
                            onClick={() => handleAddContent('image')}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ImageIcon className="h-5 w-5" />
                            Image
                          </button>
                          <button
                            onClick={() => handleAddContent('video')}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Video className="h-5 w-5" />
                            Vidéo
                          </button>
                        </div>
                      )}

                      <div className="flex justify-end mt-8">
                        <button
                          onClick={handleSaveProject}
                          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center gap-2"
                        >
                          <Save className="h-5 w-5" />
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Badge catégorie */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${categoryInfo.color} backdrop-blur-sm`}>
                          <CategoryIcon className="h-4 w-4" />
                          {categoryInfo.name}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="space-y-6">
                          {project.content.map((content) => (
                            <div key={content.id} className="relative">
                              {renderContent(content)}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Réalisé le {new Date(project.date).toLocaleDateString('fr-FR')}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Terminé</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `Aucun projet ne correspond à "${searchTerm}"`
                : `Aucun projet dans la catégorie "${getCategoryInfo(selectedCategory).name}"`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
            >
              Voir tous les projets
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal d'affichage d'image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="" 
                className="w-full h-auto rounded-2xl shadow-2xl"
                style={{ maxHeight: '90vh', objectFit: 'contain' }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}