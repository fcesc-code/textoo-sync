import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class GameRecordsService {
  delete(ref: string, id: string) {
    return admin.database().ref(ref).child(id).remove();
    // return admin.firestore().collection(ref).doc(id).delete();
  }

  get(ref: string, id: string) {
    return admin.database().ref(ref).child(id).get();
    // return admin.firestore().collection(ref).doc(id).get();
  }

  update(ref: string, id: string, data: any) {
    return admin.database().ref(ref).child(id).update(data);
    // return admin.firestore().collection(ref).doc(id).update(data);
  }

  create(ref: string, data: any) {
    return admin.database().ref(ref).push(data);
    // return admin.firestore().collection(ref).add(data);
  }

  getAll(ref: string) {
    return admin.database().ref(ref).once('value');
    // return admin.firestore().collection(ref).get();
  }

  deleteGame(ref: string) {
    return admin.database().ref(ref).remove();
    // return admin.firestore().collection(ref).get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     doc.ref.delete();
    //   });
    // });
  }

  createGame(ref: string, data: any) {
    return admin.database().ref(ref).set(data);
    // return admin.firestore().collection(ref).add(data);
  }

  listenGame(ref: string) {
    return admin
      .database()
      .ref(ref)
      .on('value', (snapshot: any) => {
        return snapshot.val();
      });
    // return admin.firestore().collection(ref).onSnapshot(snapshot => {
    //   snapshot.forEach(doc => {
    //     console.log(doc.data());
    //   });
    // });
  }

  existsGame(ref: string) {
    return admin
      .database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        return snapshot.val() !== null;
      });
    // return admin.firestore().collection(ref).get().then(snapshot => {
    //   return snapshot.size > 0;
    // });
  }
}
