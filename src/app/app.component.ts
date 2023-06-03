import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  listItems:ListItems[]=[];
  newItem:FormControl<string>=new FormControl();
  
  
  ngOnInit(): void {
    this.addItem();
  }
  //Adds the new Item to the To- Do List and sets the data in localstorage
  addItem():void{
    let existingItems:string|null = localStorage.getItem("To-Do");
    let index:number = 1;
    if(existingItems!=null){
      this.listItems = JSON.parse(existingItems);
      if(this.newItem.value!=null && this.newItem.value!=""){

        index = this.setIndexToNewItem(this.listItems);

        this.listItems.push({id:index+1,item:this.newItem.value});
        localStorage.setItem("To-Do",JSON.stringify(this.listItems));
        this.newItem =new FormControl();
      }
    }
    else if(this.newItem.value!=null && this.newItem.value!=""){
      this.listItems.push({id:index,item:this.newItem.value});
      localStorage.setItem("To-Do",JSON.stringify(this.listItems));
      index++;
      this.newItem =new FormControl();
    }
  }

  //To set the updated index for new Item
  setIndexToNewItem(items:ListItems[]):number{
    let highIndex:number=0;
    items.forEach((ele)=>{
      if(ele.id>highIndex){
        highIndex=ele.id;
      }
    })
    return highIndex;
  }

  //Edit the Item from the TO-DO list
  editItem(value:ListItems){
    this.deleteItem(value);
    this.newItem.patchValue(value.item);
  }

  //Delete an item from the TO-DO list
  deleteItem(item:ListItems){
    for(let i=0;i<this.listItems.length;i++){
      if(this.listItems[i].id == item.id){
        this.listItems.splice(i,1);
      }
    }
    localStorage.setItem("To-Do",JSON.stringify(this.listItems));
  }
  //Clear the all items of To Do and remove the data from localstorage
  clearItems():void{
    this.listItems=[];
    localStorage.clear();
  }


}

class ListItems{
  id:number=0;
  item:string="";
}