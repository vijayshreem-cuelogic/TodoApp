  (function(){
    setTimeout(function(){disableBackButton();},0)
    allList = JSON.parse(TodoStorage.fetch(localStorage,"todoItems")), myItems = []
    if(allList)
    {
      todoList = allList.filter(function(obj){
        return (obj.some(ele=> ele.email == TodoStorage.fetch(localStorage,"current_user")))
      })
      drawItemsTable(todoList)
    }
    else{
      drawEmptyTable();
    }

    function disableBackButton(){
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
          history.go(1);
      };
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
          var span = document.createElement('span');
          span.innerHTML = `<a href="#" class="btn btn-info btn-sm" onclick="editItem(this)">Edit</a> &nbsp; | 
                        &nbsp; <a href="#" class="btn btn-info btn-sm" onclick="deleteItem(this)">Delete</a>`
          var tbltd = document.createElement('td');
          tbltd.appendChild(span);
          tblrw.appendChild(tbltd);
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
        <div col-md-12>
        <span class="close">&times;</span>
        </div>
        <form id="createItemForm" class="validateLogin">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" name="title" autocomplete="off" required pattern="[A-Za-z]{1,10}">
              </div>
            </div>

            <div class="col-md-4 form-group">
              <div>Category</div>
              <div id="category_feedback" class="is-invalid" style="display: none">Please choose atleast one category</div>
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
                <input id="date2" class="datepicker1 form-control" name="date" autocomplete="off" data-date-format="mm/dd/yyyy" autopopulate="off">
              </div>
            </div>
            <div class="col-md-4 form-group">
            <div> Avatar</div>
            <div class="input-group mb-3">
            <div class="custom-file">
              <input id="avatar" type="file">
              <input type="hidden" name="avatar" id="avatarImg">
              <div class="col-md-5"> <img src="/public/images/avatar.png" id="avatarDemo" width="55" height="55"></img></div>
            </div>
            </div
            </div>
          </div>
          </div>
          <div class="row form-group">
            <div class="col-md-4">
              <div class="form-check">
                <input type='checkbox' value='true' name="is_reminder" id="reminderSwitch" class="form-check-input" onchange='handleCheckboxChange(this);' value="false">
                <label class="form-check-label" for="reminderSwitch">
                  Reminder?
                </label>
              </div>
              <div id="reminderDate"  style="display: none;">
                <div>Reminder Date</div>
                <div class="input-group" data-provide="datepicker">
                  <input id="date1" class="reminderDatepicker form-control" autocomplete="off" data-date-format="mm/dd/yyyy" name="reminder_date" autopopulate="off">
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check">
              <input type='checkbox'  id="checkPublic" name="is_public" class="form-check-input" onchange='handleCheckboxChange(this);' value="false" autopopulate="off">
                <label class="form-check-label" for="is_public">
                  is_Public?
                </label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mb-2" id="save" >Save Item</button>						
          </div>
          </div>
        </form>
      </div>`
      $('.datepicker1').datepicker(
        { minDate: 'today',
          onSelect: function(dateText) {
            min = new Date(dateText);
            window.reminder = min
            $(".reminderDatepicker").datepicker('option', 'minDate', min);
          }
        }
      );
    }

    function modalHandler()
    {
      btn = document.getElementById("addItem");
      modal = document.getElementById("createItem");
      closeBtn = document.getElementsByClassName("close")[0]
      createItemForm = document.getElementById("createItemForm");
      avatarFile = document.getElementById("avatar");

      function editActionCheck(){
        existingArray = (JSON.parse(TodoStorage.fetch(localStorage,"todoItems")) || [])
        index = document.getElementById("save").getAttribute("index")
        if(index != undefined)
        {
          existingArray.splice(index, 1)
          TodoStorage.set(localStorage,"todoItems", JSON.stringify(existingArray))
        }
      }
      btn.onclick = function() {
        modal.style.display = "block";
        document.getElementById("save").removeAttribute("index")
      }

      closeBtn.onclick = function(){
        modal.style.display = "none";
        createItemForm.reset();
        document.getElementById("avatarDemo").src = "#";
      }
      createItemForm.onsubmit = function(event){
        itemHash = []
        event.preventDefault();
        checkValidation(event)
        editActionCheck();
        categoryList = { category: Array.from(event.target.elements.category).filter(element => element.checked).map(element=> element.value) }
        Array.from(event.target.elements).map(function(element){
          if(element.name !== "category"){ itemHash.push({[element.name]: element.value}) }
        })
        itemHash.push(categoryList)
        itemHash.push({["email"]: TodoStorage.fetch(localStorage,"current_user")})
        existingArray = (JSON.parse(TodoStorage.fetch(localStorage,"todoItems")) || [])
        existingArray.push(itemHash)
        TodoStorage.set(localStorage,"todoItems",JSON.stringify(existingArray))
        closeBtn.click();
        location.reload();
      }

      avatarFile.onchange = function () {
        var reader = new FileReader();
        reader.onload = function () {
          var thisImage = reader.result;
          document.getElementById("avatarImg").value = thisImage
          document.getElementById("avatarDemo").src = thisImage
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
          setDate = window.reminder || Date.today
          
          $(".reminderDatepicker").datepicker({
            minDate: 0,
            maxDate: setDate
          });
        }
        else
        {
          reminderCalendar.style.display = "none";
          reminderCalendar.value=""
        }
      }
    }

    function checkValidation(event){
      Array.from(event.target.elements).forEach(function(element){
        if(!element.checkValidity())
        {
          element.classList.remove('is-valid')
          element.classList.add('is-invalid')
        }
        else
        {
          element.classList.remove('is-invalid')
          element.classList.add('is-valid')
        }
      })
    }

    function getItemByIndex(index){
      itemArray = JSON.parse(TodoStorage.fetch(localStorage,"todoItems"))
      return itemArray[index]
    }

    function editItem(index){
      modal.style.display = "block";
      itemElement = getItemByIndex(index)
      modal.style.display = "block";
      document.getElementById("save").setAttribute("index", index)
      setModalValues(itemElement)
    }

    function deleteItem(index){
      itemArray = JSON.parse(TodoStorage.fetch(localStorage,"todoItems"))
      itemArray.splice(index, 1)
      TodoStorage.set(localStorage,"todoItems", JSON.stringify(itemArray))
    }

    function setModalValues(itemElement){
      Array.from(itemElement).map(function(entry){
        var field = document.getElementsByName(Object.keys(entry)[0])[0]
        if(field)
          { if(entry.category){
              entry.category.forEach(function(name){
                categoryCheckbox = Array.from(document.getElementsByName("category"))
                .filter(function(field){ return field.value==name})
                categoryCheckbox[0].checked = true
              })
            }
            else if(field.type=='checkbox')
            { 
              field.checked = eval(Object.values(entry)[0] )
              if(field.name=="is_reminder" && field.checked)
              { 
                document.getElementById("reminderDate").style.display = "block";
                $('.reminderDatepicker').datepicker();
              }
            }
            else
            { 
              field.value = Object.values(entry)[0]
            }
          }
      })
      document.getElementById("avatarDemo").src = document.getElementById("avatarImg").value
    }

    function logoutUser()
    {
      TodoStorage.remove(localStorage, 'loggedIn')
      setTimeout(function(){ window.location.replace('/public/src/users/login.html') }, 0)
    }

    function search(self){
      table = document.getElementById("todo_items")
      tr = table.getElementsByTagName("tr");
      startDate = new Date(self.form.elements.dateRange1.value)
      endDate = new Date(self.form.elements.dateRange2.value)
      category = Array.from(self.form.elements.search_category).filter(e=> e.checked).map(e=> e.value)
      status_done = self.form.elements.status_done.checked
      status_pending = self.form.elements.status_pending.checked

      for(let i=1; i< tr.length; i++){
        j=0, found = false
        
          if(startDate!==undefined || endDate!==undefined)
          {
            selectedDate = new Date (tr[i].getElementsByTagName("td")[2].innerText)
            if(startDate && endDate && ((startDate <= selectedDate) && (selectedDate <= endDate ))){
              found = true
            }
            categoryText = tr[i].getElementsByTagName("td")[3].innerText
            if(categoryText.split(",").some(e=> category.includes(e)))
            { found = true }
            if(status_done)
            {
              statusText = tr[i].getElementsByTagName("td")[4].innerText
              if(eval(statusText))
              { found = true}
            }
            else if(status_pending && (selectedDate > new Date))
            {
              found = true
            }
          }
          if(found)
          { tr[i].style.display = ""; }
          else
          { tr[i].style.display = "none"; }
      }
    }

    function sortTable(columnIndex)
    {
      var tableData = document.getElementById('todo_items').getElementsByTagName('tbody').item(0);
      var rowData = tableData.getElementsByTagName('tr'); 

      for(var i = 0; i < rowData.length - 1; i++) {
        for(var j = 0; j < rowData.length - (i + 1); j++) {
          switch(columnIndex){
            case 1:
            case 3:
            case 4:
              if(rowData.item(j).getElementsByTagName('td').item(columnIndex).innerHTML > rowData.item(j+1).getElementsByTagName('td').item(columnIndex).innerHTML) {
                //re-indexing
                rowData.item(j+1).getElementsByTagName('td')[0].innerText= rowData.length-(i+1)
                rowData.item(j).getElementsByTagName('td')[0].innerText= rowData.length-i
                //swap rows
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
              }
            break;
            case 2:
              if(new Date(rowData.item(j).getElementsByTagName('td').item(columnIndex).innerHTML) > new Date(rowData.item(j+1).getElementsByTagName('td').item(columnIndex).innerHTML)) {
                //re-indexing
                rowData.item(j+1).getElementsByTagName('td')[0].innerText= rowData.length-(i+1)
                rowData.item(j).getElementsByTagName('td')[0].innerText= rowData.length-i
                // swap rows
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
              }
            break;
          }
        }
      }
    }

    return {
      modalHandler: modalHandler,
      setReminder: setReminder,
      addItemModal: renderCreateItemModal,
      editItem: editItem,
      deleteItem: deleteItem,
      logout: logoutUser,
      sortData: sortTable,
      searchDashboard: search 
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

function handleCheckboxChange(self){
  self.value = self.checked
}

function sortData(columnIndex) {
  dashboard.sortData(columnIndex)
}

function parseNodeId(item){
  let trNode = item.offsetParent.parentNode.id;
  return trNode.match(/(\d+)/)[0];
}
function editItem(item){
  itemId = parseNodeId(item)
  dashboard.editItem(itemId)
}

function deleteItem(item)
{
  if(confirm("Are you sure want to delete?"))
  {
    itemId = parseNodeId(item)
    dashboard.deleteItem(itemId)
    location.reload()
  }
}

function logout(){
  dashboard.logout();
}

function searchDashboard(event){
  dashboard.searchDashboard(event);
  return false;
}

$('#dateRange2').datepicker()
$("#dateRange1").datepicker({
  minDate: 'today',
  onSelect: function(dateText) {
    min = new Date(dateText);
    $("#dateRange2").datepicker('option', 'minDate', min);
  }
});