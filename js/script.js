
// CREATE AN ARRAY OF EMPLOYEES
let newArray;
let row;
let cellId;
let deleteBtn;
let employees;

let initEmpTable = [
    ['12345678', 'Rama',     '1234', 'xyz@gmail.com', 'Marketing' ],
    ['12345679', 'Jessica',  '1239', 'mmm@gmail.com', 'Engineering' ],
    ['12346676', 'Jim',      '1229', 'mmm@gmail.com', 'Sales' ],
    ['12345675', 'Jordan',   '1139', 'mmk@gmail.com', 'Engineering' ],
    ['12345674', 'Julia',    '1239', 'mmm@gmail.com', 'Engineering' ]
];


// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY

if (!localStorage.employees ){
    console.log("No storage exists, initilize storage");
    localStorage.setItem('employees', JSON.stringify(initEmpTable));
}  else {
    console.log("Retrieving from storage ");
    employees = JSON.parse(localStorage.getItem('employees'));
    
    //if ( lengthOfEmpArray() === 0 ){
    //   console.log("Array is empty" + employees);
    //   employees = initEmpTable;
    //} 
}
 
// GET DOM ELEMENTS
let form        = document.querySelector('#addForm');
let empTable    = document.querySelector('#employees');
let empCount    = document.querySelector('#empCount');
let tbody       = document.querySelector('#employees tbody');

// SET A COUNT VARIABLE TO DISPLAY NEXT TO EMPLOYEES HEADER
let count = 0;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
// INSERT A NEW ROW AT THE END OF THE EMPLOYEES TABLE
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let empID       = document.querySelector('#id').value;
    let empName     = document.querySelector('#name').value;
    let empExt      = document.querySelector('#extension').value;
    let empEmail    = document.querySelector('#email').value;
    let empDept     = document.querySelector('#department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    newArray = [empID, empName, empExt, empEmail, empDept ];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newArray);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    document.querySelector('#addForm').reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();

});


// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentElement.parentElement.rowIndex;
            console.log("row index " + rowIndex);
            
            // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
            empTable.deleteRow(e.target.parentElement.parentElement.rowIndex);

            // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(rowIndex-1, 1);
          
            // BUILD THE GRID
            buildGrid();
        }
    }
});

//Return Length of employeeTable
function lengthOfEmpArray() {
    let i = 0;
    //console.log("*****displayfunction*****");
    employees.forEach((item) => {
        i++;
        //console.log(`${i} ${item[0]} ${item[1]} ${item[2]} ${item[3]} ${item[4]} `);
    });
    return i;
}

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    var table = document.getElementById('employees');
    var row = document.getElementsByTagName('tbody')[0];
    row.parentNode.removeChild(row);
    
    // REBUILD THE TBODY FROM SCRATCH
    var tbody = document.createElement("tbody");
    count = 0;

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    employees.forEach((item) => {
        row = tbody.insertRow();
        cellId = row.insertCell();
        cellId.appendChild(document.createTextNode(item[0]));
        cellId = row.insertCell();
        cellId.appendChild(document.createTextNode(item[1]));
        cellId = row.insertCell();
        cellId.appendChild(document.createTextNode(item[2]));
        cellId = row.insertCell();
        cellId.appendChild(document.createTextNode(item[3]));
        cellId = row.insertCell();
        cellId.appendChild(document.createTextNode(item[4])); 
        // CREATE THE DELETE BUTTON
        deleteBtn   = document.createElement('button');
        // ADD APPROPRIATE BOOTSTRAP CLASSES
        deleteBtn.className = 'btn btn-sm btn-danger delete';
        // ADD THE 'X' TEXT TO BUTTON
        deleteBtn.appendChild(document.createTextNode('X'));
        // APPEND BUTTON TO THE CELL
        cellId = row.insertCell();
        cellId.appendChild(deleteBtn);
        count++;   
    });
    
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);

    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${count})`;
    
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));

};

/** 
function clearStorage(){
    console.log("clearing storage");
    localStorage.clear();
} **/

