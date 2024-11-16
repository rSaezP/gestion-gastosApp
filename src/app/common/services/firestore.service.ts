
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, deleteDoc, doc, updateDoc, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  getCollectionChanges<T>(path: string): Observable<T[]>{ //recibe como parametro el tipo de dato que esperamos de la colleccion (READ)
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection, { idField: 'uid'}) as Observable<T[]>;

  }

  //metodo para CREAR usuarios
  async addUser(data: any): Promise<string> {
    try {
      const collectionRef = collection(this.firestore, 'usuarios');
      const docRef = await addDoc(collectionRef, {
        ...data,
        fechaCreacion: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }

  }
  // Método para eliminar
  async deleteUser(uid: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, `usuarios/${uid}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al eliminar:', error);
      throw error;
    }
  }
  // Método para actualizar
  async updateUser(uid: string, data: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, `usuarios/${uid}`);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error al actualizar:', error);
      throw error;
    }
  }
}
