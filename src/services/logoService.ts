import { 
    collection, 
    addDoc, 
    doc, 
    getDoc, 
    updateDoc,
    serverTimestamp  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  import { LogoRequest, LogoResult, LogoStyle, ProcessingStatus } from '../types';
  
  const LOGO_REQUESTS_COLLECTION = 'logoRequests';
  const LOGO_RESULTS_COLLECTION = 'logoResults';
  
  const PLACEHOLDER_LOGOS = {
      NoStyle:  'https://picsum.photos/seed/nostyle/300/300',
      Monogram: 'https://picsum.photos/seed/monogram/300/300',
      Abstract: 'https://picsum.photos/seed/abstract/300/300',
      Mascot:   'https://picsum.photos/seed/mascot/300/300',
  };
  
  export const createLogoRequest = async (prompt: string, style: LogoStyle): Promise<string> => {
    const logoRequest = {
      prompt, style,
      status: 'processing',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  
    try {
      const docRef = await addDoc(
        collection(db, LOGO_REQUESTS_COLLECTION),
        logoRequest
      );
      return docRef.id;
    } catch (err) {
      console.error('[LogoService] !!! addDoc failed:', err);
      throw err;
    }
  };
  
  export const getLogoRequest = async (id: string): Promise<LogoRequest | null> => {
    try {
      const docRef = doc(db, LOGO_REQUESTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as LogoRequest;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting logo request:', error);
      throw error;
    }
  };
  
  export const updateLogoRequestStatus = async (
    id: string,
    status: ProcessingStatus
  ): Promise<void> => {
    try {
      const docRef = doc(db, LOGO_REQUESTS_COLLECTION, id);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date().getTime(),
      });
    } catch (error) {
      console.error('Error updating logo request status:', error);
      throw error;
    }
  };
  
  export const createLogoResult = async (
    requestId: string,
    style: LogoStyle
  ): Promise<string> => {
    try {
      const now = new Date().getTime();
      
      const imageUrl = PLACEHOLDER_LOGOS[style];
      
      const logoResult = {
        requestId,
        imageUrl,
        createdAt: now,
      };
      
      const docRef = await addDoc(
        collection(db, LOGO_RESULTS_COLLECTION),
        logoResult
      );
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating logo result:', error);
      throw error;
    }
  };
  
  export const getLogoResultByRequestId = async (
    requestId: string
  ): Promise<LogoResult | null> => {
    try {
      const request = await getLogoRequest(requestId);
      
      if (!request) {
        return null;
      }
      
      return {
        id: 'simulated-result-id',
        requestId,
        imageUrl: PLACEHOLDER_LOGOS[request.style],
        createdAt: new Date().getTime(),
      };
    } catch (error) {
      console.error('Error getting logo result:', error);
      throw error;
    }
  };