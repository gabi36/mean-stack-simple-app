import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ContactService} from "./contact.service";
import {Contact} from "./contact";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface IContact {
  _id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  getContactSub: Subscription | undefined
  create = true
  fn=''
  ln=''
  ph=''

  displayedColumns: string[] = ['position', 'first_name', 'last_name', 'phone', 'delete'];
  dataSource = new MatTableDataSource<Contact>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.fetchContacts()
  }

  ngOnDestroy(): void {
    this.getContactSub?.unsubscribe()
  }

  fetchContacts(){
    this.getContactSub = this.contactService.getContacts()
      .subscribe(contacts => {
        this.dataSource = new MatTableDataSource<Contact>(contacts);
      })
  }

  deleteContact = async (_id: number)=> {
    this.contactService.deleteContact(_id).subscribe(()=>{
      this.fetchContacts()
    })
  }

  createContact() {
    const contact = new Contact()
    contact.phone = this.ph
    contact.last_name = this.ln
    contact.first_name = this.fn
    console.log(contact)
    this.contactService.addContact(contact).subscribe(()=>{
      this.ph = ''
      this.ln = ''
      this.fn = ''
      this.fetchContacts()
    })
  }
}




