(function(){
    allList = JSON.parse(localStorage.getItem("todoItems")), myItems = []
    if(allList)
    {
      todoList = allList.filter(function(obj){
        return (obj.some(ele=> ele.email == "vj4blockchain@gmail.com"))
      })
      drawItemsTable(todoList)
    }
    else{
      drawEmptyTable();
    }

    function drawEmptyTable(){
      let tab = document.getElementById("todo_items").getElementsByTagName('tbody')[0]
      var tblrw = document.createElement('tr');
      var tbltd = document.createElement('td');
      tbltd.colSpan=5
      var tbldata = document.createTextNode("No items found")
      tbltd.appendChild(tbldata);
      tblrw.appendChild(tbltd);
      tab.appendChild(tblrw);
    }

    function drawItemsTable(todoList){
      cols = { 0: "title", 1:"date", 2:"category" , 3: "is_public"}
      var tab = document.getElementById("todo_items").getElementsByTagName('tbody')[0]
      if(! todoList)
        return drawEmptyTable();
      else
      { 
        todoList.forEach(function(item, index){
          var tblrw = document.createElement('tr');
          tblrw.id="item_"+index
          var tbltd = document.createElement('td');
          var tbldata = document.createTextNode(index+1)
          tbltd.appendChild(tbldata);
          tblrw.appendChild(tbltd);
          for(let [key,value] in cols){
            var tbltd = document.createElement('td');  
            var tbldata = document.createTextNode(item.map(entry=> entry[cols[key]]).filter(entry=>entry).join())
            tbltd.appendChild(tbldata);
            tblrw.appendChild(tbltd);
          }
          tab.appendChild(tblrw);
        })
      }

    }
})();

var dashboard = (function(){
  function renderCreateItemModal()
  {
    let modal = document.getElementById("createItem");
    modal.innerHTML = `<div class="modal-content">
    <span class="close">&times;</span>
    <form id="createItemForm">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" name="title" autopopulate="off" required>
          </div>
        </div>

        <div class="col-md-4 form-group">
          <div>Category</div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" name="category" type="checkbox" id="inlineCheckbox1" value="Personal">
            <label class="form-check-label" for="inlineCheckbox1">Personal</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" name="category" id="inlineCheckbox01" value="Official">
            <label class="form-check-label" for="inlineCheckbox1">Official</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" name="category" id="inlineCheckbox3" value="Technical">
            <label class="form-check-label" for="inlineCheckbox3">Technical</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" name="category" id="inlineCheckbox21" value="General">
            <label class="form-check-label" for="inlineCheckbox1">General</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 form-group">
          <div>Date</div>
          <div class="input-group date" data-provide="datepicker1">
            <input id="date2" class="datepicker1 form-control" name="date" data-date-format="mm/dd/yyyy" autopopulate="off">
          </div>
        </div>
        <div class="col-md-4 form-group">
        <div> Avatar</div>
        <div class="input-group mb-3">
        <div class="custom-file">
          <input id="avatar" name="avatarFile" type="file">
          <input type="hidden" name="avatar" id="avatarImg">
        </div>
        </div
        </div>
      </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <div class="form-check">
            <input type='hidden' value='false' name="is_reminder">
            <input type='checkbox' value='true' name="is_reminder" id="reminderSwitch" class="form-check-input" onchange='handleChange(this);' value="false">
            <label class="form-check-label" for="reminderSwitch">
              Reminder?
            </label>
          </div>
          <div id="reminderDate"  style="display: none;">
            <div>Reminder Date</div>
            <div class="input-group date" data-provide="datepicker">
              <input id="date1" class="reminderDatepicker form-control" data-date-format="mm/dd/yyyy" name="reminder_date" autopopulate="off">
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check">
           <input type='checkbox'  id="checkPublic" name="is_public" class="form-check-input" onchange='handleChange(this);' value="false" autopopulate="off">
            <label class="form-check-label" for="is_public">
              is_Public?
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mb-2">Save Item</button>						
      </div>
      </div>
    </form>
  </div>`
  $('.datepicker1').datepicker();
  }

  function modalHandler()
  {
    btn = document.getElementById("addItem");
    modal = document.getElementById("createItem");
    closeBtn = document.getElementsByClassName("close")[0]
    createItemForm = document.getElementById("createItemForm");
    avatarFile = document.getElementById("avatar");
    btn.onclick = function() {
      modal.style.display = "block";
    }

    closeBtn.onclick = function(){
      modal.style.display = "none";
      createItemForm.reset();
    }
    createItemForm.onsubmit = function(event){
      itemHash = []
      event.preventDefault();
      categoryList = { category: Array.from(event.target.elements.category).filter(element => element.checked).map(element=> element.value) }
      Array.from(event.target.elements).map(function(element){
        if(element.name !== "category"){ itemHash.push({[element.name]: element.value}) }
      })
      itemHash.push(categoryList)
      itemHash.push({["email"]: localStorage.getItem("current_user")})
      existingArray = (JSON.parse(localStorage.getItem("todoItems")) || [])
      existingArray.push(itemHash)
      localStorage.setItem("todoItems",JSON.stringify(existingArray))
      closeBtn.click();
      location.reload();
    }

    avatarFile.onchange = function () {
      var reader = new FileReader();
      reader.onload = function () {
        var thisImage = reader.result;
        document.getElementById("avatarImg").value = thisImage
      };
      reader.readAsDataURL(this.files[0]);
    }
  }

  function setReminder(){
    reminderBtn = document.getElementById("reminderSwitch");
    reminderBtn.onclick = function(event){
      reminderCalendar = document.getElementById("reminderDate");
      if(event.target.checked)
      {
        reminderCalendar.style.display = "block";
        $('.reminderDatepicker').datepicker();
      }
      else
      {
        reminderCalendar.style.display = "none";
      }
    }
  }

  return {
    //listItem: showTodoItem,
    modalHandler: modalHandler,
    setReminder: setReminder,
    addItemModal: renderCreateItemModal
  }
})();
dashboardLayoutPromise = new Promise(function(resolve, reject){
  dashboard.addItemModal();
  return resolve('success!')
}).then(()=>{
  dashboard.modalHandler();
  return true
}).then(()=>{
  dashboard.setReminder();
  return true
})

function handleChange(thiss){
  thiss.value = thiss.checked
}

function sortData() {
  // Read table body node.
  var tableData = document.getElementById('todo_items').getElementsByTagName('tbody').item(0);

  // Read table row nodes.
  var rowData = tableData.getElementsByTagName('tr'); 

  for(var i = 0; i < rowData.length - 1; i++) {
      for(var j = 0; j < rowData.length - (i + 1); j++) {

          //Swap row nodes if short condition matches
          if(rowData.item(j).getElementsByTagName('td').item(1).innerHTML > rowData.item(j+1).getElementsByTagName('td').item(0).innerHTML) {
              tableData.insertBefore(rowData.item(j+1),rowData.item(j));
          }
      }
  }
}