import { Injectable } from '@angular/core';
import { TeamMember }   from './team-member';
import { Member } from './member.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

// import { FirebaseUserModel } from './user.model';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class DashboardService {

  teamMembersRef: AngularFireList<any>;
  teamMemberRef: AngularFireObject<any>;

  constructor(private firestore: AngularFirestore) { }

  TeamMemebersSummary = [];
    getTeamMembersSummary(): any[]{
      // const dbRef = firebase.database().ref();
      // const usersRef = dbRef.child('users');
      this.TeamMemebersSummary = [
        {Name: "Shiksha Shah", TimeZone: "EST", Time: "11 PM"},
        {Name: "Hemang Shah", TimeZone: "CST", Time: "12 PM"}
      ];
      return this.TeamMemebersSummary;
    }
    addTeamMemberSummary(teamMember: TeamMember): any[]{
      this.TeamMemebersSummary[this.TeamMemebersSummary.length+1]=teamMember;
      return this.TeamMemebersSummary;
    }

    getTeamMembers() {
      
      // teamMembersRef = 
      console.log(this.firestore);
      console.log(this.firestore.collection('teammember'));
      console.log(this.firestore.collection('teammember').ref);
      console.log(this.firestore.collection('teammember').doc());
      console.log(this.firestore.collection('teammember').stateChanges());
      console.log(this.firestore.collection('teammember').snapshotChanges());
      return this.firestore.collection('teammember').snapshotChanges();
      // return teamMembersRef;

    }

    createTeamMember(member: Member){
      return this.firestore.collection('teammember').add(member);
    }

    updateTeamMember(member: Member){
      delete member.id;
      this.firestore.doc('teammember/' + member.id).update(member);
    }

    deleteTeamMember(memberId: String){
      this.firestore.doc('teammember/' + memberId).delete();
    }
  }