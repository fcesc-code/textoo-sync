import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { gameScore, gameUser } from '../dtos/game.dto';

@Injectable()
export class GameRecordsService {
  deleteGame(ref: string) {
    return admin.database().ref(ref).remove();
    // return admin.firestore().collection(ref).delete();
  }

  getGame(ref: string) {
    return admin.database().ref(ref).get();
    // return admin.firestore().collection(ref).doc(id).get();
  }

  // update(ref: string, id: string, data: any) {
  //   return admin.database().ref(ref).child(id).update(data);
  //   // return admin.firestore().collection(ref).doc(id).update(data);
  // }

  createGame(ref: string, data: any) {
    console.log('entering create game service');
    return admin.database().ref(ref).push(data);
    // return admin.firestore().collection(ref).add(data);
  }

  // getAllGames(ref: string) {
  //   return admin.database().ref(ref).once('value');
  //   // return admin.firestore().collection(ref).get();
  // }

  // deleteGame(ref: string, id: string) {
  //   return admin.database().ref(ref).child(id).remove();
  //   // return admin.firestore().collection(ref).get().then(snapshot => {
  //   //   snapshot.forEach(doc => {
  //   //     doc.ref.delete();
  //   //   });
  //   // });
  // }

  // createGame(ref: string, data: any) {
  //   return admin.database().ref(ref).set(data);
  //   // return admin.firestore().collection(ref).add(data);
  // }

  listenGame(ref: string) {
    return admin
      .database()
      .ref(ref)
      .on('value', (snapshot: any) => {
        console.log('service listenGame >>> update', snapshot.val());
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

  addUserToGame(ref: string, user: gameUser) {
    return admin.database().ref(ref).child('users').push(user);
  }

  removeUserFromGame(ref: string, userId: string) {
    return admin.database().ref(ref).child('users').child(userId).remove();
  }

  checkUserInGame(ref: string, userId: string) {
    return admin
      .database()
      .ref(ref)
      .child('users')
      .once('value')
      .then((snapshot) => {
        return snapshot.val()[userId] !== undefined;
      });
  }

  listenUsersInGame(ref: string) {
    return admin
      .database()
      .ref(ref)
      .child('users')
      .on('value', (snapshot: any) => {
        console.log('service listenUserInGame >>> update', snapshot.val());
        return snapshot.val();
      });
  }

  getGameStatus(ref: string) {
    return admin.database().ref(ref).child('status').once('value');
  }

  listenGameStatus(ref: string) {
    return admin
      .database()
      .ref(ref)
      .child('status')
      .on('value', (snapshot: any) => {
        console.log('service listenGameStatus >>> update', snapshot.val());
        return snapshot.val();
      });
  }

  updateGameStatus(ref: string, data: any) {
    return admin.database().ref(ref).child('status').update(data);
  }

  updateGameScores(ref: string, userId: string, data: gameScore) {
    return admin.database().ref(ref).child('scores').child(userId).update(data);
  }

  listenGameScores(ref: string) {
    return admin
      .database()
      .ref(ref)
      .child('scores')
      .on('value', (snapshot: any) => {
        console.log('service listenGameScores >>> update', snapshot.val());
        return snapshot.val();
      });
  }

  listenGameScore(ref: string, userId: string) {
    return admin
      .database()
      .ref(ref)
      .child('scores')
      .child(userId)
      .on('value', (snapshot: any) => {
        console.log('service listenGameScore >>> update', snapshot.val());
        return snapshot.val();
      });
  }

  getGameScores(ref: string) {
    return admin.database().ref(ref).child('scores').once('value');
  }

  getGameScore(ref: string, userId: string) {
    return admin
      .database()
      .ref(ref)
      .child('scores')
      .child(userId)
      .once('value');
  }

  createGameScore(ref: string, userId: string, data: gameScore) {
    return admin.database().ref(ref).child('scores').child(userId).set(data);
  }
}
