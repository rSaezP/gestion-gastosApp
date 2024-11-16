import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { FirestoreService } from '../../common/services/firestore.service';
import { UserI } from '../../common/models/users.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    IonCardHeader,
    IonCardTitle
  ]
})
export class HomePage implements OnInit {
  // Declaración de propiedades de clase
  public users: UserI[] = [];
  public newUser: UserI = {
    nombre: '',
    correo: ''
  };
  public editingUser: UserI | null = null;
  public isEditing: boolean = false;

  constructor(private firestoreService: FirestoreService) {
    addIcons({
      'pencil-outline': pencilOutline,
      'trash-outline': trashOutline
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.firestoreService.getCollectionChanges<UserI>('usuarios').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  async createUser() {
    try {
      if (this.newUser.nombre && this.newUser.correo) {
        await this.firestoreService.addUser(this.newUser);
        this.newUser = {
          nombre: '',
          correo: ''
        };
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  }

  async deleteUser(user: UserI) {
    if (user.uid) {
      try {
        await this.firestoreService.deleteUser(user.uid);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  }

  editUser(user: UserI) {
    this.isEditing = true;
    this.editingUser = { ...user };
    this.newUser = { ...user };
  }

  async updateUser() {
    if (this.editingUser?.uid) {
      try {
        await this.firestoreService.updateUser(this.editingUser.uid, {
          nombre: this.newUser.nombre,
          correo: this.newUser.correo
        });
        this.cancelEdit();
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingUser = null;
    this.newUser = {
      nombre: '',
      correo: ''
    };
  }
}






