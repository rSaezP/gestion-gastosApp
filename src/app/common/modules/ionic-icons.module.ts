import { NgModule } from '@angular/core';
import {
  addCircleOutline,
  createOutline,
  trashOutline,
  refreshOutline,
  eyeOutline,
  searchOutline,
  closeCircleOutline,
  saveOutline,
  pencilOutline,
  personAddOutline,
  mailOutline,
  keyOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@NgModule({})
export class IonicIconsModule {
  constructor() {
    addIcons({
      'add-circle': addCircleOutline,      // Para crear
      'create': createOutline,             // Para editar
      'trash': trashOutline,               // Para eliminar
      'refresh': refreshOutline,           // Para actualizar
      'eye': eyeOutline,                   // Para ver detalles
      'search': searchOutline,             // Para búsqueda
      'close-circle': closeCircleOutline,  // Para cerrar/cancelar
      'save': saveOutline,                 // Para guardar
      'pencil': pencilOutline,             // Alternativa para editar
      'person-add': personAddOutline,      // Para agregar usuario
      'mail': mailOutline,                 // Para correo
      'key': keyOutline                    // Para contraseña
    });
  }
}
