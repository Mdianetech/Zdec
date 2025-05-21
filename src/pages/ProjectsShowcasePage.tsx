import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  Image as ImageIcon,
  Play,
  Plus
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  video?: string;
  likes: number;
  hasLiked: boolean;
  comments: Comment[];
  createdAt: Date;
  category: string;
  location: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  createdAt: Date;
}

export default function ProjectsShowcasePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Project[];
      
      setProjects(projectData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (projectId: string) => {
    // Implémenter la logique de like
  };

  const handleComment = async (projectId: string) => {
    if (!comment.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, `projects/${projectId}/comments`), {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Utilisateur',
        userImage: currentUser.photoURL,
        content: comment,
        createdAt: serverTimestamp()
      });

      setComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container py-16">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-6">Nos Réalisations</h1>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez nos projets d'installation électrique, de bornes de recharge 
              et de domotique à travers la France.
            </p>
            {currentUser?.uid === 'ADMIN_UID' && (
              <button className="btn btn-primary inline-flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ajouter un projet
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Image Gallery */}
                <div className="relative aspect-video">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.video && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black/30 group hover:bg-black/40 transition-colors">
                      <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-md text-white text-sm">
                      <ImageIcon className="h-4 w-4 inline mr-1" />
                      {project.images.length}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4" />
                    {format(project.createdAt, 'dd MMMM yyyy', { locale: fr })}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(project.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          project.hasLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${project.hasLiked ? 'fill-current' : ''}`} />
                        <span>{project.likes}</span>
                      </button>
                      
                      <button 
                        onClick={() => setSelectedProject(project.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>{project.comments.length}</span>
                      </button>
                    </div>
                    
                    <button className="text-gray-500 hover:text-gray-700">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>

                  {selectedProject === project.id && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="mb-4">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Ajouter un commentaire..."
                          className="input w-full"
                          rows={3}
                        />
                        <div className="mt-2 flex justify-end">
                          <button 
                            onClick={() => handleComment(project.id)}
                            className="btn btn-primary"
                          >
                            Commenter
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {project.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            {comment.userImage ? (
                              <img
                                src={comment.userImage}
                                alt={comment.userName}
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {comment.userName[0]}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{comment.userName}</span>
                                <span className="text-sm text-gray-500">
                                  {format(comment.createdAt, 'dd MMM yyyy', { locale: fr })}
                                </span>
                              </div>
                              <p className="text-gray-600">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}