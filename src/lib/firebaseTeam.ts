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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  linkedin_url: string;
  crop_position_x: number;
  crop_position_y: number;
  created_at: Date;
  updated_at: Date;
}

export interface TeamMemberInput {
  name: string;
  role: string;
  description: string;
  image_url: string;
  linkedin_url: string;
  crop_position_x?: number;
  crop_position_y?: number;
}

// Collection reference
const TEAM_COLLECTION = 'team_members';

/**
 * Récupérer tous les membres de l'équipe
 */
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const teamQuery = query(
      collection(db, TEAM_COLLECTION),
      orderBy('created_at', 'asc')
    );
    
    const snapshot = await getDocs(teamQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate() || new Date(),
      updated_at: doc.data().updated_at?.toDate() || new Date(),
    })) as TeamMember[];
  } catch (error) {
    console.error('Erreur lors de la récupération des membres:', error);
    throw error;
  }
};

/**
 * Ajouter un nouveau membre à l'équipe
 */
export const addTeamMember = async (memberData: TeamMemberInput): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, TEAM_COLLECTION), {
      ...memberData,
      crop_position_x: memberData.crop_position_x || 50,
      crop_position_y: memberData.crop_position_y || 50,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du membre:', error);
    throw error;
  }
};

/**
 * Mettre à jour un membre de l'équipe
 */
export const updateTeamMember = async (
  memberId: string, 
  updates: Partial<TeamMemberInput>
): Promise<void> => {
  try {
    const memberRef = doc(db, TEAM_COLLECTION, memberId);
    
    await updateDoc(memberRef, {
      ...updates,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du membre:', error);
    throw error;
  }
};

/**
 * Supprimer un membre de l'équipe
 */
export const deleteTeamMember = async (memberId: string): Promise<void> => {
  try {
    const memberRef = doc(db, TEAM_COLLECTION, memberId);
    await deleteDoc(memberRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du membre:', error);
    throw error;
  }
};

/**
 * Initialiser les membres par défaut
 */
export const initializeDefaultTeamMembers = async (): Promise<void> => {
  const defaultMembers: TeamMemberInput[] = [
    {
      name: 'AZZOUZ MOUFID',
      role: 'Président',
      description: 'Expert en installations électriques avec plus de 15 ans d\'expérience dans le secteur.',
      image_url: '/Photo Moufid (1).jpg',
      linkedin_url: 'https://www.linkedin.com/company/zdec69/posts/?feedView=all',
      crop_position_x: 50,
      crop_position_y: 50
    },
    {
      name: 'Rami Bouchedda',
      role: 'Directeur des Relations',
      description: 'Spécialiste des relations clients et de la coordination des projets.',
      image_url: '/files_2655144-1748866352955-files_2655144-1748866279307-1W9A4080.jpg',
      linkedin_url: 'https://www.linkedin.com/in/rami-bouchedda-7b03a318a/',
      crop_position_x: 50,
      crop_position_y: 30
    }
  ];

  try {
    // Vérifier si des membres existent déjà
    const existingMembers = await getTeamMembers();
    
    if (existingMembers.length === 0) {
      // Ajouter les membres par défaut
      for (const member of defaultMembers) {
        await addTeamMember(member);
      }
      console.log('Membres par défaut initialisés avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des membres par défaut:', error);
    throw error;
  }
};