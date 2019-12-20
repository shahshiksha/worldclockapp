import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }
  create_NewMember(record){
    return this.firestore.collection('teammember').add(record);
  }
  read_teammember(){
    return this.firestore.collection('teammember').snapshotChanges();
  }
  update_teammember(record_id, record){
   return this.firestore.doc('teammember/'+ record_id).update(record);
  }
  delete_teammember(record_id){
    return this.firestore.doc('teammember/'+ record_id).delete();
  }
}
