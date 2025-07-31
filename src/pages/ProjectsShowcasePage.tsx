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
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { cn } from '../utils/cn';

interface Project {
  id: string;
  title: string;
  description: string;
  content: ProjectContent[];
  date: string;
  category: string;
}

interface ProjectContent {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
}

const categories = [
  { id: 'all', name: 'Tous les projets', icon: Grid3X3, color: 'bg-gray-100 text-gray-700' },
  { id: 'electrical', name: 'Électricité', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  { id: 'irve', name: 'Bornes IRVE', icon: BatteryCharging, color: 'bg-green-100 text-green-700' },
  { id: 'domotique', name: 'Domotique', icon: Home, color: 'bg-purple-100 text-purple-700' },
  { id: 'network', name: 'Réseaux', icon: Network, color: 'bg-orange-100 text-orange-700' },
];

// Component pour le carrousel d'images
const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change d'image toutes les 3 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-64 overflow-hidden bg-gray-100 rounded-xl">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${title} - Image ${index + 1}`}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out cursor-pointer hover:scale-105 select-none",
            index === currentImageIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          )}
          style={{
            imageRendering: 'high-quality',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            filter: 'contrast(1.05) saturate(1.1) brightness(1.02)',
          }}
          loading="lazy"
          decoding="async"
        />
      ))}
      
      {/* Indicateurs de pagination */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentImageIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
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
  const [isFirebaseAvailable, setIsFirebaseAvailable] = useState(true);

  // Demo data for when Firebase is not available
  const demoProjects: Project[] = [
    {
      id: 'demo-1',
      title: 'Installation électrique résidentielle',
      description: 'Mise aux normes complète d\'une installation électrique dans une maison individuelle',
      date: '2024-01-15',
      category: 'electrical',
      content: [
        {
          id: 'demo-content-1',
          type: 'text',
          content: 'Installation complète du tableau électrique avec mise aux normes NF C 15-100'
        },
        {
          id: 'demo-content-2',
          type: 'image',
          content: '/1749721290289.jpeg'
        },
        {
          id: 'demo-content-2b',
          type: 'image',
          content: '/1750071623260.jpeg'
        },
        {
          id: 'demo-content-2c',
          type: 'image',
          content: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1600'
        }
      ]
    },
    {
      id: 'demo-2',
      title: 'Borne de recharge IRVE',
      description: 'Installation d\'une borne de recharge pour véhicule électrique',
      date: '2024-02-10',
      category: 'irve',
      content: [
        {
          id: 'demo-content-3',
          type: 'text',
          content: 'Installation certifiée IRVE d\'une borne de recharge 22kW'
        },
        {
          id: 'demo-content-4',
          type: 'image',
          content: '/edf61b3d-67aa-467b-86c6-4fcb836ea43c.jpeg'
        },
        {
          id: 'demo-content-4b',
          type: 'image',
          content: '/af7d00c0-ac68-4e24-94eb-fb3210a07c30.jpeg'
        },
        {
          id: 'demo-content-4c',
          type: 'image',
          content: '/83k4kH4Gyz9l7Pl-IsfmA.jpg'
        }
      ]
    },
    {
      id: 'demo-3',
      title: 'Système domotique intelligent',
      description: 'Installation complète d\'un système domotique pour maison connectée',
      date: '2024-03-05',
      category: 'domotique',
      content: [
        {
          id: 'demo-content-5',
          type: 'text',
          content: 'Système domotique complet avec contrôle éclairage, chauffage et sécurité'
        },
        {
          id: 'demo-content-6',
          type: 'image',
          content: '/1750010421911.jpeg'
        },
        {
          id: 'demo-content-6b',
          type: 'image',
          content: '/1750010421911 copy.jpeg'
        },
        {
          id: 'demo-content-6c',
          type: 'image',
          content: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1600'
        }
      ]
    },
    {
      id: 'demo-4',
      title: 'Réseau informatique entreprise',
      description: 'Câblage structuré et installation réseau pour bureaux professionnels',
      date: '2024-03-20',
      category: 'network',
      content: [
        {
          id: 'demo-content-7',
          type: 'text',
          content: 'Installation complète du réseau VDI avec certification'
        },
        {
          id: 'demo-content-8',
          type: 'image',
          content: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1600'
        },
        {
          id: 'demo-content-8b',
          type: 'image',
          content: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1600'
        },
        {
          id: 'demo-content-8c',
          type: 'image',
          content: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1600'
        }
      ]
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedCategory, searchTerm]);

  const checkFirebaseConnection = async () => {
    try {
      const testQuery = query(collection(db, 'projects'), orderBy('date', 'desc'));
      await getDocs(testQuery);
      return true;
    } catch (err) {
      console.log('Erreur de connexion Firebase:', err);
      return false;
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      const isConnected = await checkFirebaseConnection();
      setIsFirebaseAvailable(isConnected);

      if (isConnected) {
        const projectsQuery = query(collection(db, 'projects'), orderBy('date', 'desc'));
        const projectsSnapshot = await getDocs(projectsQuery);
        
        const projectsData: Project[] = [];
        
        for (const projectDoc of projectsSnapshot.docs) {
          const projectData = projectDoc.data();
          
          const contentQuery = query(
            collection(db, 'projects', projectDoc.id, 'content'),
            orderBy('order', 'asc')
          );
          const contentSnapshot = await getDocs(contentQuery);
          
          const content = contentSnapshot.docs.map(contentDoc => ({
            id: contentDoc.id,
            type: contentDoc.data().type,
            content: contentDoc.data().content
          }));
          
          projectsData.push({
            id: projectDoc.id,
            title: projectData.title,
            description: projectData.description,
            date: projectData.date,
            category: projectData.category || 'electrical',
            content
          });
        }
        
        setProjects(projectsData);
      } else {
        setProjects(demoProjects);
        setError('Mode démonstration - Connexion Firebase indisponible');
      }
    } catch (err) {
      console.log('Erreur lors de la récupération des projets:', err);
      setError('Mode démonstration - Erreur de connexion Firebase');
      setProjects(demoProjects);
      setIsFirebaseAvailable(false);
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
    if (!isFirebaseAvailable) {
      const newProject: Project = {
        id: `demo-${Date.now()}`,
        title: 'Nouveau projet',
        description: 'Description du projet',
        date: new Date().toISOString().split('T')[0],
        category: 'electrical',
        content: []
      };
      setProjects([newProject, ...projects]);
      setEditingProject(newProject);
      setIsEditing(true);
      return;
    }

    const newProjectData = {
      title: 'Nouveau projet',
      description: 'Description du projet',
      date: new Date().toISOString().split('T')[0],
      category: 'electrical'
    };

    try {
      const docRef = await addDoc(collection(db, 'projects'), newProjectData);
      
      const projectWithContent = { 
        id: docRef.id, 
        ...newProjectData, 
        content: [] 
      };
      
      setProjects([projectWithContent, ...projects]);
      setEditingProject(projectWithContent);
      setIsEditing(true);
    } catch (err) {
      console.log('Erreur lors de l\'ajout du projet:', err);
      setError('Error creating project');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      if (!isFirebaseAvailable) {
        setProjects(projects.filter(p => p.id !== projectId));
        return;
      }

      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      setError('Error deleting project');
      console.error('Error deleting project:', err);
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;

    if (!isFirebaseAvailable) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      ));
      setIsEditing(false);
      setEditingProject(null);
      setNewContent(null);
      return;
    }
    
    try {
      await updateDoc(doc(db, 'projects', editingProject.id), {
        title: editingProject.title,
        description: editingProject.description,
        category: editingProject.category
      });

      const contentCollection = collection(db, 'projects', editingProject.id, 'content');
      const contentSnapshot = await getDocs(contentCollection);
      
      for (const contentDoc of contentSnapshot.docs) {
        await deleteDoc(contentDoc.ref);
      }
      
      for (let i = 0; i < editingProject.content.length; i++) {
        const content = editingProject.content[i];
        await addDoc(contentCollection, {
          type: content.type,
          content: content.content,
          order: i
        });
      }

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

  const handleSaveContent = async () => {
    if (!editingProject || !newContent) return;

    if (!isFirebaseAvailable) {
      setEditingProject({
        ...editingProject,
        content: [...editingProject.content, newContent]
      });
      setNewContent(null);
      return;
    }
    
    try {
      await addDoc(collection(db, 'projects', editingProject.id, 'content'), {
        type: newContent.type,
        content: newContent.content,
        order: editingProject.content.length
      });

      setEditingProject({
        ...editingProject,
        content: [...editingProject.content, newContent]
      });
      setNewContent(null);
    } catch (err) {
      setError('Error saving content');
      console.error('Error saving content:', err);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!editingProject) return;

    if (!isFirebaseAvailable) {
      setEditingProject({
        ...editingProject,
        content: editingProject.content.filter(c => c.id !== contentId)
      });
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'projects', editingProject.id, 'content', contentId));

      setEditingProject({
        ...editingProject,
        content: editingProject.content.filter(c => c.id !== contentId)
      });
    } catch (err) {
      setError('Error deleting content');
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

  // Fonction pour regrouper les images consécutives
  const groupConsecutiveImages = (content: ProjectContent[]) => {
    const grouped: (ProjectContent | ProjectContent[])[] = [];
    let currentImageGroup: ProjectContent[] = [];

    content.forEach((item) => {
      if (item.type === 'image') {
        currentImageGroup.push(item);
      } else {
        if (currentImageGroup.length > 0) {
          grouped.push(currentImageGroup.length === 1 ? currentImageGroup[0] : currentImageGroup);
          currentImageGroup = [];
        }
        grouped.push(item);
      }
    });

    if (currentImageGroup.length > 0) {
      grouped.push(currentImageGroup.length === 1 ? currentImageGroup[0] : currentImageGroup);
    }

    return grouped;
  };

  // Fonction pour rendre le contenu avec carrousel
  const renderContentWithCarousel = (content: ProjectContent[]) => {
    const groupedContent = groupConsecutiveImages(content);

    return groupedContent.map((item, index) => {
      if (Array.isArray(item)) {
        // Groupe d'images - utiliser le carrousel
        const images = item.map(img => img.content);
        return (
          <div key={`carousel-${index}`} className="relative">
            <ImageCarousel images={images} title="Projet" />
          </div>
        );
      } else {
        // Contenu individuel
        return (
          <div key={item.id} className="relative">
            {renderContent(item)}
          </div>
        );
      }
    });
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
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="space-y-6">
                          {renderContentWithCarousel(project.content)}
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