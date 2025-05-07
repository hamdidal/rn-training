import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface LogoRequest {
  prompt: string;
  style: string;
  status: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export const processLogoGeneration = onDocumentCreated(
  'logoRequests/{requestId}',
  async (event) => {
    if (!event.data) {
      console.error('Event data is undefined');
      return;
    }

    const snapshot = event.data;
    const requestId = event.params.requestId;
    const requestData = snapshot.data() as LogoRequest;

    try {
      const processingTime = Math.floor(Math.random() * 5000) + 10000;
      await new Promise((res) => setTimeout(res, processingTime));

      await admin.firestore()
        .collection('logoRequests')
        .doc(requestId)
        .update({
          status: 'done',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      const placeholderLogos: Record<string, string> = {
        NoStyle:  'https://picsum.photos/seed/nostyle/300/300',
        Monogram: 'https://picsum.photos/seed/monogram/300/300',
        Abstract: 'https://picsum.photos/seed/abstract/300/300',
        Mascot:   'https://picsum.photos/seed/mascot/300/300',
      };

      const imageUrl =
        placeholderLogos[requestData.style] || placeholderLogos.NoStyle;

      await admin.firestore()
        .collection('logoResults')
        .add({
          requestId,
          imageUrl,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

    } catch (error) {
      console.error(`Error processing logo request ${requestId}:`, error);

      await admin.firestore()
        .collection('logoRequests')
        .doc(requestId)
        .update({
          status: 'error',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      throw error;
    }
  }
);