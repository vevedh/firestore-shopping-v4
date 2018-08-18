import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Grocery } from '../models/grocery';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  userId: string;
  constructor(private afAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  async getTeamId(): Promise<string> {
    const userProfile: firebase.firestore.DocumentSnapshot = await firebase
      .firestore()
      .doc(`userProfile/${this.userId}`)
      .get();

    return userProfile.data().teamId;
  }

  getGroceryList(teamId: string): AngularFirestoreCollection<Grocery> {
    return this.fireStore.collection<Grocery>(`/teamProfile/${teamId}/groceryList`, ref =>
      ref.orderBy('quantity')
    );
  }

  addGroceryQuantity(groceryId: string, quantity: number, teamId: string): Promise<void> {
    const groceryRef: firebase.firestore.DocumentReference = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number = groceryDoc.data().quantity + quantity;
        transaction.update(groceryRef, { quantity: newQuantity });
      });
    });
  }

  removeGroceryQuantity(
    groceryId: string,
    quantity: number,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number = groceryDoc.data().quantity - quantity;
        transaction.update(groceryRef, { quantity: newQuantity });
      });
    });
  }

  createGrocery(
    name: string,
    quantity: number,
    units: string,
    teamId: string,
    inShoppingList: boolean = false
  ): Promise<void> {
    const groceryId: string = this.fireStore.createId();

    return this.fireStore
      .doc<Grocery>(`/teamProfile/${teamId}/groceryList/${groceryId}`)
      .set({
        id: groceryId,
        name,
        quantity,
        units,
        teamId,
        inShoppingList,
        picked: false,
        quantityShopping: 0,
      });
  }
}
