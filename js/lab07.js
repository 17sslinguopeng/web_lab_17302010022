
var firstSelect;
var input;
var commitButton;
var secondSelect;
var showTable;
var tableName;
var columnsNumbers_input;
var attr= new Array();
var tables = new Array();
var tablesNum = 0;
var preTable;
window.onload=function () {


    firstSelect = document.getElementById("firstSelect");
    input =document.getElementById("in");
    commitButton = document.getElementById("commit");
    secondSelect =document.getElementById("tableSelect");
    showTable = document.getElementById("showTable");
    commitButton.onclick=function () {
      commit()
    }
    commitButton.style.display="none";
};
 function commit() {

    if (firstSelect.value =="CREATE TABLE"){

        for (let i =1; i<=parseInt(columnsNumbers_input.value); i++)
        {
          if (attr[i].value=="") return;

        }
        tablesNum = tables.length;
        tables[tablesNum] = document.createElement("table");
        tables[tablesNum].data_name = tableName.value;
        tables[tablesNum].data_columnsNumbers = parseInt(columnsNumbers_input.value);
        let ths=tables[tablesNum].insertRow(0);


        for (let i =1; i<=parseInt(columnsNumbers_input.value); i++)
        {
            let title = document.createElement("th");
            title.appendChild(document.createTextNode(attr[i].value))

            ths.appendChild(title);

        }

        showTable.appendChild(tables[tablesNum])
        let op = document.createElement("option");
        op.value = tableName.value;
        op.appendChild(document.createTextNode(tableName.value));
        secondSelect.appendChild(op);
        op.selected = true;
        preTable = tables[tablesNum];
        showTable.innerHTML="";
        showTable.appendChild(preTable);

    }
    if (firstSelect.value=="ADD ROW")
    {
        let tr = preTable.insertRow(preTable.rows.length);
        for (let i=1; i<=preTable.data_columnsNumbers; i++)
        {
            td = tr.insertCell(i-1);
            td.appendChild(document.createTextNode(attr[i].value));
            td.date_text = document.createTextNode(attr[i].value);
        }
    }
    if (firstSelect.value=="DELETE ROW"){


        for (let i=preTable.rows.length-1;i>=1;i--)
        {
            let flag = true;
            for( let j=0;j<preTable.rows[i].cells.length;j++)
            {

                if (attr[j+1].value=="") continue;

                if (attr[j+1].value!=preTable.rows[i].cells[j].textContent) flag=false;
            }

            if (flag) preTable.deleteRow(i);

        }
        // for (let i=preTable.data_columnsNumbers-1; i>=0; i--)
        // {
        //
        //     for (let j=1;j<=preTable.rows.length-1;j++)
        //     {
        //
        //         if(attr[i+1].value==preTable.rows[j].cells[i].textContent||attr[i+1].value=="")
        //         {
        //
        //             preTable.rows[j].cells[i].textContent="";
        //         }
        //     }
        // }
        // for(let i=preTable.rows.length; i>=1; i--)
        // {
        //
        //     let flag = true;
        //     for (let j=0;j<preTable.rows[0].cells.length;j++)
        //         if (preTable.rows[i].cells[j].textContent!="") flag=false;
        //     if (flag) preTable.deleteRow(i);
        //
        // }
    }
    if (firstSelect.value=="DELETE TABLE"){
        if (secondSelect.value=="SELECT(default: last created)") return;
          let index = secondSelect.selectedIndex;
          secondSelect.options.remove(index);
         tables.splice(index-1,1);
            showTable.innerHTML="";
            if (secondSelect.options.length>1){

                secondSelect.children[1].selected=true;
                preTable = tables[0];

                showTable.appendChild(preTable);
            }
            else {
                secondSelect.children[0].selected=true;
            }
          // if (secondSelect.options.length>1) {
          //
          //     secondSelect.children[1].selected =true;
          //     for (let i=1;i<=tablesNum;i++) {
          //         if (tables[i].data_name == secondSelect.children[1].value) preTable = tables[i];
          //     }
          //
          //     showTable.appendChild(preTable);
          //
          // }
          // else {
          //     secondSelect.children[0].selected =true;
          // }
    }
}

function firstSelectChange() {

    commitButton.style.display="block";
   let value = firstSelect.value;

     input.innerHTML="";

    if (value == "SELECT ONE") {
        commitButton.style.display="none";
        input.innerHTML == "";
    }
    if (value == "CREATE TABLE") {


        commitButton.style.display="none";
        tableName = document.createElement("input");
        tableName.placeholder = "Table Name";
        tableName.type = "text";


         columnsNumbers_input = document.createElement("input");
          columnsNumbers_input.placeholder = "Columns Numbers";
          columnsNumbers_input.type = "number";

        input.appendChild(tableName);
        input.appendChild(columnsNumbers_input);
        let b = document.createElement("br");
        input.appendChild(b);
        columnsNumbers_input.onchange = function(){
             creatTable(parseInt(columnsNumbers_input.value))};
        tableName.onchange = function(){
           creatTable(parseInt(columnsNumbers_input.value))};
    }

    if (value == "ADD ROW") {

     if (secondSelect.value == "SELECT(default: last created)") return;

        addRow(preTable);

    }
    if (value == "DELETE ROW") {
        if (secondSelect.value == "SELECT(default: last created)") return;
       deleteRow(preTable)
    }

    if (value == "DELETE TABLE") {

        input.innerHTML = "<lable style='color: red;font-size: 10px'>WARNING: You cannot undo this action!。</lable>"

    }
}
function secondSelectChange() {
     showTable.innerHTML="";
    if (secondSelect.value == "SELECT(default: last created)") return;
    let index = secondSelect.selectedIndex-1;
    preTable = tables[index];
    firstSelect.onchange();
    showTable.appendChild(preTable);
    // for (let i=1;i<=tablesNum;i++)
    // {
    //     if (tables[i].data_name == secondSelect.value)
    //     {
    //         preTable = tables[i];
    //         showTable.appendChild(preTable);
    //         return;
    //     }
    // }
}
function creatTable(columnsNumbers) {


    for (let i=1;i<=attr.length-1;i++)
    {
        if (input == attr[i].parentNode) input.removeChild(attr[i]);
    }

    if (tableName.value==""||columnsNumbers_input.value=="")
    {
        if (commitButton.style.display=="block") commitButton.style.display= "none";
        return;
    }
     attr = new Array();
    commitButton.style.display="block";
    for (let i =1;i<=columnsNumbers;i++)
    {
         attr[i] = document.createElement("input")
         attr[i].placeholder = "Attribute";
         attr[i].type = "text";
        input.appendChild(attr[i]);
    }

}
function  addRow(table) {

    attr = new Array();

    for (let i =1; i<=table.data_columnsNumbers; i++)
    {

        attr[i] = document.createElement("input")
        attr[i].placeholder = table.rows[0].cells[i-1].textContent;

        attr[i].type = "text";
        input.appendChild(attr[i]);
    }
}
function deleteRow(table) {
    attr = new Array();
    for (let i =1; i<=table.data_columnsNumbers; i++)
    {
        attr[i] = document.createElement("input")
        attr[i].placeholder = table.rows[0].cells[i-1].textContent;
        attr[i].type = "text";
        input.appendChild(attr[i]);
    }
}
