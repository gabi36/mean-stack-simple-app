import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Contact} from "./contact";

@Injectable({
  providedIn:'root'
})
export class ContactService {
  constructor(private http: HttpClient) {
  }

  getContacts() {
    return this.http.get<Contact[]>('http://localhost:5000/api/contacts')
  }

  addContact(newContact: Contact) {
    return this.http.post('http://localhost:5000/api/contacts', newContact)
  }

  deleteContact(id: number){
    return this.http.delete('http://localhost:5000/api/contacts/'+id)
  }
}
