import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

export interface ProjectContent {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: ProjectContent[];
  created_at: Date;
  updated_at: Date;
}

export interface ProjectInput {
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface ProjectContentInput {
  type: 'text' | 'image' | 'video';
  content: string;
  order: number;
}

// Collection references
const PROJECTS_COLLECTION = 'projects';

/**
 * Récupérer tous les projets avec leur contenu
 */
export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsQuery = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy('date', 'desc')
    );
    
    const projectsSnapshot = await getDocs(projectsQuery);
    const projects: Project[] = [];
    
    for (const projectDoc of projectsSnapshot.docs) {
      const projectData = projectDoc.data();
      
      // Récupérer le contenu du projet
      const contentQuery = query(
        collection(db, PROJECTS_COLLECTION, projectDoc.id, 'content'),
        orderBy('order', 'asc')
      );
      const contentSnapshot = await getDocs(contentQuery);
      
      const content = contentSnapshot.docs.map(contentDoc => ({
        id: contentDoc.id,
        type: contentDoc.data().type,
        content: contentDoc.data().content,
        order: contentDoc.data().order
      })) as ProjectContent[];
      
      projects.push({
        id: projectDoc.id,
        title: projectData.title,
        description: projectData.description,
        date: projectData.date,
        category: projectData.category || 'electrical',
        content,
        created_at: projectData.created_at?.toDate() || new Date(),
        updated_at: projectData.updated_at?.toDate() || new Date(),
      });
    }
    
    return projects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    throw error;
  }
};

/**
 * Ajouter un nouveau projet
 */
export const addProject = async (projectData: ProjectInput): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet:', error);
    throw error;
  }
};

/**
 * Mettre à jour un projet
 */
export const updateProject = async (
  projectId: string, 
  updates: Partial<ProjectInput>
): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    
    await updateDoc(projectRef, {
      ...updates,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    throw error;
  }
};

/**
 * Supprimer un projet et tout son contenu
 */
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    // Supprimer tout le contenu du projet
    const contentQuery = collection(db, PROJECTS_COLLECTION, projectId, 'content');
    const contentSnapshot = await getDocs(contentQuery);
    
    for (const contentDoc of contentSnapshot.docs) {
      await deleteDoc(contentDoc.ref);
    }
    
    // Supprimer le projet
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    throw error;
  }
};

/**
 * Ajouter du contenu à un projet
 */
export const addProjectContent = async (
  projectId: string,
  contentData: ProjectContentInput
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, PROJECTS_COLLECTION, projectId, 'content'),
      {
        ...contentData,
        created_at: new Date(),
        updated_at: new Date(),
      }
    );
    
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du contenu:', error);
    throw error;
  }
};

/**
 * Supprimer du contenu d'un projet
 */
export const deleteProjectContent = async (
  projectId: string,
  contentId: string
): Promise<void> => {
  try {
    const contentRef = doc(db, PROJECTS_COLLECTION, projectId, 'content', contentId);
    await deleteDoc(contentRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du contenu:', error);
    throw error;
  }
};

/**
 * Initialiser des projets de démonstration
 */
export const initializeDemoProjects = async (): Promise<void> => {
  const demoProjects = [
    {
      title: 'Installation électrique résidentielle',
      description: 'Mise aux normes complète d\'une installation électrique dans une maison individuelle',
      date: '2024-01-15',
      category: 'electrical',
      content: [
        {
          type: 'text' as const,
          content: 'Installation complète du tableau électrique avec mise aux normes NF C 15-100',
          order: 0
        },
        {
          type: 'image' as const,
          content: '/1749721290289.jpeg',
          order: 1
        }
      ]
    },
    {
      title: 'Borne de recharge IRVE',
      description: 'Installation d\'une borne de recharge pour véhicule électrique',
      date: '2024-02-10',
      category: 'irve',
      content: [
        {
          type: 'text' as const,
          content: 'Installation certifiée IRVE d\'une borne de recharge 22kW',
          order: 0
        },
        {
          type: 'image' as const,
          content: '/edf61b3d-67aa-467b-86c6-4fcb836ea43c.jpeg',
          order: 1
        }
      ]
    }
  ];

  try {
    // Vérifier si des projets existent déjà
    const existingProjects = await getProjects();
    
    if (existingProjects.length === 0) {
      // Ajouter les projets de démonstration
      for (const project of demoProjects) {
        const projectId = await addProject({
          title: project.title,
          description: project.description,
          date: project.date,
          category: project.category
        });
        
        // Ajouter le contenu
        for (const content of project.content) {
          await addProjectContent(projectId, content);
        }
      }
      console.log('Projets de démonstration initialisés avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des projets de démonstration:', error);
    throw error;
  }
};