var dataArr = [{
    "type": "HourlySalaryEmployee",
    "salary": 10,
    "name": "Anna",
    "id": 1
  },
  {
    "type": "HourlySalaryEmployee",
    "salary": 8,
    "name": "Bob",
    "id": 2
  },
  {
    "type": "FixedSalaryEmployee",
    "salary": 8000,
    "name": "Dany",
    "id": 3
  },
  {
    "type": "FixedSalaryEmployee",
    "salary": 8000,
    "name": "Clara",
    "id": 4
  },
  {
    "type": "FixedSalaryEmployee",
    "salary": 1000,
    "name": "Egor",
    "id": 5
  }];
 // пустой массив для данных get json
var dataArrJson = [];

function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                if (success){
                    success(JSON.parse(xhr.responseText));                    
                }                   
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function postJSON(data, path, success, error){
    // формируем объект formdata для передачи в php file данных ключ название для $_POST["ключ"] => значение [{}, {}, {}] 
    var formData = new FormData();
    formData.append( 'jsonStr', JSON.stringify(data)); // (ключ, значение )

    // var data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    // var url = "url";
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {
            
            if (xhr.status === 200) {

                if (success){
                  // success(JSON.parse(xhr.responseText));
                    //success(JSON.parse(xhr.responseText));       

                }                   
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("POST", path, true);
   // xhr.setRequestHeader("Content-type", "application/json");
// formdata
    xhr.send(formData);

}



function sendDatatoJSON(dataArrJson){
    
    postJSON(dataArrJson, './form.php',
    function(data) {
       // data.push(dataArrJson);
        console.log(data);
       },
    function(xhr) { console.error(xhr); });
}

/**
 * @constructor создает чек-карточку для нового сотрудника, считает зп
 * @param {div, id, name, salaryType, valueSalary} div обертка элемент для создающихся в конструкторе элементов, аргуметны такие как ключи в главном массиве с данными
 * @return {obj HTMLElement} createElement - self.div
 */

function EmployFactory(div, id, name, salaryType, valueSalary) {
    

    newDiv = document.createElement("div");
    newDiv.className = 'check';
    this.id = id || 1111;
    this.div = newDiv;
    this.name = name|| "Вася"; 
    this.salaryType = salaryType.toLowerCase() || "fixedsalaryemployee"; 
    this.valueSalary = +valueSalary || 5000; 

    var hours = 8;
    var days = 21;

    var result = 200;
    var self = this;

    function countSalary(){
        if(self.salaryType == "hourlysalaryemployee"){
            var result = hours * days * +self.valueSalary;
        }else{
            var result = +self.valueSalary;
        }
        return result;
    }

    this.getValSalary = function(){
       return countSalary();        
    };    
    
    /**
     * создаем объект для пуша в главный массив данных
     */
    var obj = {};
    obj.type = this.salaryType;
    obj.salary = this.getValSalary();
    obj.name =  this.name;
    obj.id = this.id;
// пушим новые данные в объекте в массив 
    dataArrJson.push(obj);

// выводим в элементах
    var idCheck = document.createElement("p");
        idCheck.className = "idcheck";
    var textId = document.createTextNode("id:" + self.id);
        idCheck.appendChild(textId);
     self.div.appendChild(idCheck);
        
    var nameCheck = document.createElement("p");
        nameCheck.className = "namecheck";
    var textName = document.createTextNode(self.name);
        nameCheck.appendChild(textName);
    self.div.appendChild(nameCheck);

    var typeSalaryCheck = document.createElement("p");
        typeSalaryCheck.className = "typeSalarycheck";
    var textTypeSalary = document.createTextNode(salaryType);
        typeSalaryCheck.appendChild(textTypeSalary);
    self.div.appendChild(typeSalaryCheck);
        
    var valueSalaryCheck = document.createElement("p");
        valueSalaryCheck.className = "valueSalarycheck";
    var textValueSalary = document.createTextNode("За месяц: " + self.getValSalary() + " грн");
        valueSalaryCheck.appendChild(textValueSalary);
// помещаем в все в главный общий див
    self.div.appendChild(valueSalaryCheck);
//возвращаем див 
  //  alert( 'Имя ' + this.name + ' Тип: ' + this.salaryType + " valueSalary: " + this.valueSalary);
    return self.div;
}



// window.onload=function(){
//     var addButton = document.getElementById("addButton");
//     var selectTypeSalary = document.getElementById("selectSalary");
//     var nameEmploier = document.getElementById("name");
// }

// addButton.addEventListener("click", function(e){
//     e.preventDefault;
//     // валидация и взятие данных
//   
// });
// selectTypeSalary.addEventListener("change", function(e){
    
// });

/**
 * 
 * @param {array} массив с данными;
 */
function countTotal(arr){
    var total = document.getElementById("total");
    var cnt = 0;
    arr.forEach(function (element, index, array) {
        cnt += element['salary'];
    });
    total.innerHTML = cnt;
}

/**
 * 
 * @param {int, int} число, число ;
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


// var div;
// var employ = new EmployFactory(div, 11, "Fao", "HourlySalaryEmployee", 50);

// console.log(employ.getValSalary());
window.addEventListener("load", init, false);


function init(){
     /**
     * все поля для ввода
     */
    var inpNameEmploier = document.getElementById("name");
    var selectTypesalary = document.getElementById("selectSalary");
    var inpValueSalary = document.getElementById("valueSalary");
    var addButton = document.getElementById("addButton");

    //див - вывод для array с полученными данными
    var wrapCheck = document.getElementById("wrap-check");
    
    /**
     * введенные значения в поля
     */
    var inpValueSalaryVal;
    var inpValueName;
    var valueSelect = selectTypesalary.options[selectTypesalary.selectedIndex].value;
    var textSelect;
    /**
     * события для инпутов
     */
    // select
    selectTypesalary.addEventListener("change", function (e){
        valueSelect = selectTypesalary.options[selectTypesalary.selectedIndex].value;
        textSelect = selectTypesalary.options[selectTypesalary.selectedIndex].text; 
        console.log(valueSelect) 
    });

    // name сотрудника
    inpNameEmploier.addEventListener("change", function (e){
        inpValueName = inpNameEmploier.value;
        
        // func валидации включающая кнпку в случае правильности данных
        validate();
    });

    //значение з/п
    inpValueSalary.addEventListener("change", function (e){
        inpValueSalaryVal = inpValueSalary.value;

        // func валидации включающая кнпку в случае правильности данных
        validate();
    });
  // обработчик на кнопку аdd

    var addData = function(e){
        // отмена дейтвия кнопки по умолчанию
        e.preventDefault(); 
      

        // создаем рандомный айди
        var idRandom = getRandomInt(5, 50);
        // переменная a, должна быть!!!! чтобы что-то передать. должен быть див, но он генерируется с классом на него автоматом в конструкторе, переменная a должна быть , или любой первый аргумент
        //var a;
        var employAdd = new EmployFactory(1, idRandom, inpValueName, valueSelect, inpValueSalaryVal);
        wrapCheck.appendChild(employAdd);
       
        /**
         * @param {array} массив готорый получили с сервера и в который добавили новое значение;
         * */
      //отправляем на сервер
        sendDatatoJSON(dataArrJson);
        
        /**
         * @param {array} массив с salaryValue для подсчета итого;
         * */
        // считаем итого
        countTotal(dataArrJson);
 
    };

    // 
    function validate(){    
        var formAdd = document.forms["form-0"];    
        for (var i = 0; i < formAdd.elements.length; i++) {
            var e = formAdd.elements[i]; // находит элементы формы
            var pattern = e.getAttribute("data-pattern"); // отфильтровывает только те элементы которые с паттерном
            if (pattern) { // если находит pattern то:
                if (inpNameEmploier.value.search(inpNameEmploier.dataset.pattern) > -1 && 
                inpValueSalary.value.search(inpValueSalary.dataset.pattern) > -1){ // если находим паттерн в полях name и salary, то:          
                    addButton.removeAttribute('disabled'); // разблокировываем кнопку
                    addButton.addEventListener("click", addData, false); // добавляем на кнопку событие клик с функцией Которая работает с введенными данными
                }else{             // если паттерн нен находит в введенных данных, то      
                    addButton.setAttribute('disabled', 'disabled'); // заблокировываем кнопку
                    if(addButton.onclick){        // если было навешено событие , убираем его              
                        addButton.removeEventListener("click", addData, false);
                    }
                }
            }
        }          
    };
    // if (inpValueSalaryVal.search( /лю/i ), inpValueName){
    //     addButton.addEventListener("click", addData, false);
    // }else{
    //     if(addButton.onclick){
    //         addButton.removeEventListener("click", addData, false);
    //     }
    // }


    // addButton.addEventListener("click", addData, false);

    /**
     * выбираем елементы из чек-листа , (не обязательно)
     */
    var checkId = document.getElementById("idcheck");
    var checkName = document.getElementById("namecheck");
    var checkTypeSalary = document.getElementById("typeSalarycheck");
    var checkValueSalary = document.getElementById("valueSalarycheck");
    var checkData = document.getElementById("check-data");
  
    // var checkId = document.getElementsByClassName("idcheck");
    // var checkName = document.getElementsByClassName("namecheck");
    // var checkTypeSalary = document.getElementsByClassName("typeSalarycheck");
    // var checkValueSalary = document.getElementsByClassName("valueSalarycheck");
    // var checkData = document.getElementsByClassName("check");


    // dataArr = JSON.parse(dataArr);
    // console.log(dataArr, checkId, checkName, checkTypeSalary, checkValueSalary, checkData);
    //   console.log(checkData.children);
    //   for(var t= 0; t < checkData.length; t++){
    //     var object = checkData[t];
    //     for (var childItem in object.childNodes) {
    //         if (object.childNodes[childItem].nodeType == 1){
    //             if(object.childNodes[childItem].className == 'idcheck'){
    //                 object.childNodes[childItem] += " " + element['id'] + "</br>";
    //             }
    //             console.log(object.childNodes[childItem]);           
    //         }
    //     }
    //   }

    /**
     * pfuhe;ftv lfyyst в
     * @param {string, function(obj), function(obj)} {path, succes, error} передираем массив json с базой сотрудников 
     */
    loadJSON('employeesCollection.json', function(data) {             
        dataArrJson = data;
        dataView(dataArrJson);
        countTotal(dataArrJson);
    },
        function(xhr) { 
             console.error(xhr); 
        }
    );

    function dataView(data){
        data.forEach(function (element, index, array) {
            // for(var i = 0; i< checkData.length; i++){
                // for (var j = 0; j < checkData.children.length; j++) {
                //     alert( checkData.children[i] ); // DIV, UL, DIV, SCRIPT
                //   }
                // var a=document.querySelector("." + checkData[i] + ' .namecheck').innerHTML = " " + element['name'] + "</br>"; 
            
            // };
            // for(var i = 0; i< checkData.length; i++){
                // for(var g=0;g<checkData.children.length;g++){
                //         alert(checkData.children[g]);
                // }
            //     if (checkData[i].children.nodeType != 1) continue;
            //     alert(1);
            // }

            /**
             * создаем новый див , будет в секции 
             */
            var div = document.createElement("div");
            div.className = "check";
            
            var idCheck = document.createElement("p");
            idCheck.className = "idcheck";
            var textId = document.createTextNode(element['id']);
            idCheck.appendChild(textId);
            div.appendChild(idCheck);
            
            var nameCheck = document.createElement("p");
            nameCheck.className = "namecheck";
            var textName = document.createTextNode(element['name']);
            nameCheck.appendChild(textName);
            div.appendChild(nameCheck);

            var typeSalaryCheck = document.createElement("p");
            typeSalaryCheck.className = "typeSalarycheck";
            var textTypeSalary = document.createTextNode(element['type']);
            typeSalaryCheck.appendChild(textTypeSalary);
            div.appendChild(typeSalaryCheck);
            
            var valueSalaryCheck = document.createElement("p");
            valueSalaryCheck.className = "valueSalarycheck";
            var textValueSalary = document.createTextNode("За месяц: " +  element['salary'] + " грн ");
            valueSalaryCheck.appendChild(textValueSalary);

            div.appendChild(valueSalaryCheck);
            wrapCheck.appendChild(div);

            /**
             * выводим всех сотрудников из jsona и добавляем в секцию, employ return div
             */

            //var employ = new EmployFactory(div, element['id'], element['name'], element['type'], element['salary']);
            //wrapCheck.appendChild(employ);

            

            // element[index];
            // checkId.innerHTML += " " + element['id'] + "</br>";
            // checkName.innerHTML += " " + element['name'] + "</br>";       
            // checkTypeSalary.innerHTML += " " + element.type + "</br>";
            // checkValueSalary.innerHTML += " " + element['salary'] + "</br>";
        });

        //end viewData
    };
    
   // end window.onload
}


